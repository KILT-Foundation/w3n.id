import React from 'react'
import styled from 'styled-components'
interface Style {
  setMargin?: boolean
}
interface Toggle {
  handleCloseImprint: React.MouseEventHandler<HTMLSpanElement>
}
const Container = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  height: 480px;
  position: fixed;
  bottom: 113px;
  z-index: 40;
`
const ImprintContainer = styled.div`
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  background-color: ${(props) => props.theme.body};
  flex-direction: column;
  word-break: break-all;
  height: 472px;
  max-width: 484px;
  width: 90%;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.text};
  gap: 2px;
  border: 2px solid ${(props) => props.theme.btnborder};
  border-radius: 8px;
`
const ClaimW3NSteps = styled.span`
  word-break: break-all;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
  margin-bottom: ${(props: Style) => props.setMargin && '15px'};
  a {
    color: ${(props) => props.theme.web3name};
  }
`
const OkBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 140px;
  border: 2px solid ${(props) => props.theme.btnborder};
  border-radius: 15px;
  background-color: ${(props) => props.theme.fetchbackground};
  margin-top: 30px;
  color: ${(props) => props.theme.text};
`
export const ImprintPopup = (props: Toggle) => {
  return (
    <Container>
      <ImprintContainer>
        <ClaimW3NSteps setMargin>Imprint</ClaimW3NSteps>
        <ClaimW3NSteps>B.T.E. BOTLabs Trusted Entity GmbH</ClaimW3NSteps>
        <ClaimW3NSteps>Keithstraße 2-4</ClaimW3NSteps>
        <ClaimW3NSteps>10787 Berlin, Germany</ClaimW3NSteps>
        <ClaimW3NSteps>
          Germany Commercial Court: Amtsgericht Charlottenburg in Berlin
        </ClaimW3NSteps>
        <ClaimW3NSteps>Registration Number: HRB 231219B</ClaimW3NSteps>
        <ClaimW3NSteps>VAT No: DE 346528612</ClaimW3NSteps>
        <ClaimW3NSteps>Managing Director: Ingo Rübe</ClaimW3NSteps>
        <ClaimW3NSteps>
          Contact: <a href="mailto:info@botlabs.org">info@botlabs.org</a>
        </ClaimW3NSteps>
        <ClaimW3NSteps setMargin>
          Or go to{' '}
          <a
            href="https://support.kilt.io/support/home"
            target="_blank"
            rel="noreferrer"
          >
            {' '}
            Tech Support{' '}
          </a>{' '}
          and click on “Contact Us”
        </ClaimW3NSteps>
        <ClaimW3NSteps>
          Requirements according to § 5 TMG (Germany)
        </ClaimW3NSteps>
        <OkBtn onClick={props.handleCloseImprint}>OK</OkBtn>
      </ImprintContainer>
    </Container>
  )
}
