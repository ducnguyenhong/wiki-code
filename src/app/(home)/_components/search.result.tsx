import { LS_RECENT_SEARCH } from '@/utils/const';
import { DATA } from '@/utils/data';
import { Box, Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { memo, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { setRecentKeyword } from './search.helper';
import { keywordAtom } from './search.recoil';
import { RecentSearch } from './search.type';

const SearchResult: React.FC = () => {
  const keyword = useRecoilValue(keywordAtom);
  const keywordTrim = keyword.trim().replace(/\s{2,}/g, ' ');
  const result = DATA.filter((i) => i.keyword.includes(keyword));
  const [lsRecentKeyword, setLsRecentKeyword] = useState<string | null>('');
  const recentSearch: RecentSearch = useMemo(
    () => (lsRecentKeyword ? JSON.parse(lsRecentKeyword) : {}),
    [lsRecentKeyword]
  );

  useEffect(() => {
    setLsRecentKeyword(localStorage.getItem(LS_RECENT_SEARCH));
  }, []);

  if (!keywordTrim) {
    return <Box>Tìm kiếm gần đây</Box>;
  }

  if (!Array.isArray(result) || !result.length) {
    return null;
  }

  return (
    <Flex direction="column" gap={4}>
      {result.map((item) => {
        const { id, title, description, languages } = item;

        return (
          <Link key={id} href={`/code/${id}`} onClick={() => setRecentKeyword(keywordTrim, recentSearch, 'guest')}>
            <Flex align="center" gap={3}>
              <Flex align="center" justify="center" border="1px solid #CCC" borderRadius={4} w="36px" h="36px">
                <svg fill="none" viewBox="0 0 24 24" height="22px" width="22px">
                  <path
                    fill="#b9b9b9"
                    d="M13.325 3.05L8.667 20.432l1.932.518 4.658-17.382-1.932-.518zM7.612 18.36l1.36-1.448-.001-.019-5.094-4.78 4.79-5.105-1.458-1.369-6.16 6.563 6.563 6.159zM16.388 18.36l-1.36-1.448.001-.019 5.094-4.78-4.79-5.105 1.458-1.369 6.16 6.563-6.563 6.159z"
                  />
                </svg>
              </Flex>

              <Flex direction="column">
                <Text fontWeight={700} fontSize={16}>
                  {title}{' '}
                  <Text as="span" fontSize={16} color="#828282">
                    ({languages.join(', ')})
                  </Text>
                </Text>
                <Text noOfLines={2} color="#828282">
                  {description}
                </Text>
              </Flex>
            </Flex>
          </Link>
        );
      })}
    </Flex>
  );
};

export default memo(SearchResult);
