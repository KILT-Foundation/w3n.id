import React from 'react'
import { Footer } from './Footer'
import styled from 'styled-components'

const StyledBody = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`
const StyledSearch = styled.div`
  display: flex;
  width: 766px;
  height: 40px;
  border: solid;
  border-color: black;
  border-radius: 30px;
  margin: auto;
  padding-left: 10px;
  margin-top: 200px;
`
const StyledSearchBtn = styled.button`
  width: 160px;
  height: 30px;
  background-color: black;
  color: white;
  border-radius: 30px;
`
const StyledInput = styled.input`
  width: 400px;
  color: black;
  background: transparent;
  border: none;
`
const StyledSearchBtnWrapper = styled.div`
  width: 180px;
  height: 40px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const W3NId = () => {
  return (
    <StyledBody>
      <StyledSearch>
        <StyledInput type="text" placeholder="Type DID or W3Name" />

        <StyledSearchBtnWrapper>
          <StyledSearchBtn>Search</StyledSearchBtn>
        </StyledSearchBtnWrapper>
      </StyledSearch>

      <Footer />
    </StyledBody>
  )
}
