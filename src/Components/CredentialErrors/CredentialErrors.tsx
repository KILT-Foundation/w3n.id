import * as styles from './CredentialErrors.module.css';

import AlertIcon from '../../ImageAssets/not_ok.svg';

interface ICredentialErrors {
  error: string;
}

export const CredentialErrors = (props: ICredentialErrors) => {
  return (
    <dl className={styles.definitions}>
      <div className={styles.container}>
        <dt className={styles.credentialTitle}>Error</dt>
        <dd className={styles.credentialDescription}>{props.error}</dd>
      </div>

      <div className={styles.container}>
        <dt className={styles.credentialTitle}>Valid</dt>
        <dd className={styles.credentialDescription}>
          <img src={AlertIcon} alt="invalid" />
        </dd>
      </div>
    </dl>
  );
};
