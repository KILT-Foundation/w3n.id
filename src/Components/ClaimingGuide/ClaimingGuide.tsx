import { useState } from 'react';

import * as styles from './ClaimingGuide.module.css';

export const OnChainDidGuide = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.window}>
      <button
        className={styles.controlBtn}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        2. Create your on-chain DID
      </button>
      {isExpanded && (
        <div className={styles.windowContents}>
          <p className={styles.onchainGuide}>
            Your decentralized Identifier (DID) is a unique set of numbers and
            letters that represents your identity, like a digital fingerprint.
            When you upgrade to an on-chain DID, you can link multiple things to
            your DID including:
          </p>
          <ul className={styles.list}>
            <li>Your unique web3name</li>
            <li>
              As many of your Polkadot ecosystem addresses (and soon, Ethereum)
              that you wish
            </li>
            <li>
              Any credentials you want to make public, such as social media
              handles, GitHub and email addresses
            </li>
            <li>Communication endpoints, e.g., your website</li>
          </ul>
          <p className={styles.onchainGuide}>
            Upgrading to an on-chain DID requires a deposit of 2 KILT and a
            small transaction fee (around 0.0045 KILT).
          </p>

          <h1 className={styles.listHeading}>To upgrade to an on-chain DID:</h1>
          <ol className={styles.numberedList}>
            <li>Open your Sporran extension</li>
            <li>Click “Upgrade to on-chain DID”</li>
          </ol>
          <p className={styles.onchainGuide}>
            <a
              className={styles.linkToGuide}
              href="https://www.trusted-entity.io/assets/pdf/Upgrading-to-on-chain-DID.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Guide to upgrading your DID (PDF)
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export const ClaimingGuide = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.container}>
      <span className={styles.title}>Required</span>
      <div className={styles.wrapper}>
        <p className={styles.text}>
          For claiming you need a Sporran wallet and an on-chain DID. If you
          don’t already have them, follow the guides below to set them up.
        </p>

        <div className={styles.window}>
          <button
            className={styles.controlBtn}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
          >
            1. Get your Sporran wallet
          </button>
          {isExpanded && (
            <div className={styles.windowContents}>
              <p className={styles.guide}>
                The Sporran wallet is a browser-based extension that interacts
                with the KILT blockchain, displaying KILT Coin balances and
                enabling signing and sending transactions. The wallet also
                stores credentials, allowing you to build a decentralized
                digital identity and control who sees your data. (Currently
                Sporran is available on desktop only.)
              </p>
              <div className={styles.extensionWrapper}>
                <a
                  className={styles.chromeExtension}
                  href="https://chrome.google.com/webstore/detail/djdnajgjcbjhhbdblkegbcgodlkkfhcl"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className={styles.linkTextSmall}>
                    Download for
                    <span className={styles.linkTextBig}>Google Chrome</span>
                  </span>
                </a>
                <a
                  className={styles.firefoxExtension}
                  href="https://addons.mozilla.org/firefox/addon/sporran/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className={styles.linkTextSmall}>
                    Download for
                    <span className={styles.linkTextBig}>Mozilla Firefox</span>
                  </span>
                </a>
              </div>
              <p className={styles.guide}>
                <a
                  className={styles.linkToGuide}
                  href="https://www.trusted-entity.io/assets/pdf/Create-KILT-Sporran-Identity.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  Guide to downloading Sporran (PDF)
                </a>
                <br />
                <a
                  className={styles.linkToGuide}
                  href="https://www.sporran.org"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read additional information on Sporran.org
                </a>
                <br />
                <a
                  className={styles.linkToGuide}
                  href="https://www.sporran.org/terms.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  Sporran Terms & Conditions
                </a>
              </p>
            </div>
          )}
        </div>
        <OnChainDidGuide />
      </div>
    </div>
  );
};
