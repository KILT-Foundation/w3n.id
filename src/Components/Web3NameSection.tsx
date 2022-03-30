import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as Copy } from '../ImageAssets/copy2clipboard_light.svg'
import { ReactComponent as Copied } from '../ImageAssets/copied.svg'

interface Props {
  web3Name: string
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
  margin-top: 20px;
`
const W3NameTitle = styled.span`
  width: 100px;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.1px;
  line-height: 22px;
  text-align: left;
  height: 31px;
  display: flex;
  align-items: center;
`
const W3NameText = styled.span`
  display: flex;
  justify-content: start;
  align-items: flex-start;
  font-size: 24px;
  letter-spacing: 0.17px;
  line-height: 37px;
  color: ${(props) => props.theme.web3name};
`
const W3NameContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 350px;
  gap: 7px;
`
const CopySvg = styled(Copy)`
  fill: ${(props) => props.theme.btnborder};
  cursor: pointer;
`
const CopiedSvg = styled(Copied)`
  stroke: ${(props) => props.theme.btnborder};
  width: 22px;
  height: 22px;
`
export const Web3Name = (props: Props) => {
  const [copied, setCopied] = useState<boolean>(false)
  const handleCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(props.web3Name)
  }

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 1000)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [copied])
  if (props.web3Name === '') {
    return null
  }

  return (
    <Container>
      <W3NameTitle>web3name</W3NameTitle>
      <W3NameContainer>
        <W3NameText>{props.web3Name}</W3NameText>
        {copied ? <CopiedSvg /> : <CopySvg onClick={() => handleCopy()} />}
      </W3NameContainer>
    </Container>
  )
}
