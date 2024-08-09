'use client';

import RenderCode from '@/components/render-code';
import { DATA } from '@/utils/data';
import { Flex } from '@chakra-ui/react';
import { NextPage } from 'next';

const CodeDetail: NextPage<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;

  const codeDetail = DATA.find((i) => i.id === id);

  if (!codeDetail) {
    return null;
  }

  const { contents } = codeDetail;

  return (
    <Flex direction="column">
      <RenderCode contents={contents} />
    </Flex>
  );
};

export default CodeDetail;
