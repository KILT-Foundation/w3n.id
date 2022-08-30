import { useCallback, useRef, useState } from 'react';
import {
  Credential,
  RequestForAttestation,
  Did,
  IRequestForAttestation,
  Attestation,
  IClaimContents,
  DidUri,
  DidServiceEndpoint,
} from '@kiltprotocol/sdk-js';

import styles from './ServiceEndpoint.module.css';

import { validateCredential } from '../../Utils/w3n-helpers';
import { ReactComponent as Loader } from '../../ImageAssets/oval.svg';

import { CopyToClipboard } from '../CopyToClipboard/CopyToClipboard';
import { CredentialErrors } from '../CredentialErrors/CredentialErrors';
import { CredentialDetails } from '../CredentialDetails/CredentialDetails';
import { useHandleOutsideClick } from '../../Hooks/useHandleOutsideClick';

class ExplicitError extends Error {}

interface EndpointsProps {
  serviceEndpoints: DidServiceEndpoint[];
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
      <div className={styles.endpoints}>
        {serviceEndpoints.map((serviceEndpoint: DidServiceEndpoint) => (
          <ServiceEndpoint
            key={serviceEndpoint.id}
            endpointType={serviceEndpoint.types[0]}
            endpointURL={serviceEndpoint.urls[0]}
            did={did}
          />
        ))}
      </div>
    </div>
  );
}

interface Props {
  endpointType: string;
  endpointURL: string;
  did?: DidUri;
}

const ServiceEndpoint = ({ did, endpointType, endpointURL }: Props) => {
  const [fetching, setFetching] = useState(false);

  const [credential, setCredential] = useState<{
    contents: IClaimContents;
    attester: string;
  }>();
  const [error, setError] = useState<string>();

  const handleFetch = useCallback(async () => {
    if (!did) throw new Error('No did');
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
    <div className={styles.endpointWrapper}>
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
          </button>
        )}

        {(credential || error) && (
          <button className={styles.button} onClick={handleClose}>
            Close
          </button>
        )}
        {credential && !error && <CredentialDetails credential={credential} />}
        {error && <CredentialErrors error={error} />}
      </div>
    </div>
  );
};
