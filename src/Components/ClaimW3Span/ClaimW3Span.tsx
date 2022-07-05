import styles from './ClaimW3Span.module.css';

interface Props {
  handleTourSection: React.MouseEventHandler<HTMLButtonElement>;
}

export const ClaimW3Span = ({ handleTourSection }: Props) => {
  return (
    <div className={styles.container}>
      <span className={styles.howTo}>
        <span>*Want your own web3name?</span>
        <button onClick={handleTourSection} className={styles.takeTour}>
          Take a tour
        </button>
      </span>
    </div>
  );
};
