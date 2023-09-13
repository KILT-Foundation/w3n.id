import { type DidUri } from '@kiltprotocol/sdk-js';

import * as styles from './ResultsErrors.module.css';

import { Web3Name } from '../Web3Name/Web3Name';
import { DidSection } from '../DidSection/DidSection';
import { EndpointSection } from '../ServiceEndpoint/ServiceEndpoint';
import { LinkedAccounts } from '../LinkedAccounts/LinkedAccounts';
import { VerificationMethod } from '../VerificationMethod/VerificationMethod';

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
  invalid_kilt: 'DID not found',
  no_linked_account: 'account address not connected to a KILT DID',
};

interface Props {
  error: SearchError;
  did?: DidUri;
}

export const ResultsErrors = ({ error, did }: Props) => {
  return (
    <div className={styles.container}>
      <Web3Name />
      <DidSection error={errorMessages[error]} />
      <EndpointSection />
      <LinkedAccounts />
      {did && <VerificationMethod did={did} />}
    </div>
  );
};
