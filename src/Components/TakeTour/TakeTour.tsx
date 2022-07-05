import { useState } from 'react';

import styles from './TakeTour.module.css';

import { ReactComponent as Chevron } from '../../ImageAssets/chevron_up_blue.svg';
import { ReactComponent as PageSelected } from '../../ImageAssets/pagination_selected.svg';
import { ReactComponent as PageUnselected } from '../../ImageAssets/pagination_unselected.svg';
import Tour1 from '../../ImageAssets/Tour_1@2x.png';
import Tour2 from '../../ImageAssets/Tour_2@2x.png';
import Tour3 from '../../ImageAssets/Tour_3@2x.png';
import Tour4 from '../../ImageAssets/Tour_4@2x.png';
import Tour5 from '../../ImageAssets/Tour_5@2x.png';
import Tour6 from '../../ImageAssets/Tour_6@2x.png';
import Tour7 from '../../ImageAssets/Tour_7@2x.png';

type Slide = {
  image: string;
  text: JSX.Element;
};

const SlideData: Slide[] = [
  {
    image: Tour1,
    text: (
      <span className={styles.slideText}>
        w3n.id is a directory service that provides an easy way to look up KILT
        DIDs and their associated web3names and credentials. It also allows you
        to see if your preferred name has already been claimed. Your web3name
        represents your unique on-chain decentralized identifier (DID), a string
        of letters and numbers that form the core of your KILT digital identity.
        Users can be searched by DID or web3name in several ways.
      </span>
    ),
  },
  {
    image: Tour2,
    text: (
      <span className={styles.slideText}>
        Search by web3name
        <br />
        This will show the DID and any information publicly linked to it
        <br />
        Enter the web3name in the search bar
        <br />
        {`Click "LOOK UP"`}
      </span>
    ),
  },
  {
    image: Tour3,
    text: (
      <span className={styles.slideText}>
        Search by DID
        <br />
        This will show the web3name and any information publicly linked to it
        <br />
        Enter the DID in the search bar (be sure to include did:kilt: before the
        string)
        <br />
        {`Click "LOOK UP"`}
      </span>
    ),
  },
  {
    image: Tour4,
    text: (
      <span className={styles.slideText}>
        Share your web3name or DID
        <br />
        Create a shareable URL for your web3name and DID
        <br />
        Enter your web3name or DID in the search bar
        <br />
        Copy the URL in the address bar and share
      </span>
    ),
  },
  {
    image: Tour5,
    text: (
      <span className={styles.slideText}>
        Fetch Credential
        <br />
        The data in linked credentials are stored in the service endpoint and
        not on the blockchain itself
        <br />
        {`Click “FETCH” to read the associated KILT credential`}
      </span>
    ),
  },
  {
    image: Tour6,
    text: (
      <span>
        View credential content
        <br />
        If the credential is valid, the content is shown
      </span>
    ),
  },
  {
    image: Tour7,
    text: (
      <span className={styles.slideText}>
        Want your own web3name? Follow these steps to claim it.
        <br />
        Download Sporran extension for Chrome or Firefox
        <br />
        Generate a KILT Identity within Sporran
        <br />
        Upgrade to an on-chain DID
        <br />
        Claim web3name in Sporran
        <br />
        For more details, follow our{' '}
        <a
          href="https://www.trusted-entity.io/assets/pdf/How_To_Guide_web3name_Promo.pdf"
          target="_blank"
          rel="noreferrer"
        >
          How-to guide
        </a>
      </span>
    ),
  },
];

interface Toggle {
  isOpen: boolean;
}

export const TakeTour = (props: Toggle) => {
  const imageArray: string[] = [
    Tour1,
    Tour2,
    Tour3,
    Tour4,
    Tour5,
    Tour6,
    Tour7,
  ];
  const [slide, setSlide] = useState<Slide>(SlideData[0]);
  const handleNext = () => {
    const index = SlideData.indexOf(slide);
    if (index === imageArray.length - 1) {
      setSlide(SlideData[0]);
      return;
    }
    setSlide(SlideData[index + 1]);
  };
  const handlePrev = () => {
    const index = SlideData.indexOf(slide);
    if (index === 0) {
      return;
    }
    setSlide(SlideData[index - 1]);
  };
  const handleClick = (index: number) => {
    setSlide(SlideData[index]);
  };
  return (
    <section className={props.isOpen ? styles.expanded : styles.collapsed}>
      <div className={styles.slidesWrapper}>
        <div className={styles.slides}>
          <div className={styles.changeSlide} onClick={() => handlePrev()}>
            <Chevron className={styles.previous} />
          </div>
          <div className={styles.slide}>
            <span className={styles.slideTitle}>
              Learn how to use this directory and how to claim your own web3name
            </span>
            <img className={styles.slideImage} src={slide.image} />
            {slide.text}
            <div className={styles.navBubbles}>
              {SlideData.map((slidesFromArray, index) =>
                slide === slidesFromArray ? (
                  <PageSelected key={index} />
                ) : (
                  <PageUnselected
                    className={styles.unselected}
                    key={index}
                    onClick={() => handleClick(index)}
                  />
                ),
              )}
            </div>
          </div>

          <div className={styles.changeSlide} onClick={() => handleNext()}>
            <Chevron className={styles.next} />
          </div>
        </div>
      </div>
    </section>
  );
};
