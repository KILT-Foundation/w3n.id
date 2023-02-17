import { FormEvent, Fragment, useCallback, useRef, useState } from 'react';
import { ChainHelpers, BalanceUtils } from '@kiltprotocol/sdk-js';
import { web3FromSource } from '@polkadot/extension-dapp';

import styles from '../ClaimW3Name.module.css';

import {
  apiPromise,
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
  const [unusableAccounts, setUnusableAccounts] = useState<InjectedAccount[]>(
    [],
  );
  const balances = useRef(
    new Map<string, typeof BalanceUtils.KILT_COIN>(),
  ).current;

  const [selectedAccount, setSelectedAccount] = useState<InjectedAccount>();
  const [connecting, setConnecting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const [claimingStatus, setClaimingStatus] = useState<
    'claiming' | 'success' | 'error'
  >();

  const handleConnectWallets = useCallback(async () => {
    try {
      setConnecting(true);

      const api = await apiPromise;
      const accounts = await getAccounts();

      for (const { address } of accounts) {
        if (balances.has(address)) {
          continue;
        }
        const result = await api.query.system.account(address);
        const { free, miscFrozen } = result.data;
        const transferable = free.sub(miscFrozen);
        balances.set(address, transferable);
      }

      const deposit = api.consts.web3Names.deposit;
      const fee = BalanceUtils.toFemtoKilt('0.0045'); // TODO: update when it changes
      const total = deposit.add(fee);

      const usable = accounts.filter(({ address }) =>
        balances.get(address)?.gte(total),
      );
      const unusable = accounts.filter(({ address }) =>
        balances.get(address)?.lt(total),
      );

      setFilteredAccounts(usable);
      setUnusableAccounts(unusable);
    } finally {
      setConnecting(false);
    }
  }, [balances]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!selectedAccount) return;
      setClaimingStatus('claiming');

      try {
        const { address } = selectedAccount;
        const { extrinsic } = await getW3NameExtrinsic(web3name, address);
        const { signer } = await web3FromSource(selectedAccount.meta.source);
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
        <p className={styles.topText}>
          Follow these steps to claim your name and pay with KILT:
        </p>
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
              browser extensions, including Sporran
            </p>
          </li>
          <li className={styles.selectAccount}>
            <p>Click “Allow access” for your Sporran</p>
            <p>
              Choose the account address you wish to pay from (Please ensure you
              choose a wallet containing enough KILT to cover the transaction
              fee – currently around 0.0003 KILT – and deposit – currently
              around 0.1181 KILT)
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
                <span className={styles.selectText}>Pay with KILT</span>
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
                  {unusableAccounts.length > 0 && (
                    <Fragment>
                      <li
                        className={styles.option}
                        aria-disabled="true"
                        onClick={(event) => event.stopPropagation()}
                      >
                        Insufficient transferable balance:
                      </li>
                      {unusableAccounts.map((account) => {
                        const balance = balances.get(account.address);
                        if (!balance) {
                          return null;
                        }
                        const formatted =
                          BalanceUtils.formatKiltBalance(balance);
                        const full = formatted === '0' ? '0 KILT' : formatted;
                        return (
                          <li
                            className={styles.option}
                            aria-disabled="true"
                            onClick={(event) => event.stopPropagation()}
                            key={account.address}
                          >
                            <span className={styles.optionText}>
                              [{full}] {account.meta.name}
                            </span>
                          </li>
                        );
                      })}
                    </Fragment>
                  )}
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
    </form>
  );
}
