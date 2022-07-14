import { useLayoutEffect } from 'react';

export function useTheme(theme: 'dark' | 'light') {
  useLayoutEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);
}
