/**
 * Class representing a bottle in the game.
 * Extends the MovableObject class.
 */
class Bottle extends MovableObject {
  height = 75
  width = 75
  y = 355

  collect_bottle_sound = new Audio('audio/collect_pop2.mp3')

  BOTTLE__GROUND_IMAGES = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
  ]

  /**
   * Creates a new Bottle instance.
   * @param {number} x - The x-coordinate of the bottle.
   */
  constructor(x) {
    super()
    const randomIndex = Math.floor(Math.random() * this.BOTTLE__GROUND_IMAGES.length)
    this.loadImage(this.BOTTLE__GROUND_IMAGES[randomIndex])
    this.x = x
    this.collisionOffsetX = 26
    this.collisionOffsetY = 12
    this.collisionWidth = 32
    this.collisionHeight = 55
  }

  /**
   * Collects the bottle, playing a sound and removing it from the world.
   */
  collectBottle() {
    this.playBottleSound()
    this.removeBottleFromWorld()
  }

  /**
   * Plays the bottle collection sound effect.
   */
  playBottleSound() {
    this.collect_bottle_sound.play()
  }

  /**
   * Removes the bottle from the world's level bottle array.
   */
  removeBottleFromWorld() {
    const index = world.level.bottles.indexOf(this)
    if (index > -1) {
      world.level.bottles.splice(index, 1)
    }
  }
}
