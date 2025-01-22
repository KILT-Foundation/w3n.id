import { type DidUri } from '@kiltprotocol/sdk-js';

import * as styles from './VerificationMethod.module.css';

interface Props {
  did?: DidUri;
}

export const uniresolverEndpoint = process.env
  .REACT_APP_UNIRESOLVER_ENDPOINT as string;

export const VerificationMethod = ({ did }: Props) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Verification methods</span>

      {did ? (
        <div className={styles.wrapper}>
          <span className={styles.text}>
            Find out more about verification methods and keys here:
          </span>
          <a
            className={styles.anchor}
            href={`${uniresolverEndpoint}/#${did}`}
            target="_blank"
            rel="noreferrer"
          >
            {`${uniresolverEndpoint}/#\n${did}`}
          </a>
        </div>
      ) : (
        <div className={styles.wrapper}>
          <span className={styles.text}>-</span>
        </div>
      )}
    </div>
  );
};
