import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import GameComponent from './components/GameComponent'
import './App.css'

function App() {
  const [showGame, setShowGame] = useState(false)

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
        <button onClick={() => setShowGame(!showGame)}>
          {showGame ? 'Hide Game' : 'Start Game'}
        </button>
        <p>
          Click the button above to start the Phaser game
        </p>
      </div>
      {showGame && <GameComponent />}
    </>
  )
}

export default App