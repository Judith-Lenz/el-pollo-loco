/**
 * Represents the Endboss status bar in the game.
 */
class StatusBarEndboss extends DrawableObject {
  IMAGES_STATUSENDBOSS = [
    'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
    'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
    'img/7_statusbars/2_statusbar_endboss/green/green80.png',
    'img/7_statusbars/2_statusbar_endboss/green/green100.png',
  ]

  percentage = 100

  /**
   * Initializes the Endboss status bar and sets default values.
   */
  constructor() {
    super()
    this.loadImages(this.IMAGES_STATUSENDBOSS)
    this.x = 2500 + 40
    this.y = 7
    this.width = 200
    this.height = 55
    this.setPercentage(100)
  }

  /**
   * Updates the status bar image based on the percentage.
   * @param {number} percentage - The current percentage (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage
    let path = this.IMAGES_STATUSENDBOSS[this.resolveImageIndex()]
    this.img = this.imageCache[path]
  }

  /**
   * Resolves the image index based on the percentage.
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
