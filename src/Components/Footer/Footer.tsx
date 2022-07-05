import styles from './Footer.module.css';

import { ReactComponent as Kilt } from '../../ImageAssets/Kilt.svg';

import Terms from '../../DocAssets/w3n-id_Terms_2022.pdf';
import Privacy from '../../DocAssets/w3n-id_PrivacyPolicy_2022.pdf';

import { ClaimW3Span } from '../ClaimW3Span/ClaimW3Span';

interface Toggle {
  handleImprint: React.MouseEventHandler<HTMLSpanElement>;
  handleTourSection: React.MouseEventHandler<HTMLButtonElement>;
}

export const Footer = (props: Toggle) => {
  return (
    <footer className={styles.footer}>
      <ClaimW3Span handleTourSection={props.handleTourSection} />
      <div className={styles.container}>
        <div className={styles.linksContainer}>
          <div className={styles.imprintContainer}>
            <span onClick={props.handleImprint}>Imprint</span>
          </div>
          <div className={styles.links}>
            <span className={styles.imprintText} onClick={props.handleImprint}>
              Imprint -
            </span>
            <a
              className={styles.link}
              href={Terms}
              target="_blank"
              rel="noreferrer"
            >
              <span className={styles.terms}>Terms</span>
            </a>
            <span>-</span>

            <a
              className={styles.link}
              href={Privacy}
              target="_blank"
              rel="noreferrer"
            >
              <span className={styles.privacy}>Privacy</span>
            </a>
            <span>-</span>
            <a
              className={styles.link}
              href="https://support.kilt.io/support/home"
              target="_blank"
              rel="noreferrer"
            >
              <span className={styles.support}>Support</span>
            </a>
          </div>
          <div className={styles.logoContainer}>
            <Kilt className={styles.logo} />
          </div>
        </div>
      </div>
    </footer>
  );
};
