/*eslint import/no-unresolved: [2, { ignore: ['^jsx'] }]*/
import Logo from 'jsx:../../ImageAssets/w3n_logo.svg';
import Chevron from 'jsx:../../ImageAssets/chevron_down_white.svg';

import * as styles from './Header.module.css';

import { TakeTour } from '../TakeTour/TakeTour';

import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch';

export const Header = () => {
  return (
    <header className={styles.header}>
      <ThemeSwitch />

      <div className={styles.logoWrapper}>
        <Logo className={styles.logo} />
      </div>
      <div className={styles.headingTextContainer}>
        <span className={styles.text}>
          Your go to place for everything about web3name
        </span>
        <div className={styles.bottomSeperator} />
      </div>
    </header>
  );
};
