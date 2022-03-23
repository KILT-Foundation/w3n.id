import React from 'react'
import styled from 'styled-components'
import { colors } from './Colors/colors'
import logo from '../ImageAssets/w3n_logo.svg'

const StyledHeader = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  height: 96px;
  width: 100vw;
`
const LogoWrapper = styled.div`
  display: flex;
  max-width: 740px;
  width: 90%;
  margin: auto;
  justify-content: flex-start;
  align-items: center;
  height: 74px;
`

const HeaderTextLabel = styled.div`
  background-color: ${colors.babypink};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 24px;
`
const HeaderText = styled.span`
  max-width: 740px;
  width: 90%;
  color: ${colors.textwhite};
  font-family: Overpass;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
`
const BottomHeaderSeperator = styled.div`
  background-color: ${colors.darkgrey};
  width: 100%;
  height: 9px;
`
export const Header = () => {
  return (
    <StyledHeader>
      <LogoWrapper>
        <img src={logo} alt={'Not Found'} />
      </LogoWrapper>
      <HeaderTextLabel>
        <HeaderText>Look up web3names* or DIDs here</HeaderText>
      </HeaderTextLabel>
      <BottomHeaderSeperator />
    </StyledHeader>
  )
}
