import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.div`
  background-color: black;
  display: flex;
  flex-direction: column;
  height: 96px;
  width: 100vw;
`
export const Header = () => {
  return <StyledHeader></StyledHeader>
}
