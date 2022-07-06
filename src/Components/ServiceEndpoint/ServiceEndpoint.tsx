import { useCallback, useState } from 'react';
import {
  Credential,
  RequestForAttestation,
  Did,
  IRequestForAttestation,
  Attestation,
  IClaimContents,
  DidUri,
} from '@kiltprotocol/sdk-js';

import styles from './ServiceEndpoint.module.css';

import { validateCredential } from '../../Utils/w3n-helpers';
import { ReactComponent as Chevron } from '../../ImageAssets/chevron_down_white.svg';
import { ReactComponent as Loader } from '../../ImageAssets/oval.svg';

import { CopyToClipboard } from '../CopyToClipboard/CopyToClipboard';
import { CredentialErrors } from '../CredentialErrors/CredentialErrors';
import { CredentialDetails } from '../CredentialDetails/CredentialDetails';

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
    <div>
      <span className={styles.type}>{endpointType}</span>

      <div className={styles.endpoint}>
        <div className={styles.urlContainer}>
          <span className={styles.url}>{endpointURL}</span>
          <CopyToClipboard text={endpointURL} />
        </div>

        {!credential && !error && (
          <button className={styles.button} onClick={handleFetch}>
            {fetching && <Loader className={styles.loader} />}
            Fetch
            <Chevron className={styles.open} />
          </button>
        )}

        {(credential || error) && (
          <button className={styles.button} onClick={handleClose}>
            Close
            <Chevron className={styles.close} />
          </button>
        )}
      </div>

      {credential && !error && <CredentialDetails credential={credential} />}

      {error && <CredentialErrors error={error} />}
      <div className={styles.seperator} />
    </div>
  );
};
