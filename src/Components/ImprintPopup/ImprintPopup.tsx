import styles from './ImprintPopup.module.css';

import { ReactComponent as Logo } from '../../ImageAssets/bte_logo_light.svg';

interface Toggle {
  handleCloseImprint: React.MouseEventHandler<HTMLSpanElement>;
}

export const ImprintPopup = (props: Toggle) => {
  return (
    <div className={styles.container}>
      <div className={styles.imprint}>
        <Logo className={styles.logo} />
        <span className={styles.bottomMarginStep}>Imprint</span>
        <span className={styles.claimW3NSteps}>
          B.T.E. BOTLabs Trusted Entity GmbH
        </span>
        <span className={styles.claimW3NSteps}>Keithstraße 2-4</span>
        <span className={styles.claimW3NSteps}>10787 Berlin, Germany</span>
        <span className={styles.claimW3NSteps}>
          Germany Commercial Court: Amtsgericht Charlottenburg in Berlin
        </span>
        <span className={styles.claimW3NSteps}>
          Registration Number: HRB 231219B
        </span>
        <span className={styles.claimW3NSteps}>VAT No: DE 346528612</span>
        <span className={styles.claimW3NSteps}>
          Managing Director: Ingo Rübe
        </span>
        <span className={styles.claimW3NSteps}>
          Contact: <a href="mailto:info@botlabs.org">info@botlabs.org</a>
        </span>
        <span className={styles.bottomMarginStep}>
          Or go to{' '}
          <a
            href="https://support.kilt.io/support/home"
            target="_blank"
            rel="noreferrer"
          >
            {' '}
            Tech Support{' '}
          </a>{' '}
          and click on “Contact Us”
        </span>
        <span className={styles.claimW3NSteps}>
          Requirements according to § 5 TMG (Germany)
        </span>
        <button className={styles.okBtn} onClick={props.handleCloseImprint}>
          OK
        </button>
      </div>
    </div>
  );
};
