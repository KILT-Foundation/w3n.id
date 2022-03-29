import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.div`
  background-color: ${(props) => props.theme.searchbackground};
  height: 35px;
  min-height: fit-content;
  width: 100vw;
  display: flex;
  margin-top: auto;
  justify-content: center;
  align-items: center;
`
const StyledFooterLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  max-width: 766px;
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
  @media (max-width: 400px) {
    display: flex;
  }
`
export const Footer = () => {
  return (
    <StyledFooter>
      <StyledFooterLinksContainer>
        <ImprintContainer>
          <span>Imprint</span>
        </ImprintContainer>
        <LinksContainer>
          <ImprintText>Imprint -</ImprintText>
          <span>Terms of Use</span>
          <span>-</span>

          <span>Privacy</span>
          <span>-</span>
          <span>Support</span>
        </LinksContainer>
        <LogoContainer>
          <span>Built on KILT</span>
        </LogoContainer>
      </StyledFooterLinksContainer>
    </StyledFooter>
  )
}
