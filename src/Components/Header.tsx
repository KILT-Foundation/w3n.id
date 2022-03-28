import React, { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as Logo } from '../ImageAssets/w3n_logo.svg'
import { ReactComponent as DarkModeSwitch } from '../ImageAssets/switch2dark.svg'
import { ReactComponent as LightModeSwitch } from '../ImageAssets/switch2light.svg'
import { ReactComponent as Open } from '../ImageAssets/chevron_down_white.svg'
import { TakeTourSection } from '../Components/TakeTourSection'

interface Toggle {
  handleTheme: React.MouseEventHandler<HTMLDivElement>
  theme: 'light' | 'dark'
}
interface Style {
  rotate: string
}
const StyledHeader = styled.div`
  background-color: ${(props) => props.theme.searchbackground};
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 100vw;
  position: relative;
`
const LogoWrapper = styled.div`
  display: flex;
  max-width: 340px;
  width: 90%;
  justify-content: flex-start;
  align-items: center;
  height: 74px;
`
const TopHeaderContainer = styled.div`
  display: flex;
  max-width: 740px;
  width: 90%;
  justify-content: center;
  align-items: flex-end;
  height: 74px;
  margin: auto;
`
const TourBtnWrapper = styled.div`
  display: flex;
  width: 320px;
  width: 90%;
  margin: auto;
  justify-content: flex-end;
  align-items: flex-end;
  height: 74px;
`
const TourBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 140px;
  color: ${(props) => props.theme.headertext};
  width: 70%;
  height: 26px;
  background-color: ${(props) => props.theme.headersecondary};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: none;
`
const HeaderTextLabel = styled.div`
  background-color: ${(props) => props.theme.headersecondary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 24px;
`

const HeaderText = styled.span`
  max-width: 740px;
  width: 90%;
  color: ${(props) => props.theme.headertext};
  font-family: Overpass;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
`
const BottomHeaderSeperator = styled.div`
  background-color: ${(props) => props.theme.headerbottom};
  width: 100%;
  height: 9px;
`
const LogoSvg = styled(Logo)`
  fill: ${(props) => props.theme.text};
`
const ThemeSwitch = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 20px;
  position: absolute;
  right: 30px;
  top: 25px;
  height: fit;
  cursor: pointer;
`
const OpenSvg = styled(Open)`
  fill: ${(props) => props.theme.headertext};
  cursor: pointer;
  position: absolute;
  right: 18px;
  top: 12px;
  transform: rotate(${(props: Style) => props.rotate});
`

export const Header = (props: Toggle) => {
  const [tourSection, setTourSection] = useState<'Open' | 'Close'>('Close')
  const handleClick = () => {
    if (tourSection === 'Open') setTourSection('Close')
    else setTourSection('Open')
  }

  return (
    <StyledHeader>
      <ThemeSwitch>
        <div onClick={props.handleTheme}>
          {props.theme === 'light' ? <DarkModeSwitch /> : <LightModeSwitch />}
        </div>
      </ThemeSwitch>
      <TopHeaderContainer>
        <LogoWrapper>
          <LogoSvg />
        </LogoWrapper>
        <TourBtnWrapper>
          <TourBtn onClick={() => handleClick()}>
            How to?
            <OpenSvg rotate={tourSection === 'Close' ? '0deg' : '180deg'} />
          </TourBtn>
        </TourBtnWrapper>
      </TopHeaderContainer>
      <HeaderTextLabel>
        <HeaderText>Look up web3names* or DIDs here</HeaderText>
      </HeaderTextLabel>
      {tourSection === 'Open' && <TakeTourSection />}
      <BottomHeaderSeperator />
    </StyledHeader>
  )
}
