import { CodeLanguage } from '@/utils/data';
import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { Highlight, themes } from 'prism-react-renderer';
import { memo, useEffect, useState } from 'react';
import { getLanguageIcon, getLanguageName } from './render-code.helper';

interface Props {
  contents: { content: string; language: CodeLanguage }[];
}

const RenderCode: React.FC<Props> = (props) => {
  const { contents } = props;
  const [isCopied, setIsCopied] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const revertCopy = setTimeout(() => {
      if (isCopied) {
        setIsCopied(false);
      }
    }, 3000);

    return () => clearTimeout(revertCopy);
  }, [isCopied]);

  return (
    <Tabs variant="enclosed" size="sm" index={tabIndex} onChange={(index) => setTabIndex(index)}>
      <TabList>
        {contents.map((item, idx) => {
          const { language } = item;
          return (
            <Tab key={idx} bgColor={tabIndex === idx ? '#f6f8fa' : '#FFF'} gap={1} alignItems="center" py={1.5}>
              {getLanguageIcon(language)}
              {getLanguageName(language)}
            </Tab>
          );
        })}
      </TabList>
      <TabPanels>
        {contents.map((item, idx) => {
          return (
            <TabPanel p={0} key={idx}>
              <Highlight theme={themes.github} code={item.content} language="tsx">
                {({ style, tokens, getLineProps, getTokenProps }) => (
                  <pre style={{ ...style, borderRadius: 3, position: 'relative', padding: 20, whiteSpace: 'pre-wrap' }}>
                    <Flex pos="absolute" justify="flex-end" top={3} right={3}>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item.content);
                          setIsCopied(true);
                        }}
                      >
                        {/* <Icon
                          as={FaCopy}
                          color={isCopied ? 'main.1' : 'text.0'}
                          _hover={{ color: isCopied ? 'main.1' : 'main.0' }}
                          transitionDuration="200ms"
                        /> */}
                        copy
                      </button>
                    </Flex>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </TabPanel>
          );
        })}
      </TabPanels>
    </Tabs>
  );
};

export default memo(RenderCode);
