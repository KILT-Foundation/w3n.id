import styles from './Header.module.css';

import { ReactComponent as Logo } from '../../ImageAssets/w3n_logo.svg';
import { ReactComponent as Chevron } from '../../ImageAssets/chevron_down_white.svg';
import { TakeTour } from '../TakeTour/TakeTour';

import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch';

interface Toggle {
  handleTourSection: React.MouseEventHandler<HTMLButtonElement>;
  tourSection: boolean;
}

export const Header = (props: Toggle) => {
  return (
    <header className={styles.header}>
      <ThemeSwitch />

      <div className={styles.topHeaderContainer}>
        <div className={styles.logoWrapper}>
          <Logo className={styles.logo} />
        </div>
        <div className={styles.tourBtnWrapper}>
          <button className={styles.tourBtn} onClick={props.handleTourSection}>
            {!props.tourSection ? 'Take the tour' : 'Close'}
            <Chevron
              className={!props.tourSection ? styles.open : styles.close}
            />
          </button>
        </div>
      </div>
      <div className={styles.textLabel}>
        <span className={styles.text}>Look up web3names* or DIDs here</span>
      </div>
      <TakeTour isOpen={props.tourSection} />

      <div className={styles.bottomSeperator} />
    </header>
  );
};
