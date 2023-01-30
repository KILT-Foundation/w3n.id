import { useState } from 'react';

import * as styles from './ClaimW3Name.module.css';

import { Tabs } from '../Tab/Tab';

import {
  useApiTXDAddress,
  useApiTXDCosts,
} from '../../Utils/useTxDtransmitter';

import { FormError } from '../FormError/FormError';

import { KiltSection } from './tabs/KiltTab';
import { PayPalSection } from './tabs/PayPalTab';

interface ClaimingProps {
  web3name: string;
}

function ClaimingSection({ web3name }: ClaimingProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const { data: costData, error: costError } = useApiTXDCosts();

  const { data: paymentAddressData, error: paymentAddressError } =
    useApiTXDAddress();

  if (costError || paymentAddressError) {
    return (
      <div className={styles.error}>
        {costError && <FormError error={costError} />}
        {paymentAddressError && <FormError error={costError} />}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.text}>
        Follow the steps below and this name will be yours!
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
          <Tabs>
            <KiltSection web3name={web3name} />
            <PayPalSection
              web3name={web3name}
              paymentAddress={paymentAddressData?.paymentAddress ?? ''}
              web3namePricing={costData?.w3n ?? ''}
            />
          </Tabs>
        )}
      </div>
    </div>
  );
}

interface Props {
  web3name: string;
}

export const ClaimW3Name = ({ web3name }: Props) => {
  const maintenanceMode = process.env.REACT_APP_MAINTENANCE === 'true';

  return (
    <section className={styles.container}>
      <span className={styles.title}>Claim it</span>

      {maintenanceMode ? (
        <span className={styles.text}>Coming Soon</span>
      ) : (
        <ClaimingSection web3name={web3name} />
      )}
    </section>
  );
};
