import { type DidUri } from '@kiltprotocol/sdk-js';

import * as styles from './VerificationMethod.module.css';

interface Props {
  did?: DidUri;
}

export const uniresolverEndpoint = process.env
  .REACT_APP_UNIRESOLVER_ENDPOINT as string;

export const VerificationMethod = (props: Props) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>Verification methods</span>

      <div className={styles.wrapper}>
        <span className={styles.text}>
          Find out more about verification methods and keys here:
        </span>
        <a
          className={styles.anchor}
          href={`${uniresolverEndpoint}/#${props.did}`}
          target="_blank"
          rel="noreferrer"
        >
          {`${uniresolverEndpoint}/#\n${props.did}`}
        </a>
      </div>
    </div>
  );
};
