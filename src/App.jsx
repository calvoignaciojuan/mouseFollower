import { useEffect, useState } from 'react'
import { Object } from './components/Object'
import './App.css'
import { getRandomInt } from './utils'

const COLORS = ['#64ff33', '#ff5B33', '#333CFF', '#FF33E9', '#FCFF33']

function App () {
  const [isPlaying, setIsPlaying] = useState(null) // null: game is over - true: playing  - false: game paused
  const [coordinades, setCoordinades] = useState({ x: 0, y: 0 })
  const [score, setScore] = useState(0)
  const [mouseColor, setMouseColor] = useState(0)
  const [objects, setObjects] = useState([])
  const [winner, setWinner] = useState(false)

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
        x: getRandomInt(800),
        y: getRandomInt(800),
        duration: 5,
        height: getRandomInt(300),
        width: getRandomInt(300),
        color: COLORS[index]
      }
      ObjectsCreated.push(newObject)
    }
    setObjects(ObjectsCreated)
  }
  const resetGame = () => {
    setIsPlaying(null)
    setCoordinades({ x: 0, y: 0 })
    setScore(0)
    setMouseColor(0)
    setObjects([])
    setWinner(false)
  }

  const clickHandler = () => {
    if (isPlaying === null) {
      resetGame()
      createObjects()
      setIsPlaying(true)
    }
    if (isPlaying === true) {
      setIsPlaying(false) // pause the fame
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
      } else {
        setScore((prevScore) => prevScore - 1)
        // setMouseColor((prevScore) => prevScore - 1)
      }
      if (isWinner()) {
        setWinner(true)
        setIsPlaying(null)
        console.log('GANASTEEE')
      }
    }
  }
  return (
    <>
      <main>
        <div className='panel'>
          <section className='score'>
            <h2>Score</h2>
            <span>{score}</span>
          </section>
          <div className='but'>
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
            />
          }
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
      </main>
    </>
  )
}

export default App
