/**
 * Class representing a coin in the game.
 * Extends the MovableObject class.
 */
class Coin extends MovableObject {
  height = 100
  width = 100
  y = 350
  baseY = 350
  floatDirection = 1
  floatRange = 3
  floatSpeed = 0.2

  collect_coin_sound = new Audio('audio/coins.mp3')

  /**
   * Creates a new Coin instance.
   * @param {number} x - The x-coordinate of the coin.
   * @param {number} y - The y-coordinate of the coin.
   */
  constructor(x, y) {
    super().loadImage('img/8_coin/coin_1.png')
    this.x = x
    this.y = y
    this.baseY = this.y
    this.animateFloating()
    this.collisionOffsetX = 34
    this.collisionOffsetY = 35
    this.collisionWidth = 31
    this.collisionHeight = 30
  }

  /**
   * Animates the coin to float up and down.
   */
  animateFloating() {
    setInterval(() => {
      this.y += this.floatDirection * this.floatSpeed
      if (this.y > this.baseY + this.floatRange || this.y < this.baseY - this.floatRange) {
        this.floatDirection *= -1
      }
    }, 1000 / 60)
  }

  /**
   * Collects the coin, playing a sound and removing it from the world.
   */
  collectCoin() {
    this.playSound()
    this.removeCoinFromWorld()
  }

  /**
   * Plays the coin collection sound effect.
   */
  playSound() {
    this.collect_coin_sound.play()
  }

  /**
   * Removes the coin from the world's level coin array.
   */
  removeCoinFromWorld() {
    const index = world.level.coins.indexOf(this)
    if (index > -1) {
      world.level.coins.splice(index, 1)
    }
  }
}
