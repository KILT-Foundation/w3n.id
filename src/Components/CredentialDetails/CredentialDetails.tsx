import {
  Attestation,
  Credential,
  CType,
  Did,
  DidUri,
  ICredential,
  KiltPublishedCredentialV1,
} from '@kiltprotocol/sdk-js';

import { useEffect, useState } from 'react';

import * as styles from '../CredentialDetails/CredentialDetails.module.css';

import ValidIcon from '../../ImageAssets/ok.svg';

import { CredentialErrors } from '../CredentialErrors/CredentialErrors';
import { apiPromise } from '../../Utils/claimWeb3name-helpers';

function useChainData(credentialV1: KiltPublishedCredentialV1) {
  const { credential, metadata } = credentialV1;

  const [label, setLabel] = useState(metadata?.label);
  const [attester, setAttester] = useState<string | DidUri>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (label) {
      return;
    }

    (async () => {
      try {
        const { title } = await CType.fetchFromChain(
          CType.hashToId(credential.claim.cTypeHash),
        );
        setLabel(title);
      } catch {
        // no error, credential can still be verified
      }
    })();
  }, [label, credential, metadata]);

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
    })();
  }, [credential]);

  return { label, attester, error };
}

function useVerify(credential: ICredential, did: DidUri) {
  const [error, setError] = useState<string>();

  useEffect(() => {
    (async () => {
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

  return { error };
}

interface Props {
  credentialV1: KiltPublishedCredentialV1;
  did: DidUri;
}

export const CredentialDetails = ({ credentialV1, did }: Props) => {
  const { credential } = credentialV1;

  const { attester, label, error: chainError } = useChainData(credentialV1);
  const { error: verifyError } = useVerify(credential, did);

  const error = [chainError, verifyError].filter(Boolean)[0];

  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>
        {label || <span className={styles.spinner} />}
      </h2>

      <dl className={styles.definitions}>
        {Object.entries(credential.claim.contents).map(([name, value]) => (
          <div className={styles.definition} key={name}>
            <dt className={styles.title}>{name}</dt>
            <dd className={styles.description}>{String(value)}</dd>
          </div>
        ))}

        <div className={styles.definition}>
          <dt className={styles.title}>Attester</dt>
          <dd className={styles.description}>
            {!attester && <span className={styles.spinner} />}

            {attester && !attester.startsWith('w3n:') && attester}

            {attester && attester.startsWith('w3n:') && (
              <a
                className={styles.anchor}
                href={`/${attester.replace('w3n:', '')}`}
              >
                {attester}
              </a>
            )}
          </dd>
        </div>

        {!error && (
          <div className={styles.definition}>
            <dt className={styles.title}>Valid</dt>
            <dd className={styles.valid}>
              <img src={ValidIcon} alt="valid" />
            </dd>
          </div>
        )}

        {error && <CredentialErrors error={error} />}
      </dl>
    </section>
  );
};
