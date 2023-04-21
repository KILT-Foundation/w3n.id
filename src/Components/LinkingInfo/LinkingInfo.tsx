import * as styles from './LinkingInfo.module.css';

export const LinkingInfo = () => {
  return (
    <section className={styles.container}>
      <div className={styles.contents}>
        <span className={styles.title}>Advanced</span>

        <a
          className={styles.anchor}
          href="https://linking.trusted-entity.io/"
          target="_blank"
          rel="noreferrer"
        >
          Link your web3name with your Polkadot ecosystem and Ethereum accounts
          here
        </a>
      </div>
    </section>
  );
};
