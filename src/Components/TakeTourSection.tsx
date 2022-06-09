import React, { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as Open } from '../ImageAssets/chevron_up_blue.svg'
import { ReactComponent as PageSelected } from '../ImageAssets/pagination_selected.svg'
import { ReactComponent as PageUnselected } from '../ImageAssets/pagination_unselected.svg'
import Tour1 from '../ImageAssets/Tour_1@2x.png'
import Tour2 from '../ImageAssets/Tour_2@2x.png'
import Tour3 from '../ImageAssets/Tour_3@2x.png'
import Tour4 from '../ImageAssets/Tour_4@2x.png'
import Tour5 from '../ImageAssets/Tour_5@2x.png'
import Tour6 from '../ImageAssets/Tour_6@2x.png'
import Tour7 from '../ImageAssets/Tour_7@2x.png'
interface Style {
  BackgroundImage?: string
  isOpen?: boolean
}
interface Toggle {
  isOpen: boolean
}

const TourSlidesContainer = styled.div`
  display: flex;
  width: 90%;
  height: fit-content;
  align-items: flex-start;
`
const ChangeSlideSvgWrapper = styled.div`
  width: 10%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
const SlidesImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
  height: 550px;
  width: 80%;
`
const SlidesImage = styled.img`
  object-fit: contain;
  max-height: 300px;
  width: 100%;
`
const NextSvg = styled(Open)`
  fill: ${(props) => props.theme.headertext};
  cursor: pointer;
  transform: rotate(270deg);
`

const PrevSvg = styled(Open)`
  fill: ${(props) => props.theme.headertext};
  cursor: pointer;
  transform: rotate(90deg);
`
const Slidetext = styled.span`
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 16px;
  height: 85px;
  overflow-y: scroll;
  text-align: justify;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  padding-right: 15px;
  width: 95%;
  @media (max-width: 450px) {
    margin-left: 0px;
  }
  a {
    color: white;
  }
  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 20px;
    border-top: 1px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: green;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: green;
  }
`
const Toptext = styled.span`
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 16px;
  text-align: left;
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`
const PagerDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: center;
  align-items: center;
  height: fit-content;
  width: 100%;
`

const TourSlidesSection = styled.div`
  display: flex;
  justify-content: center;
  max-width: 740px;
  width: 90%;
  height: fit-content;
  @media (max-width: 450px) {
    margin-top: 0px;
  }
`
const TakeTour = styled.section`
  background-color: ${(props) => props.theme.taketour};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: ${(props: Style) => (props.isOpen ? '520px' : '0')};
  color: ${(props) => props.theme.headertext};
  transition: height 0.5s ease-in;
  overflow: hidden;
`
const PagerUnselectedSvg = styled(PageUnselected)`
  cursor: pointer;
`
type Slide = {
  image: string
  text: JSX.Element
}

const SlideData: Slide[] = [
  {
    image: Tour1,
    text: (
      <Slidetext>
        w3n.id is a directory service that provides an easy way to look up KILT
        DIDs and their associated web3names and credentials. It also allows you
        to see if your preferred name has already been claimed. Your web3name
        represents your unique on-chain decentralized identifier (DID), a string
        of letters and numbers that form the core of your KILT digital identity.
        Users can be searched by DID or web3name in several ways.
      </Slidetext>
    ),
  },
  {
    image: Tour2,
    text: (
      <Slidetext>
        Search by web3name
        <br />
        This will show the DID and any information publicly linked to it
        <br />
        Enter the web3name in the search bar
        <br />
        Click "LOOK UP"
      </Slidetext>
    ),
  },
  {
    image: Tour3,
    text: (
      <Slidetext>
        Search by DID
        <br />
        This will show the web3name and any information publicly linked to it
        <br />
        Enter the DID in the search bar (be sure to include did:kilt: before the
        string)
        <br />
        Click "LOOK UP"
      </Slidetext>
    ),
  },
  {
    image: Tour4,
    text: (
      <Slidetext>
        Share your web3name or DID
        <br />
        Create a shareable URL for your web3name and DID
        <br />
        Enter your web3name or DID in the search bar
        <br />
        Copy the URL in the address bar and share
      </Slidetext>
    ),
  },
  {
    image: Tour5,
    text: (
      <Slidetext>
        Fetch Credential
        <br />
        The data in linked credentials are stored in the service endpoint and
        not on the blockchain itself
        <br />
        Click “FETCH” to read the associated KILT credential
      </Slidetext>
    ),
  },
  {
    image: Tour6,
    text: (
      <Slidetext>
        View credential content
        <br />
        If the credential is valid, the content is shown
      </Slidetext>
    ),
  },
  {
    image: Tour7,
    text: (
      <Slidetext>
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
      </Slidetext>
    ),
  },
]

export const TakeTourSection = (props: Toggle) => {
  const imageArray: string[] = [Tour1, Tour2, Tour3, Tour4, Tour5, Tour6, Tour7]
  const [slide, setSlide] = useState<Slide>(SlideData[0])
  const handleNext = () => {
    const index = SlideData.indexOf(slide)
    if (index === imageArray.length - 1) {
      setSlide(SlideData[0])
      return
    }
    setSlide(SlideData[index + 1])
  }
  const handlePrev = () => {
    const index = SlideData.indexOf(slide)
    if (index === 0) {
      return
    }
    setSlide(SlideData[index - 1])
  }
  const handleClick = (index: number) => {
    setSlide(SlideData[index])
  }
  return (
    <TakeTour isOpen={props.isOpen}>
      <TourSlidesSection>
        <TourSlidesContainer>
          <ChangeSlideSvgWrapper onClick={() => handlePrev()}>
            <NextSvg />
          </ChangeSlideSvgWrapper>
          <SlidesImageContainer>
            <Toptext>
              Learn how to use this directory and how to claim your own web3name
            </Toptext>
            <SlidesImage src={slide.image} />
            {slide.text}
            <PagerDiv>
              {SlideData.map((slidesFromArray, index) =>
                slide === slidesFromArray ? (
                  <PageSelected key={index} />
                ) : (
                  <PagerUnselectedSvg
                    key={index}
                    onClick={() => handleClick(index)}
                  />
                )
              )}
            </PagerDiv>
          </SlidesImageContainer>

          <ChangeSlideSvgWrapper onClick={() => handleNext()}>
            <PrevSvg />
          </ChangeSlideSvgWrapper>
        </TourSlidesContainer>
      </TourSlidesSection>
    </TakeTour>
  )
}
