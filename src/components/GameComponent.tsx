import { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import gameConfig from '../game/config'

const GameComponent = () => {
  const gameRef = useRef<HTMLDivElement>(null)
  const phaserGameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (gameRef.current && !phaserGameRef.current) {
      const config = {
        ...gameConfig,
        parent: gameRef.current
      }
      
      phaserGameRef.current = new Phaser.Game(config)
    }

    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true)
        phaserGameRef.current = null
      }
    }
  }, [])

  return (
    <div>
      <h2>Final Fantasy Game</h2>
      <div 
        ref={gameRef} 
        id="game-container"
        style={{ 
          width: '800px', 
          height: '600px', 
          margin: '0 auto',
          border: '2px solid #333'
        }}
      />
    </div>
  )
}

export default GameComponent