import React, { useState } from 'react'
import styled from 'styled-components'
import { Credentials } from './Credentials'
import { Credential, RequestForAttestation, Did } from '@kiltprotocol/sdk-js'
import {
  getAttestationForRequest,
  validateAttestation,
  validateCredential,
} from '../Utils/w3n-helpers'
import { ReactComponent as Open } from '../ImageAssets/chevron_down_white.svg'
import { ReactComponent as Loader } from '../ImageAssets/oval.svg'
import { CopyToClipboard } from './CopyToClipboard'
import { CredentialErrors } from './CredentialErrors'

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
  width: 100%;
`
const Seperator = styled.div`
  border: 1px dashed ${(props) => props.theme.seperator};
  margin-top: 18px;
  width: 100%;
  opacity: 0.5;
`

const OpenSvg = styled(Open)`
  fill: ${(props) => props.theme.btnborder};
  cursor: pointer;
  position: absolute;
  right: 12px;
  top: 6px;
  transform: rotate(${(props: Style) => props.rotate});
`
const LoaderSvg = styled(Loader)`
  stroke: ${(props) => props.theme.btnborder};
  position: absolute;
  left: 12px;
  top: 3px;
  height: 13px;
  width: 20px;
`

export const DidDocument = (props: IEndpoint) => {
  const [credential, setCredential] = useState<any | null | undefined>(null)
  const [isCredentialValid, setIsCredentialValid] = useState<boolean>(true)
  const [attester, setAttester] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [fetched, setFetched] = useState<boolean>(false)
  const [fetching, setFetching] = useState(false)

  const handleFetch = () => {
    if (fetched) {
      setFetched(false)
      setCredential(null)
      if (error) setError(null)
      if (credential) setCredential(null)

      return
    } else {
      setFetched(true)
    }
    if (credential || error) {
      return
    }

    setFetching(true)

    fetch(props.endpointURL)
      .then((response) => response.json())
      .then(async (result) => {
        if (!Did.DidUtils.isSameSubject(result.claim.owner, props.did)) {
          setIsCredentialValid(false)
          setError('Credential subject and signer DID are not the same')
          setFetching(false)
          return
        } else if (Credential.isICredential(result)) {
          setIsCredentialValid(await validateCredential(result))
          const web3name = await Did.Web3Names.queryWeb3NameForDid(
            result.attestation.owner
          )
          if (web3name) setAttester(`w3n:${web3name}`)
          else setAttester(result.attestation.owner)
        } else if (RequestForAttestation.isIRequestForAttestation(result)) {
          const attestation = await getAttestationForRequest(result)
          setIsCredentialValid(await validateAttestation(attestation))
          if (attestation) {
            const web3name = await Did.Web3Names.queryWeb3NameForDid(
              attestation.owner
            )
            if (web3name) setAttester(`w3n:${web3name}`)
            else setAttester(attestation.owner)
          } else {
            setError('No Attestation found')
          }
        }
        if (
          !Credential.isICredential(result) &&
          !RequestForAttestation.isIRequestForAttestation(result)
        ) {
          setError('Not valid Kilt Credential')
          setFetching(false)
          return
        }
        setCredential((result as any).claim.contents)
        setFetching(false)
      })
      .catch((error) => {
        setFetching(false)
        setError('Cannot fetch the credentials from the given endpoint')
        setFetched(true)
      })
  }

  return (
    <Container>
      <EndpointTypeSpan>{props.endpointType}</EndpointTypeSpan>

      <EndpointContainer>
        <UrlContainer>
          <EndpointURLSpan>{props.endpointURL}</EndpointURLSpan>
          <CopyToClipboard text={props.endpointURL} />
        </UrlContainer>
        <FetchBtn onClick={() => handleFetch()}>
          Fetch
          <OpenSvg rotate={fetched ? '180deg' : '0deg'} />
          {fetching && <LoaderSvg />}
        </FetchBtn>
      </EndpointContainer>
      {!error && credential && (
        <Credentials
          credential={credential}
          attesterDid={attester}
          isCredentialValid={isCredentialValid}
        />
      )}
      {error && <CredentialErrors error={error} />}
      <Seperator />
    </Container>
  )
}
