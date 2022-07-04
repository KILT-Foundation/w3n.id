import React from 'react';
import styled from 'styled-components';

import { CopyToClipboard } from './CopyToClipboard';

interface Props {
  did: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 740px;
  width: 90%;
  align-items: flex-start;
  justify-content: flex-start;
  height: fit-content;
  margin-top: 50px;
`;
const DidTitle = styled.span`
  max-width: 100px;
  width: 20%;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.1px;
  line-height: 22px;
  text-align: left;
`;
const DidSpan = styled.span`
  display: flex;
  justify-content: start;
  word-break: break-all;
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
`;
const DidContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  min-width: 250px;
  gap: 7px;
`;

export const DidSection = (props: Props) => {
  if (props.did === '') return null;
  return (
    <Container>
      <DidTitle>DID</DidTitle>
      <DidContainer>
        <DidSpan>{props.did}</DidSpan>
        <CopyToClipboard text={props.did} />
      </DidContainer>
    </Container>
  );
};
