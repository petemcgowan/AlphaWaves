import React, { useState, useEffect, useRef } from 'react'
import '../styles/RainSlider.css'
import { FaTint } from 'react-icons/fa'

import rainSounds from '../model/data'
import TimerControls from '../components/TimerControls'
import CountdownTimer from '../components/CountdownTimer'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import VideoSlide from './VideoSlide'

const RainSlider = () => {
  const [songIndex, setSongIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [timerVisible, setTimerVisible] = useState(false)
  const [tsModalVisible, setTsModalVisible] = useState(false)
  const [count, setCount] = useState(0)

  const [activeSlide, setActiveSlide] = useState(0)
  const slideColors = ['rgb(38, 27, 21)', 'rgb(25, 26, 29)', 'rgb(9, 21, 39)']
  const [backgroundColor, setBackgroundColor] = useState('#000')

  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [intentionalVideoPlay, setIntentionalVideoPlay] = useState(true)
  const videoRef = useRef(null)

  const handleSlideChange = (currentSlide) => {
    console.log('handleSlideChange, currentSlide:' + currentSlide)
    setSongIndex(currentSlide)
  }

  var settings = {
    dots: true,
    afterChange: handleSlideChange,
  }

  // rainSounds[songIndex].playingSound.setVolume(0.9)
  // rainSounds[songIndex].playingSound.setNumberOfLoops(-1)

  useEffect(() => {
    if (videoRef.current) {
      if (playing) {
        console.log('set video to play')
        videoRef.current.play()
      } else {
        console.log('set video to pause')
        videoRef.current.pause()
      }
    }
  }, [playing])

  const togglePlayback = () => {
    if (rainSounds[songIndex].playingSound.playing()) {
      rainSounds[songIndex].playingSound.stop()
      setPlaying((prevPlaying) => !prevPlaying)
      if (timerVisible) setTimerVisible(false)
    } else {
      setPlaying((prevPlaying) => !prevPlaying)
      rainSounds[songIndex].playingSound.play()
    }
  }

  return (
    <div className="container">
      <div className="slickContainer">
        <Slider {...settings}>
          {rainSounds.map((moog, index) => (
            <VideoSlide
              key={index}
              videoBackground={moog.videoBackground}
              playing={playing}
              intentionalVideoPlay={intentionalVideoPlay}
              setIntentionalVideoPlay={setIntentionalVideoPlay}
            />
          ))}
        </Slider>
      </div>

      <div className="powerControls">
        <button className="powerIcon" onClick={() => togglePlayback()}>
          <FaTint
            size={250}
            className={`powerIcon ${
              playing ? 'activePowerIcon' : 'inactivePowerIcon'
            }`}
          />
        </button>
      </div>

      <div className="timerCountdownContainer">
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
      </div>

      <div className="timerControls">
        <TimerControls
          setTimerVisible={setTimerVisible}
          tsModalVisible={tsModalVisible}
          setTsModalVisible={setTsModalVisible}
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
      </div>
    </div>
  )
}

export default RainSlider
