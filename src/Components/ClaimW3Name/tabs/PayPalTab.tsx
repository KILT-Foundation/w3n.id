import { SyntheticEvent, useCallback, useState } from 'react';
import { web3Enable } from '@polkadot/extension-dapp';

import { Did, DidUri } from '@kiltprotocol/sdk-js';

import styles from '../ClaimW3Name.module.css';

import { getW3NameExtrinsic } from '../../../Utils/claimWeb3name-helpers';
import { getCheckoutURL } from '../../../Utils/useTXDTransmitter';

interface TabSection {
  web3name: string;
  web3namePricing: string;
  paymentAddress: string;
}

export const PayPalSection = ({
  web3name,
  web3namePricing,
  paymentAddress,
}: TabSection) => {
  const [tx, setTx] = useState<string>();
  const [did, setDid] = useState<string>();

  const connectWalletGetTx = useCallback(async () => {
    await web3Enable('web3name Claiming');

    const { extrinsic, didKeyUri } = await getW3NameExtrinsic(
      web3name,
      paymentAddress,
    );

    setTx(extrinsic.toHex());

    setDid(Did.parse(didKeyUri as DidUri).did);
  }, [web3name, paymentAddress]);

  const handleSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();

      if (!tx || !did) {
        return;
      }

      const url = new URL(getCheckoutURL());

      url.searchParams.set('tx', tx);
      url.searchParams.set('did', did);
      url.searchParams.set('web3name', web3name);

      window.open(url.toString());
    },
    [tx, did, web3name],
  );

  const formatedCosts = parseFloat(web3namePricing).toLocaleString(undefined, {
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'code',
  });

  return (
    <form className={styles.claimContents} onSubmit={handleSubmit}>
      <p className={styles.topText}>Follow these steps to claim your name:</p>
      <ol type="1" className={styles.steps}>
        <li className={styles.step}>
          <p>Click “CHOOSE IDENTITY”</p>
          <p>
            This opens up Sporran. Select the DID you want to connect to this
            web3name. Then enter your password and click “Sign”
          </p>
          <button onClick={connectWalletGetTx} className={styles.btn}>
            CHOOSE IDENTITY
          </button>
        </li>

        <li className={styles.step}>
          <p>Link to checkout page</p>
          <p>
            To continue the payment process with PayPal click the button. You
            will be redirected to our checkout service which will lead you
            through the process (total cost: {formatedCosts}).
          </p>
          <button type="submit" className={styles.btn} disabled={!tx}>
            CHECKOUT
          </button>
        </li>
      </ol>

      <p className={styles.bottomText}>That’s it!</p>
    </form>
  );
};
