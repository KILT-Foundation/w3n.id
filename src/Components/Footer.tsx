import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Kilt } from '../ImageAssets/Kilt.svg';

import Terms from '../DocAssets/w3n-id_Terms_2022.pdf';
import Privacy from '../DocAssets/w3n-id_PrivacyPolicy_2022.pdf';

import { ClaimW3Span } from './ClaimW3Span';

interface Toggle {
  handleImprint: React.MouseEventHandler<HTMLSpanElement>;
  handleTourSection: React.MouseEventHandler<HTMLButtonElement>;
}
const StyledFooter = styled.footer`
  background-color: ${(props) => props.theme.searchbackground};
  height: 35px;
  min-height: fit-content;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledFooterContainer = styled.div`
  height: 100px;
  min-height: fit-content;
  width: 100vw;
  display: flex;
  flex-direction: column;
  margin-top: auto;
  justify-content: center;
  align-items: center;
`;

const StyledFooterLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  max-width: 740px;
  align-items: flex-end;
  justify-content: center;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  text-align: left;
`;
const ImprintContainer = styled.div`
  width: 63px;
  display: flex;
  justify-content: flex-start;
  cursor: pointer;
  @media (max-width: 400px) {
    display: none;
  }
`;
const LinksContainer = styled.div`
  width: 80%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  text-align: right;
  gap: 4px;
  @media (max-width: 400px) {
    width: 100%;
  }
  @media (max-width: 300px) {
    font-size: 12px;
  }
  a {
    color: ${(props) => props.theme.text};
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`;
const TermsOfUseSpan = styled.span`
  @media (min-width: 450px) {
    ::after {
      content: ' Of Use';
    }
  }
`;
const PrivacyPolicySpan = styled.span`
  @media (min-width: 450px) {
    ::after {
      content: ' Policy';
    }
  }
`;
const TechnicalSupportSpan = styled.span`
  @media (min-width: 450px) {
    ::before {
      content: 'Technical ';
    }
  }
`;
const LogoContainer = styled.div`
  width: 103px;
  display: flex;
  height: 20px;
  justify-content: center;
  align-items: center;
  @media (max-width: 530px) {
    display: none;
  }
`;
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
`;
const LogoSvg = styled(Kilt)`
  fill: ${(props) => props.theme.text};
  height: 15px;
  width: 72px;
  margin-bottom: 2px;
`;
export const Footer = (props: Toggle) => {
  return (
    <StyledFooterContainer>
      <ClaimW3Span handleTourSection={props.handleTourSection} />
      <StyledFooter>
        <StyledFooterLinksContainer>
          <ImprintContainer>
            <span onClick={props.handleImprint}>Imprint</span>
          </ImprintContainer>
          <LinksContainer>
            <ImprintText onClick={props.handleImprint}>Imprint -</ImprintText>
            <a href={Terms} target="_blank" rel="noreferrer">
              <TermsOfUseSpan>Terms</TermsOfUseSpan>
            </a>
            <span>-</span>

            <a href={Privacy} target="_blank" rel="noreferrer">
              <PrivacyPolicySpan>Privacy</PrivacyPolicySpan>
            </a>
            <span>-</span>
            <a
              href="https://support.kilt.io/support/home"
              target="_blank"
              rel="noreferrer"
            >
              <TechnicalSupportSpan>Support</TechnicalSupportSpan>
            </a>
          </LinksContainer>
          <LogoContainer>
            <LogoSvg />
          </LogoContainer>
        </StyledFooterLinksContainer>
      </StyledFooter>
    </StyledFooterContainer>
  );
};
