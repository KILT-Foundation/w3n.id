import React, { useState } from 'react'
import styled from 'styled-components'
import { ReactComponent as Open } from '../ImageAssets/chevron_up_blue.svg'
import { ReactComponent as PageSelected } from '../ImageAssets/pagination_selected.svg'
import { ReactComponent as PageUnselected } from '../ImageAssets/pagination_unselected.svg'
import bg from '../ImageAssets/Web3.jpeg'
import bg2 from '../ImageAssets/Web32.jpeg'

interface Style {
  BackgroundImage: string
}

const TourSlidesSection = styled.div`
  display: flex;
  justify-content: flex-start;
  max-width: 740px;
  width: 90%;
  margin-top: 50px;
  height: fit-content;
`
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
`
const SlidesImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 10px;
  height: 350px;
  width: 80%;
`
const SlidesImage = styled.div`
  background-image: url(${(props: Style) => props.BackgroundImage});
  background-size: cover;
  object-fit: cover;
  height: 330px;
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
  height: 150px;
  overflow-y: auto;
`
const TakeTour = styled.div`
  background-color: ${(props) => props.theme.taketour};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 450px;
  color: ${(props) => props.theme.headertext};
`
const PagerDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1px;
  justify-content: center;
  align-items: center;
  height: fit-content;
`
export const TakeTourSection = () => {
  const imageArray: string[] = [bg, bg2]
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
  return (
    <TakeTour>
      <TourSlidesSection>
        <TourSlidesContainer>
          <ChangeSlideSvgWrapper>
            <NextSvg onClick={() => handlePrev()} />
          </ChangeSlideSvgWrapper>
          <SlidesImageContainer>
            <SlidesImage BackgroundImage={image}></SlidesImage>
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
                  <PageUnselected key={index} />
                )
              )}
            </PagerDiv>
          </SlidesImageContainer>

          <ChangeSlideSvgWrapper>
            <PrevSvg onClick={() => handleNext()} />
          </ChangeSlideSvgWrapper>
        </TourSlidesContainer>
      </TourSlidesSection>
    </TakeTour>
  )
}
