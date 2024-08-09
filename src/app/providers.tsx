'use client';

import { chakraTheme } from '@/configs/chakra-theme';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={chakraTheme}>
      <RecoilRoot>{children}</RecoilRoot>
    </ChakraProvider>
  );
}
