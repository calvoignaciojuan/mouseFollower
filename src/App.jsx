import { useEffect, useState } from 'react'
import { Object } from './components/Object'
import './App.css'

function App () {
  const [enableFollow, setEnableFollow] = useState(false)
  const [coordinades, setCoordinades] = useState({ x: 0, y: 0 })
  const [score, setScore] = useState(0)

  const [objects, setObjects] = useState([])

  const createObject = () => {
    const objectInitialValue = {
      id: 0,
      alive: true,
      x: 200,
      y: 200,
      duration: 5,
      height: 50,
      width: 100,
      color: '#fff'
    }
    setObjects([objectInitialValue])
  }

  // const checkObjectTouch = ({ x: xMouse, y: yMouse }) => {
  //   const touch = objects.some((object, index) => {
  //     const {
  //       x: xMin,
  //       y: yMin
  //     } = object
  //     const xMax = xMin + object.width
  //     const yMax = yMin + object.height
  //     const isMouseInsideTheObject = ((xMouse > xMin) && (xMouse < xMax)) && ((yMouse > yMin) && (yMouse < yMax))
  //     return (isMouseInsideTheObject)
  //   })
  //   return touch
  // }
  // const test = () => {
  //   setScore(score + 1)
  // }
  // setScore((prevScore) => prevScore + 1)

  const changeMousePosition = (event) => {
    const { clientX, clientY } = event
    const newCoord = { x: clientX, y: clientY }
    setCoordinades(newCoord)
  }

  useEffect(() => {
    if (enableFollow) {
      window.addEventListener('mousemove', changeMousePosition)
    }
    return () => {
      window.removeEventListener('mousemove', changeMousePosition)
    }
  }, [enableFollow])

  const clickHandler = () => {
    setEnableFollow((prevState) => {
      if (!prevState) createObject()
      return !prevState
    })
  }

  const renderMouseText = () => {
    return enableFollow ? 'Disable Mouse Follow' : 'Enable Mouse Follow'
  }

  const killObject = (id) => {
    const newObjectsList = [...objects]
    newObjectsList[id].alive = false
    setObjects(newObjectsList)
  }

  return (
    <>
      <main>
        <button
          onClick={clickHandler}
        >
          {renderMouseText()}
        </button>
        <h2>Score</h2>
        <span>{score}</span>
        <div
          className='circle'
          style={{ transform: `translate(${coordinades.x}px,${coordinades.y}px)` }}
        />
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
      </main>
    </>
  )
}

export default App
