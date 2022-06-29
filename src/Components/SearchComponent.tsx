import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  getDidDocFromW3Name,
  validSearchedText,
  stringStartsWithW3,
  pushHistoryState,
  getServiceEndpointsW3Name,
  replaceHistoryState,
} from '../Utils/w3n-helpers'
import { ServiceEndpoint } from './ServiceEndpoint'
import { DidSection } from './DidSection'
import { Web3Name } from './Web3NameSection'
import { VerificationMethodSecton } from './VerificationMethodSecton'
import { ResultsErrors } from './ResultsErrors'
import { Theme } from '../Themes/Theme'
import { DidServiceEndpoint, DidUri, Did } from '@kiltprotocol/sdk-js'

interface Search {
  text: string
}
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  background-color: ${(props) => props.theme.searchbackground};
  align-items: center;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  align-items: center;
`
const SearchBarContainer = styled.div`
  display: flex;
  max-width: 740px;
  width: 90%;
  height: 32px;
  border-radius: 16px;
  background-color: ${(props) => props.theme.searchbar};
  box-shadow: inset 0 2px 2px 0 rgba(0, 0, 0, 0.35);
  padding-left: 10px;
`
const SearchBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 140px;
  height: 24px;
  border-radius: 15px;
  height: 22px;
  background-color: ${(props: Search) =>
    props.text.length < 3 ? 'grey' : Theme.light.searchbtn};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
  text-align: center;
  color: ${(props) => props.theme.searchbtntext};
  cursor: pointer;

  border-radius: 30px;
  font-size: 12px;
  border: none;
`
const SearchInput = styled.input`
  width: 67%;
  max-width: 537px;
  color: black;
  font-size: 14px;
  letter-spacing: 0.26px;
  line-height: 22px;
  background: transparent;
  border: none;
  :focus {
    outline: none;
  }
`

const SearchBtnWrapper = styled.div`
  display: flex;
  width: 30%;
  max-width: 140px;
  height: 32px;
  margin-left: auto;
  align-items: center;
  justify-content: flex-end;
  margin-right: 4px;
`
const EndpointsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 95%;
  max-width: 640px;
  height: fit-content;
`
const DidDocumentContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: flex-start;
  margin-top: 30px;
`
const SectionTitleSpan = styled.span`
  width: 95px;
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.1px;
  line-height: 22px;
  text-align: left;
`
const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 740px;
  width: 90%;
