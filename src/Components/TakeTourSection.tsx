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
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
const SlidesImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 5px;
  height: 500px;
  width: 80%;
`
const SlidesImage = styled.img`
  object-fit: contain;
  height: 300px;
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
  line-height: 22px;
  height: 100px;
  overflow-y: auto;
`
const PagerDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: center;
  align-items: center;
  height: fit-content;
`

const TourSlidesSection = styled.div`
  display: flex;
  justify-content: center;
  max-width: 740px;
  width: 90%;
  margin-top: 50px;
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

export const TakeTourSection = (props: Toggle) => {
  const imageArray: string[] = [Tour1, Tour2, Tour3, Tour4, Tour5, Tour6, Tour7]
  const [image, setImage] = useState<string>(imageArray[0])
  const handleNext = () => {
    const index = imageArray.indexOf(image)
    if (index === imageArray.length - 1) {
      setImage(imageArray[0])
      return
    }
    setImage(imageArray[index + 1])
  }
  const handlePrev = () => {
    const index = imageArray.indexOf(image)
    if (index === 0) {
      return
    }
    setImage(imageArray[index - 1])
  }
  const handleClick = (index: number) => {
    setImage(imageArray[index])
  }
  return (
    <TakeTour isOpen={props.isOpen}>
      <TourSlidesSection>
        <TourSlidesContainer>
          <ChangeSlideSvgWrapper onClick={() => handlePrev()}>
            <NextSvg />
          </ChangeSlideSvgWrapper>
          <SlidesImageContainer>
            <SlidesImage src={image} />
            <Slidetext>
              Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh.
              Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed
              convallis tristique sem. Proin ut ligula vel nunc egestas
              porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus
              non, massa. Fusce ac turpis quis ligula lacinia aliquet.
            </Slidetext>
            <PagerDiv>
              {imageArray.map((imageFromArray, index) =>
                image === imageFromArray ? (
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
