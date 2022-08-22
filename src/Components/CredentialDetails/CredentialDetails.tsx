import { IClaimContents } from '@kiltprotocol/sdk-js';

import styles from '../CredentialDetails/CredentialDetails.module.css';

import { ReactComponent as OkIcon } from '../../ImageAssets/ok_light.svg';
import { stringStartsWithW3 } from '../../Utils/w3n-helpers';

interface Props {
  credential: {
    contents: IClaimContents;
    attester: string;
  };
}
export const CredentialDetails = ({ credential }: Props) => {
  const { contents, attester } = credential;

  return (
    <div className={styles.credentialContainer}>
      {Object.keys(contents).map((key) => (
        <div className={styles.container} key={key}>
          <span className={styles.credentialTitle}>{key}</span>
          <span className={styles.credentialSpan}>{contents[key]}</span>
        </div>
      ))}
      <div className={styles.container}>
        <span className={styles.credentialTitle}>
          {stringStartsWithW3(attester) ? 'Attester' : 'Attester DID'}
        </span>
        <span className={styles.credentialSpan}>{attester}</span>
      </div>
      <div className={styles.container}>
        <span className={styles.credentialTitle}>Valid</span>

        <OkIcon className={styles.credentialSpan} />
      </div>
    </div>
  );
};
