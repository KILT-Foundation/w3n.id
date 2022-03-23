import React from 'react'
import styled from 'styled-components'
import { colors } from './Colors/colors'

const StyledFooter = styled.div`
  background-color: ${colors.lightgray};
  height: 35px;
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
  color: ${colors.textblack};
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  text-align: left;
`
const ImprintContainer = styled.div`
  width: 63px;
  display: flex;
  justify-content: flex-start;
`
const LinksContainer = styled.div`
  width: 80%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  gap: 4px;
`
const LogoContainer = styled.div`
  width: 103px;
  display: flex;
  justify-content: flex-end;
`
export const Footer = () => {
  return (
    <StyledFooter>
      <StyledFooterLinksContainer>
        <ImprintContainer>
          <span>Imprint</span>
        </ImprintContainer>
        <LinksContainer>
          <span>Terms and Conditions</span>
          <span>-</span>

          <span>Privacy Policy</span>
          <span>-</span>
          <span>Tech Support</span>
        </LinksContainer>
        <LogoContainer>
          <span>Built on KILT</span>
        </LogoContainer>
      </StyledFooterLinksContainer>
    </StyledFooter>
  )
}
