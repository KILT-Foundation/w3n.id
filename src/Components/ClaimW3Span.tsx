import React from 'react'
import styled from 'styled-components'

interface Props {
  handleTourSection: React.MouseEventHandler<HTMLButtonElement>

}
const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: auto;
  max-width: 740px;
  width: 90%;
  margin-bottom: 20px;
`
const HowToSpan = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 16px;
  width: 200px;
  text-align: left;
  a {
    color: ${(props) => props.theme.web3name};
    text-decoration: none;
  }
`
const TakeTourBtn = styled.button`
background:none;
border: none;
margin: 0;
color: ${(props) => props.theme.web3name};
cursor: pointer;
:hover{
  text-decoration: underline;
}
`
export const ClaimW3Span = ({handleTourSection}:Props) => {
  return (
    <Container>
      <HowToSpan>
        <span>*Want your own web3name?</span>
        <TakeTourBtn aria-label='take tour' onClick={handleTourSection}>
            Take a tour
        </TakeTourBtn>
      </HowToSpan>
    </Container>
  )
}
