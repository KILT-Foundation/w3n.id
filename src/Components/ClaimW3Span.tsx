import React from 'react'
import styled from 'styled-components'

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

  #claim {
    margin-left: 8px;
  }
  a {
    color: ${(props) => props.theme.web3name};
    text-decoration: none;
  }
`
export const ClaimW3Span = () => {
  return (
    <Container>
      <HowToSpan>
        <span>*Want your own web3name?</span>
        <span id="claim">
          Learn how to claim it with our{' '}
          <a href="https://www.trusted-entity.io/assets/pdf/How_To_Guide_web3name_Promo.pdf">
            How-to guide
          </a>
        </span>
      </HowToSpan>
    </Container>
  )
}
