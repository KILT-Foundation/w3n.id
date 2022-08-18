import styles from './LinkingInfo.module.css';

export const LinkingInfo = () => {
  return (
    <section className={styles.container}>
      <div className={styles.contents}>
        <span className={styles.title}>Advanced</span>
        <span className={styles.text}>
          Link your web3name with your Polkadot ecosystem account{' '}
          <a
            className={styles.anchor}
            href="https://linking.trusted-entity.io/"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
        </span>
      </div>
    </section>
  );
};
