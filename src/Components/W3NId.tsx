import React, { useEffect, useState } from 'react'
import { Footer } from './Footer'
import styled from 'styled-components'
import { SearchComponent } from './SearchComponent'
import { Header } from './Header'
import { ThemeProvider } from 'styled-components'
import { Theme } from '../Themes/Theme'
import { ImprintPopup } from './ImprintPopup'

const StyledBody = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  background-color: ${(props) => props.theme.body};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  align-items: center;
  justify-content: center;
  font-family: 'Overpass';
  color: ${(props) => props.theme.text};
  position: relative;
`
const DarkOverlay = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  height: 100%;
  overflow: hidden;
  width: 100vw;
  background-color: black;
  opacity: 0.7;
  z-index: 30;
`
export const W3NId = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const getTheme = window.matchMedia('(prefers-color-scheme: dark)')
  const [showImprint, setShowImprint] = useState<boolean>(false)

  const handleImprint = () => {
    if (showImprint) setShowImprint(false)
    else setShowImprint(true)
  }

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
        <Footer handleImprint={handleImprint} />
        {showImprint && <DarkOverlay />}
      </StyledBody>
      {showImprint && <ImprintPopup handleCloseImprint={handleImprint} />}
    </ThemeProvider>
  )
}
