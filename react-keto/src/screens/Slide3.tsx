import React from 'react'
import surreal_sand_timer from '../../assets/images/surreal_sand_timer.png'

const Slide3 = () => {
  const dominantColor = 'rgb(38, 27, 21)' // Dominant colour of image

  return (
    <div className="slideContainer">
      <div className="imageContainer">
        <img
          className="image"
          src={surreal_sand_timer}
          alt="surreal sand timer"
        />
      </div>
      <div className="textBox">
        <p className="text">
          Use the built-in timer to control the duration of alpha wave sounds.
          Toggle video playback using the 'video' button for a customized
          experience.
        </p>
      </div>
    </div>
  )
}

export default Slide3
