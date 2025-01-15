import { useState } from 'react'

interface PlayerNameInputProps {
  onNameSubmit: (name: string) => void
  defaultName?: string
}

const PlayerNameInput = ({ onNameSubmit, defaultName = '' }: PlayerNameInputProps) => {
  const [playerName, setPlayerName] = useState(defaultName)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (playerName.trim()) {
      setIsSubmitted(true)
      onNameSubmit(playerName.trim())
    }
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setPlayerName('')
  }

  if (isSubmitted) {
    return (
      <div className="player-name-display">
        <h3>欢迎, {playerName}!</h3>
        <button onClick={handleReset} className="reset-name-btn">
          更改名字
        </button>
      </div>
    )
  }

  return (
    <div className="player-name-input">
      <h3>请输入你的名字</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="输入你的角色名..."
          maxLength={20}
          required
          style={{
            padding: '8px 12px',
            fontSize: '16px',
            border: '2px solid #646cff',
            borderRadius: '4px',
            marginRight: '8px',
            outline: 'none'
          }}
        />
        <button 
          type="submit"
          disabled={!playerName.trim()}
          style={{
            padding: '8px 16px',
            fontSize: '16px',
            backgroundColor: '#646cff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: playerName.trim() ? 'pointer' : 'not-allowed',
            opacity: playerName.trim() ? 1 : 0.6
          }}
        >
          确认
        </button>
      </form>
      <p style={{ fontSize: '14px', color: '#888', marginTop: '8px' }}>
        名字将显示在游戏中 (最多20个字符)
      </p>
    </div>
  )
}

export default PlayerNameInput