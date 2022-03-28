import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  getDidDocFromW3Name,
  getServiceEndpoints,
  invalidSearchedText,
  isSearchedTextDid,
  isSearchedTextKiltDid,
} from '../Utils/search-helpers'
import { DidDocument } from './DidDocument'
import { DidSection } from './DidSection'
import { Web3Name } from './Web3NameSection'
import { VerificationMethodSecton } from './VerificationMethodSecton'
import { ResultsErrors } from './ResultsErrors'

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
  width: 90%;
  max-width: 140px;
  height: 24px;
  border-radius: 15px;
  height: 22px;
  background-color: ${(props) => props.theme.searchbtn};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
  text-align: center;
  color: ${(props) => props.theme.searchbtntext};
  cursor: pointer;

  border-radius: 30px;
  font-size: 12px;
  border: none;
  :active {
    background-color: green;
  }
`
const SearchInput = styled.input`
  width: 67%;
  max-width: 537px;
  color: black;
  font-size: 14px;
  letter-spacing: 0.26px;
  line-height: 22px;
  background: transparent;
  text-transform: lowercase;
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
  const [endpointTypes, setEndpointTypes] = useState<string[]>([])
  const [endpointURLs, setEndpointURLs] = useState<string[]>([])
  const [endpointIds, setEndpointIds] = useState<string[]>([])
  const [did, setDid] = useState<string>('')
  const [w3Name, setW3Name] = useState<string>('')
  const [errors, setErrors] = useState<
    | 'Not Claimed'
    | 'Max limit'
    | 'Invalid Chars'
    | 'Min limit'
    | 'Invalid Kilt'
    | null
  >(null)
  const resolveDidDocument = useCallback(async (textFromSearch: string) => {
    if (textFromSearch.length < 3) {
      setErrors('Min limit')
      return
    }
    if (isSearchedTextDid(textFromSearch)) {
      if (!isSearchedTextKiltDid(textFromSearch)) {
        setErrors('Invalid Kilt')
        return
      }
      const endPoints = await getServiceEndpoints(textFromSearch)
      if (endPoints != null) {
        setEndpointIds(endPoints.ids)
        setEndpointTypes(endPoints.types)
        setEndpointURLs(endPoints.urls)
        setDid(textFromSearch)
        if (endPoints.web3name !== null) {
          setW3Name('w3n:' + endPoints.web3name)
          const url = window.location.origin + '/' + endPoints.web3name
          window.history.pushState({ path: url }, '', url)
        }
      }
      return
    }
    if (textFromSearch.length > 30) {
      setErrors('Max limit')
      return
    }

    if (textFromSearch.split(':').slice(0, -1).includes('w3n')) {
      const name = textFromSearch.split(':').pop()
      if (name !== undefined) {
        const didDoc = await getDidDocFromW3Name(name)
        if (didDoc !== null) {
          setEndpointIds(didDoc.ids)
          setEndpointTypes(didDoc.types)
          setEndpointURLs(didDoc.urls)
          setDid(didDoc.did)
          setW3Name('w3n:' + name)
        }
      }
      return
    }
    if (invalidSearchedText(textFromSearch)) {
      setErrors('Invalid Chars')
      return
    }

    const didDoc = await getDidDocFromW3Name(textFromSearch)
    if (didDoc !== null) {
      setEndpointIds(didDoc.ids)
      setEndpointTypes(didDoc.types)
      setEndpointURLs(didDoc.urls)
      setDid(didDoc.did)
      setW3Name('w3n:' + textFromSearch)
    } else {
      setUnclaimedName(textFromSearch)
      setErrors('Not Claimed')
    }
  }, [])

  const handleSearch = async () => {
    setErrors(null)
    if (endpointIds.length) {
      setEndpointIds([])
      setEndpointTypes([])
      setEndpointURLs([])
      setDid('')
      setW3Name('')
    }
    await resolveDidDocument(searchedText)
  }
  const handleKeypress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') handleSearch()
  }
  useEffect(() => {
    const host = window.location.host
    console.log(host)
    const arr = host.split('.').slice(0, host.includes('localhost') ? -1 : -2)
    const path = window.location.pathname.split('/')[1]
    if (arr.length > 0) {
      setSearchedText(arr[0])
      resolveDidDocument(arr[0])
    } else {
      if (path !== '') {
        setSearchedText(path)

        resolveDidDocument(path)
      }
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
            placeholder="Type DID or W3Name"
          />

          <SearchBtnWrapper>
            <SearchBtn onClick={() => handleSearch()} type="submit">
              LOOK UP
            </SearchBtn>
          </SearchBtnWrapper>
        </SearchBarContainer>
      </SearchContainer>
      <ResultsErrors name={unclaimedName} errors={errors} />

      {endpointTypes.length > 0 && (
        <ResultsContainer>
          <DidSection did={did} />
          <Web3Name web3Name={w3Name} />
          <DidDocumentContainer>
            <SectionTitleSpan>Service</SectionTitleSpan>

            <EndpointsContainer>
              {endpointURLs.map((url: string, index: number) => (
                <DidDocument
                  key={endpointIds[index]}
                  endpointType={endpointTypes[index]}
                  endpointURL={url}
                  did={did}
                />
              ))}
            </EndpointsContainer>
          </DidDocumentContainer>
          <VerificationMethodSecton did={did} />
        </ResultsContainer>
      )}
    </Container>
  )
}
