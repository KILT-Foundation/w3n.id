import styles from './ResultsErrors.module.css';

interface Props {
  name: string;
  error:
    | 'Not Claimed'
    | 'Max limit'
    | 'Invalid Chars'
    | 'Min limit'
    | 'Invalid Kilt'
    | 'No linked account'
    | null;
}

const ClaimWeb3Name = (props: Props) => {
  return (
    <div>
      <span className={styles.note}>Note</span>
      <div className={styles.claimW3NSteps}>
        <span className={styles.bottomMarginStep}>
          No results found for {props.name}
        </span>
        <span className={styles.bottomMarginStep}>
          Here’s how to claim your web3name
        </span>
        <span className={styles.step}>
          - Download Sporran extension for{' '}
          <a
            className={styles.link}
            href="https://chrome.google.com/webstore/detail/djdnajgjcbjhhbdblkegbcgodlkkfhcl"
            target="_blank"
            rel="noreferrer"
          >
            Chrome
          </a>{' '}
          or{' '}
          <a
            className={styles.link}
            href="https://addons.mozilla.org/firefox/addon/sporran/"
            target="_blank"
            rel="noreferrer"
          >
            Firefox
          </a>
        </span>
        <span className={styles.step}>
          -
          <a
            className={styles.link}
            href="https://www.kilt.io/wp-content/uploads/2021/11/How-to-Set-Up-Sporran_22-Nov.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Generate a KILT Identity within Sporran
          </a>
        </span>
        <span className={styles.step}>
          - Upgrade to an{' '}
          <a
            className={styles.link}
            href="https://www.trusted-entity.io/assets/pdf/w3n_Promo_On-Chain-DID.pdf"
            target="_blank"
            rel="noreferrer"
          >
            on-chain DID
          </a>
        </span>
        <span className={styles.bottomMarginStep}>
          - Claim web3name in Sporran
        </span>
        <span className={styles.step}>
          For more details, follow our{' '}
          <a
            className={styles.link}
            href="https://www.trusted-entity.io/assets/pdf/How_To_Guide_web3name_Promo.pdf"
            target="_blank"
            rel="noreferrer"
          >
            How-to guide
          </a>
        </span>
      </div>
    </div>
  );
};

export const Error = ({ message }: { message: string }) => {
  return (
    <div className={styles.container}>
      <span className={styles.note}>Error</span>
      <div className={styles.claimW3NSteps}>
        <span className={styles.step}>{message}</span>
      </div>
    </div>
  );
};

export const ResultsErrors = ({ name, error }: Props) => {
  if (error === 'Not Claimed') {
    return <ClaimWeb3Name name={name} error={null} />;
  }

  if (error === 'Max limit') {
    return <Error message="Maximum 30 characters allowed" />;
  }

  if (error === 'Min limit') {
    return <Error message="Minimum characters length should be 3" />;
  }

  if (error === 'Invalid Chars') {
    return <Error message="Invalid Characters" />;
  }

  if (error === 'Invalid Kilt') {
    return <Error message="Not a valid Kilt DID" />;
  }

  if (error === 'No linked account') {
    return <Error message="No web3name has been linked to this account" />;
  }

  return null;
};
