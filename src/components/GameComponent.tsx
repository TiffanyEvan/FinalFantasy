import { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import gameConfig from '../game/config'

interface GameComponentProps {
  playerName?: string
}

const GameComponent = ({ playerName }: GameComponentProps) => {
  const gameRef = useRef<HTMLDivElement>(null)
  const phaserGameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (gameRef.current && !phaserGameRef.current) {
      const config = {
        ...gameConfig,
        parent: gameRef.current
      }
      
      phaserGameRef.current = new Phaser.Game(config)
      
      // Pass player name to the game scene
      if (playerName) {
        phaserGameRef.current.registry.set('playerName', playerName)
      }
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
      {playerName && (
        <p style={{ textAlign: 'center', fontSize: '18px', color: '#646cff' }}>
          玩家: {playerName}
        </p>
      )}
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