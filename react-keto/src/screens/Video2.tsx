import React, { useRef, useEffect } from 'react'
import videoBackground2 from '../../assets/videos/RainInACar540x960.mp4'

const Video2 = ({
  /*videoRef,*/ playing,
  intentionalVideoPlay,
  setIntentionalVideoPlay,
}) => {
  const dominantColor = 'rgb(38, 27, 21)' // Dominant colour of image
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current

    if (playing && video) {
      video.play()
      setIntentionalVideoPlay(true)
    } else {
      video.pause()
      setIntentionalVideoPlay(false)
    }
  }, [playing, setIntentionalVideoPlay])

  return (
    <div>
      <div className="imageContainer">
        <video
          ref={videoRef}
          src={videoBackground2}
          // className="video"
          muted={true}
          // volume={0.5}
          // loop={true}
          autoPlay={playing && intentionalVideoPlay}
          controls={false}
        />
      </div>
    </div>
  )
}

export default Video2

{
  /* <div className="textBox">
<p className="text">
  Alpha waves, ranging from 8 to 12 Hz, are produced by our brain in a
  relaxed, meditative state. A lack of these waves indicates we're not
  fully at ease.
</p>
</div> */
}
