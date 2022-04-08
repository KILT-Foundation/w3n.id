import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Kilt } from '../ImageAssets/Kilt.svg'
import { ClaimW3Span } from './ClaimW3Span'

interface Toggle {
  handleImprint: React.MouseEventHandler<HTMLSpanElement>
}
const StyledFooter = styled.div`
  background-color: ${(props) => props.theme.searchbackground};
  height: 35px;
  min-height: fit-content;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledFooterContainer = styled.div`
  height: 100px;
  min-height: fit-content;
  width: 100vw;
  display: flex;
  flex-direction: column;
  margin-top: auto;
  justify-content: center;
  align-items: center;
`

const StyledFooterLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  max-width: 740px;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  text-align: left;
`
const ImprintContainer = styled.div`
  width: 63px;
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
  @media (max-width: 400px) {
    display: none;
  }
`
const LinksContainer = styled.div`
  width: 80%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  gap: 4px;
  @media (max-width: 400px) {
    width: 100%;
  }
  @media (max-width: 300px) {
    font-size: 12px;
  }
`
const LogoContainer = styled.div`
  width: 103px;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 400px) {
    display: none;
  }
`
const ImprintText = styled.span`
  display: none;
  justify-content: center;
  align-items: center;
  width: fit-content;
  gap: 4px;
  display: none;
  cursor: pointer;
  @media (max-width: 400px) {
    display: flex;
  }
`
const LogoSvg = styled(Kilt)`
  fill: ${(props) => props.theme.text};
`
export const Footer = (props: Toggle) => {
  return (
    <StyledFooterContainer>
      <ClaimW3Span />
      <StyledFooter>
        <StyledFooterLinksContainer>
          <ImprintContainer>
            <span onClick={props.handleImprint}>Imprint</span>
          </ImprintContainer>
          <LinksContainer>
            <ImprintText onClick={props.handleImprint}>Imprint -</ImprintText>
            <span>Terms of Use</span>
            <span>-</span>

            <span>Privacy</span>
            <span>-</span>
            <span>Support</span>
          </LinksContainer>
          <LogoContainer>
            <LogoSvg />
          </LogoContainer>
        </StyledFooterLinksContainer>
      </StyledFooter>
    </StyledFooterContainer>
  )
}
