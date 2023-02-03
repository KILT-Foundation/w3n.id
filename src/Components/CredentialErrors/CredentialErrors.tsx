/*eslint import/no-unresolved: [2, { ignore: ['^jsx'] }]*/
import { Fragment } from 'react';

import * as styles from './CredentialErrors.module.css';

import AlertIcon from '../../ImageAssets/not_ok.svg';

interface ICredentialErrors {
  error: string;
}

export const CredentialErrors = (props: ICredentialErrors) => {
  return (
    <Fragment>
      <dl className={styles.container}>
        <dt className={styles.credentialTitle}>Error</dt>
        <dd className={styles.credentialDescription}>{props.error}</dd>
      </dl>

      <dl className={styles.container}>
        <dt className={styles.credentialTitle}>Valid</dt>
        <dd className={styles.credentialDescription}>
          <img src={AlertIcon} alt="invalid" />
        </dd>
      </dl>
    </Fragment>
  );
};
