import { type DidUri } from '@kiltprotocol/sdk-js';

import * as styles from './DidSection.module.css';

import { CopyToClipboard } from '../CopyToClipboard/CopyToClipboard';
import { InfoIcon } from '../InfoIcon/InfoIcon';

interface Props {
  did?: DidUri;
  error?: string;
}

export function DidSection({ did, error }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <span className={styles.title}>DID</span>
        <InfoIcon right>
          A DID (decentralized identifier) is a unique string of numbers and
          letters that functions like a digital fingerprint. It forms the core
          of a digital identity.
        </InfoIcon>
      </div>

      {did && (
        <div className={styles.wrapper}>
          <span className={styles.text}>{did}</span>
          <CopyToClipboard text={did} />
        </div>
      )}

      {error && (
        <div className={styles.wrapper}>
          <span className={styles.error}>{error}</span>
        </div>
      )}
    </div>
  );
}
