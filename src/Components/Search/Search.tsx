import { Fragment, useCallback, useEffect, useRef, useState } from 'react';

import { DidServiceEndpoint, DidUri, Did } from '@kiltprotocol/sdk-js';

import { decodeAddress } from '@polkadot/util-crypto';

import styles from './Search.module.css';

import {
  getDidDocFromW3Name,
  validSearchedText,
  stringStartsWithW3,
  pushHistoryState,
  getServiceEndpointsW3Name,
  replaceHistoryState,
  isSearchedTextDid,
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

interface Props {
  did?: DidUri;
  web3name: string;
  serviceEndpoints: DidServiceEndpoint[];
  isClaimed: boolean;
}

function ResolvedData({ did, web3name, serviceEndpoints, isClaimed }: Props) {
  return (
    <div className={styles.results}>
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
      {!isClaimed ? (
        <Unclaimed web3name={web3name} />
      ) : (
        <Fragment>
          <DidSection did={did} />
          <Web3Name web3Name={web3name} />
          <EndpointSection did={did} serviceEndpoints={serviceEndpoints} />
          <VerificationMethod did={did} />
        </Fragment>
      )}
    </div>
  );
}

interface UnclaimProps {
  web3name: string;
}

function Unclaimed({ web3name }: UnclaimProps) {
  return (
    <Fragment>
      <ClaimW3Name web3name={web3name} />
      <ClaimingGuide />
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
  const modalRef = useRef(null);

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
      const didDocInstance = await getServiceEndpointsW3Name(did);
      setDid(did);
      if (didDocInstance) {
        setServiceEndpoints(didDocInstance.endpoints);
      }
      if (didDocInstance.web3name) {
        setW3Name(didDocInstance.web3name);
        replaceHistoryState(shouldChangeUrl, didDocInstance.web3name);
      } else {
        setW3Name('no web3name yet');
      }
    } catch {
      setError('invalid_kilt');
    }
  };

  const resolveDidDocument = useCallback(
    async (textFromSearch: string, shouldChangeUrl = true) => {
      pushHistoryState(shouldChangeUrl, textFromSearch);
      if (!textFromSearch.length) return;
      if (textFromSearch.length < 3) {
        setError('min_limit');
        return;
      }

      try {
        if (Did.Utils.validateKiltDidUri(textFromSearch)) {
          await setDidDocumentFromDid(textFromSearch, shouldChangeUrl);
          return;
        }
        // throws if not valid Kilt DID, but could still be valid Kilt address or web3name
      } catch {}

      if (isSearchedTextDid(textFromSearch)) {
        setError('invalid_kilt');
        setW3Name('');
        return;
      }

      try {
        decodeAddress(textFromSearch);

        const address = textFromSearch;

        const identifier = await Did.AccountLinks.queryConnectedDidForAccount(
          address,
        );

        if (!identifier) {
          setError('no_linked_account');
          setW3Name('');
          return;
        }
        const did = Did.Utils.getKiltDidFromIdentifier(identifier, 'full');

        await setDidDocumentFromDid(did, shouldChangeUrl);
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
          const didDocumentInstance = await getDidDocFromW3Name(name);
          setW3Name(name);
          if (didDocumentInstance) {
            setServiceEndpoints(didDocumentInstance.endpoints);
            setDid(didDocumentInstance.did);
            setIsClaimed(true);
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

      const didDocumentInstance = await getDidDocFromW3Name(textFromSearch);
      setW3Name(textFromSearch);
      if (didDocumentInstance) {
        setServiceEndpoints(didDocumentInstance.endpoints);
        setDid(didDocumentInstance.did);
        setIsClaimed(true);
      } else {
        replaceHistoryState(shouldChangeUrl, textFromSearch);
        setIsClaimed(false);
      }
    },
    [],
  );

  const handleSearch = async () => {
    if (searchedText.length < 3) {
      return;
    }
    setError(undefined);
    if (did) {
      setServiceEndpoints([]);
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
    <Fragment>
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
      {error && <ResultsErrors error={error} />}

      <section className={did ? styles.mainResults : styles.main}>
        {w3Name && (
          <ResolvedData
            did={did}
            web3name={w3Name}
            serviceEndpoints={serviceEndpoints}
            isClaimed={isClaimed}
          />
        )}
        <LinkingInfo />
      </section>
    </Fragment>
  );
};
