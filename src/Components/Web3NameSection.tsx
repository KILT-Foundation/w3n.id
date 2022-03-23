import React from 'react'
import styled from 'styled-components'
import { colors } from './Colors/colors'

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
  min-width: 300px;
  font-size: 24px;
  letter-spacing: 0.17px;
  line-height: 37px;
  color: ${colors.hotpink};
`
export const Web3Name = (props: Props) => {
  if (props.web3Name === '') return null
  return (
    <Container>
      <W3NameTitle>web3name</W3NameTitle>
      <W3NameText>{'w3n:' + props.web3Name}</W3NameText>
    </Container>
  )
}
