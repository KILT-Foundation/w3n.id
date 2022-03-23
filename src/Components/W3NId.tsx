import React from 'react'
import { Footer } from './Footer'
import styled from 'styled-components'
import { SearchComponent } from './SearchComponent'
import { Header } from './Header'
import { colors } from './Colors/colors'

const StyledBody = styled.div`
  min-height: 100vh;
  max-width: 100vw;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  align-items: center;
  justify-content: center;
  font-family: 'Overpass';
  color: ${colors.textblack};
  @media (prefers-color-scheme: dark) {
    color: #eee;
    background: black;
  }
`

export const W3NId = () => {
  return (
    <StyledBody>
      <Header />
      <SearchComponent />
      <Footer />
    </StyledBody>
  )
}
