import styles from './ResultsErrors.module.css';

interface Props {
  name: string;
  errors:
    | 'Not Claimed'
    | 'Max limit'
    | 'Invalid Chars'
    | 'Min limit'
    | 'Invalid Kilt'
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
export const ResultsErrors = (props: Props) => {
  if (props.errors === 'Not Claimed')
    return <ClaimWeb3Name name={props.name} errors={null} />;

  if (props.errors === 'Max limit') return <MaxCharError />;

  if (props.errors === 'Min limit') return <MinCharError />;

  if (props.errors === 'Invalid Chars') return <InvalidCharError />;

  if (props.errors === 'Invalid Kilt') return <InvalidKiltDid />;

  return null;
};
const MaxCharError = () => {
  return (
    <div className={styles.container}>
      <span className={styles.note}>Error</span>
      <div className={styles.claimW3NSteps}>
        <span className={styles.step}>Maximum 30 characters allowed</span>
      </div>
    </div>
  );
};
const MinCharError = () => {
  return (
    <div className={styles.container}>
      <span className={styles.note}>Error</span>
      <div className={styles.claimW3NSteps}>
        <span className={styles.step}>
          Minimum characters length should be 3
        </span>
      </div>
    </div>
  );
};

const InvalidCharError = () => {
  return (
    <div className={styles.container}>
      <span className={styles.note}>Error</span>
      <div className={styles.claimW3NSteps}>
        <span className={styles.step}>Invalid Characters.</span>
      </div>
    </div>
  );
};
const InvalidKiltDid = () => {
  return (
    <div className={styles.container}>
      <span className={styles.note}>Error</span>
      <div className={styles.claimW3NSteps}>
        <span className={styles.step}>Not a valid Kilt DID</span>
      </div>
    </div>
  );
};
