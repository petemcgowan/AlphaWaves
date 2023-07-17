import React, { useState, useEffect } from 'react'

interface CountdownProps {
  initialCount: number
}

const Countdown: React.FC<CountdownProps> = ({ initialCount }) => {
  const [count, setCount] = useState<number>(initialCount)

  useEffect(() => {
    const timerId = setInterval(() => {
      console.log('count:' + count)
      setCount((currentCount) => currentCount - 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [])

  return <div>{count}</div>
}

export default Countdown
