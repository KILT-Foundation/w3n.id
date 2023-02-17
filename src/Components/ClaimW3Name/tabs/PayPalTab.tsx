import { useCallback, useState } from 'react';
import { web3Enable } from '@polkadot/extension-dapp';

import { Did } from '@kiltprotocol/sdk-js';

import styles from '../ClaimW3Name.module.css';

import { getW3NameExtrinsic } from '../../../Utils/claimWeb3name-helpers';
import { checkoutServiceURL } from '../../../Utils/useTXDTransmitter';

interface Props {
  web3name: string;
  cost: string;
  address: string;
}

export function PayPalTab({ web3name, cost, address }: Props) {
  const [checkoutURL, setCheckoutURL] = useState<string>();

  const connectWalletGetTx = useCallback(async () => {
    await web3Enable('web3name Claiming');

    const { extrinsic, didKeyUri } = await getW3NameExtrinsic(
      web3name,
      address,
    );

    const url = new URL(checkoutServiceURL);

    url.searchParams.set('tx', extrinsic.toHex());
    url.searchParams.set('did', Did.parse(didKeyUri).did);
    url.searchParams.set('web3name', web3name);
    setCheckoutURL(url.toString());
  }, [web3name, address]);

  const costs = parseFloat(cost).toLocaleString(undefined, {
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'code',
  });

  return (
    <div className={styles.claimContents}>
      <p className={styles.topText}>Follow these steps to claim your name:</p>
      <ol type="1" className={styles.steps}>
        <li className={styles.step}>
          <p>Click “Choose Identity”</p>
          <p>
            This will open your Sporran. Select the DID you want to connect to
            this web3name. Then enter your password to approve the transaction
            and click “Sign”
          </p>
          <button onClick={connectWalletGetTx} className={styles.btn}>
            Choose identity
          </button>
        </li>

        <li className={styles.step}>
          <p>Go to Checkout Service</p>
          <p>
            Click “Checkout” to be directed to the Checkout Service and pay with
            PayPal (Total cost: {costs}).
          </p>

          <a
            href={checkoutURL}
            aria-disabled={!checkoutURL}
            className={styles.btn}
          >
            Checkout
          </a>
        </li>
      </ol>

      <section className={styles.bottom}>
        <p className={styles.bottomText}>That’s it!</p>
        <a
          className={styles.anchor}
          href="https://kilt-protocol.org/files/How-to-Guide-Get-Your-web3name.pdf"
        >
          How-to Guide, web3name
        </a>
      </section>
    </div>
  );
}
