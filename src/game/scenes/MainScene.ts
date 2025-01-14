import Phaser from 'phaser'

export default class MainScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite
  private platforms!: Phaser.Physics.Arcade.StaticGroup
  private boxes!: Phaser.Physics.Arcade.Group
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

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

    // Player physics
    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.boxes, this.platforms)
    this.physics.add.collider(this.player, this.boxes)

    // Create cursor keys
    this.cursors = this.input.keyboard!.createCursorKeys()

    // Add some text
    this.add.text(16, 16, 'Final Fantasy - Phaser Game', {
      fontSize: '32px',
      color: '#ffffff'
    })

    this.add.text(16, 60, 'Use arrow keys to move and push boxes', {
      fontSize: '16px',
      color: '#ffffff'
    })
  }

  update() {
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
  }
}