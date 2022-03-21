import React from 'react'
import styled from 'styled-components'

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
  font-weight: bold;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.1px;
`
const FetchBtn = styled.button`
  display: flex;
  font-family: 'Overpass';
  text-transform: uppercase;
  margin-left: auto;
  font-size: 12px;
  line-height: 13px;
  letter-spacing: 0.09px;
  color: black;
  text-align: center;
  width: 130px;
  height: 22px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: black;
  border: solid;
`
const EndpointURLSpan = styled.span`
  display: block;
  font-family: 'Overpass';
  font-weight: bold;
  font-size: 14px;
  text-align: left;
  line-height: 16px;
  letter-spacing: 0.1px;
  max-width: 500px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const Container = styled.div`
  margin: 10px;
`

export const DidDocument = (props: Endpoint) => {
  return (
    <Container>
      <EndpointTypeSpan>{props.endpointType}</EndpointTypeSpan>

      <EndpointContainer>
        <EndpointURLSpan>{props.endpointURL}</EndpointURLSpan>
        <FetchBtn>Fetch</FetchBtn>
      </EndpointContainer>
    </Container>
  )
}
