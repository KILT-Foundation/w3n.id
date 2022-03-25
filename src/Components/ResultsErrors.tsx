import React from 'react'
import styled from 'styled-components'

interface Style {
  marginBottom?: string
  itemsAlignment?: string
}
interface Props {
  name: string
  errors:
    | 'Not Claimed'
    | 'Max limit'
    | 'Invalid Chars'
    | 'Min limit'
    | 'Invalid Kilt'
    | null
}
const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 740px;
  width: 90%;
  align-items: flex-start;
  justify-content: flex-start;
  height: fit-content;
  margin-top: 50px;
`
const NoteSpan = styled.span`
  max-width: 100px;
  width: 20%;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.1px;
  line-height: 22px;
  text-align: left;
`
const ClaimW3NSteps = styled.span`
  word-break: break-all;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
  margin-bottom: ${(props: Style) => props.marginBottom};
`
const ClaimW3NContainer = styled.div`
  a {
    color: ${(props) => props.theme.web3name};
  }
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: ${(props: Style) => props.itemsAlignment};
  min-width: 250px;
  gap: 7px;
`
const ClaimWeb3Name = (props: Props) => {
  return (
    <Container>
      <NoteSpan>Note</NoteSpan>
      <ClaimW3NContainer itemsAlignment="flex-start">
        <ClaimW3NSteps marginBottom={'15px'}>
          No results fond for {props.name}
        </ClaimW3NSteps>
        <ClaimW3NSteps marginBottom={'0px'}>
          - Download Sporran extension for{' '}
          <a href="https://didsign.io/">Chrome</a> or{' '}
          <a href="https://didsign.io/">Firefox</a>
        </ClaimW3NSteps>
        <ClaimW3NSteps marginBottom={'0px'}>
          - Generate a KILT Identity within Sporran
        </ClaimW3NSteps>
        <ClaimW3NSteps marginBottom={'0px'}>
          - Transfer KILT tokens to this Identy
        </ClaimW3NSteps>
        <ClaimW3NSteps marginBottom={'15px'}>
          - Claim web3name in Sporran
        </ClaimW3NSteps>
        <ClaimW3NSteps marginBottom={'0px'}>
          For details go to <a href="https://didsign.io/">Tech Support</a>
        </ClaimW3NSteps>
      </ClaimW3NContainer>
    </Container>
  )
}
export const ResultsErrors = (props: Props) => {
  if (props.errors === 'Not Claimed') {
    return <ClaimWeb3Name name={props.name} errors={null} />
  }
  if (props.errors === 'Max limit') {
    return <MaxCharError />
  }
  if (props.errors === 'Min limit') {
    return <MinCharError />
  }
  if (props.errors === 'Invalid Chars') {
    return <InvalidCharError />
  }
  if (props.errors === 'Invalid Kilt') {
    return <InvalidKiltDid />
  }
  return null
}
const MaxCharError = () => {
  return (
    <Container>
      <NoteSpan>Note</NoteSpan>
      <ClaimW3NContainer itemsAlignment={'center'}>
        <ClaimW3NSteps marginBottom={'0px'}>
          Maximum 30 charachters allowed
        </ClaimW3NSteps>
      </ClaimW3NContainer>
    </Container>
  )
}
const MinCharError = () => {
  return (
    <Container>
      <NoteSpan>Note</NoteSpan>
      <ClaimW3NContainer itemsAlignment={'center'}>
        <ClaimW3NSteps marginBottom={'0px'}>
          Minimum charachters length should be 3
        </ClaimW3NSteps>
      </ClaimW3NContainer>
    </Container>
  )
}

const InvalidCharError = () => {
  return (
    <Container>
      <NoteSpan>Note</NoteSpan>
      <ClaimW3NContainer itemsAlignment={'center'}>
        <ClaimW3NSteps marginBottom={'0px'}>Invalid Charachters</ClaimW3NSteps>
      </ClaimW3NContainer>
    </Container>
  )
}
const InvalidKiltDid = () => {
  return (
    <Container>
      <NoteSpan>Note</NoteSpan>
      <ClaimW3NContainer itemsAlignment={'center'}>
        <ClaimW3NSteps marginBottom={'0px'}>Not a valid Kilt DID</ClaimW3NSteps>
      </ClaimW3NContainer>
    </Container>
  )
}
