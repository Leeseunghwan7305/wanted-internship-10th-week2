import React from 'react';
import styled from 'styled-components';
import { NONSEARCH } from '../static/constants';

const RecommendBoxComponent = ({ recommend, cursor }: any) => {
  return (
    <Hidden>
      <RecommendBox>
        {recommend?.length === 0 ? (
          <SearchNone>{NONSEARCH}</SearchNone>
        ) : (
          <RecommendLists>
            {recommend?.map((word: any, index: any) => {
              return (
                <li
                  key={word.id}
                  style={index === cursor ? { backgroundColor: '#ededed' } : {}}
                >
                  {word.name}
                </li>
              );
            })}
          </RecommendLists>
        )}
      </RecommendBox>
    </Hidden>
  );
};

export default RecommendBoxComponent;

const Hidden = styled.div`
  position: relative;
`;

const SearchNone = styled.div`
  padding: 1rem;
`;

const RecommendBox = styled.div`
  position: absolute;
  left: calc(50% - 24.5rem);
  right: 0;
  width: 49rem;
  min-height: 100px;
  overflow-y: scroll;
  border-radius: 10px;
  background-color: white;
  margin-top: 1rem;
  border: 0.5px solid black;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const RecommendLists = styled.ul`
  & > li {
    padding: 1rem;
    font-size: 1.2rem;
  }

  & > li:hover {
    background-color: gray;
    color: white;
  }
`;
