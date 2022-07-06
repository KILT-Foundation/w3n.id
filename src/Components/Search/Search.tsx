import { useCallback, useEffect, useState } from 'react';

import { DidServiceEndpoint, DidUri, Did } from '@kiltprotocol/sdk-js';

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

import { ServiceEndpoint } from '../ServiceEndpoint/ServiceEndpoint';
import { DidSection } from '../DidSection/DidSection';
import { Web3Name } from '../Web3Name/Web3Name';
import { VerificationMethod } from '../VerificationMethod/VerificationMethod';
import { ResultsErrors } from '../ResultsErrors/ResultsErrors';

export const Search = () => {
  const [searchedText, setSearchedText] = useState<string>('');
  const [unclaimedName, setUnclaimedName] = useState<string>('');
  const [serviceEndpoints, setServiceEndpoints] = useState<
    DidServiceEndpoint[]
  >([]);
  const [did, setDid] = useState<DidUri>();
  const [w3Name, setW3Name] = useState<string>('');
  const [errors, setErrors] = useState<
    | 'Not Claimed'
    | 'Max limit'
    | 'Invalid Chars'
    | 'Min limit'
    | 'Invalid Kilt'
    | null
  >(null);

  window.onpopstate = function () {
    setErrors(null);
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
        setW3Name('w3n:' + didDocInstance.web3name);
        replaceHistoryState(shouldChangeUrl, didDocInstance.web3name);
      } else {
        setW3Name('No web3name found');
      }
    } catch {
      setErrors('Invalid Kilt');
    }
  };
  const resolveDidDocument = useCallback(
    async (textFromSearch: string, shouldChangeUrl = true) => {
      pushHistoryState(shouldChangeUrl, textFromSearch);
      if (!textFromSearch.length) return;
      if (textFromSearch.length < 3) {
        setErrors('Min limit');
        return;
      }

      try {
        if (Did.Utils.validateKiltDidUri(textFromSearch)) {
          await setDidDocumentFromDid(textFromSearch, shouldChangeUrl);
          return;
        }
        // throws if not valid Kilt DID, but could still be valid web3name
      } catch {
        if (isSearchedTextDid(textFromSearch)) {
          setErrors('Invalid Kilt');
          return;
        }

        textFromSearch = textFromSearch.toLocaleLowerCase();
        setSearchedText(textFromSearch);
        replaceHistoryState(shouldChangeUrl, textFromSearch);

        if (textFromSearch.length > 30) {
          setErrors('Max limit');
          return;
        }

        if (stringStartsWithW3(textFromSearch)) {
          const name = textFromSearch.split(':').pop();
          if (name) {
            const didDocumentInstance = await getDidDocFromW3Name(name);
            if (didDocumentInstance) {
              setServiceEndpoints(didDocumentInstance.endpoints);
              setDid(didDocumentInstance.did);
              setW3Name('w3n:' + name);
              replaceHistoryState(shouldChangeUrl, name);
            } else {
              setUnclaimedName(name);
              setErrors('Not Claimed');
            }
          }
          return;
        }
        if (!validSearchedText(textFromSearch)) {
          setErrors('Invalid Chars');
          return;
        }

        const didDocumentInstance = await getDidDocFromW3Name(textFromSearch);
        if (didDocumentInstance) {
          setServiceEndpoints(didDocumentInstance.endpoints);
          setDid(didDocumentInstance.did);
          setW3Name('w3n:' + textFromSearch);
        } else {
          replaceHistoryState(shouldChangeUrl, textFromSearch);
          setUnclaimedName(textFromSearch);
          setErrors('Not Claimed');
        }
      }
    },
    [],
  );

  const handleSearch = async () => {
    if (searchedText.length < 3) {
      return;
    }
    setErrors(null);
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
    <main className={styles.container}>
      <div className={styles.search}>
        <div className={styles.searchBar}>
          <input
            className={styles.input}
            type="input"
            value={searchedText}
            onKeyDown={handleKeypress}
            onInput={(e) =>
              setSearchedText((e.target as HTMLInputElement).value)
            }
            placeholder="Enter web3name or DID here"
          />

          <div className={styles.buttonWrapper}>
            <button
              className={
                searchedText.length < 3 ? styles.buttonGrey : styles.button
              }
              onClick={() => handleSearch()}
              type="submit"
            >
              LOOK UP
            </button>
          </div>
        </div>
      </div>
      <ResultsErrors name={unclaimedName} errors={errors} />

      {did && (
        <div className={styles.results}>
          <DidSection did={did} />
          <Web3Name web3Name={w3Name} />
          <div className={styles.didDocument}>
            {serviceEndpoints.length > 0 && (
              <span className={styles.title}>Service</span>
            )}

            <div className={styles.endpoints}>
              {serviceEndpoints.map((serviceEndpoint: DidServiceEndpoint) => (
                <ServiceEndpoint
                  key={serviceEndpoint.id}
                  endpointType={serviceEndpoint.types[0]}
                  endpointURL={serviceEndpoint.urls[0]}
                  did={did}
                />
              ))}
            </div>
          </div>
          <VerificationMethod did={did} />
        </div>
      )}
    </main>
  );
};
