import { MAXLENGTH, ONE_MINUTE } from '../static/constants';
import { client } from './axiosCustom';

export const getRecommendWord = async (word: string) => {
  const checkCache = localStorage.getItem(word);
  if (checkCache) {
    return JSON.parse(checkCache).data;
  } else {
    try {
      console.log('fetch');
      const res = await client.get(`/search-conditions/?name=${word}`);
      const newData = res.data.splice(0, MAXLENGTH);
      const object = {
        data: newData,
        expireTime: new Date().getTime() + ONE_MINUTE,
      };
      localStorage.setItem(word, JSON.stringify(object));
      console.info('calling api');
      console.log(object.expireTime);
      return newData;
    } catch (e) {
      console.log(e);
    }
  }
};
//캐시 스토리지
