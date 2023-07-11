import React, { useState, useEffect } from 'react'

import Slide1 from '../screens/Slide1'
import Slide2 from '../screens/Slide2'
import Slide3 from '../screens/Slide3'
import { useNavigate } from 'react-router-dom'

const slides = [Slide1, Slide2, Slide3]

const OnboardingDeck = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const navigate = useNavigate()
  const [backgroundColor, setBackgroundColor] = useState('#000')
  const slideColors = ['rgb(38, 27, 21)', 'rgb(25, 26, 29)', 'rgb(9, 21, 39)']

  const onScroll = (event) => {
    const slide = Math.ceil(event.target.scrollLeft / event.target.offsetWidth)
    if (slide !== activeSlide) {
      setActiveSlide(slide)

      console.log('activeSlide:' + activeSlide + ', slide:' + slide)
      console.log('slides.length:' + slides.length)
      if (slide > slides.length - 1) {
        console.log('Slides end reached')
      } else {
        setBackgroundColor(slideColors[slide]) // Set the background color when the slide changes
        console.log(slideColors[slide])
      }
    }
  }

  const onStartNowPress = () => {
    navigate('/slider')
  }

  const onLinkPress = () => {
    console.log('LinkPress')
  }

  useEffect(() => {}, [])

  return (
    <div className="container" style={{ backgroundColor: backgroundColor }}>
      <div
        className="scrollView"
        onScroll={onScroll}
        onWheel={onScroll}
        onTouchMove={onScroll}
      >
        {slides.map((SlideComponent, index) => (
          <SlideComponent key={index} />
        ))}
      </div>

      <div className="pagination">
        {slides.map((_, index) => (
          <p
            key={index}
            className={index === activeSlide ? 'activeDot' : 'dot'}
          >
            •
          </p>
        ))}
      </div>

      <div className="bottomContainer">
        <button className="button" onClick={onStartNowPress}>
          Start Now
        </button>

        <button className="link" onClick={onLinkPress}>
          Your Link Text Here
        </button>
      </div>
    </div>
  )
}

export default OnboardingDeck
