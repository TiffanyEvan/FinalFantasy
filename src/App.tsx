import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import GameComponent from './components/GameComponent'
import PlayerNameInput from './components/PlayerNameInput'
import './App.css'

function App() {
  const [showGame, setShowGame] = useState(false)
  const [playerName, setPlayerName] = useState('')

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Final Fantasy</h1>
      
      <div className="card">
        <PlayerNameInput 
          onNameSubmit={setPlayerName}
          defaultName={playerName}
        />
      </div>

      {playerName && (
        <div className="card">
          <button onClick={() => setShowGame(!showGame)}>
            {showGame ? 'Hide Game' : 'Start Game'}
          </button>
          <p>
            Click the button above to start the Phaser game
          </p>
        </div>
      )}
      
      {showGame && playerName && <GameComponent playerName={playerName} />}
    </>
  )
}

export default App