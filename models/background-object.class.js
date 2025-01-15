/**
 * Class representing a background object in the game.
 * Extends the MovableObject class.
 */
class BackgroundObject extends MovableObject {
  width = 740
  height = 480

  /**
   * Creates a new BackgroundObject instance.
   * @param {string} imagePath - The path to the image for the background.
   * @param {number} x - The x-coordinate of the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath)
    this.x = x
    this.y = 480 - this.height
  }
}
