import { useEffect } from 'react'
import './Object.css'

export const Object = ({ object, killObject }) => {
  const {
    id,
    alive,
    x,
    y,
    duration,
    height,
    width,
    color
  } = object

  // const [isAlive, setIsAlive] = useState(alive)

  useEffect(() => {
    const element = document.getElementsByClassName(`obj${id}`)
    element[0]?.addEventListener('mouseover', () => { killObject(id) })
    return () => {
      element[0]?.removeEventListener('mouseover', () => { killObject(id) })
    }
  }, [])

  return (
    <div
      className={`obj${id}`}
      style={{
        top: x,
        left: y,
        height,
        width
      }}
    />
  )
}
