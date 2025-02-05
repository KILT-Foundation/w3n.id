import * as styles from './Privacy.module.css';

export function Privacy() {
  return (
    <main className={styles.container}>
      <div className={styles.headingContainer}>
        <h1 className={styles.privacyHeading}> Privacy Policy </h1>
      </div>
      <div className={styles.privacyContainer}>
        <section className={styles.privacy}>
          <p>
            We are very delighted that you have shown interest in our
            enterprise.
          </p>

          <p>
            <a href="https://raw.githubusercontent.com/KILTprotocol/kilt-resources/f1118b8503d8616d20450aeacaec11d79b961f3b/files/Kilt-io-Privacy-Policy.pdf">
              Our privacy policy
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
