import { useEffect, useState } from 'react'
import { Object } from '../Object'
import './Game.css'
import { getRandomInt } from '../../utils'
import { useGameContext } from '../../Context'
import { EndGameModal } from '../EndGameModal'

const COLORS = ['#64ff33', '#FF6800', '#333CFF', '#FF33E9', '#FCFF33']

function Game () {
  const { isPlaying, setCount, setIsPlaying, winner, setWinner } = useGameContext()

  const [objects, setObjects] = useState([])
  const [coordinades, setCoordinades] = useState({ x: 0, y: 0 })
  const [score, setScore] = useState(0)
  const [mouseColor, setMouseColor] = useState(0)

  useEffect(() => {
    const changeMousePosition = (event) => {
      const { clientX, clientY } = event
      const newCoord = { x: clientX, y: clientY }
      setCoordinades(newCoord)
    }
    if (isPlaying === true) {
      window.addEventListener('mousemove', changeMousePosition)
    }
    return () => {
      window.removeEventListener('mousemove', changeMousePosition)
    }
  }, [isPlaying])

  const createObjects = () => {
    const ObjectsCreated = []
    for (let index = 0; index < 5; index++) {
      const newObject = {
        id: index,
        alive: true,
        x: getRandomInt(1100),
        y: getRandomInt(400),
        duration: 5,
        height: 50 + getRandomInt(450),
        width: 50 + getRandomInt(450),
        color: COLORS[index]
      }
      ObjectsCreated.push(newObject)
    }
    setObjects(ObjectsCreated)
  }
  const resetGame = () => {
    setCount(100)
    setIsPlaying(null)
    setCoordinades({ x: 0, y: 0 })
    setScore(0)
    setMouseColor(0)
    setObjects([])
    setWinner(null)
  }
  const clickHandler = () => {
    if (isPlaying === null) {
      resetGame()
      createObjects()
      setIsPlaying(true)
    }
    if (isPlaying === true) {
      setIsPlaying(false) // pause the game
    }
    if (isPlaying === false) {
      setIsPlaying(true) // unpause
    }
  }
  const renderMouseText = () => {
    if (isPlaying === null) return 'Start Game'
    if (isPlaying === true) return 'Pause Game'
    if (isPlaying === false) return 'Continue'
  }
  const isWinner = () => {
    return objects.every((object) => {
      return !object.alive
    })
  }

  const killObject = (id, objectColor) => {
    if (isPlaying) {
      if ((COLORS[mouseColor] === objectColor)) {
        const newObjectsList = [...objects]
        newObjectsList[id].alive = false
        setObjects(newObjectsList)
        setScore((prevScore) => prevScore + 1)
        setMouseColor((prevScore) => prevScore + 1)
      } else { // si no coincidia el color pierde
        setWinner(false)
        setIsPlaying(null)
        return
      }
      if (isWinner()) {
        setWinner(true)
        setIsPlaying(null)
      }
    }
  }

  return (
    <main>
      <div className='panel'>
        <div className='btn'>
          <button
            onClick={clickHandler}
          >
            {renderMouseText()}
          </button>
        </div>
      </div>

      <div className='board'>
        {isPlaying && (coordinades.y > 100) &&
          <div
            className='circle'
            style={{
              transform: `translate(${coordinades.x}px,${coordinades.y}px)`,
              background: COLORS[mouseColor]
            }}
          />}
        {
          objects?.map((object) => {
            return (
              object.alive &&
                <Object
                  key={object.id}
                  object={object}
                  killObject={killObject}
                />
            )
          })
        }
      </div>
      {(winner != null) && <EndGameModal resetGame={resetGame} />}
    </main>
  )
}

export { Game }
