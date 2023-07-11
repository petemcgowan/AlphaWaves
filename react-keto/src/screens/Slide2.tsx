import React from 'react'
import productivity_replenishing_sleep_cleansing_rain_calming from '../../assets/images/productivity_replenishing_sleep_cleansing_rain_calming.png'

const Slide2 = () => {
  const dominantColor = 'rgb(38, 27, 21)' // Dominant colour of image

  return (
    <div className="slideContainer">
      <div className="imageContainer">
        <img
          className="image"
          src={productivity_replenishing_sleep_cleansing_rain_calming}
          alt="Productivity replenishing sleep cleansing rain calming"
        />
      </div>
      <div className="textBox">
        <p className="text">
          Boosting alpha waves through activities like meditation can enhance
          your creativity, reduce stress, and promote calmness. An imbalance of
          these waves is often linked to depression.
        </p>
      </div>
    </div>
  )
}

export default Slide2
