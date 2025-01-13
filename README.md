# Final Fantasy Game

A React + Phaser game project built with Vite and TypeScript.

## 🎮 Features

- **React 18** with TypeScript
- **Phaser 3** game engine integration
- **Vite** for fast development and building
- **ESLint** for code quality
- Platform jumping game mechanics
- Physics engine with gravity and collision detection
- Keyboard controls (arrow keys)

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd FinalFantasy
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎯 How to Play

1. Click the "Start Game" button to launch the Phaser game
2. Use arrow keys to control the blue character:
   - **Left/Right arrows**: Move left and right
   - **Up arrow**: Jump (only when touching the ground)
3. Navigate through the green platforms

## 📁 Project Structure

```
src/
├── components/          # React components
│   └── GameComponent.tsx   # Phaser game integration
├── game/               # Phaser game logic
│   ├── config.ts          # Game configuration
│   └── scenes/            # Game scenes
│       └── MainScene.ts   # Main game scene
├── assets/             # Static assets
├── App.tsx             # Main React app
└── main.tsx           # App entry point
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Game Architecture

### Phaser Integration
- The game is integrated into React using a custom `GameComponent`
- Phaser game instance is properly managed with React lifecycle
- Game configuration is centralized in `game/config.ts`

### Scene System
- `MainScene`: The main game scene with platforms and player character
- Includes physics setup, sprite creation, and input handling

## 🔧 Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Phaser 3** - Game engine
- **Vite** - Build tool
- **ESLint** - Code linting

## 📝 Development Notes

- The game uses programmatically generated colored rectangles as sprites
- Physics engine configured with arcade physics
- Responsive design considerations for the game container
- Clean separation between React UI and Phaser game logic

## 🚧 Future Enhancements

- Add sprite assets and animations
- Implement multiple game levels
- Add sound effects and background music
- Create character selection system
- Implement save/load game state
- Add multiplayer functionality

## 📄 License

This project is open source and available under the [MIT License](LICENSE).