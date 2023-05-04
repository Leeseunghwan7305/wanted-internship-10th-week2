import { ONE_MINUTE } from '../static/constants';
import { client } from './axiosCustom';

export const getRecommendWord = async (word: string) => {
  const checkCache = localStorage.getItem(word);
  if (checkCache) {
    return JSON.parse(checkCache).data;
  } else {
    try {
      console.log('fetch');
      const res = await client.get(`/search-conditions/?name=${word}`);
      const object = {
        data: res.data,
        expireTime: new Date().getTime() + ONE_MINUTE,
      };
      localStorage.setItem(word, JSON.stringify(object));
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
};
