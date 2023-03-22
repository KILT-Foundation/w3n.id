import * as styles from './CredentialErrors.module.css';

import AlertIcon from '../../ImageAssets/not_ok.svg';

interface ICredentialErrors {
  error: string;
}

export const CredentialErrors = (props: ICredentialErrors) => {
  return (
    <dl className={styles.definitions}>
      <div className={styles.definition}>
        <dt className={styles.title}>Error</dt>
        <dd className={styles.description}>{props.error}</dd>
      </div>

      <div className={styles.definition}>
        <dt className={styles.title}>Valid</dt>
        <dd className={styles.description}>
          <img src={AlertIcon} alt="invalid" />
        </dd>
      </div>
    </dl>
  );
};
