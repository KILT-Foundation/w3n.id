import React from 'react'
import { Footer } from './Footer'
import styled from 'styled-components'
import { SearchComponent } from './SearchComponent'
import { Header } from './Header'

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
