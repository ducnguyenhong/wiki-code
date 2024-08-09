import { Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

const Header: React.FC = () => {
  return (
    <Flex h="full" boxShadow="base" align="center" justify="space-between" px={6}>
      <Link href="/">
        <Flex align="center" gap={2.5}>
          <Image src="/images/logo.png" alt="wiki code logo" width={45} height={45} />
          <Text fontSize={20} fontWeight={700} color="#474c93">
            Wiki Code
          </Text>
        </Flex>
      </Link>
    </Flex>
  );
};

export default memo(Header);
