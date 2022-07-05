import styles from './DidSection.module.css';

import { CopyToClipboard } from '../CopyToClipboard/CopyToClipboard';

interface Props {
  did: string;
}

export const DidSection = (props: Props) => {
  if (props.did === '') return null;
  return (
    <div className={styles.container}>
      <span className={styles.didTitle}>DID</span>
      <div className={styles.didContainer}>
        <span className={styles.didSpan}>{props.did}</span>
        <CopyToClipboard text={props.did} />
      </div>
    </div>
  );
};
