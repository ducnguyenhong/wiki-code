import { CodeLanguage } from '@/utils/data';
import { Text } from '@chakra-ui/react';

export const getLanguageIcon = (language: CodeLanguage) => {
  switch (language) {
    case 'JavaScript':
      return null;

    case 'TypeScript':
      return null;

    default:
      return null;
  }
};

export const getLanguageName = (language: CodeLanguage) => {
  switch (language) {
    case 'JavaScript':
      return (
        <Text as="span" fontSize={13} fontWeight={600}>
          JS
        </Text>
      );

    case 'TypeScript':
      return (
        <Text as="span" fontSize={13} fontWeight={600}>
          TS
        </Text>
      );

    default:
      return null;
  }
};
