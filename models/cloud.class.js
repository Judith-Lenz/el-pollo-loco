/**
 * Class representing a cloud in the game.
 * Extends the MovableObject class.
 */
class Cloud extends MovableObject {
  height = 250
  width = 500
  y = 20
  CLOUDS_WALKING = ['img/5_background/layers/4_clouds/1.png', 'img/5_background/layers/4_clouds/2.png']

  /**
   * Creates a new Cloud instance.
   * @param {string} imagePath - The path to the cloud image.
   * @param {number} x - The x-coordinate of the cloud.
   * @param {number} y - The y-coordinate of the cloud.
   */
  constructor(imagePath, x, y) {
    super()
    this.loadImage(imagePath)
    this.loadImages([imagePath])
    this.x = x
    this.y = y
    this.collisionOffsetX = 15
    this.collisionOffsetY = 10
    this.collisionWidth = 450
    this.collisionHeight = 100
    this.speed = 0.2

    setInterval(() => {
      this.moveLeft()
      if (this.x + this.width < -500) {
        this.x = 2500
      }
    }, 1000 / 60)
  }
}
