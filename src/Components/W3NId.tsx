import React, { useEffect, useState } from 'react'
import { Footer } from './Footer'
import styled from 'styled-components'
import { SearchComponent } from './SearchComponent'
import { Header } from './Header'
import { ThemeProvider } from 'styled-components'
import { Theme } from '../Themes/Theme'

const StyledBody = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  background-color: ${(props) => props.theme.body};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  align-items: center;
  justify-content: center;
  font-family: 'Overpass';
  color: ${(props) => props.theme.text};
`

export const W3NId = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const getTheme = window.matchMedia('(prefers-color-scheme: dark)')

  const handleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    }
  }
  getTheme.onchange = (darktheme) => {
    if (localStorage.getItem('theme') === null)
      if (darktheme.matches) {
        setTheme('dark')
      } else {
        setTheme('light')
      }
  }
  useEffect(() => {
    if (localStorage.getItem('theme') !== null) {
      localStorage.getItem('theme') === 'dark'
        ? setTheme('dark')
        : setTheme('light')
    }
  }, [setTheme])
  return (
    <ThemeProvider theme={Theme[theme]}>
      <StyledBody>
        <Header handleTheme={handleTheme} theme={theme} />
        <SearchComponent />
        <Footer />
      </StyledBody>
    </ThemeProvider>
  )
}
