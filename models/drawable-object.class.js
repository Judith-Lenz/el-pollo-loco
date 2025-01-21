/**
 * Represents an object that can be drawn on the canvas.
 */
class DrawableObject {
  img
  imageCache = {}
  currentImage = 0
  x = 0
  y = 280
  height = 150
  width = 90

  /**
   * Loads an image from the specified path.
   * @param {string} path - The path to the image file.
   */
  loadImage(path) {
    this.img = new Image()
    this.img.src = path
  }

  /**
   * Draws the object on the canvas using the specified context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
  }

  /**
   * Draws a rectangular frame around the object if it matches specific classes.
   * Used for debugging purposes to visualize object boundaries.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    // Debugging-Rahmen aktuell deaktiviert
  }

  /**
   * Preloads multiple images and stores them in the image cache.
   * @param {string[]} arr - An array of image file paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image()
      img.src = path
      this.imageCache[path] = img
    })
  }
}
