import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getServiceEndpoints, isSearchedTextDid } from '../Utils/search-helpers'
import { DidDocument } from './DidDocument'
import { DidSection } from './DidSection'
import { VerificationMethodSecton } from './VerificationMethodSecton'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 766px;
  align-items: center;
  height: fit-content;
  margin-top: 100px;
  margin-bottom: 50px;
`
const SearchDiv = styled.div`
  display: flex;

  width: 100%;
  height: 30px;
  border: solid;
  border-color: black;
  border-radius: 30px;
  padding-left: 10px;
`
const SearchBtn = styled.button`
  width: 90%;
  max-width: 160px;
  height: 22px;
  background-color: black;
  color: white;
  border-radius: 30px;
  font-size: 12px;
  border: none;
`
const SearchInput = styled.input`
  width: 70%;
  max-width: 600px;
  font-size: 15px;
  font-weight: bold;
  color: black;
  background: transparent;
  border: none;
  :focus {
    outline: none;
  }
`

const SearchBtnWrapper = styled.div`
  display: flex;
  width: 30%;
  max-width: 160px;
  height: 28px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`
const EndpointsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 90%;
  height: fit-content;
`
const DidDocumentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
`
const SectionTitleSpan = styled.span`
  width: 100px;
  font-size: 16px;
  font-weight: bold;
  color: black;
  margin-top: 15px;
  text-align: left;
`

export const SearchComponent = () => {
  const [searchedText, setSearchedText] = useState<string>('')
  const [endpointTypes, setEndpointTypes] = useState<string[]>([])
  const [endpointURLs, setEndpointURLs] = useState<string[]>([])
  const [endpointIds, setEndpointIds] = useState<string[]>([])
  const [did, setDid] = useState<string>('')

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
      <SearchDiv>
        <SearchInput
          type="search"
          value={searchedText}
          onInput={(e) => setSearchedText((e.target as HTMLInputElement).value)}
          placeholder="Type DID or W3Name"
        />

        <SearchBtnWrapper>
          <SearchBtn onClick={() => handleSearch()}>LOOK UP</SearchBtn>
        </SearchBtnWrapper>
      </SearchDiv>
      <DidSection did={did} />
      <DidDocumentContainer>
        {endpointTypes.length > 0 && (
          <SectionTitleSpan>Service</SectionTitleSpan>
        )}
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
      {endpointTypes.length > 0 && <VerificationMethodSecton />}
    </Container>
  )
}
