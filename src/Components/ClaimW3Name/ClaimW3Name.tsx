import { useState } from 'react';

import * as styles from './ClaimW3Name.module.css';

import { PaymentTabs } from '../PaymentTabs/PaymentTabs';

import {
  useApiTXDAddress,
  useApiTXDCosts,
} from '../../Utils/useTXDTransmitter';

import { FormError } from '../FormError/FormError';

import { KiltTab } from './tabs/KiltTab';
import { PayPalTab } from './tabs/PayPalTab';

interface ClaimingProps {
  web3name: string;
  cost: string;
  address: string;
}

function ClaimingSection({ web3name, cost, address }: ClaimingProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={styles.wrapper}>
      <span className={styles.text}>
        Follow the steps below and this name will be yours! If you don’t have
        your Sporran wallet and DID, see the guides below.
      </span>

      <div className={styles.claimContainer}>
        <button
          className={styles.controlBtn}
          onClick={() => setIsExpanded(!isExpanded)}
          type="button"
          aria-expanded={isExpanded}
        >
          Claim w3n:{web3name}
        </button>
        {isExpanded && (
          <PaymentTabs>
            <KiltTab web3name={web3name} />
            <PayPalTab web3name={web3name} address={address} cost={cost} />
          </PaymentTabs>
        )}
      </div>
    </div>
  );
}

interface Props {
  web3name: string;
}

// function isEmptyObject(obj: unknown) {
//   if (typeof obj === 'object' && obj != null) {
//     return Object.entries(obj).length < 1;
//   }
//   return false;
// }

export const ClaimW3Name = ({ web3name }: Props) => {
  const maintenanceMode = process.env.REACT_APP_MAINTENANCE === 'true';

  const cost = useApiTXDCosts();

  const txd = useApiTXDAddress();

  console.log('stringified cost: ', JSON.stringify(cost, null, 2));
  console.log('cost: ', cost);
  console.log('typeof cost.error: ', typeof cost.error);
  console.log('cost: ', JSON.stringify(cost.error));

  console.log('stringified txd: ', JSON.stringify(txd, null, 2));
  console.log('txd: ', txd);
  console.log('typeof txd.error: ', typeof txd.error);
  console.log('txd: ', JSON.stringify(txd.error));

  if (cost.error !== undefined || txd.error !== undefined) {
    return (
      <div className={styles.error}>
        {cost.error !== undefined && <FormError error={cost.error} />}
        {txd.error !== undefined && <FormError error={txd.error} />}
      </div>
    );
  }

  if (!cost.data?.w3n || !txd.data?.paymentAddress) {
    return null;
  }

  return (
    <section className={styles.container}>
      <span className={styles.title}>Claim it</span>

      {maintenanceMode ? (
        <span className={styles.text}>Coming Soon</span>
      ) : (
        <ClaimingSection
          web3name={web3name}
          cost={cost.data.w3n}
          address={txd.data.paymentAddress}
        />
      )}
    </section>
  );
};
