import * as styles from './Web3Name.module.css';

import { CopyToClipboard } from '../CopyToClipboard/CopyToClipboard';

interface Props {
  web3Name?: string;
  error?: string;
}

export const Web3Name = ({ web3Name, error }: Props) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>web3name</span>

      {web3Name && (
        <div className={styles.wrapper}>
          <span className={styles.text}>{`w3n:${web3Name}`}</span>
          <CopyToClipboard text={web3Name} />
        </div>
      )}

      {error && (
        <div className={styles.wrapper}>
          <span
            className={
              error === 'no web3name yet' ? styles.italic : styles.error
            }
          >
            {error}
          </span>
        </div>
      )}
    </div>
  );
};
