import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

import {
  Did,
  DidServiceEndpoint,
  DidUri,
  KiltAddress,
} from '@kiltprotocol/sdk-js';

import { decodeAddress } from '@polkadot/util-crypto';

import * as styles from './Search.module.css';

import {
  isSearchedTextDid,
  pushHistoryState,
  replaceHistoryState,
  stringStartsWithW3,
  validSearchedText,
} from '../../Utils/w3n-helpers';

import { EndpointSection } from '../ServiceEndpoint/ServiceEndpoint';
import { DidSection } from '../DidSection/DidSection';
import { Web3Name } from '../Web3Name/Web3Name';
import { VerificationMethod } from '../VerificationMethod/VerificationMethod';
import { ResultsErrors, SearchError } from '../ResultsErrors/ResultsErrors';
import { LinkingInfo } from '../LinkingInfo/LinkingInfo';
import { useHandleOutsideClick } from '../../Hooks/useHandleOutsideClick';
import { ClaimW3Name } from '../ClaimW3Name/ClaimW3Name';
import { ClaimingGuide } from '../ClaimingGuide/ClaimingGuide';
import { LinkedAccounts } from '../LinkedAccounts/LinkedAccounts';
import { apiPromise } from '../../Utils/claimWeb3name-helpers';

interface Props {
  did?: DidUri;
  web3name: string;
  serviceEndpoints: DidServiceEndpoint[];
  isClaimed: boolean;
  linkedAccounts: string[];
}

function ResolvedData({
  did,
  web3name,
  serviceEndpoints,
  isClaimed,
  linkedAccounts,
}: Props) {
  const noWeb3nameForDid = web3name === 'no web3name yet';

  return (
    <div className={noWeb3nameForDid ? styles.noWeb3name : styles.results}>
      {!noWeb3nameForDid && (
        <div className={styles.modeContainer}>
          <label
            className={
              !isClaimed
                ? styles.availableActiveMode
                : styles.availableInactiveMode
            }
          >
            Available
          </label>
          <label
            className={
              isClaimed ? styles.takenActiveMode : styles.takenInactiveMode
            }
          >
            Taken
          </label>
        </div>
      )}

      {!isClaimed ? (
        <Fragment>
          <Web3Name web3Name={web3name} />
          <Unclaimed web3name={web3name} />
        </Fragment>
      ) : (
        <Fragment>
          <Web3Name web3Name={web3name} />
          <DidSection did={did} />
          <EndpointSection did={did} serviceEndpoints={serviceEndpoints} />
          <LinkedAccounts linkedAccounts={linkedAccounts} />
          <VerificationMethod did={did} />
        </Fragment>
      )}
    </div>
  );
}

interface UnclaimedProps {
  web3name: string;
}

function Unclaimed({ web3name }: UnclaimedProps) {
  const maintenanceMode = process.env.REACT_APP_MAINTENANCE === 'true';
  return (
    <Fragment>
      <ClaimW3Name web3name={web3name} />

      {!maintenanceMode && <ClaimingGuide />}
    </Fragment>
  );
}

