import { createContext, useContext, useState } from 'react'

const gameContext = createContext()

const GameContextProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(null) // null: game is over - true: playing  - false: game paused
  const [count, setCount] = useState(100)

  const [winner, setWinner] = useState(null) // null: the is not a winner or loser - false: there is a loser - true: there is a winner

  return (
    <gameContext.Provider value={{
      count,
      setCount,
      isPlaying,
      setIsPlaying,
      winner,
      setWinner
    }}
    >
      {children}
    </gameContext.Provider>
  )
}

const useGameContext = () => {
  return useContext(gameContext)
}

export { useGameContext, GameContextProvider }
