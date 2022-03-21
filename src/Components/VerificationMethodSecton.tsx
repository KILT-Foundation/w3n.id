import React from 'react'
import styled from 'styled-components'

const VerificationContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: fit-content;
  gap: 20px;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 766px;
  height: fit-content;
  margin-top: 20px;
`
const VerificationMethodTitle = styled.span`
  width: 100px;
  font-size: 14px;
  font-weight: bold;
  color: black;
  text-align: start;
`
const Text = styled.span`
  width: 40%;
  font-size: 14px;
  font-weight: bold;
  color: black;
  word-break: break-all;
`
const AdvanceButtonWrapper = styled.div`
  width: 58%;
  height: 30px;
  font-size: 16px;
  font-weight: bold;
  color: black;
  word-break: break-all;
  display: flex;
  justify-content: flex-end;
`
const AdvanceButton = styled.button`
  width: 120px;
  height: 22px;
  border-radius: 10px;
  border: black;
  border: solid;
  margin-right: 10px;
  text-transform: uppercase;
`
const Seperator = styled.div`
  margin-bottom: 25px;
  border: 0.1px;
  border-style: dashed;
  width: 100%;
  height: 0.2px;
  border-color: black;
`
export const VerificationMethodSecton = () => {
  return (
    <Container>
      <Seperator />
      <VerificationContainer>
        <VerificationMethodTitle>Verification methods</VerificationMethodTitle>
        <Text>Find out more about verification methods and keys here</Text>
        <AdvanceButtonWrapper>
          <AdvanceButton>Advance</AdvanceButton>
        </AdvanceButtonWrapper>
      </VerificationContainer>
    </Container>
  )
}
