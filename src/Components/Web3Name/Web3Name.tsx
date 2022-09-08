import * as styles from './Web3Name.module.css';

import { CopyToClipboard } from '../CopyToClipboard/CopyToClipboard';

interface Props {
  web3Name: string;
}

export const Web3Name = (props: Props) => {
  if (props.web3Name === '') {
    return null;
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>web3name</span>

      <div className={styles.wrapper}>
        <span className={styles.text}>{`w3n:${props.web3Name}`}</span>
        <CopyToClipboard text={props.web3Name} />
      </div>
    </div>
  );
};
