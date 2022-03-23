import React from 'react'
import styled from 'styled-components'
import { colors } from './Colors/colors'

interface Endpoint {
  endpointType: string
  endpointURL: string
}

const EndpointContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
`
const EndpointTypeSpan = styled.span`
  overflow-wrap: break-word;
  font-family: 'Overpass';
  color: ${colors.textblack};
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.1px;
  line-height: 22px;
  margin-top: 10px;
`
const FetchBtn = styled.button`
  display: flex;
  font-family: 'Overpass';
  text-transform: uppercase;
  color: ${colors.hotpink};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
  text-align: center;
  margin-left: auto;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 140px;
  border: 2px solid ${colors.hotpink};
  border-radius: 15px;
  background-color: ${colors.darkpink};
`
const EndpointURLSpan = styled.span`
  display: block;
  font-family: 'Overpass';
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
  width: 450px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`
const Seperator = styled.div`
  border: 1px dashed ${colors.borderblue};
  width: 100%;
  color: ${colors.textblack};
  @media (prefers-color-scheme: dark) {
    border-color: white;
  }
`

export const DidDocument = (props: Endpoint) => {
  return (
    <Container>
      <EndpointTypeSpan>{props.endpointType}</EndpointTypeSpan>

      <EndpointContainer>
        <EndpointURLSpan>{props.endpointURL}</EndpointURLSpan>
        <FetchBtn>Fetch</FetchBtn>
      </EndpointContainer>
      <Seperator />
    </Container>
  )
}
