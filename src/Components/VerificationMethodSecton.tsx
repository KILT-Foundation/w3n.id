import React from 'react'
import styled from 'styled-components'
import { colors } from './Colors/colors'

interface Props {
  did: string
}
const VerificationContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
  height: fit-content;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  margin-top: 20px;
  margin-bottom: 20px;
`
const VerificationMethodTitle = styled.span`
  width: 90px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.1px;
  line-height: 22px;
  text-align: start;
`
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
  word-break: break-all;
`
const Text = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 400px;
`
const TextLink = styled.a`
  color: ${colors.hotpink};
  text-decoration: none;
`

export const VerificationMethodSecton = (props: Props) => {
  return (
    <Container>
      <VerificationContainer>
        <VerificationMethodTitle>Verification methods</VerificationMethodTitle>
        <TextContainer>
          <Text>Find out more about verification methods and keys here</Text>
          <TextLink href={`https://dev.uniresolver.io/${props.did}`}>
            {`https://dev.uniresolver.io/${props.did}`}
          </TextLink>
        </TextContainer>
      </VerificationContainer>
    </Container>
  )
}
