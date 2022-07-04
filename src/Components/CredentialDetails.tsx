import { IClaimContents } from '@kiltprotocol/sdk-js';
import styled from 'styled-components';

import { ReactComponent as OkIcon } from '../ImageAssets/icon_oK.svg';
import { stringStartsWithW3 } from '../Utils/w3n-helpers';

const Container = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  gap: 20px;
`;
const CredentialContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  flex-wrap: wrap;
  width: 100%;
  gap: 10px;
  margin-top: 20px;
`;
const CredentialSpan = styled.span`
  display: block;
  font-family: 'Overpass';
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
  width: 80%;
  max-width: 400px;
  word-break: break-all;
`;
const CredentialTitle = styled.span`
  max-width: 100px;
  width: 20%;
  font-family: 'Overpass';
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
  text-align: left;
`;
interface Props {
  credential: {
    contents: IClaimContents;
    attester: string;
  };
}
export const CredentialDetails = ({ credential }: Props) => {
  const { contents, attester } = credential;

  return (
    <CredentialContainer>
      {Object.keys(contents).map((key) => (
        <Container key={key}>
          <CredentialTitle>{key}</CredentialTitle>
          <CredentialSpan>{contents[key]}</CredentialSpan>
        </Container>
      ))}
      <Container>
        <CredentialTitle>
          {stringStartsWithW3(attester) ? 'Attester' : 'Attester DID'}
        </CredentialTitle>
        <CredentialSpan>{attester}</CredentialSpan>
      </Container>
      <Container>
        <CredentialTitle>Valid</CredentialTitle>
        <CredentialSpan>
          <OkIcon />
        </CredentialSpan>
      </Container>
    </CredentialContainer>
  );
};
