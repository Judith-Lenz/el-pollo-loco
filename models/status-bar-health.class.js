/**
 * Represents the health status bar in the game.
 */
class StatusBarHealth extends DrawableObject {
  IMAGES_STATUSHURT = [
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',
  ]

  percentage = 100

  /**
   * Initializes the health status bar and sets default values.
   */
  constructor() {
    super()
    this.loadImages(this.IMAGES_STATUSHURT)
    this.x = 40
    this.y = 40
    this.width = 200
    this.height = 55
    this.setPercentage(100)
  }

  /**
   * Updates the status bar image based on the health percentage.
   * @param {number} percentage - The current health percentage (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage
    let path = this.IMAGES_STATUSHURT[this.resolveImageIndex()]
    this.img = this.imageCache[path]
  }

  /**
   * Resolves the image index based on the health percentage.
   * @returns {number} The index of the image to display.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5
    } else if (this.percentage > 80) {
      return 4
    } else if (this.percentage > 60) {
      return 3
    } else if (this.percentage > 40) {
      return 2
    } else if (this.percentage > 20) {
      return 1
    } else {
      return 0
    }
  }
}
