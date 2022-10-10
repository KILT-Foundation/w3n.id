import { useCallback, useState, SyntheticEvent } from 'react';

import { web3FromAddress } from '@polkadot/extension-dapp';

import { ChainHelpers } from '@kiltprotocol/sdk-js';

import * as styles from './ClaimW3Name.module.css';

import {
  getAccounts,
  getW3NameExtrinsic,
  InjectedAccount,
} from '../../Utils/claimWeb3name-helpers';
import { ClaimingModal } from '../Modal/Modal';

interface ClaimingProps {
  web3name: string;
}

function ClaimingSection({ web3name }: ClaimingProps) {
  const [filteredAccounts, setFilteredAccounts] = useState<InjectedAccount[]>(
    [],
  );
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccount>();
  const [showOptions, setShowOptions] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const [claimingStatus, setClaimingStatus] = useState<
    'claiming' | 'success' | 'error'
  >();

  const handleConnectWallets = useCallback(async () => {
    const accounts = await getAccounts();
    setFilteredAccounts(accounts);
  }, []);

  const handleSubmit = useCallback(
    async (event: SyntheticEvent) => {
      event.preventDefault();

      if (!selectedAccount) return;
      setClaimingStatus('claiming');

      try {
        const { address } = selectedAccount;
        const extrinsic = await getW3NameExtrinsic(web3name, address);
        const { signer } = await web3FromAddress(address);
        const signed = await extrinsic.signAsync(address, { signer });

        await ChainHelpers.BlockchainUtils.submitSignedTx(signed);

        setClaimingStatus('success');
      } catch (error) {
        setClaimingStatus('error');
        return;
      }
    },
    [selectedAccount, web3name],
  );

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit}>
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
          <div className={styles.claimContents}>
            <p className={styles.topText}>
              Follow these steps to claim your name:
            </p>
            <ol type="1" className={styles.steps}>
              <li className={styles.step}>
                <p>Click “Connect to wallet”</p>
                <button
                  type="button"
                  className={styles.btn}
                  onClick={handleConnectWallets}
                >
                  Connect to wallet
                </button>
              </li>
              <li className={styles.step}>
                <p>
                  This triggers pop-ups to request access to your
                  Polkadot-enabled extensions, including Sporran.
                </p>
              </li>
              <li className={styles.selectAccount}>
                <p>Click “Allow access” on each wallet</p>
                <p>
                  Choose the account address you wish to pay the transaction
                  fees from (Please ensure you choose a wallet containing enough
                  KILT to cover the transaction fee – currently around 0.0045
                  KILT.)
                </p>
                <div
                  role="listbox"
                  aria-disabled={filteredAccounts.length === 0}
                  className={showOptions ? styles.selectShow : styles.select}
                  onClick={() => setShowOptions(!showOptions)}
                >
                  {selectedAccount ? (
                    <span className={styles.selectText}>
                      {selectedAccount.meta.name} ({selectedAccount.meta.source}
                      )
                    </span>
                  ) : (
                    <span className={styles.selectText}>
                      Choose payer account
                    </span>
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
                  This opens up Sporran. Select the DID you want to connect to
                  this web3name. Then enter your password and click “Sign”
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
        )}
      </div>
    </form>
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
