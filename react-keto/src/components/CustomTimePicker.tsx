import React, { useState } from 'react'

const CustomTimePicker = () => {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const divStyle = {
    backgroundColor: 'blue',
    color: 'white',
  }

  const handleTimeChange = (event, setTime) => {
    const { value } = event.target
    setTime(parseInt(value, 10))
  }

  return (
    <div style={divStyle}>
      <select value={hours} onChange={(e) => handleTimeChange(e, setHours)}>
        {Array.from(Array(24).keys()).map((hour) => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>
      <select value={minutes} onChange={(e) => handleTimeChange(e, setMinutes)}>
        {Array.from(Array(60).keys()).map((minute) => (
          <option key={minute} value={minute}>
            {minute}
          </option>
        ))}
      </select>
      <select value={seconds} onChange={(e) => handleTimeChange(e, setSeconds)}>
        {Array.from(Array(60).keys()).map((second) => (
          <option key={second} value={second}>
            {second}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CustomTimePicker
