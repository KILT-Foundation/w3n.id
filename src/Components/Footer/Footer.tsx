import { NavLink } from 'react-router-dom';

import styles from './Footer.module.css';

import { paths } from '../../Utils/paths';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <nav className={styles.navMenu}>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.navLinkActive : styles.navLink
            }
            to={paths.imprint}
          >
            Imprint
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? styles.navLinkActive : styles.navLink
            }
            onClick={() => window.scroll(0, 0)}
            to={paths.terms}
          >
            Terms
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive ? styles.navLinkActive : styles.navLink
            }
            onClick={() => window.scroll(0, 0)}
            to={paths.privacy}
          >
            Privacy
          </NavLink>

          <a
            className={styles.navLink}
            href="https://github.com/BTE-Trusted-Entity/w3n.id"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            className={styles.navLink}
            href="https://support.kilt.io/support/home"
            target="_blank"
            rel="noreferrer"
          >
            Support
          </a>
        </nav>

        <p className={styles.copyright}>
          © 2022 B.T.E. BOTLabs Trusted Entity GmbH
        </p>
      </div>
    </footer>
  );
};
