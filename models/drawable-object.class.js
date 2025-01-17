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
    if (
      this instanceof Character ||
      this instanceof ChickenNormal ||
      this instanceof ChickenSmall ||
      this instanceof Coin ||
      this instanceof Bottle ||
      this instanceof ThrowableObject ||
      this instanceof Endboss
    ) {
      //hier lege ich fest bei welchen Objekten ich einen Rand sehen möchte.
      ctx.beginPath()
      ctx.lineWidth = '3'
      ctx.strokeStyle = 'blue'
      ctx.rect(this.x, this.y, this.width, this.height) //hier brauchen wir die Koordinaten vom jeweiligen Objekt!
      ctx.stroke()
      // Zeichne die Hitbox (roter Rahmen)
      const box = this.getCollisionBox()
      ctx.beginPath()
      ctx.lineWidth = '2'
      ctx.strokeStyle = 'red'
      ctx.rect(box.x, box.y, box.width, box.height)
      ctx.stroke()
    }
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
