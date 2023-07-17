import React, { useState } from 'react'
import Touchstrip from './Touchstrip'
import '../styles/TouchstripDialog.css'

interface TouchstripDialogProps {
  onCancel: () => void
  handleConfirm: () => void
  selectedHours: number
  setSelectedHours: React.Dispatch<React.SetStateAction<number>>
  selectedMinutes: number
  setSelectedMinutes: React.Dispatch<React.SetStateAction<number>>
  selectedSeconds: number
  setSelectedSeconds: React.Dispatch<React.SetStateAction<number>>
}

const TouchstripDialog: React.FC<TouchstripDialogProps> = ({
  onCancel,
  handleConfirm,
  selectedHours,
  setSelectedHours,
  selectedMinutes,
  setSelectedMinutes,
  selectedSeconds,
  setSelectedSeconds,
}) => {
  // const [selectedValue, setSelectedValue] = useState(0)

  const handleReset = () => {
    // Reset the three values
    setSelectedHours(0)
    setSelectedMinutes(0)
    setSelectedSeconds(0)
  }

  // const handleTouchstripChange = (value: number) => {
  //   // Handle the selected value from the Touchstrip component
  //   if (value !== selectedValue) {
  //     setSelectedValue(value)
  //     console.log('Selected Value:', value)
  //   }
  // }

  return (
    <div className="touchstrip-dialog">
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ color: 'white' }}>Hours</p>
          <Touchstrip
            // onChange={handleTouchstripChange}
            startRange={0}
            endRange={23}
            selectedValue={selectedHours}
            setSelectedValue={setSelectedHours}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ color: 'white' }}>Minutes</p>
          <Touchstrip
            // onChange={handleTouchstripChange}
            startRange={0}
            endRange={59}
            selectedValue={selectedMinutes}
            setSelectedValue={setSelectedMinutes}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <p style={{ color: 'white' }}>Seconds</p>
          <Touchstrip
            // onChange={handleTouchstripChange}
            startRange={0}
            endRange={59}
            selectedValue={selectedSeconds}
            setSelectedValue={setSelectedSeconds}
          />
        </div>
      </div>
      <div className="touchstrip-buttons">
        <button className="touchstrip-button" onClick={onCancel}>
          Cancel
        </button>
        <button className="touchstrip-button" onClick={handleReset}>
          Reset
        </button>
        <button className="touchstrip-button" onClick={handleConfirm}>
          OK
        </button>
      </div>
    </div>
  )
}

export default TouchstripDialog
