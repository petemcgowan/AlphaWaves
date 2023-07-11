import React, { useState, useEffect, useRef } from 'react'
import '../styles/RainSlider.css'
import { FaWater } from 'react-icons/fa'

import rainSounds from '../model/data'
import TimerControls from '../components/TimerControls'
import CountdownTimer from '../components/CountdownTimer'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// import Slide1 from './Slide1'
// import Slide2 from './Slide2'
// import Slide3 from './Slide3'

// const slides = [Slide1, Slide2, Slide3]

const RainSlider = () => {
  // const scrollX = useRef(new Animated.Value(0)).current
  const [songIndex, setSongIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [timerVisible, setTimerVisible] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const slideColors = ['rgb(38, 27, 21)', 'rgb(25, 26, 29)', 'rgb(9, 21, 39)']
  const [backgroundColor, setBackgroundColor] = useState('#000')

  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [intentionalVideoPlay, setIntentionalVideoPlay] = useState(true)
  var settings = {
    dots: true,
  }
  // rainSounds[songIndex].playingSound.setVolume(0.9)
  // rainSounds[songIndex].playingSound.setNumberOfLoops(-1)

  const onScroll = (event) => {
    const slide = Math.ceil(event.target.scrollLeft / event.target.offsetWidth)
    if (slide !== activeSlide) {
      setActiveSlide(slide)

      console.log('activeSlide:' + activeSlide + ', slide:' + slide)
      console.log('slides.length:' + slides.length)
      if (slide > slides.length - 1) {
        console.log('Slides end reached')
      } else {
        setBackgroundColor(slideColors[slide])
        console.log(slideColors[slide])
      }
    }
  }

  const togglePlayback = () => {
    if (rainSounds[songIndex].playingSound._playing) {
      rainSounds[songIndex].playingSound.stop()
      setPlaying(!playing)
      if (timerVisible) setTimerVisible(false)
    } else {
      setPlaying(true)
      rainSounds[songIndex].playingSound.play((success) => {
        if (success) {
          console.log('successfully finished playing')
        } else {
          console.log('playback failed due to audio decoding errors')
        }
      })
    }
  }

  return (
    <div className="container">
      <div>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
      <div className="slickContainer">
        <Slider {...settings}>
          <div>
            <img src="http://placekitten.com/g/400/200" />
          </div>
          <div>
            <img src="http://placekitten.com/g/400/200" />
          </div>
          <div>
            <img src="http://placekitten.com/g/400/200" />
          </div>
          <div>
            <img src="http://placekitten.com/g/400/200" />
          </div>
        </Slider>
      </div>
      {/* <div
        className="scrollView"
        onScroll={onScroll}
        onWheel={onScroll}
        onTouchMove={onScroll}
      >
        {slides.map((SlideComponent, index) => (
          <SlideComponent key={index} />
        ))}
      </div> */}

      {/* {rainSounds.map((video, index) => (
        <div className="videoContainer" key={index}>
          <video
            src={video.videoBackground}
            className="video"
            muted={true}
            volume={0.5}
            loop={true}
            autoPlay={playing && intentionalVideoPlay}
            controls={false}
          />
        </div>
      ))} */}

      {/* <div className="powerControls">
        <button className="powerIcon" onClick={() => togglePlayback()}>
          <FaWater
            size={250}
            className={`powerIcon ${
              playing ? 'activePowerIcon' : 'inactivePowerIcon'
            }`}
          />
        </button>
      </div> */}

      {/* <div className="timerCountdown">
        {timerVisible ? (
          <div className="timerCountdown">
            <CountdownTimer
              hours={hours}
              minutes={minutes}
              seconds={seconds}
              togglePlayback={togglePlayback}
              setTimerVisible={setTimerVisible}
              timerControlsFontColor={
                rainSounds[songIndex].timerControlsFontColor
              }
            />
          </div>
        ) : (
          <div className="timerCountdown"></div>
        )}
      </div> */}
      {/*<div className="timerControls">
         <TimerControls
          setTimerVisible={setTimerVisible}
          hours={hours}
          setHours={setHours}
          minutes={minutes}
          setMinutes={setMinutes}
          seconds={seconds}
          setSeconds={setSeconds}
          playing={playing}
          togglePlayback={togglePlayback}
          intentionalVideoPlay={intentionalVideoPlay}
          setIntentionalVideoPlay={setIntentionalVideoPlay}
          timerDialogBackgroundColor={
            rainSounds[songIndex].timerDialogBackgroundColor
          }
          timerDialogFontColor={rainSounds[songIndex].timerDialogFontColor}
          songIndex={songIndex}
        />
      </div>*/}
    </div>
  )
}

export default RainSlider
