import { NavLink } from 'react-router-dom';

import styles from './Footer.module.css';

import { ReactComponent as KiltLogo } from '../../ImageAssets/Kilt.svg';
import { paths } from '../../Utils/paths';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <NavLink
          to={paths.terms}
          onClick={() => window.scrollTo(0, 0)}
          className={({ isActive }) =>
            isActive ? styles.anchorActive : styles.anchor
          }
        >
          Terms and Conditions
        </NavLink>
        <NavLink
          to={paths.privacy}
          onClick={() => window.scrollTo(0, 0)}
          className={({ isActive }) =>
            isActive ? styles.anchorActive : styles.anchor
          }
        >
          Privacy Policy
        </NavLink>

        <div className={styles.imprint}>
          <h6 className={styles.imprintHeading}>Imprint</h6>
          <p className={styles.imprintLine}>
            B.T.E. BOTLabs Trusted Entity GmbH
          </p>
          <p className={styles.imprintLine}>Keithstraße 2-4</p>
          <p className={styles.imprintLine}>10787 Berlin, Germany</p>

          <p className={styles.spacedLine}>
            Germany Commercial Court: Amtsgericht Charlottenburg in Berlin
          </p>

          <p className={styles.imprintLine}>Registration Number: HRB 231219B</p>
          <p className={styles.imprintLine}>VAT No: DE 346528612</p>
          <p className={styles.imprintLine}>Managing Director: Ingo Rübe</p>

          <p className={styles.spacedLine}>
            Contact:{' '}
            <a className={styles.anchor} href="mailto:info@botlabs.org">
              info@botlabs.org
            </a>
          </p>
          <p className={styles.imprintLine}>
            Or go to{' '}
            <a
              className={styles.anchor}
              href="https://support.kilt.io/support/home"
              target="_blank"
              rel="noreferrer"
            >
              Tech Support
            </a>{' '}
            and click on “Contact Us”
          </p>
          <p className={styles.spacedLine}>
            Requirements according to § 5 TMG (Germany)
          </p>
          <p>
            <a
              className={styles.anchor}
              href="https://support.kilt.io/support/home"
              target="_blank"
              rel="noreferrer"
            >
              Tech Support
            </a>
            <br />
            <a
              className={styles.anchor}
              href="https://github.com/BTE-Trusted-Entity/w3n.id"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </p>
          <p className={styles.spacedLine}>
            &copy; 2022 B.T.E. BOTLabs Trusted Entity GmbH
          </p>
          <KiltLogo className={styles.kiltLogo} />
        </div>
      </div>
    </footer>
  );
};
