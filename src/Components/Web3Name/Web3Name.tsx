import * as styles from './Web3Name.module.css';

import { CopyToClipboard } from '../CopyToClipboard/CopyToClipboard';

interface Props {
  web3Name?: string;
}

export const Web3Name = ({ web3Name }: Props) => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>web3name</span>

      {web3Name && web3Name !== 'no web3name yet' && (
        <div className={styles.wrapper}>
          <span className={styles.text}>{`w3n:${web3Name}`}</span>
          <CopyToClipboard text={web3Name} />
        </div>
      )}

      {web3Name && web3Name === 'no web3name yet' && (
        <div className={styles.wrapper}>
          <span className={styles.italic}>{web3Name}</span>
        </div>
      )}

      {!web3Name && (
        <div className={styles.wrapper}>
          <span className={styles.error}>-</span>
        </div>
      )}
    </div>
  );
};
