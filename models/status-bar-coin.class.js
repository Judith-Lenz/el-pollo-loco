/**
 * Represents the coin status bar in the game.
 */
class StatusBarCoin extends DrawableObject {
  IMAGES_STATUSCOIN = [
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
  ]

  percentage = 0

  /**
   * Initializes the coin status bar and sets default values.
   */
  constructor() {
    super()
    this.loadImages(this.IMAGES_STATUSCOIN)
    this.x = 40
    this.y = 85
    this.width = 200
    this.height = 55
    this.setPercentage(0)
  }

  /**
   * Updates the status bar image based on the percentage.
   * @param {number} percentage - The current percentage (0-100).
   */
  setPercentage(percentage) {
    this.percentage = percentage
    let path = this.IMAGES_STATUSCOIN[this.resolveImageIndex()]
    this.img = this.imageCache[path]
  }

  /**
   * Resolves the image index based on the percentage.
   * @returns {number} The index of the image to display.
   */
  resolveImageIndex() {
    if (this.percentage == 0) {
      return 0
    } else if (this.percentage <= 20) {
      return 1
    } else if (this.percentage <= 40) {
      return 2
    } else if (this.percentage <= 60) {
      return 3
    } else if (this.percentage < 100) {
      return 4
    } else {
      return 5
    }
  }
}
