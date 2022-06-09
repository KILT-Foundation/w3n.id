import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Logo } from '../ImageAssets/w3n_logo.svg'
import { ReactComponent as DarkModeSwitch } from '../ImageAssets/switch2dark.svg'
import { ReactComponent as LightModeSwitch } from '../ImageAssets/switch2light.svg'
import { ReactComponent as Open } from '../ImageAssets/chevron_down_white.svg'
import { TakeTourSection } from '../Components/TakeTourSection'

interface Toggle {
  handleTheme: React.MouseEventHandler<HTMLDivElement>
  handleTourSection: React.MouseEventHandler<HTMLButtonElement>
  tourSection: boolean
  theme: 'light' | 'dark'
}
interface Style {
  rotate: string
}

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.header};
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
  max-width: 130px;
  gap: 5px;
  color: ${(props) => props.theme.headertext};
  width: 85%;
  height: 26px;
  background-color: ${(props) => props.theme.headersecondary};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: none;
  cursor: pointer;
  @media (max-width: 350px) {
    justify-content: flex-start;
  }
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
  transform: rotate(${(props: Style) => props.rotate});
  margin-top: 2px;
`

export const Header = (props: Toggle) => {
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
          <TourBtn onClick={props.handleTourSection}>
            {!props.tourSection ? 'Take the tour' : 'Close'}
            <OpenSvg rotate={!props.tourSection ? '0deg' : '180deg'} />
          </TourBtn>
        </TourBtnWrapper>
      </TopHeaderContainer>
      <HeaderTextLabel>
        <HeaderText>Look up web3names* or DIDs here</HeaderText>
      </HeaderTextLabel>
      <TakeTourSection isOpen={props.tourSection} />

      <BottomHeaderSeperator />
    </StyledHeader>
  )
}
