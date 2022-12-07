import * as styles from './LinkedAccounts.module.css';

import { CopyToClipboard } from '../CopyToClipboard/CopyToClipboard';
import { InfoIcon } from '../InfoIcon/InfoIcon';

interface Props {
  linkedAccounts?: string[];
}

export function LinkedAccounts({ linkedAccounts }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <span className={styles.title}>Linked Accounts</span>
        <InfoIcon right>
          Linking your accounts with your on-chain DID & web3name is a personal
          and recognizable way to represent yourself across the Polkadot and
          (coming soon) Ethereum ecosystems. Any number of your accounts may be
          linked.
        </InfoIcon>
      </div>

      {linkedAccounts && linkedAccounts.length > 0 && (
        <div className={styles.accountsContainer}>
          {linkedAccounts.map((account) => (
            <div className={styles.wrapper} key={account}>
              <span className={styles.text}>{account}</span>
              <CopyToClipboard text={account} />
            </div>
          ))}
        </div>
      )}

      {(!linkedAccounts || linkedAccounts.length === 0) && (
        <div className={styles.wrapper}>
          <span className={styles.text}>-</span>
        </div>
      )}
    </div>
  );
}
