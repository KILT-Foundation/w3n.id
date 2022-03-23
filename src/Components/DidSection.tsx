import React from 'react'
import styled from 'styled-components'

interface Props {
  did: string
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
const DidTitle = styled.span`
  max-width: 100px;
  width: 20%;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.1px;
  line-height: 22px;
  text-align: left;
`
const DidSpan = styled.span`
  display: flex;
  justify-content: start;
  min-width: 200px;
  word-break: break-all;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
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
