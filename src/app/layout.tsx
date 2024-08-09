import { Box } from '@chakra-ui/react';
import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const fontFamily = Quicksand({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'Wiki Code - Tra cứu code nhanh chóng',
  description: 'Wiki code - Tra cứu code nhanh chóng'
};

interface RootLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
}

export default function RootLayout({ children, header }: RootLayoutProps) {
  return (
    <html lang="vi">
      <body className={fontFamily.className}>
        <Providers>
          <Box w="full" h="full">
            <Box w="full" h="65px">
              {header}
            </Box>
            <Box w="full" minH="calc(100vh - 65px)">
              {children}
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  );
}
