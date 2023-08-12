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

  useEffect(() => {
    const deleteObject = () => {
      // console.log('kill')
      killObject(id, color)
    }
    const element = document.getElementsByClassName(`obj${id}`)
    // console.log('add event to ', id)
    element[0]?.addEventListener('mouseover', deleteObject)
    return () => {
      element[0]?.removeEventListener('mouseover', deleteObject)
    }
  })

  return (
    <div
      className={`obj${id}`}
      style={{
        position: 'absolute',
        top: x,
        left: y,
        height,
        width,
        background: color
      }}
    />
  )
}
