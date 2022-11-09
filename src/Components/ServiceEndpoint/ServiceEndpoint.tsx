import { useCallback, useRef, useState } from 'react';
import {
  Attestation,
  Credential,
  Did,
  DidServiceEndpoint,
  DidUri,
  IClaimContents,
  ICredential,
} from '@kiltprotocol/sdk-js';

import * as styles from './ServiceEndpoint.module.css';

import { CopyToClipboard } from '../CopyToClipboard/CopyToClipboard';
import { CredentialErrors } from '../CredentialErrors/CredentialErrors';
import { CredentialDetails } from '../CredentialDetails/CredentialDetails';
import { useHandleOutsideClick } from '../../Hooks/useHandleOutsideClick';
import { apiPromise } from '../../Utils/claimWeb3name-helpers';

class ExplicitError extends Error {}

interface EndpointsProps {
  serviceEndpoints?: DidServiceEndpoint[];
  did?: DidUri;
}

export function EndpointSection({ serviceEndpoints, did }: EndpointsProps) {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useHandleOutsideClick(modalRef, () => setShowModal(!showModal));

  return (
    <div className={styles.didDocument}>
      <div className={styles.titleWrapper}>
        <span className={styles.title}>Service Endpoints</span>
        <button className={styles.infoBtn} onClick={() => setShowModal(true)}>
          {showModal && (
            <div className={styles.modal}>
              <p className={`${styles.modalText} ${styles.top}`} ref={modalRef}>
                Credentials may be linked with your on-chain DID & web3name and
                displayed publicly on service endpoints such as GitHub public or
                IPFS.
              </p>
            </div>
          )}
        </button>
      </div>

      {serviceEndpoints && serviceEndpoints.length > 0 && did && (
        <div className={styles.endpoints}>
          {serviceEndpoints.map((serviceEndpoint: DidServiceEndpoint) => (
            <ServiceEndpoint
              key={serviceEndpoint.id}
              endpointType={serviceEndpoint.type[0]}
              endpointURL={serviceEndpoint.serviceEndpoint[0]}
              did={did}
            />
          ))}
        </div>
      )}

      {(!serviceEndpoints || serviceEndpoints.length === 0 || !did) && (
        <div className={styles.wrapper}>
          <span className={styles.text}>-</span>
        </div>
      )}
    </div>
  );
}

interface Props {
  endpointType: string;
  endpointURL: string;
  did?: DidUri;
}

export const ServiceEndpoint = ({ did, endpointType, endpointURL }: Props) => {
  const [fetching, setFetching] = useState(false);

  const [credential, setCredential] = useState<{
    contents: IClaimContents;
    attester: string;
  }>();
  const [error, setError] = useState<string>();

  const ready = Boolean(credential || error);

  const handleFetch = useCallback(async () => {
    if (!did) throw new Error('No did');
    setFetching(true);

    try {
      const api = await apiPromise;
      const response = await fetch(endpointURL);
      const json = await response.json();

      let credential: ICredential | undefined;

      if (Credential.isICredential(json.request)) {
        credential = json.request;
      }

      if (Credential.isICredential(json)) {
        credential = json;
      }

      if (!credential) {
        throw new ExplicitError('Not valid Kilt Credential');
      }

      const attestationChain = await api.query.attestation.attestations(
        credential.rootHash,
      );
      if (attestationChain.isNone) {
        throw new ExplicitError('No Attestation found for credential');
      }
      const attestation = Attestation.fromChain(
        attestationChain,
        credential.rootHash,
      );

      if (!Did.isSameSubject(credential.claim.owner, did)) {
        throw new ExplicitError(
          'Credential subject and signer DID are not the same',
        );
      }

      try {
        await Credential.verifyCredential(credential);
      } catch {
        throw new ExplicitError('Invalid credential');
      }

      if (attestation.revoked) {
        throw new ExplicitError('Credential attestation revoked');
      }

      const result = await api.call.did.query(Did.toChain(attestation.owner));
      const attester = result.isSome
        ? `w3n:${Did.linkedInfoFromChain(result).web3Name}`
        : attestation.owner;

      setCredential({ contents: credential.claim.contents, attester });
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
    <div className={styles.endpointWrapper}>
      <h1 className={styles.type}>{endpointType}</h1>

      {!ready && (
        <div className={styles.endpoint}>
          <div className={styles.urlContainer}>
            <span className={styles.url}>{endpointURL}</span>
            <CopyToClipboard text={endpointURL} />
          </div>

          <button
            className={styles.button}
            onClick={handleFetch}
            disabled={fetching}
          >
            Fetch
            {fetching && (
              <span
                className={styles.loader}
                aria-label="Fetching credential details..."
              />
            )}
          </button>
        </div>
      )}

      {ready && (
        <div className={styles.fetched}>
          <div className={styles.fetchedUrlContainer}>
            <span className={styles.url}>{endpointURL}</span>
            <CopyToClipboard text={endpointURL} />
          </div>

          {credential && !error && (
            <CredentialDetails credential={credential} />
          )}
          {error && <CredentialErrors error={error} />}

          <button className={styles.close} onClick={handleClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};
