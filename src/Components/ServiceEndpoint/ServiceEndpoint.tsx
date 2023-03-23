import { useCallback, useState } from 'react';
import {
  Credential,
  DidServiceEndpoint,
  DidUri,
  ICredential,
  KiltPublishedCredentialCollectionV1,
  KiltPublishedCredentialV1,
} from '@kiltprotocol/sdk-js';

import { every, map } from 'lodash-es';

import * as styles from './ServiceEndpoint.module.css';

import { CopyToClipboard } from '../CopyToClipboard/CopyToClipboard';
import { CredentialErrors } from '../CredentialErrors/CredentialErrors';
import { CredentialDetails } from '../CredentialDetails/CredentialDetails';
import { InfoIcon } from '../InfoIcon/InfoIcon';

class ExplicitError extends Error {}

function isPublishedCollection(
  json: unknown,
): json is KiltPublishedCredentialCollectionV1 {
  if (!Array.isArray(json)) {
    return false;
  }
  if (json.length === 0) {
    return false;
  }
  const credentials = map(
    json as KiltPublishedCredentialCollectionV1,
    'credential',
  );
  return every(credentials, Credential.isICredential);
}

function isLegacyCredential(json: unknown): json is {
  request: ICredential;
} {
  return typeof json === 'object' && json !== null && 'request' in json;
}

interface Props {
  endpointType: string;
  endpointURL: string;
  did?: DidUri;
}

export function ServiceEndpoint({ did, endpointType, endpointURL }: Props) {
  const [fetching, setFetching] = useState(false);

  const [credentials, setCredentials] = useState<KiltPublishedCredentialV1[]>();
  const [error, setError] = useState<string>();

  const ready = Boolean(credentials || error);

  const handleFetch = useCallback(async () => {
    if (!did) throw new Error('No did');
    setFetching(true);

    try {
      const response = await fetch(endpointURL);
      const json = await response.json();

      if (isPublishedCollection(json)) {
        setCredentials(json);
        return;
      }

      if (Credential.isICredential(json)) {
        setCredentials([{ credential: json }]);
        return;
      }

      if (isLegacyCredential(json)) {
        setCredentials([{ credential: json.request }]);
        return;
      }

      throw new ExplicitError('No Kilt Credentials found');
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
    setCredentials(undefined);
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

          {!error && credentials && did && (
            <ul className={styles.credentials}>
              {credentials.map((credential) => (
                <li
                  key={credential.credential.rootHash}
                  className={styles.credential}
                >
                  <CredentialDetails credentialV1={credential} did={did} />
                </li>
              ))}
            </ul>
          )}

          {error && (
            <div className={styles.error}>
              <CredentialErrors error={error} />
            </div>
          )}

          <button className={styles.close} onClick={handleClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

interface EndpointsProps {
  serviceEndpoints?: DidServiceEndpoint[];
  did?: DidUri;
}

export function EndpointSection({ serviceEndpoints, did }: EndpointsProps) {
  return (
    <div className={styles.didDocument}>
      <div className={styles.titleWrapper}>
        <span className={styles.title}>Service Endpoints</span>
        <InfoIcon right>
          Credentials may be linked with your DID & web3name and displayed
          publicly on service endpoints such as GitHub public or IPFS.
        </InfoIcon>
      </div>

      {serviceEndpoints && serviceEndpoints.length > 0 && did && (
        <div className={styles.endpoints}>
          {serviceEndpoints.map((serviceEndpoint) => (
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
