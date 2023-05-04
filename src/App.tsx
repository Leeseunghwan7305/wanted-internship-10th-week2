import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import styled from 'styled-components';
import { getRecommendWord } from './api/inputApi';
import RecommendBoxComponent from './components/RecommendBox';
import {
  ARROWDOWN,
  ARROWUP,
  DISEASENAME,
  ENTER,
  ESCAPE,
  MAXLENGTH,
  SEARCH,
  TITLE,
  TITLE2,
} from './static/constants';

type recommendType = {
  name: string;
  id: number;
};

function App() {
  const [recommend, setRecommend] = useState<recommendType[]>([]);
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [cursor, setCursor] = useState<number>(-1);
  const keyboardNavigation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ARROWDOWN) {
      setCursor((prev) => (prev < MAXLENGTH ? (prev + 1) % MAXLENGTH : prev));
    }
    if (e.key === ARROWUP) {
      setCursor((prev) => (prev > 0 ? prev - 1 : MAXLENGTH - 1));
    }
    if (e.key === ESCAPE) {
      setCursor(-1);
    }
    if (e.key === ENTER) {
      inputRef.current!.value = recommend[cursor].name;
      setCursor(-1);
    }
  };

  const recommendHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    let timer = setTimeout(async () => {
      if (text) {
        const result = await getRecommendWord(text);
        setRecommend(result);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <MainPage>
      <Nav />
      <View>
        <h1>
          {TITLE}
          <br />
          {TITLE2}
        </h1>
        <InputBox>
          <div>
            <AiOutlineSearch size="20" color="#fffff" />
          </div>
          <input
            onKeyDown={keyboardNavigation}
            onChange={recommendHandle}
            ref={inputRef}
            placeholder={DISEASENAME}
          ></input>
          <InputButton>{SEARCH}</InputButton>
        </InputBox>
        <RecommendBoxComponent
          inputRef={inputRef}
          cursor={cursor}
          setCursor={setCursor}
          recommend={recommend}
        />
      </View>
    </MainPage>
  );
}

export default App;

const Nav = styled.div`
  height: 80px;
  width: 100%;
  background-color: white;
`;
const MainPage = styled.div`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 450px;
  background-color: #d0e8fd;
  flex-direction: column;
`;

const View = styled.div`
  width: 70%;
  height: 100%;
  margin: 6.8rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > h1 {
    font-size: 3rem;
    margin-bottom: 4rem;
    text-align: center;
    font-weight: 700;
    letter-spacing: -0.018em;
    line-height: 1.6;
  }
`;
const InputBox = styled.div`
  width: 49rem;
  height: 7rem;
  background-color: white;
  border-radius: 42px;
  overflow: hidden;
  display: flex;
  position: relative;
  & > input {
    width: 49rem;
    height: 7rem;
    border: none;
    box-sizing: border-box;
    flex-grow: 1;
    padding-right: 3rem;
  }
  & > input:focus {
    outline: none;
  }

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
  }
`;
const InputButton = styled.button`
  height: 7rem;
  width: 15rem;
  border: none;
  background-color: #357ae1;
  color: white;
  font-weight: 700;
  font-size: 1.5rem;

  &:hover {
    opacity: 0.8;
  }
`;
