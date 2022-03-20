import React from 'react'
import { Footer } from './Footer'
import styled from 'styled-components'
import { SearchComponent } from './SearchComponent'

const StyledBody = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`

export const W3NId = () => {
  return (
    <StyledBody>
      <SearchComponent />
      <Footer />
    </StyledBody>
  )
}
