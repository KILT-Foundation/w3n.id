import {
  Attestation,
  Credential,
  Did,
  DidUri,
  ICredential,
} from '@kiltprotocol/sdk-js';

import { useEffect, useState } from 'react';

import * as styles from '../CredentialDetails/CredentialDetails.module.css';

import ValidIcon from '../../ImageAssets/ok.svg';

import { CredentialErrors } from '../CredentialErrors/CredentialErrors';
import { apiPromise } from '../../Utils/claimWeb3name-helpers';

interface Props {
  credential: ICredential;
  did: DidUri;
}

export const CredentialDetails = ({ credential, did }: Props) => {
  const [attester, setAttester] = useState<string | DidUri>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    (async () => {
      const api = await apiPromise;
      const attestationChain = await api.query.attestation.attestations(
        credential.rootHash,
      );
      if (attestationChain.isNone) {
        setError('No Attestation found for credential');
        return;
      }

      const attestation = Attestation.fromChain(
        attestationChain,
        credential.rootHash,
      );

      const didChain = await api.call.did.query(Did.toChain(attestation.owner));
      if (didChain.isNone) {
        setError('Unable to fetch attester details');
        return;
      }
      const { web3Name } = Did.linkedInfoFromChain(didChain);
      setAttester(web3Name ? `w3n:${web3Name}` : attestation.owner);

      if (attestation.revoked) {
        setError('Credential attestation revoked');
        return;
      }

      if (!Did.isSameSubject(credential.claim.owner, did)) {
        setError('This credential was issued for someone else');
        return;
      }

      try {
        await Credential.verifyCredential(credential);
      } catch {
        setError('Invalid credential');
      }
    })();
  }, [credential, did]);

  return (
    <dl className={styles.definitions}>
      {Object.entries(credential.claim.contents).map(([name, value]) => (
        <div className={styles.container} key={name}>
          <dt className={styles.credentialTitle}>{name}</dt>
          <dd className={styles.credentialDescription}>{String(value)}</dd>
        </div>
      ))}

      <div className={styles.container}>
        <dt className={styles.credentialTitle}>Attester</dt>
        <dd className={styles.credentialDescription}>
          {!attester && <span className={styles.spinner} />}

          {attester && !attester.startsWith('w3n:') && attester}

          {attester && attester.startsWith('w3n:') && (
            <a href={`/${attester.replace('w3n:', '')}`}>{attester}</a>
          )}
        </dd>
      </div>

      {!error && (
        <div className={styles.container}>
          <dt className={styles.credentialTitle}>Valid</dt>
          <dd className={styles.valid}>
            <img src={ValidIcon} alt="valid" />
          </dd>
        </div>
      )}

      {error && <CredentialErrors error={error} />}
    </dl>
  );
};
