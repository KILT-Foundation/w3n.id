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
        2. Get your DID
      </button>
      {isExpanded && (
        <div className={styles.windowContents}>
          <p className={styles.onchainGuide}>
            Your decentralized Identifier (DID) is a unique set of numbers and
            letters that represents the core of your identity, like a digital
            fingerprint. You can link multiple things to your DID including:
          </p>
          <ul className={styles.list}>
            <li className={styles.listItem}>Your unique web3name</li>
            <li className={styles.listItem}>
              As many of your Polkadot ecosystem and Ethereum addresses that you
              wish
            </li>
            <li className={styles.listItem}>
              Any credentials you want to make public, such as social media
              handles, GitHub and email addresses
            </li>
            <li className={styles.listItem}>Services, e.g., your website</li>
          </ul>
          <p className={styles.onchainGuide}>
            You can pay for your DID with KILT or use Checkout Service / PayPal.
          </p>
          <p className={styles.onchainGuide}>
            Follow the instructions in our How-to guide.
          </p>

          <p className={styles.onchainGuide}>
            <a
              className={styles.linkToGuide}
              href="https://kilt-protocol.org/files/How-to-Guide-Get-Your-DID.pdf"
              target="_blank"
              rel="noreferrer"
            >
              How-to Guide, DID (PDF)
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
          For claiming you need a Sporran wallet and a DID. If you don’t already
          have them, follow the guides below to set them up.
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
                  href="https://kilt-protocol.org/files/How-to-Guide-Create-Sporran-Wallet.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  How-to Guide, Sporran (PDF)
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
