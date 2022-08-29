import styles from './ResultsErrors.module.css';

export type SearchError =
  | 'max_limit'
  | 'invalid_chars'
  | 'min_limit'
  | 'invalid_kilt'
  | 'no_linked_account';

const errorMessages: Record<SearchError, string> = {
  max_limit: 'Maximum 30 characters allowed',
  min_limit: 'Minimum characters length should be 3',
  invalid_chars: 'Invalid Characters',
  invalid_kilt: 'Not a valid Kilt DID',
  no_linked_account: 'No web3name has been linked to this account',
};

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className={styles.container}>
      <span className={styles.note}>Error</span>
      <div className={styles.claimW3NSteps}>
        <span className={styles.step}>{message}</span>
      </div>
    </div>
  );
};

interface Props {
  error: SearchError;
}

export const ResultsErrors = ({ error }: Props) => {
  return <ErrorMessage message={errorMessages[error]} />;
};
