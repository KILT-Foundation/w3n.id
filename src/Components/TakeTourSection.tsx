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
  isOpen?: 'Open' | 'Close'
}
interface Toggle {
  isOpen: 'Open' | 'Close'
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
const Slidetext = styled.p`
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 16px;
  height: 60px;
  overflow-y: scroll;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`
const Toptext = styled.span`
  font-size: 14px;
  letter-spacing: 0.1px;
  line-height: 16px;
  overflow-y: scroll;
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
const TakeTour = styled.div`
  background-color: ${(props) => props.theme.taketour};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: ${(props: Style) => (props.isOpen === 'Open' ? '520px' : '0')};
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
        w3n.id is a service to look up web3names for DIDs, and vice versa. As a
        new feature, unique user names (web3names) are now available in the
        Polkadot universe. w3n offers an easy way to look up associated
        web3names and DIDs. In addition it allows you to check if a web3name is
        available and explains how you can claim it.
      </Slidetext>
    ),
  },
  {
    image: Tour2,
    text: (
      <Slidetext>
        Look up DID for web3name
        <br />- Enter web3name
        <br />- Click on LOOK UP
      </Slidetext>
    ),
  },
  {
    image: Tour3,
    text: (
      <Slidetext>
        Look up DID for web3name
        <br />- Enter web3name
        <br />- Click on LOOK UP
      </Slidetext>
    ),
  },
  {
    image: Tour4,
    text: (
      <Slidetext>
        Sharing
        <br />- Enter web3name or DID- Copy URL
      </Slidetext>
    ),
  },
  {
    image: Tour5,
    text: (
      <Slidetext>
        Fetch Credential
        <br />- Click on FETCH to get KILT credential
      </Slidetext>
    ),
  },
  {
    image: Tour6,
    text: (
      <Slidetext>
        View Credential
        <br />- If credential is available and valid, content is shown
      </Slidetext>
    ),
  },
  {
    image: Tour7,
    text: (
      <Slidetext>
        Want your own web3name? Follow those steps to claim it
        <br />
        - Download Sporran extension for Chrome or Firefox <br />
        - Generate a KILT Identity within Sporran
        <br />
        - Transfer KILT tokens to this Identity
        <br />
        - Upgrade Identity to onchain DID
        <br />- Claim web3name in Sporran
        <br />- For details go to Tech Support
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
