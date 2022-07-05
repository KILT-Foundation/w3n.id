import { useLayoutEffect } from 'react';

const themes = {
  dark: {
    body: '#fff',
    'web3-name': '#2D8B00',
    'btn-border': '#2D8B00',
    'search-background': '#EAEAEA',
    header: '#fff',
    'search-btn': '#DF8601',
    seperator: '#2D8B00',
    'header-secondary': 'rgb(45, 139, 0)',
    'fetch-background': 'rgb(45, 139, 0,0.15)',
    'header-bottom': '#d8d8d8',
    'search-bar': '#d8d8d8',
    text: '#0d0d0d',
    'search-btn-text': '#F3F3F3',
    'header-text': '#f3f3f3',
    'take-tour': '#2D9403',
  },

  light: {
    body: '#000',
    'web3-name': '#47E000',
    'btn-border': '#3DC000',
    'search-background': '#191919',
    header: '#191919',
    'search-btn': '#DF8601',
    seperator: '#3DC000',
    'header-secondary': '#256606',
    'fetch-background': 'rgba(61,192,0,0.15)',
    'header-bottom': '#454545',
    'search-bar': '#d8d8d8',
    text: '#f3f3f3',
    'search-btn-text': '#F3F3F3',
    'header-text': '#f3f3f3',
    'take-tour': '#2D7011',
  },
};

export function useTheme(theme: 'dark' | 'light') {
  useLayoutEffect(() => {
    const t = themes[theme];
    for (const key in t) {
      document.documentElement.style.setProperty(
        `--${key}`,
        t[key as keyof typeof t],
      );
    }
  }, [theme]);
}
