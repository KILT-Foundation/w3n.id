import styles from './Header.module.css';

import { ReactComponent as Logo } from '../../ImageAssets/w3n_logo.svg';

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
