import { useEffect, useState } from 'react'
import './Coundown.css'
import { useGameContext } from '../../Context'

const Countdown = () => {
  const { isPlaying, count, setCount, setWinner } = useGameContext()
  const [timerRunning, setTimerRunning] = useState(false)

  // se ejecuta cada vez que renderiza
  useEffect(() => {
    if (count === 0) {
      setWinner(false) // perdio
    } else {
      if (isPlaying && !timerRunning) {
        setTimerRunning(true)
        setTimeout(() => {
          setCount((prevCount) => {
            return prevCount - 1
          })
          setTimerRunning(false)
        }, 100)
      }
    }
  })
  const renderColor = () => {
    if (count < 25) return 'danger'
    if (count < 50) return 'warning'
    if (count < 75) return 'yell'
  }
  return (
    <div className='score'>
      <span className={renderColor()}>{count}</span>
    </div>
  )
}

export { Countdown }
