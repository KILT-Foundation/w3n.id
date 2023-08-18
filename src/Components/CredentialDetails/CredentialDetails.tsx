import {
  Attestation,
  Credential,
  CType,
  Did,
  DidUri,
  IClaim,
  ICredential,
  KiltPublishedCredentialV1,
} from '@kiltprotocol/sdk-js';
import { find } from 'lodash-es';
import { Fragment, useEffect, useState } from 'react';

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

function ClaimValue({
  claim,
  name,
  value,
}: {
  claim: IClaim;
  name: string;
  value: string;
}) {
  const { cTypeHash, contents } = claim;
  const linkableFields = [
    {
      cTypeHash:
        '0x3291bb126e33b4862d421bfaa1d2f272e6cdfc4f96658988fbcffea8914bd9ac',
      name: 'Email',
      href: `mailto:${value}`,
    },
    {
      cTypeHash:
        '0x47d04c42bdf7fdd3fc5a194bcaa367b2f4766a6b16ae3df628927656d818f420',
      name: 'Twitter',
      href: `https://twitter.com/${value}/`,
    },
    {
      cTypeHash:
        '0xd8c61a235204cb9e3c6acb1898d78880488846a7247d325b833243b46d923abe',
      name: 'Username',
      href: `https://discordapp.com/users/${contents['User ID']}`,
    },
    {
      cTypeHash:
        '0xad52bd7a8bd8a52e03181a99d2743e00d0a5e96fdc0182626655fcf0c0a776d0',
      name: 'Username',
      href: `https://github.com/${value}`,
    },
    {
      cTypeHash:
        '0x568ec5ffd7771c4677a5470771adcdea1ea4d6b566f060dc419ff133a0089d80',
      name: 'Username',
      href: `https://www.twitch.tv/${value}`,
    },
    {
      cTypeHash:
        '0xcef8f3fe5aa7379faea95327942fd77287e1c144e3f53243e55705f11e890a4c',
      name: 'Username',
      href: `https://t.me/${value}`,
    },
    {
      cTypeHash:
        '0x329a2a5861ea63c250763e5e4c4d4a18fe4470a31e541365c7fb831e5432b940',
      name: 'Channel Name',
      href: `https://www.youtube.com/channel/${contents['Channel ID']}`,
    },
  ];

  const candidate = find(linkableFields, { cTypeHash, name });
  if (!candidate) {
    return <Fragment>{value}</Fragment>;
  }

  return (
    <a
      href={candidate.href}
      className={styles.anchor}
      target="_blank"
      rel="noreferrer"
    >
      {value}
    </a>
  );
}

export function CredentialDetails({ credentialV1, did }: Props) {
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
            <dd className={styles.description}>
              <ClaimValue
                claim={credential.claim}
                name={name}
                value={String(value)}
              />
            </dd>
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
}
