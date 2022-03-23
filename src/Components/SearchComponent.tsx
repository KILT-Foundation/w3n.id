import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getServiceEndpoints, isSearchedTextDid } from '../Utils/search-helpers'
import { DidDocument } from './DidDocument'
import { DidSection } from './DidSection'
import { Web3Name } from './Web3NameSection'
import { colors } from './Colors/colors'

import { VerificationMethodSecton } from './VerificationMethodSecton'

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  background-color: ${colors.lightgray};
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
const SearchDiv = styled.div`
  display: flex;
  max-width: 740px;
  width: 90%;
  height: 32px;
  border-radius: 16px;
  background-color: ${colors.darkgrey};
  box-shadow: inset 0 2px 2px 0 rgba(0, 0, 0, 0.35);
  padding-left: 10px;
`
const SearchBtn = styled.button`
  width: 90%;
  max-width: 140px;
  height: 24px;
  border-radius: 15px;
  height: 22px;
  background-color: ${colors.yellow};
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
  text-align: center;
  color: ${colors.searchBtnText};
  @media (prefers-color-scheme: dark) {
    background-color: white;
    color: black;
  }

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
  @media (prefers-color-scheme: dark) {
    color: white;
  }
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
  const [endpointTypes, setEndpointTypes] = useState<string[]>([])
  const [endpointURLs, setEndpointURLs] = useState<string[]>([])
  const [endpointIds, setEndpointIds] = useState<string[]>([])
  const [did, setDid] = useState<string>('')
  const [w3Name, setW3Name] = useState<string>('')

  const handleSearch = async () => {
    if (endpointIds.length) {
      return
    }
    if (isSearchedTextDid(searchedText)) {
      const endPoints = await getServiceEndpoints(searchedText)
      if (endPoints != null) {
        setEndpointIds(endPoints.ids)
        setEndpointTypes(endPoints.types)
        setEndpointURLs(endPoints.urls)
        setDid(searchedText)
        if (endPoints.web3name !== null) {
          setW3Name(endPoints.web3name)
        }
      }
    }
  }
  useEffect(() => {
    if (searchedText === '') {
      setEndpointIds([])
      setEndpointTypes([])
      setEndpointURLs([])
      setDid('')
    }
  }, [searchedText])
  return (
    <Container>
      <SearchContainer>
        <SearchDiv>
          <SearchInput
            type="search"
            value={searchedText}
            onInput={(e) =>
              setSearchedText((e.target as HTMLInputElement).value)
            }
            placeholder="Type DID or W3Name"
          />

          <SearchBtnWrapper>
            <SearchBtn onClick={() => handleSearch()}>LOOK UP</SearchBtn>
          </SearchBtnWrapper>
        </SearchDiv>
      </SearchContainer>
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