export const Search = () => {
  const [searchedText, setSearchedText] = useState<string>('');
  const [isClaimed, setIsClaimed] = useState(true);
  const [serviceEndpoints, setServiceEndpoints] = useState<
    DidServiceEndpoint[]
  >([]);
  const [did, setDid] = useState<DidUri>();
  const [w3Name, setW3Name] = useState<string>('');
  const [error, setError] = useState<SearchError>();
  const [showModal, setShowModal] = useState(false);
  const [linkedAccounts, setLinkedAccounts] = useState<string[]>([]);
  const modalRef = useRef(null);
  const maintenanceMode = process.env.REACT_APP_MAINTENANCE === 'true';

  useHandleOutsideClick(modalRef, () => setShowModal(!showModal));

  window.onpopstate = function () {
    setError(undefined);
    const path = window.location.pathname.split('/')[1];
    setSearchedText(path);
    if (searchedText.length) {
      if (serviceEndpoints.length) {
        setServiceEndpoints([]);
        setDid(undefined);
        setW3Name('');
      }
      resolveDidDocument(path, false);
    }
  };

  const setDidDocumentFromDid = async (
    did: DidUri,
    shouldChangeUrl: boolean,
  ) => {
    try {
      const api = await apiPromise;

      const { document, web3Name, accounts } = Did.linkedInfoFromChain(
        await api.call.did.query(Did.toChain(did)),
      );

      setLinkedAccounts(accounts);
      setDid(did);

      if (document.service) {
        setServiceEndpoints(document.service);
      }

      if (web3Name) {
        setW3Name(web3Name);
        replaceHistoryState(shouldChangeUrl, web3Name);
      } else {
        setW3Name('no web3name yet');
      }
    } catch {
      setError('invalid_kilt');
    }
  };

  const resolveDidDocument = useCallback(
    async (textFromSearch: string, shouldChangeUrl = true) => {
      const api = await apiPromise;

      pushHistoryState(shouldChangeUrl, textFromSearch);
      if (!textFromSearch.length) return;
      if (textFromSearch.length < 3) {
        setError('min_limit');
        return;
      }

      try {
        const did = textFromSearch as DidUri;
        Did.validateUri(did);
        await setDidDocumentFromDid(did, shouldChangeUrl);
        setIsClaimed(true);
        return;
        // throws if not valid Kilt DID, but could still be valid Kilt address or web3name
      } catch {}

      if (isSearchedTextDid(textFromSearch)) {
        setError('invalid_kilt');
        setW3Name('');
        return;
      }

      try {
        const address = textFromSearch as KiltAddress;
        decodeAddress(address);

        const result = await api.call.did.queryByAccount(
          Did.accountToChain(address),
        );

        if (result.isNone) {
          setError('no_linked_account');
          setW3Name('');
          return;
        }
        const did = Did.linkedInfoFromChain(result).document.uri;

        await setDidDocumentFromDid(did, shouldChangeUrl);
        setIsClaimed(true);
        return;

        // throws if not a valid Kilt address, but could still be valid web3name
      } catch {}

      textFromSearch = textFromSearch.toLocaleLowerCase();
      setSearchedText(textFromSearch);
      replaceHistoryState(shouldChangeUrl, textFromSearch);

      if (textFromSearch.length > 30) {
        setError('max_limit');
        setW3Name('');
        return;
      }

      if (stringStartsWithW3(textFromSearch)) {
        const name = textFromSearch.split(':').pop();
        if (name) {
          setW3Name(name);
          const result = await api.call.did.queryByWeb3Name(name);
          if (result.isSome) {
            const { document, accounts } = Did.linkedInfoFromChain(result);
            setServiceEndpoints(document.service || []);
            setDid(document.uri);
            setIsClaimed(true);
            setLinkedAccounts(accounts);

            replaceHistoryState(shouldChangeUrl, name);
          } else {
            setIsClaimed(false);
          }
        }
        return;
      }
      if (!validSearchedText(textFromSearch)) {
        setError('invalid_chars');
        setW3Name('');
        return;
      }

      const result = await api.call.did.queryByWeb3Name(textFromSearch);
      setW3Name(textFromSearch);
      if (result.isSome) {
        const { document, accounts } = Did.linkedInfoFromChain(result);
        setServiceEndpoints(document.service || []);
        setDid(document.uri);
        setIsClaimed(true);
        setLinkedAccounts(accounts);
      } else {
        replaceHistoryState(shouldChangeUrl, textFromSearch);
        setIsClaimed(false);
      }
    },
    [],
  );

  const handleSearch = async () => {
    if (!searchedText) {
      return;
    }
    setError(undefined);
    if (did) {
      setServiceEndpoints([]);
      setLinkedAccounts([]);
      setDid(undefined);
      setW3Name('');
    }
    await resolveDidDocument(searchedText);
  };

  const handleKeypress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') handleSearch();
  };
  useEffect(() => {
    const path = window.location.pathname.split('/')[1];
    if (path !== '') {
      setSearchedText(path);
      resolveDidDocument(path);
    }
  }, [resolveDidDocument]);
  return (
    <main className={styles.container}>
      <div className={styles.search}>
        <p className={styles.infoText}>
          Find an available web3name to <b>claim</b>, or <b>look up</b> an
          existing one!
        </p>
        <div className={styles.searchBar}>
          <input
            className={styles.input}
            type="input"
            value={searchedText}
            onKeyDown={handleKeypress}
            onInput={(e) =>
              setSearchedText((e.target as HTMLInputElement).value)
            }
            placeholder="Type web3name, DID or account address here"
          />

          <button
            className={styles.button}
            onClick={() => handleSearch()}
            type="submit"
            aria-label="search"
          />
        </div>
        <div className={styles.infoContainer}>
          <p className={styles.infoTextAddress}>
            You can also look up DIDs or account addresses
          </p>
          <button className={styles.infoBtn} onClick={() => setShowModal(true)}>
            {showModal && (
              <div className={styles.modal}>
                <p className={`${styles.text} ${styles.top}`} ref={modalRef}>
                  Searching by web3name, DID or account address will give all
                  the information, including credentials, publicly linked to
                  that digital identity.
                </p>
              </div>
            )}
          </button>
        </div>
      </div>

      <section className={styles.main}>
        {w3Name && !error && (
          <ResolvedData
            did={did}
            web3name={w3Name}
            serviceEndpoints={serviceEndpoints}
            isClaimed={isClaimed}
            linkedAccounts={linkedAccounts}
          />
        )}

        {error && <ResultsErrors error={error} did={did} />}

        {!maintenanceMode && <LinkingInfo />}
      </section>
    </main>
  );
};
