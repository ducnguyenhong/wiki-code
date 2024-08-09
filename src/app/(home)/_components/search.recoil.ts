import { atom } from 'recoil';

export const keywordAtom = atom<string>({
  key: 'SEARCH_KEYWORD_ATOM',
  default: ''
});
