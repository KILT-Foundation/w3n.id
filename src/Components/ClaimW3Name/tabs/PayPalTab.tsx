import { SyntheticEvent, useCallback, useState } from 'react';
import { web3Enable } from '@polkadot/extension-dapp';

import styles from '../ClaimW3Name.module.css';

import { getW3NameExtrinsic } from '../../../Utils/claimWeb3name-helpers';

interface TabSection {
  web3name: string;
}

export const PayPalSection = ({ web3name }: TabSection) => {
  const [tx, setTx] = useState<string | undefined>();
  const [did, setDid] = useState<string | undefined>();
  const connectWalletGetTx = useCallback(async () => {
    await web3Enable('web3name Claiming');

    const { extrinsic, didKeyUri } = await getW3NameExtrinsic(
      web3name,
      process.env.REACT_CHECKOUT_ADDRESS || '',
    );
    setTx(extrinsic.toHex());
    setDid(didKeyUri);
  }, [web3name]);

  const handleSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();
      if (!tx) {
        return;
      }
      const checkoutUrl =
        process.env.REACT_CHECKOUT_SERVICE_URL || 'https://checkout.kilt.io';
      window.open(`${checkoutUrl}?tx=${tx}&address=${did}&w3n=${web3name}`);
    },
    [tx, did, web3name],
  );

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
            through the process (total cost: EUR 5.00).
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
