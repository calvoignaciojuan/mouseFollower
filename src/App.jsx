import { Game } from './components/Game'
import { Countdown } from './components/Countdown'
import { GameContextProvider } from './Context'

function App () {
  return (
    <GameContextProvider>
      <Countdown />
      <Game />
    </GameContextProvider>
  )
}

export default App
