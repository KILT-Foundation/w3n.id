import { useRef, useState } from 'react';

import * as styles from './LinkedAccounts.module.css';

import { CopyToClipboard } from '../CopyToClipboard/CopyToClipboard';
import { useHandleOutsideClick } from '../../Hooks/useHandleOutsideClick';

interface Props {
  linkedAccounts: string[];
}

export const LinkedAccounts = ({ linkedAccounts }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useHandleOutsideClick(modalRef, () => setShowModal(!showModal));

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <span className={styles.title}>Linked Accounts</span>
        <button className={styles.infoBtn} onClick={() => setShowModal(true)}>
          {showModal && (
            <div className={styles.modal}>
              <p className={`${styles.modalText} ${styles.top}`} ref={modalRef}>
                A DID (decentralized identifier) is a unique string of numbers
                and letters that functions like a digital fingerprint. It forms
                the core of a digital identity.
              </p>
            </div>
          )}
        </button>
      </div>
      <div className={styles.accountsContainer}>
        {linkedAccounts.map((account) => (
          <div className={styles.wrapper} key={account}>
            <span className={styles.text}>{account}</span>
            <CopyToClipboard text={account} />
          </div>
        ))}
      </div>
      {linkedAccounts.length === 0 && <span className={styles.text}>-</span>}
    </div>
  );
};
