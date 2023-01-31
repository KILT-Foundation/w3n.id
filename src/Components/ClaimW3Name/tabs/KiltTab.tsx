import { FormEvent, useCallback, useState } from 'react';

import { ChainHelpers } from '@kiltprotocol/sdk-js';

import { web3FromAddress } from '@polkadot/extension-dapp';

import styles from '../ClaimW3Name.module.css';

import {
  getAccounts,
  getW3NameExtrinsic,
  InjectedAccount,
} from '../../../Utils/claimWeb3name-helpers';
import { ClaimingModal } from '../../Modal/Modal';

interface Props {
  web3name: string;
}

export function KiltTab({ web3name }: Props) {
  const [filteredAccounts, setFilteredAccounts] = useState<InjectedAccount[]>(
    [],
  );
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccount>();
  const [connecting, setConnecting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const [claimingStatus, setClaimingStatus] = useState<
    'claiming' | 'success' | 'error'
  >();

  const handleConnectWallets = useCallback(async () => {
    try {
      setConnecting(true);
      const accounts = await getAccounts();
      setFilteredAccounts(accounts);
    } finally {
      setConnecting(false);
    }
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!selectedAccount) return;
      setClaimingStatus('claiming');

      try {
        const { address } = selectedAccount;
        const { extrinsic } = await getW3NameExtrinsic(web3name, address);
        const { signer } = await web3FromAddress(address);
        const signed = await extrinsic.signAsync(address, { signer });

        await ChainHelpers.Blockchain.submitSignedTx(signed);

        setClaimingStatus('success');
      } catch (error) {
        setClaimingStatus('error');
        return;
      }
    },
    [selectedAccount, web3name],
  );
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.claimContents}>
        <p className={styles.topText}>Follow these steps to claim your name:</p>
        <ol type="1" className={styles.steps}>
          <li className={styles.step}>
            <p>Click “Connect to wallet”</p>
            {filteredAccounts.length === 0 && (
              <button
                type="button"
                className={styles.btn}
                onClick={handleConnectWallets}
              >
                Connect to wallet
                {connecting && <span className={styles.spinner} />}
              </button>
            )}
            {filteredAccounts.length > 0 && (
              <p className={styles.loaded}>Accounts loaded</p>
            )}
          </li>
          <li className={styles.step}>
            <p>
              This triggers pop-ups to request access to your Polkadot-enabled
              extensions, including Sporran.
            </p>
          </li>
          <li className={styles.selectAccount}>
            <p>Click “Allow access” on each wallet</p>
            <p>
              Choose the account address you wish to pay the transaction fees
              from (Please ensure you choose a wallet containing enough KILT to
              cover the transaction fee – currently around 0.0045 KILT.)
            </p>
            <div
              role="listbox"
              aria-disabled={filteredAccounts.length === 0}
              className={showOptions ? styles.selectShow : styles.select}
              onClick={() => setShowOptions(!showOptions)}
            >
              {selectedAccount ? (
                <span className={styles.selectText}>
                  {selectedAccount.meta.name} ({selectedAccount.meta.source})
                </span>
              ) : (
                <span className={styles.selectText}>Choose payer account</span>
              )}

              {showOptions && (
                <ul className={styles.options}>
                  {filteredAccounts.map((account) => (
                    <li
                      className={styles.option}
                      key={account.address}
                      onClick={() => setSelectedAccount(account)}
                    >
                      <span className={styles.optionText}>
                        {account.meta.name} ({account.meta.source})
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
          <li className={styles.step}>
            <p>Click “CLAIM NOW”</p>
            <p>
              This opens up Sporran. Select the DID you want to connect to this
              web3name. Then enter your password and click “Sign”
            </p>
            <button
              type="submit"
              className={styles.btn}
              disabled={!selectedAccount}
            >
              Claim now
            </button>
          </li>
          <ClaimingModal
            claimingStatus={claimingStatus}
            onClose={() => setClaimingStatus(undefined)}
            onSuccess={() => window.location.reload()}
            web3name={web3name}
          />
        </ol>
        <p className={styles.bottomText}>That’s it!</p>
      </div>
    </form>
  );
}
