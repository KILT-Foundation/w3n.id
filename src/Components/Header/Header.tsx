import * as styles from './Header.module.css';

import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch';

export const Header = () => {
  return (
    <header className={styles.header}>
      <ThemeSwitch />

      <div className={styles.logo} />

      <div className={styles.headingTextContainer}>
        <span className={styles.text}>
          Your go to place for everything about web3name
        </span>
        <div className={styles.bottomSeperator} />
      </div>
    </header>
  );
};
