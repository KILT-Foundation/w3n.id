import { NavLink } from 'react-router-dom';

import * as styles from './Header.module.css';

import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch';
import { paths } from '../../Utils/paths';

export const Header = () => {
  return (
    <header className={styles.header}>
      <ThemeSwitch />

      <NavLink to={paths.main} className={styles.logo} aria-label="home" />

      <div className={styles.headingTextContainer}>
        <span className={styles.text}>
          Your go to place for everything about web3name
        </span>
      </div>
    </header>
  );
};
