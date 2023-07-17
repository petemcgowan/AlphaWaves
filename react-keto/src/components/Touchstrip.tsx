import React, { useState, useEffect, useRef } from 'react'
import '../styles/TouchstripDialog.css'

interface TouchstripProps {
  // onChange: (value: number) => void
  startRange: number
  endRange: number
  selectedValue: number
  setSelectedValue: React.Dispatch<React.SetStateAction<number>>
}

const Touchstrip: React.FC<TouchstripProps> = ({
  // onChange,
  startRange,
  endRange,
  selectedValue,
  setSelectedValue,
}) => {
  const touchstripRef = useRef<HTMLDivElement>(null)
  const cumulativeDeltaYRef = useRef(0)
  const startYRef = useRef(0)
  const selectedValueRef = useRef(selectedValue)
  const displayValueRef = useRef(selectedValue)
  const [displayValue, setDisplayValue] = useState(selectedValue)
  const frameIdRef = useRef(0)
  // const [isMouseDown, setIsMouseDown] = useState(false)
  const isMouseDownRef = useRef(false)

  // useEffect(() => {
  //   selectedValueRef.current = selectedValue
  //   displayValueRef.current = selectedValue
  //   setDisplayValue(selectedValue)
  // }, [selectedValue])

  const updateDisplayValue = () => {
    setDisplayValue(displayValueRef.current)
    frameIdRef.current = 0
  }

  const dragThreshold = 15

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    isMouseDownRef.current = true
    startYRef.current = e.clientY
    // console.log('handleMouseDown' + isMouseDown)
  }

  const handleMouseLeave = () => {
    cumulativeDeltaYRef.current = 0
    startYRef.current = 0
  }

  // const handleSelection = () => {
  //   onChange(selectedValue)
  // }

  useEffect(() => {
    const handleMouseUp = () => {
      isMouseDownRef.current = false
      // console.log('handleMouseUp is called, isMouseDown:' + isMouseDown)
      setSelectedValue(selectedValueRef.current)
      cumulativeDeltaYRef.current = 0
    }

    const handleMouseMove = (e: MouseEvent) => {
      // console.log('handleMouseMove, isMouseDown:' + isMouseDown)

      if (
        !startYRef.current ||
        !touchstripRef.current ||
        !isMouseDownRef.current
      ) {
        return
      }

      const deltaY = startYRef.current - e.clientY
      startYRef.current = e.clientY
      cumulativeDeltaYRef.current += deltaY
      // console.log(
      //   `startY:${startYRef.current}, deltaY:${deltaY}, cumulativeDeltaY:${cumulativeDeltaYRef.current}`
      // )

      if (Math.abs(cumulativeDeltaYRef.current) >= dragThreshold) {
        const increment =
          Math.sign(cumulativeDeltaYRef.current) *
          Math.floor(Math.abs(cumulativeDeltaYRef.current) / dragThreshold)
        // console.log(`increment:${increment}`)
        cumulativeDeltaYRef.current = 0

        let newValue = selectedValueRef.current + increment

        if (newValue < startRange) {
          newValue = endRange
        }

        if (newValue > endRange) {
          newValue = startRange
        }

        selectedValueRef.current = newValue
        displayValueRef.current = newValue

        // Schedule an update to the display value if one isn't already scheduled
        if (!frameIdRef.current) {
          // console.log(`frameIdRef.current:${frameIdRef.current}`)
          frameIdRef.current = requestAnimationFrame(updateDisplayValue)
        }
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [startRange, endRange])

  // useEffect(() => {
  //   document.addEventListener('mouseup', handleMouseUp)

  //   return () => {
  //     document.removeEventListener('mouseup', handleMouseUp)
  //   }
  // }, [])

  return (
    <div
      className="touchstrip"
      onMouseDown={handleMouseDown}
      // onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // onClick={handleSelection}
      ref={touchstripRef}
    >
      <div className="touchstrip-label">
        {displayValue === startRange ? endRange : displayValue - 1}
      </div>
      <div className="touchstrip-label selected">{displayValue}</div>
      <div className="touchstrip-label">
        {displayValue === endRange ? startRange : displayValue + 1}
      </div>
    </div>
  )
}

export default Touchstrip

// const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
//   console.log(
//     'MOUSE UP: e.clientY:' +
//       e.clientY +
//       ', startY:' +
//       startY +
//       ', startRange:' +
//       startRange
//   )
//   startY = startRange
//   const deltaY = e.clientY - startY
//   console.log('MOUSE UP: deltaY:' + deltaY)
// }
