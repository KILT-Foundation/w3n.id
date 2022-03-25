import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Copy } from '../ImageAssets/copy2clipboard_light.svg'

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
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.1px;
  line-height: 22px;
  margin-top: 10px;
`
const FetchBtn = styled.button`
  display: flex;
  cursor: pointer;
  font-family: 'Overpass';
  text-transform: uppercase;
  color: ${(props) => props.theme.web3name};
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
  border: 2px solid ${(props) => props.theme.btnborder};
  border-radius: 15px;
  background-color: ${(props) => props.theme.fetchbackground};
`
const EndpointURLSpan = styled.span`
  display: block;
  font-family: 'Overpass';
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
  width: 400px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
const UrlContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
  width: 70%;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`
const Seperator = styled.div`
  border: 1px dashed ${(props) => props.theme.seperator};
  width: 100%;
`
const CopySvg = styled(Copy)`
  fill: ${(props) => props.theme.btnborder};
  cursor: pointer;
`

export const DidDocument = (props: Endpoint) => {
  return (
    <Container>
      <EndpointTypeSpan>{props.endpointType}</EndpointTypeSpan>

      <EndpointContainer>
        <UrlContainer>
          <EndpointURLSpan>{props.endpointURL}</EndpointURLSpan>
          <CopySvg
            onClick={() => {
              navigator.clipboard.writeText(props.endpointURL)
            }}
          />
        </UrlContainer>
        <FetchBtn>Fetch</FetchBtn>
      </EndpointContainer>
      <Seperator />
    </Container>
  )
}
