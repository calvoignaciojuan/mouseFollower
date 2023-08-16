import './EndGameModal.css'
import { useGameContext } from '../../Context'
import Confetti from 'react-confetti'

const EndGameModal = ({ resetGame }) => {
  const { winner, count } = useGameContext()
  const renderMessage = () => {
    if (winner === false) return <p>Perdiste</p>
    if (winner === true) {
      return (
        <>
          <p>Ganaste!</p>
          <p>{`con ${count} puntos`}</p>
        </>
      )
    }
  }
  return (
    <div className='modal'>
      {winner && <Confetti />}
      <section>
        {renderMessage()}

        <button onClick={resetGame}>Reiniciar Juego</button>
      </section>
    </div>
  )
}

export { EndGameModal }
