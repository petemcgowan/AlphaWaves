import React from 'react'
import rain_falling_brain_alpha_waves_energy from '../../assets/images/rain_falling_brain_alpha_waves_energy.png'

const Slide1 = () => {
  const dominantColor = 'rgb(38, 27, 21)' // Dominant colour of image

  return (
    <div className="slideContainer">
      <div className="imageContainer">
        <img
          className="image"
          src={rain_falling_brain_alpha_waves_energy}
          alt="Rain Falling Brain Alpha Waves Energy"
        />
      </div>
      <div className="textBox">
        <p className="text">
          Alpha waves, ranging from 8 to 12 Hz, are produced by our brain in a
          relaxed, meditative state. A lack of these waves indicates we're not
          fully at ease.
        </p>
      </div>
    </div>
  )
}

export default Slide1
