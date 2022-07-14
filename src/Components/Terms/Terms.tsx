import { Fragment } from 'react';

import styles from './Terms.module.css';

export function Terms() {
  return (
    <Fragment>
      <div className={styles.headingContainer}>
        <h1 className={styles.termsHeading}> Terms and Conditions </h1>
      </div>
      <section className={styles.textContainer}>
        <h3>Application of These Terms and Conditions</h3>
        <p>
          For the w3n.id (the “W3n.id Website”) by B.T.E. BOTLabs Trusted Entity
          GmbH (hereinafter referred to as “BTE”, “us”, “we” or “our”) a website
          with software as provided under{' '}
          <a
            className={styles.anchor}
            href="https://w3n.id/"
            target="_blank"
            rel="noreferrer"
          >
            https://www.w3n.id{' '}
          </a>
          (the “Software”) and defined below these Terms and Conditions shall
          apply.
        </p>
        <p>
          PLEASE READ THE TERMS AND CONDITIONS CAREFULLY TO ENSURE THAT YOU
          UNDERSTAND EACH PROVISION. IF YOU DO NOT AGREE TO ALL OF THE TERMS, DO
          NOT ACCESS OR USE THE SOFTWARE.
        </p>
        <p>
          YOU ACCEPT THE TERMS AND CONDITIONS, EITHER BY CLICKING TO SIGNIFY
          ACCEPTANCE, OR BY TAKING ANY ONE OR MORE OF THE FOLLOWING ACTIONS:
          ACCESSING OR USING THE APPLICABLE SOFTWARE, YOU AGREE TO BE BOUND BY
          THE TERMS AND CONDITIONS.
        </p>
        <p>
          YOU REPRESENT AND WARRANT THAT YOU ARE 18 YEARS OLD OR OLDER AND HAVE
          THE RIGHT AND AUTHORITY TO ENTER AND COMPLY WITH THE TERMS AND
          CONDITIONS.
        </p>

        <h3 className={styles.spacedHeading}>What web3name is</h3>
        <p>
          A web3name is a string added to a DID on the KILT blockchain (i.e. to
          an on-chain DID). Web3names are unique, i.e. a web3name already added
          to one on-chain DID cannot be added to a second on-chain DID.
          Prerequisite for a web3name is an on-chain DID on the KILT blockchain
          that is created from your KILT identity.
        </p>
        <p>
          Claiming a web3name is done via the Sporran wallet (the “Sporran
          Software”) as supplied through the website{' '}
          <a
            className={styles.anchor}
            href="https://www.sporran.org/"
            target="_blank"
            rel="noreferrer"
          >
            https://www.sporran.org/
          </a>{' '}
          (the “Sporran Website) or any other wallet and is not subject of these
          Terms and Conditions.
        </p>
        <p>
          Please note that web3name is not connected to your KILT Identity but
          everyone who knows your on-chain DID can find out your web3name and
          vice versa.
        </p>

        <h3 className={styles.spacedHeading}>What w3n.id is</h3>
        <p>
          W3n.id acts like a phone book – for any given on-chain DID on the KILT
          blockchain, you can look up the web3name that is linked to it. Vice
          versa, for any possible web3name, you can look up which DID claimed it
          or if it is still available for you or others to claim. Furthermore,
          you can fetch credentials associated with web3names.
        </p>

        <h3 className={styles.spacedHeading}>How w3n.id works</h3>
        <p>
          You can enter a web3name in the search field. If you click “Look up”,
          the Software of w3n.id will look up the corresponding DID. If no
          results are shown, the web3name is still available and if you wish,
          you can claim it via your wallet.
        </p>
        <p>
          Or you can enter a DID in the search field. If you click “Look up”,
          the Software of w3n.id will look up the corresponding web3name. If no
          results are shown, the DID has no web3name attached to it.
        </p>
        <p>
          You can also use w3n.id to share your web3name or your DID by simply
          looking it up and copying the URL in the address bar to share it via
          email, chat or other communication mode.
        </p>
        <p>
          If a web3name has KILT credentials associated with it that are stored
          on service endpoints, you can fetch the credentials in order to read
          these associated credentials.
        </p>
        <p>
          More instructions on how to use the web3name for generating a paid
          on-chain DID and claim a web3name (without paying yourself) in Sporran
          (text and screenshots) are available on.
        </p>

        <h3 className={styles.spacedHeading}>Your Commitments</h3>
        <p>
          In your usage of on-chain DIDs and web3names in identifying another
          person or account, you will determine for your purpose if and to what
          extend you will trust – depending on your legal, business or other
          requirements – that they represent enough trust that these are coming
          from the right person/entity or if you need further documents of proof
          and which ones for example in regards to their identity. As these
          processes are defined outside of the Software, we accept no liability
          in this respect.
        </p>

        <h3 className={styles.spacedHeading}>Liability</h3>
        <p>
          BTE is liable for damages that are based on an intentional or grossly
          negligent breach of duty by BTE, its legal representatives or various
          agents.
        </p>
        <p>
          In the event of a breach of essential contractual duties, BTE shall
          only be liable for the contractually typical, foreseeable damage if
          this was simply cause by negligence. Significant contractual
          obligations are those whose fulfillment enables the proper execution
          of the contract in the first place and whose compliance you can
          regularly rely on.
        </p>
        <p>
          The limitation of the two preceding paragraphs also apply to the legal
          representatives and various agents of BTE, if claims are asserted
          directly against them. The liability limitations resulting from the
          two preceding paragraphs do not apply insofar as BTE fraudulently
          concealed the defect or assumed a guarantee for the quality of the
          W3n.id Website or the usage of the w3n.id in the wallet.
        </p>
        <p>
          Liability for culpable injury to life, limb and health and liability
          under Product Liability Act remain unaffected.
        </p>
        <p>Any additional claims for damages are excluded.</p>

        <h3>Risk information</h3>
        <p>
          The following risk information contains a list of risks associated
          with the use of the w3n.id or for creating on-chain DIDs and web3names
          in general. The list is not exhaustive. It is not excluded that
          further unknown or unpredictable risks exist.
        </p>
        <p>
          Independent of the creation of on-chain DIDs and web3names but also to
          prevent others from using secret or personal data, please always keep
          the password and other access data to your devices, cloud solution and
          other data storage safe. Also, just like with any other private data,
          only send your DIDs and web3names or URLs to them to someone you trust
          that they respect your privacy and to someone who will not forward
          your personal data to anyone else or lose or publish it in any way
          detrimental to your privacy.
        </p>
        <p>
          On-chain DIDs and web3names are created and used via your wallet –
          please check all the information, instruction and warnings given about
          your wallet by its provider and closely follow the advice given.
          Always ensure that you do not lose your access data to your wallet and
          keep access to your wallet as well as the values, credentials, DIDs
          and the web3name stored in it safe from access by others.
        </p>
        <p>
          Your on-chain DID and web3name are typically written on the
          blockchain. Also, service endpoints used to provide additional
          information are outside of this w3n.id Website and outside the Sporran
          and its functionalities. Errors, dysfunctionalities, including failure
          of the KILT blockchain or the technical ecosystem in which it lives
          may adversely effect the creation or usage of your on-chain DID and/or
          web3name.
        </p>
        <p>
          You acknowledge and agree that we have no support, service level, or
          other obligations like these hereunder. Furthermore, you acknowledge
          and agree that changes in the w3n.id, the on-chain DID and/or web3name
          or their usage in the ecosystem will from time to time occur and that
          they might at some point of time not work and not be supported
          anymore.
        </p>
        <p>
          On-chain DIDs, web3names, the wallet used or other underlying software
          application may be the subject of hacking or other malicious
          interference by unauthorized third parties resulting in the loss,
          theft or other violation of data or change in the Software.
        </p>
        <p>
          Because the software of w3n.id is published, there is a risk that a
          third party may copy it and unconsciously or knowingly incorporate
          errors leading to potential adverse consequences for the usability and
          functionality of the Software. To ensure you are using the original,
          always access the download through us directly and if uncertain,
          compare the code with the code published on GitHub before usage and
          only use if it matchesfully with the code there.
        </p>
        <p>
          Communication via internet-based systems is fundamentally susceptible
          to data/information being read out and possibly even changed. We have
          no influence on which processes (now and in the future) run in the
          background of the web browser or the wallet used.
        </p>

        <h3 className={styles.spacedHeading}>
          Right to Change w3n.id, the w3n.id Website and These Terms and
          Conditions
        </h3>
        <p>
          ConditionsBTE reserves the right to change the w3n.id, the w3n.id
          Website and these Terms and Conditions as well as the commercial and
          non-commercial conditions for its usage.
        </p>
        <p>
          Such changes will be made via uploading new Terms and Conditions,
          and/or other information to the w3n.id Website and any usage of the
          w3n.id will from that time on fall under these new Terms and
          Conditions, will be handled by the new version of the w3n.id and will
          be for the commercial and non-commercial usage.
        </p>

        <h3 className={styles.spacedHeading}>License to the W3n.id Website</h3>
        <p>
          WebsiteCopyright (c) 2021-2022, B.T.E. BOTLabs Trusted Entity GmbH.
          All rights reserved.
        </p>

        <h3 className={styles.spacedHeading}>License to the Software</h3>
        <p>Copyright (c) 2022, built on KILT. All rights reserved.</p>

        <p>
          Redistribution and use in source and binary forms, with or without
          modification, are permitted provided that the following conditions are
          met:
        </p>
        <ul className={styles.bulletList}>
          <li>
            Redistributions of source code must retain the above copyright
            notice, this list of conditions and the following disclaimer.
          </li>
          <li>
            Redistributions in binary form must reproduce the above copyright
            notice, this list of conditions and the following disclaimer in the
            documentation and/or other materials provided with the distribution.
          </li>
          <li>
            All advertising materials mentioning features or use of this
            software must display the following acknowledgement: This product is
            built on KILT.
          </li>
          <li>
            Neither the name of KILT nor the names of its contributors may be
            used to endorse or promote products derived from this software
            without specific prior written permission.
          </li>
        </ul>
        <p>
          Disclaimer: The Liability of the B.T.E. BOTLabs Trusted Entity GmbH
          (hereinafter referred to as &quot;BTE&quot;) is limited according to
          these Terms and Conditions for w3n.id.
        </p>

        <p>(BSD 4-Clause)</p>

        <h3 className={styles.spacedHeading}>Miscellaneous</h3>
        <p>
          These Terms and Conditions and the entire legal relationship between
          the parties shall be governed by the laws of the Federal Republic of
          Germany to the exclusion of the UN Convention on Contracts for the
          International Sale of Goods (CISG) unless the choice of law is legally
          prohibited.
        </p>
        <p>
          If a term of this agreement to be invalid or unenforceable, the
          remaining provisions will continue in full force and effect.
        </p>
        <p>
          The place of performance and exclusive place of jurisdiction for all
          disputes arising from these Terms and Conditions and the entire legal
          relationship between the parties shall be BTE’s registered office,
          unless choice of jurisdiction is legally prohibited.
        </p>
      </section>
    </Fragment>
  );
}
