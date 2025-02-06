import { NavLink } from 'react-router-dom';

import * as styles from './Footer.module.css';

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
        </nav>

        <p className={styles.copyright}>© 2025 KILT Foundation</p>
      </div>
    </footer>
  );
};
