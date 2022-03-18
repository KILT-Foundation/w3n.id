import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.div`
  background-color: black;
  height: 35px;
  width: 100vw;
  display: flex;
  margin-top: auto;
  justify-content: center;
  align-items: center;
`
const StyledFooterLinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  gap: 2px;
`
export const Footer = () => {
  return (
    <StyledFooter>
      <StyledFooterLinksWrapper>
        <span>Imprint</span>
        <span>-</span>
        <span>Terms and Conditions</span>
        <span>-</span>

        <span>Privacy Policy</span>
      </StyledFooterLinksWrapper>
    </StyledFooter>
  )
}
