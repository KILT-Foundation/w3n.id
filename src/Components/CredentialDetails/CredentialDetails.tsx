import {
  Attestation,
  Credential,
  Did,
  DidUri,
  ICredential,
} from '@kiltprotocol/sdk-js';

import { Fragment, useEffect, useState } from 'react';

import * as styles from '../CredentialDetails/CredentialDetails.module.css';

import ValidIcon from '../../ImageAssets/ok.svg';

import { stringStartsWithW3 } from '../../Utils/w3n-helpers';
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

      const { web3Name } = Did.linkedInfoFromChain(
        await api.call.did.query(Did.toChain(attestation.owner)),
      );
      setAttester(web3Name ? `w3n:${web3Name}` : attestation.owner);

      if (attestation.revoked) {
        setError('Credential attestation revoked');
        return;
      }

      if (!Did.isSameSubject(credential.claim.owner, did)) {
        setError('Credential subject and signer DID are not the same');
        return;
      }

      try {
        await Credential.verifyCredential(credential);
      } catch {
        setError('Invalid credential');
        return;
      }
    })();
  }, [credential, did]);

  return (
    <Fragment>
      {Object.entries(credential.claim.contents).map(([name, value]) => (
        <dl className={styles.container} key={name}>
          <dt className={styles.credentialTitle}>{name}</dt>
          <dd className={styles.credentialDescription}>{String(value)}</dd>
        </dl>
      ))}

      {attester && (
        <dl className={styles.container}>
          <dt className={styles.credentialTitle}>
            {stringStartsWithW3(attester) ? 'Attester' : 'Attester DID'}
          </dt>
          <dd className={styles.credentialDescription}>{attester}</dd>
        </dl>
      )}

      {!error && (
        <dl className={styles.container}>
          <dt className={styles.credentialTitle}>Valid</dt>
          <dd className={styles.valid}>
            <img src={ValidIcon} alt="valid" />
          </dd>
        </dl>
      )}

      {error && <CredentialErrors error={error} />}
    </Fragment>
  );
};
