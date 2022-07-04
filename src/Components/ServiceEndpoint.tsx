import { useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  Credential,
  RequestForAttestation,
  Did,
  IRequestForAttestation,
  Attestation,
  IClaimContents,
  DidUri,
} from '@kiltprotocol/sdk-js';

import { validateCredential } from '../Utils/w3n-helpers';
import { ReactComponent as Open } from '../ImageAssets/chevron_down_white.svg';
import { ReactComponent as Loader } from '../ImageAssets/oval.svg';

import { CopyToClipboard } from './CopyToClipboard';
import { CredentialErrors } from './CredentialErrors';
import { CredentialDetails } from './CredentialDetails';

interface Style {
  rotate: string;
}

const EndpointContainer = styled.div`
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  width: 100%;
`;
const EndpointTypeSpan = styled.span`
  overflow-wrap: break-word;
  font-family: 'Overpass';
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0.1px;
  line-height: 22px;
  margin-top: 10px;
`;
const Button = styled.button`
  display: inline-flex;
  cursor: pointer;
  font-family: 'Overpass';
  text-transform: uppercase;
  position: relative;
  color: ${(props) => props.theme.web3name};
  font-size: 14px;
  letter-spacing: 0.1px;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 140px;
  border: 2px solid ${(props) => props.theme.btnborder};
  border-radius: 15px;
  background-color: ${(props) => props.theme.fetchbackground};
`;
const EndpointURLSpan = styled.span`
  display: block;
  font-family: 'Overpass';
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 22px;
  width: 90%;
  max-width: 400px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const UrlContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  width: 95%;
  max-width: 500px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Seperator = styled.div`
  border: 1px dashed ${(props) => props.theme.seperator};
  margin-top: 18px;
  width: 100%;
  opacity: 0.5;
`;

const OpenSvg = styled(Open)`
  fill: ${(props) => props.theme.btnborder};
  cursor: pointer;
  position: absolute;
  right: 12px;
  top: 6px;
  transform: rotate(${(props: Style) => props.rotate});
`;
const LoaderSvg = styled(Loader)`
  stroke: ${(props) => props.theme.btnborder};
  position: absolute;
  left: 12px;
  top: 3px;
  height: 13px;
  width: 20px;
`;

class ExplicitError extends Error {}

interface Props {
  endpointType: string;
  endpointURL: string;
  did: DidUri;
}

export const ServiceEndpoint = ({ did, endpointType, endpointURL }: Props) => {
  const [fetching, setFetching] = useState(false);

  const [credential, setCredential] = useState<{
    contents: IClaimContents;
    attester: string;
  }>();

  const [error, setError] = useState<string>();

  const handleFetch = useCallback(async () => {
    setFetching(true);

    try {
      const response = await fetch(endpointURL);
      const json = await response.json();

      let request: IRequestForAttestation | undefined;
      let attestation: Attestation | undefined;

      if (Credential.isICredential(json)) {
        request = json.request;
        attestation = Attestation.fromAttestation(json.attestation);
      }

      if (RequestForAttestation.isIRequestForAttestation(json)) {
        const attestationForRequest = await Attestation.query(json.rootHash);
        if (!attestationForRequest) {
          throw new ExplicitError('No Attestation found for credential');
        }
        request = json;
        attestation = attestationForRequest;
      }

      if (!request || !attestation) {
        throw new ExplicitError('Not valid Kilt Credential');
      }

      if (!Did.Utils.isSameSubject(request.claim.owner, did)) {
        throw new ExplicitError(
          'Credential subject and signer DID are not the same',
        );
      }

      if (!(await validateCredential({ attestation, request }))) {
        throw new ExplicitError('Invalid credential');
      }

      if (attestation.revoked) {
        throw new ExplicitError('Credential attestation revoked');
      }

      const web3name = await Did.Web3Names.queryWeb3NameForDid(
        attestation.owner,
      );
      const attester = web3name ? `w3n:${web3name}` : attestation.owner;

      setCredential({ contents: request.claim.contents, attester });
    } catch (exception) {
      setError(
        exception instanceof ExplicitError
          ? exception.message
          : 'Cannot fetch the credentials from the given endpoint',
      );
    } finally {
      setFetching(false);
    }
  }, [endpointURL, did]);

  const handleClose = useCallback(() => {
    setError(undefined);
    setCredential(undefined);
  }, []);

  return (
    <Container>
      <EndpointTypeSpan>{endpointType}</EndpointTypeSpan>

      <EndpointContainer>
        <UrlContainer>
          <EndpointURLSpan>{endpointURL}</EndpointURLSpan>
          <CopyToClipboard text={endpointURL} />
        </UrlContainer>

        {!credential && !error && (
          <Button onClick={handleFetch}>
            {fetching && <LoaderSvg />}
            Fetch
            <OpenSvg rotate="0deg" />
          </Button>
        )}

        {(credential || error) && (
          <Button onClick={handleClose}>
            Close
            <OpenSvg rotate="180deg" />
          </Button>
        )}
      </EndpointContainer>

      {credential && !error && <CredentialDetails credential={credential} />}

      {error && <CredentialErrors error={error} />}
      <Seperator />
    </Container>
  );
};
