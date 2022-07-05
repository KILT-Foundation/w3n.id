import styles from './CredentialErrors.module.css';

import { ReactComponent as AlertIcon } from '../../ImageAssets/iconAttention_red.svg';

interface ICredentialErrors {
  error: string | null;
}

export const CredentialErrors = (props: ICredentialErrors) => {
  return (
    <div className={styles.credentialContainer}>
      <div className={styles.container}>
        <span className={styles.credentialTitle}>Error</span>
        <span className={styles.credentialSpan}>{props.error}</span>
      </div>

      <div className={styles.container}>
        <span className={styles.credentialTitle}>Valid</span>
        <span className={styles.credentialSpan}>
          <AlertIcon />
        </span>
      </div>
    </div>
  );
};
