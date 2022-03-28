import React, { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as Copy } from '../ImageAssets/copy2clipboard_light.svg'
import { Credentials } from './Credentials'
import { Credential, RequestForAttestation, Did } from '@kiltprotocol/sdk-js'
import {
  getAttestationForRequest,
  getDidForAccount,
  validateAttestation,
  validateCredential,
} from '../Utils/search-helpers'
import { ReactComponent as Open } from '../ImageAssets/chevron_down_white.svg'

interface IEndpoint {
  endpointType: string
  endpointURL: string
  did: string
}
interface Style {
  rotate: string
}
const EndpointContainer = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
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
  position: relative;
  color: ${(props) => props.theme.web3name};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
  text-align: center;
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
  width: 90%;
  max-width: 400px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
const UrlContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  width: 95%;
  max-width: 500px;
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
const OpenSvg = styled(Open)`
  fill: ${(props) => props.theme.btnborder};
  cursor: pointer;
  position: absolute;
  right: 12px;
  top: 6px;
  transform: rotate(${(props: Style) => props.rotate});
`

export const DidDocument = (props: IEndpoint) => {
  const [credential, setCredential] = useState<any | null>(null)
  const [isCredentialValid, setIsCredentialValid] = useState<boolean>(true)
  const [attester, setAttester] = useState<string>('')
  const [fetched, setFetched] = useState<boolean>(false)

  const handleFetch = () => {
    if (fetched) {
      setFetched(false)
      setCredential(null)

      return
    } else {
      setFetched(true)
    }
    if (credential) {
      return
    }
    fetch(props.endpointURL)
      .then((response) => response.json())
      .then(async (result) => {
        if (!Did.DidUtils.isSameSubject(result.claim.owner, props.did)) {
          setIsCredentialValid(false)
          setAttester('Credential subject and signer DID are not the same')
        } else if (Credential.isICredential(result)) {
          setIsCredentialValid(await validateCredential(result))
          setAttester(getDidForAccount(result.attestation.owner))
        } else if (RequestForAttestation.isIRequestForAttestation(result)) {
          const attestation = await getAttestationForRequest(result)
          setIsCredentialValid(await validateAttestation(attestation))
          if (attestation) {
            setAttester(getDidForAccount(attestation.owner))
          } else {
            setAttester('No Attestation found')
          }
        }

        setCredential(result.claim.contents)
      })
      .catch((error) => {
        console.log(error)
        setFetched(false)
      })
  }
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
        <FetchBtn onClick={() => handleFetch()}>
          Fetch
          <OpenSvg rotate={fetched ? '180deg' : '0deg'} />
        </FetchBtn>
      </EndpointContainer>
      {credential && (
        <Credentials
          credential={credential}
          attesterDid={attester}
          isCredentialValid={isCredentialValid}
        />
      )}
      <Seperator />
    </Container>
  )
}
