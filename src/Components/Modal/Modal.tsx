import { Fragment, MouseEventHandler } from 'react';

import styles from './Modal.module.css';

interface ErrorContentsProps {
  onClose: MouseEventHandler;
}

function ErrorContents({ onClose }: ErrorContentsProps) {
  return (
    <Fragment>
      <h1 className={styles.heading}>Error Occurred</h1>

      <p className={styles.modalText}>
        Oops!
        <br /> Click “Try Again” or reload the page or restart your browser.
      </p>
      <div className={styles.errorIcon} />
      <button type="button" className={styles.btn} onClick={onClose}>
        Try again
      </button>
    </Fragment>
  );
}

interface SuccessContentsProps {
  onSuccess: MouseEventHandler;
  web3name: string;
}

function SuccessContents({ onSuccess, web3name }: SuccessContentsProps) {
  return (
    <Fragment>
      <h1 className={styles.heading}>Congratulations!</h1>

      <p className={styles.modalText}>
        {`w3n:${web3name}`} <br /> is now your web3name
      </p>
      <div className={styles.successIcon} />
      <button type="button" className={styles.btn} onClick={onSuccess}>
        Look u result
      </button>
    </Fragment>
  );
}

function LoadingContents() {
  return (
    <Fragment>
      <h1 className={styles.heading}>Claiming web3name</h1>

      <p className={styles.modalText}>
        Blockchain Transaction Pending Your request is being processed
      </p>
      <div className={styles.spinner} />
      <button className={styles.btnDisabled}>Look up result</button>
    </Fragment>
  );
}

interface Props {
  claimingStatus?: 'claiming' | 'success' | 'error';
  onClose: MouseEventHandler;
  onSuccess: MouseEventHandler;
  web3name: string;
}

export function ClaimingModal({
  claimingStatus,
  onClose,
  onSuccess,
  web3name,
}: Props) {
  if (!claimingStatus) {
    return null;
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        {claimingStatus === 'claiming' && <LoadingContents />}
        {claimingStatus === 'success' && (
          <SuccessContents onSuccess={onSuccess} web3name={web3name} />
        )}

        {claimingStatus === 'error' && <ErrorContents onClose={onClose} />}
      </div>
    </div>
  );
}
