export type CodeLanguage = 'JavaScript' | 'TypeScript' | 'ReactJS';

interface Data {
  id: string;
  languages: CodeLanguage[];
  title: string;
  contents: { language: CodeLanguage; content: string }[];
  description: string;
  keyword: string;
}

export const DATA: Data[] = [
  {
    id: 'use-scroll-top',
    languages: ['ReactJS'],
    title: 'useScrollTop',
    contents: [
      { language: 'JavaScript', content: 'useScrollTop.js' },
      { language: 'TypeScript', content: 'useScrollTop.tsx' }
    ],
    description: 'A custom React hook to get the current scroll position.',
    keyword: 'useScrollTop, scroll top, scroll, custom hook'
  },

  {
    id: 'use-debounce',
    languages: ['ReactJS'],
    title: 'useDebounce',
    contents: [
      { language: 'JavaScript', content: 'useScrollTop.js' },
      { language: 'TypeScript', content: 'useScrollTop.tsx' }
    ],
    description: 'A custom React hook to get the current scroll position.',
    keyword: 'useDebounce, debounce, custom hook'
  }
];
