import * as styles from './Imprint.module.css';

export const Imprint = () => {
  return (
    <main className={styles.container}>
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>Imprint</h1>
      </div>
      <div className={styles.imprintContainer}>
        <div className={styles.imprint}>
          <section className={styles.imprintSection}>
            <p className={styles.imprintLine}>KILT Foundation</p>
            <p className={styles.imprintLine}>
              Genesis Close 5th Floor, Genesis Building
            </p>
            <p className={styles.imprintLine}>
              PO Box 446, Cayman Islands, KY1-1106
            </p>
          </section>

          <section className={styles.imprintSection}>
            <p className={styles.imprintLine}>Certificate No. 418097</p>
            <p className={styles.imprintLine}>
              Managing Directors: Rishant Kumar, Svetoslav Boyadzhiev
            </p>
          </section>

          <section className={styles.imprintSection}>
            <p className={styles.imprintLine}>
              Contact:{' '}
              <a className={styles.anchor} href="mailto:hello@kilt.io">
                hello@kilt.io
              </a>
            </p>
            <p className={styles.imprintLine}>
              Or go to{' '}
              <a
                className={styles.anchor}
                href="https://support.kilt.io/support/home"
                target="_blank"
                rel="noreferrer"
              >
                Tech support
              </a>{' '}
              {`and click on "Contact Us"`}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};
