import Phaser from 'phaser'

export default class MainScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite
  private platforms!: Phaser.Physics.Arcade.StaticGroup
  private boxes!: Phaser.Physics.Arcade.Group
  private enemies!: Phaser.Physics.Arcade.Group
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private gameOverText!: Phaser.GameObjects.Text | null

  constructor() {
    super({ key: 'MainScene' })
  }

  preload() {
    // Create colored rectangles as placeholders for sprites
    this.load.image('ground', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
    this.load.image('player', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')
    
    // Create colored rectangles programmatically
    this.createColoredRectangle('ground', 400, 32, 0x00ff00) // Green platform
    this.createColoredRectangle('player', 32, 48, 0x0000ff) // Blue player
    this.createColoredRectangle('box', 40, 40, 0x8B4513) // Brown box
    this.createColoredRectangle('enemy', 30, 30, 0xff0000) // Red enemy
  }

  createColoredRectangle(key: string, width: number, height: number, color: number) {
    const graphics = this.add.graphics()
    graphics.fillStyle(color)
    graphics.fillRect(0, 0, width, height)
    graphics.generateTexture(key, width, height)
    graphics.destroy()
  }

  create() {
    // Create platforms
    this.platforms = this.physics.add.staticGroup()
    
    // Ground
    this.platforms.create(400, 568, 'ground').setScale(2, 1).refreshBody()
    
    // Some platforms
    this.platforms.create(600, 400, 'ground').setScale(0.5, 1).refreshBody()
    this.platforms.create(50, 250, 'ground').setScale(0.5, 1).refreshBody()
    this.platforms.create(750, 220, 'ground').setScale(0.5, 1).refreshBody()

    // Create player
    this.player = this.physics.add.sprite(100, 450, 'player')
    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)

    // Create boxes group
    this.boxes = this.physics.add.group({
      bounceX: 0.1,
      bounceY: 0.1,
      dragX: 100
    })

    // Add some boxes to the scene
    this.boxes.create(300, 500, 'box')
    this.boxes.create(500, 350, 'box')
    this.boxes.create(150, 200, 'box')
    this.boxes.create(700, 170, 'box')
    this.boxes.create(650, 500, 'box')

    // Create enemies group
    this.enemies = this.physics.add.group({
      bounceX: 1,
      bounceY: 0
    })

    // Add some enemies to the scene
    const enemy1 = this.enemies.create(400, 500, 'enemy') as Phaser.Physics.Arcade.Sprite
    const enemy2 = this.enemies.create(200, 200, 'enemy') as Phaser.Physics.Arcade.Sprite
    const enemy3 = this.enemies.create(600, 350, 'enemy') as Phaser.Physics.Arcade.Sprite

    // Set enemy velocities for movement
    enemy1.setVelocityX(100)
    enemy2.setVelocityX(-80)
    enemy3.setVelocityX(120)

    // Player physics
    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.boxes, this.platforms)
    this.physics.add.collider(this.player, this.boxes)
    this.physics.add.collider(this.enemies, this.platforms)
    this.physics.add.collider(this.enemies, this.boxes)
    
    // Player vs Enemy collision (game over)
    this.physics.add.overlap(this.player, this.enemies, this.hitEnemy, undefined, this)

    // Initialize game over text as null
    this.gameOverText = null

    // Create cursor keys
    this.cursors = this.input.keyboard!.createCursorKeys()

    // Add some text
    this.add.text(16, 16, 'Final Fantasy - Phaser Game', {
      fontSize: '32px',
      color: '#ffffff'
    })

    // Display player name if available
    const playerName = this.registry.get('playerName')
    if (playerName) {
      this.add.text(16, 60, `玩家: ${playerName}`, {
        fontSize: '20px',
        color: '#ffff00'
      })
      
      this.add.text(16, 90, 'Use arrow keys to move, avoid red enemies!', {
        fontSize: '16px',
        color: '#ffffff'
      })
    } else {
      this.add.text(16, 60, 'Use arrow keys to move, avoid red enemies!', {
        fontSize: '16px',
        color: '#ffffff'
      })
    }
  }

  update() {
    // Player movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)
    } else {
      this.player.setVelocityX(0)
    }

    if (this.cursors.up.isDown && this.player.body!.touching.down) {
      this.player.setVelocityY(-330)
    }

    // Enemy movement logic - bounce between world bounds and obstacles
    this.enemies.children.entries.forEach((enemy) => {
      const enemySprite = enemy as Phaser.Physics.Arcade.Sprite
      
      // Check world bounds and reverse direction
      if (enemySprite.x <= 15 || enemySprite.x >= 785) {
        enemySprite.setVelocityX(-enemySprite.body!.velocity.x)
      }
      
      // Add some randomness to movement
      if (Math.random() < 0.005) { // 0.5% chance each frame
        enemySprite.setVelocityX(-enemySprite.body!.velocity.x)
      }
    })
  }

  hitEnemy(player: Phaser.Physics.Arcade.Sprite, enemy: Phaser.Physics.Arcade.Sprite) {
    // Stop player movement
    player.setVelocity(0, 0)
    player.setTint(0xff0000) // Turn player red
    
    // Stop all enemies
    this.enemies.children.entries.forEach((enemySprite) => {
      (enemySprite as Phaser.Physics.Arcade.Sprite).setVelocity(0, 0)
    })

    // Show game over text
    if (!this.gameOverText) {
      this.gameOverText = this.add.text(400, 300, 'GAME OVER!', {
        fontSize: '64px',
        color: '#ff0000'
      }).setOrigin(0.5)

      this.add.text(400, 380, 'Press SPACE to restart', {
        fontSize: '24px',
        color: '#ffffff'
      }).setOrigin(0.5)
    }

    // Add restart functionality
    this.input.keyboard!.once('keydown-SPACE', () => {
      this.scene.restart()
    })
  }
}