`

export const SearchComponent = () => {
  const [searchedText, setSearchedText] = useState<string>('')
  const [unclaimedName, setUnclaimedName] = useState<string>('')
  const [serviceEndpoints, setServiceEndpoints] = useState<
    DidServiceEndpoint[]
  >([])
  const [did, setDid] = useState<DidUri>()
  const [w3Name, setW3Name] = useState<string>('')
  const [errors, setErrors] = useState<
    | 'Not Claimed'
    | 'Max limit'
    | 'Invalid Chars'
    | 'Min limit'
    | 'Invalid Kilt'
    | null
  >(null)

  window.onpopstate = function () {
    setErrors(null)
    const path = window.location.pathname.split('/')[1]
    setSearchedText(path)
    if (searchedText.length) {
      if (serviceEndpoints.length) {
        setServiceEndpoints([])
        setDid(undefined)
        setW3Name('')
      }
      resolveDidDocument(path, false)
    }
  }
  const setDidDocumentFromDid = async (
    did: DidUri,
    shouldChangeUrl: boolean
  ) => {
    try {
      const didDocInstance = await getServiceEndpointsW3Name(did)
      setDid(did)
      if (didDocInstance) {
        setServiceEndpoints(didDocInstance.endpoints)
      }
      if (didDocInstance.web3name) {
        setW3Name('w3n:' + didDocInstance.web3name)
        replaceHistoryState(shouldChangeUrl, didDocInstance.web3name)
      } else {
        setW3Name('No web3name found')
      }
    } catch {
      setErrors('Invalid Kilt')
    }
  }
  const resolveDidDocument = useCallback(
    async (textFromSearch: string, shouldChangeUrl = true) => {
      pushHistoryState(shouldChangeUrl, textFromSearch)
      if (!textFromSearch.length) return
      if (textFromSearch.length < 3) {
        setErrors('Min limit')
        return
      }

      try {
        if (Did.Utils.validateKiltDidUri(textFromSearch)) {
          await setDidDocumentFromDid(textFromSearch, shouldChangeUrl)
          return
        }
        // throws if not valid Kilt DID, but could still be valid web3name
      } catch {
        textFromSearch = textFromSearch.toLocaleLowerCase()
        setSearchedText(textFromSearch)
        replaceHistoryState(shouldChangeUrl, textFromSearch)

        if (textFromSearch.length > 30) {
          setErrors('Max limit')
          return
        }

        if (stringStartsWithW3(textFromSearch)) {
          const name = textFromSearch.split(':').pop()
          if (name) {
            const didDocumentInstance = await getDidDocFromW3Name(name)
            if (didDocumentInstance) {
              setServiceEndpoints(didDocumentInstance.endpoints)
              setDid(didDocumentInstance.did)
              setW3Name('w3n:' + name)
              replaceHistoryState(shouldChangeUrl, name)
            } else {
              setUnclaimedName(name)
              setErrors('Not Claimed')
            }
          }
          return
        }
        if (!validSearchedText(textFromSearch)) {
          setErrors('Invalid Chars')
          return
        }

        const didDocumentInstance = await getDidDocFromW3Name(textFromSearch)
        if (didDocumentInstance) {
          setServiceEndpoints(didDocumentInstance.endpoints)
          setDid(didDocumentInstance.did)
          setW3Name('w3n:' + textFromSearch)
        } else {
          replaceHistoryState(shouldChangeUrl, textFromSearch)
          setUnclaimedName(textFromSearch)
          setErrors('Not Claimed')
        }
      }
    },
    []
  )

  const handleSearch = async () => {
    if (searchedText.length < 3) {
      return
    }
    setErrors(null)
    if (did) {
      setServiceEndpoints([])
      setDid(undefined)
      setW3Name('')
    }
    await resolveDidDocument(searchedText)
  }
  const handleKeypress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') handleSearch()
  }
  useEffect(() => {
    const path = window.location.pathname.split('/')[1]
    if (path !== '') {
      setSearchedText(path)
      resolveDidDocument(path)
    }
  }, [resolveDidDocument])
  return (
    <Container>
      <SearchContainer>
        <SearchBarContainer>
          <SearchInput
            type="input"
            value={searchedText}
            onKeyDown={handleKeypress}
            onInput={(e) =>
              setSearchedText((e.target as HTMLInputElement).value)
            }
            placeholder="Enter web3name or DID here"
          />

          <SearchBtnWrapper>
            <SearchBtn
              text={searchedText}
              onClick={() => handleSearch()}
              type="submit"
            >
              LOOK UP
            </SearchBtn>
          </SearchBtnWrapper>
        </SearchBarContainer>
      </SearchContainer>
      <ResultsErrors name={unclaimedName} errors={errors} />

      {did && (
        <ResultsContainer>
          <DidSection did={did} />
          <Web3Name web3Name={w3Name} />
          <DidDocumentContainer>
            {serviceEndpoints.length > 0 && (
              <SectionTitleSpan>Service</SectionTitleSpan>
            )}

            <EndpointsContainer>
              {serviceEndpoints.map(
                (serviceEndpoint: DidServiceEndpoint, index: number) => (
                  <ServiceEndpoint
                    key={serviceEndpoint.id}
                    endpointType={serviceEndpoint.types[0]}
                    endpointURL={serviceEndpoint.urls[0]}
                    did={did}
                  />
                )
              )}
            </EndpointsContainer>
          </DidDocumentContainer>
          <VerificationMethodSecton did={did} />
        </ResultsContainer>
      )}
    </Container>
  )
}
