'use client';

import { LS_RECENT_SEARCH } from '@/utils/const';
import {
  Box,
  Flex,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
  useOutsideClick
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { KeyboardEvent, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { setRecentKeyword } from './search.helper';
import { keywordAtom } from './search.recoil';
import SearchResult from './search.result';
import { RecentSearch } from './search.type';

const Search: React.FC = () => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [keyword, setKeyword] = useRecoilState(keywordAtom);
  const resetKeyword = useResetRecoilState(keywordAtom);
  const router = useRouter();
  const [lsRecentKeyword, setLsRecentKeyword] = useState<string | null>('');
  const username = 'guest';

  const recentSearch: RecentSearch = useMemo(
    () => (lsRecentKeyword ? JSON.parse(lsRecentKeyword) : {}),
    [lsRecentKeyword]
  );

  const onEnterSearch = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && keyword) {
        setRecentKeyword(keyword, recentSearch, username);
        router.push(`/search?keyword=${keyword.trim().replace(/\s{2,}/g, ' ')}`);
        setKeyword('');
        onClose();
      }
    },
    [keyword, onClose, recentSearch, router, setKeyword, username]
  );

  useOutsideClick({
    ref: popoverRef,
    handler: () => onClose()
  });

  useEffect(() => {
    return () => {
      resetKeyword();
    };
  }, [resetKeyword]);

  useEffect(() => {
    setLsRecentKeyword(localStorage.getItem(LS_RECENT_SEARCH));
  }, []);

  return (
    <Flex direction="column" align="center" h="calc(100vh - 65px)" w="full" pt={32}>
      <Box ref={popoverRef} w="40%">
        <Flex mb={10} align="center" gap={4} justify="center">
          <Image src="/images/logo.png" alt="wiki code logo" width={65} height={65} />
          <Text as="h1" fontWeight={700} fontSize={35} textAlign="center">
            Tìm kiếm với Wiki Code
          </Text>
        </Flex>

        <Popover isOpen={isOpen} autoFocus={false} onOpen={onOpen} onClose={onClose} matchWidth>
          <PopoverTrigger>
            <Flex
              onClick={(e) => {
                e.preventDefault();
                onOpen();
              }}
              bgColor="transparent"
              p={0}
              minH={0}
              minW={0}
              w="full"
              h={{ xs: '45px', lg: '50px' }}
              _hover={{ bgColor: 'transparent' }}
              _active={{ bgColor: 'transparent' }}
              pos="relative"
            >
              <Box pos="absolute" top={{ xs: '10px', lg: '13px' }} left="14px" zIndex={2}>
                <Image src="/images/search.png" alt="search" width={24} height={24} />
              </Box>

              <Box pos="absolute" top={{ xs: '10px', lg: '12px' }} right="12px" zIndex={2}>
                {!!keyword && (
                  <button
                    type="button"
                    style={{ marginTop: '2px' }}
                    onClick={() => {
                      setKeyword('');
                    }}
                  >
                    <Image src="/images/close.png" width={22} height={22} alt="clear" />
                  </button>
                )}
              </Box>

              <Input
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                  onOpen();
                }}
                px="44px"
                _placeholder={{ fontWeight: 500 }}
                placeholder="Nhập nội dung tìm kiếm"
                w="full"
                h="full"
                border="1px solid #ccc"
                borderRadius={30}
                // _focus={{ border: 'none', outline: 'none', boxShadow: 'none' }}
                bgColor="#FFFFFF"
                onKeyDown={onEnterSearch}
              />
            </Flex>
          </PopoverTrigger>

          <PopoverContent boxShadow="base" p="20px" borderRadius={8} w="full">
            <SearchResult />
          </PopoverContent>
        </Popover>
      </Box>
    </Flex>
  );
};

export default memo(Search);
