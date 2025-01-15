/**
 * MovableObject extends DrawableObject and adds movement and physics.
 */
class MovableObject extends DrawableObject {
  speed = 0.15
  otherDirection = false
  speedY = 0
  acceleration = 2.5
  energy = 100
  lastHit = 0
  lastHurtSoundTime = 0
  collisionOffsetX = 0
  collisionOffsetY = 0
  collisionWidth = this.width
  collisionHeight = this.height

  /**
   * Applies gravity to the object.
   */
  applyGravity() {
    setInterval(() => {
      this.applyGravityStep()
      if (this instanceof ThrowableObject) {
        this.limitBottleFall()
      } else {
        this.resetCharacterToGround()
      }
    }, 1000 / 60)
  }

  /**
   * Executes a single gravity step.
   */
  applyGravityStep() {
    if (this instanceof ThrowableObject && !this.gravityEnabled) {
      return
    }
    if (this.isAboveGround() || this.speedY > 0) {
      this.y -= this.speedY
      this.speedY -= this.acceleration
    }
  }

  /**
   * Limits bottle fall position.
   */
  limitBottleFall() {
    if (!this.gravityEnabled) {
      return
    }
    if (this.y > 1000) {
      this.y = 600
      this.speedY = 0
    }
  }

  /**
   * Resets character to ground level.
   */
  resetCharacterToGround() {
    if (this.y > 120) {
      this.y = 120
      this.speedY = 0
    }
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if above ground.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true
    } else {
      return this.y < 120
    }
  }

  /**
   * Checks collision with another object.
   * @param {Object} obj - The other object.
   * @returns {boolean} True if colliding.
   */
  isColliding(obj) {
    const thisBox = this.getCollisionBox()
    const otherBox = obj.getCollisionBox()
    return (
      thisBox.x + thisBox.width >= otherBox.x &&
      thisBox.x <= otherBox.x + otherBox.width &&
      thisBox.y + thisBox.height >= otherBox.y &&
      thisBox.y <= otherBox.y + otherBox.height
    )
  }

  /**
   * Gets the collision box.
   * @returns {Object} Collision box with x, y, width, and height.
   */
  getCollisionBox() {
    return {
      x: this.x + this.collisionOffsetX,
      y: this.y + this.collisionOffsetY,
      width: this.collisionWidth,
      height: this.collisionHeight,
    }
  }

  /**
   * Reduces energy when hit.
   */
  hit() {
    if (this.energy === 0) {
      return
    }
    const currentTime = new Date().getTime()
    if (currentTime - this.lastHit > 500) {
      this.energy -= 10
      if (this.energy < 0) {
        this.energy = 0
      } else {
        this.lastHit = currentTime
      }
    }
  }

  /**
   * Checks if the object is hurt.
   * @returns {boolean} True if recently hit.
   */
  isHurt() {
    if (this.energy === 0) {
      return false
    }
    let timepassed = new Date().getTime() - this.lastHit
    timepassed = timepassed / 1000
    return timepassed < 1
  }

  /**
   * Checks if the object is dead.
   * @returns {boolean} True if energy is 0.
   */
  isDead() {
    return this.energy == 0
  }

  /**
   * Plays an animation.
   * @param {string[]} images - Array of image paths.
   * @param {number} [frameRate=1] - Frames per image.
   * @param {boolean} [loop=true] - Whether to loop the animation.
   */
  playAnimation(images, frameRate = 1, loop = true) {
    if (this.currentImage % frameRate === 0) {
      let i = Math.floor(this.currentImage / frameRate)
      if (!loop && i >= images.length - 1) {
        i = images.length - 1
      } else {
        i = i % images.length
      }
      let path = images[i]
      this.img = this.imageCache[path]
    }
    if (loop || this.currentImage / frameRate < images.length - 1) {
      this.currentImage++
    }
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed
  }

  /**
   * Makes the object jump.
   */
  jump() {
    this.speedY = 30
  }
}
