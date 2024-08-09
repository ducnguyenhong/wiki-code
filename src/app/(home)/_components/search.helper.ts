import { LS_RECENT_SEARCH } from '@/utils/const';
import { get, isEmpty } from 'lodash';
import { RecentSearch } from './search.type';

export const setRecentKeyword = (keyword: string, recentSearch: RecentSearch, username: string) => {
  const keywordList = get(recentSearch, username);
  if (isEmpty(keywordList) && typeof window !== 'undefined') {
    localStorage.setItem(
      LS_RECENT_SEARCH,
      JSON.stringify({
        ...recentSearch,
        [username]: [keyword.trim().replace(/\s{2,}/g, ' ')]
      })
    );
  } else {
    localStorage.setItem(
      LS_RECENT_SEARCH,
      JSON.stringify({
        ...recentSearch,
        [username]: [...new Set([keyword.trim().replace(/\s{2,}/g, ' '), ...keywordList])].slice(0, 5)
      })
    );
  }
};
