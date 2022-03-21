import React from 'react'
import styled from 'styled-components'

interface Props {
  did: string
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 766px;
  justify-content: start;
  height: fit-content;
  margin-top: 50px;
`
const DidTitle = styled.span`
  width: 100px;
  font-size: 16px;
  font-weight: bold;
  color: black;
  text-align: left;
`
const DidSpan = styled.span`
  width: 60%;
  font-size: 16px;
  font-weight: bold;
  color: black;
  word-break: break-all;
`
export const DidSection = (props: Props) => {
  if (props.did === '') return null
  return (
    <Container>
      <DidTitle>DID</DidTitle>
      <DidSpan>{props.did}</DidSpan>
    </Container>
  )
}
