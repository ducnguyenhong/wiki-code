import { extendTheme } from '@chakra-ui/react';

const BreakpointConfig = {
  breakpoints: {
    xs: '320px', // mobile
    sm: '480px',
    md: '768px', // tablet
    lg: '992px',
    xl: '1280px', // desktop
    '2xl': '1600px'
  }
};

const ComponentsTheme = {
  components: {
    Text: {
      baseStyle: {
        fontSize: 14,
        color: '#070707',
        fontWeight: 400
      }
    }
  }
};

const ColorConfig = {
  colors: {
    primary: { 1: '#F7941D' },
    text: { 1: '#111111' }
  }
};

const FontConfig = {
  fonts: {
    heading: `'Inter', sans-serif`
  }
};

export const chakraTheme = extendTheme({
  ...ComponentsTheme,
  ...FontConfig,
  ...ColorConfig,
  ...BreakpointConfig
  // ...MiscConfig,
  // ...GlobalConfig
});
