/**
 * Represents a throwable object, like a bottle, with physics and animations.
 */
class ThrowableObject extends MovableObject {
  speedX = 20
  speedY = 10
  acceleration = 1.0

  BOTTLE_FLY_IMAGES = [
    'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
  ]

  BOTTLE_SPLASH_IMAGES = [
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
    'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
  ]

  /**
   * Initializes a throwable object at the given position.
   * @param {number} x - Initial x-coordinate.
   * @param {number} y - Initial y-coordinate.
   */
  constructor(x, y) {
    super().loadImage('img/6_salsa_bottle/salsa_bottle.png')
    this.loadImages(this.BOTTLE_FLY_IMAGES)
    this.loadImages(this.BOTTLE_SPLASH_IMAGES)
    this.gravityEnabled = true
    this.x = x
    this.y = y
    this.width = 70
    this.height = 65
    this.collisionOffsetX = 10
    this.collisionOffsetY = 5
    this.collisionWidth = 50
    this.collisionHeight = 55
    this.throw()
  }

  /**
   * Starts the throwing motion with gravity and horizontal speed.
   */
  throw() {
    this.startBottleAnimation()
    this.speedY = 10
    this.applyGravity()
    this.throwInterval = setInterval(() => {
      this.x += this.speedX
      if (this.y > 600 || !this.gravityEnabled) {
        clearInterval(this.throwInterval)
      }
    }, 25)
  }

  /**
   * Starts the bottle's flying animation.
   */
  startBottleAnimation() {
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.BOTTLE_FLY_IMAGES, 4)
    }, 1000 / 60)
  }

  /**
   * Stops the current animation.
   */
  stopCurrentAnimation() {
    clearInterval(this.animationInterval)
  }

  /**
   * Starts the splash animation after impact.
   */
  startSplashAnimation() {
    this.deactivateHitBox()
    this.currentImage = 0
    const splashInterval = setInterval(() => {
      if (this.currentImage < this.BOTTLE_SPLASH_IMAGES.length) {
        this.img = this.imageCache[this.BOTTLE_SPLASH_IMAGES[this.currentImage]]
        this.currentImage++
      } else {
        clearInterval(splashInterval)
      }
    }, 100)
  }

  /**
   * Stops all movement of the object.
   */
  stopMovement() {
    this.speedX = 0
    this.speedY = 0
    clearInterval(this.throwInterval)
  }

  /**
   * Disables gravity for the object.
   */
  disableGravity() {
    this.gravityEnabled = false
    clearInterval(this.gravityInterval)
    this.speedY = 0
  }

  /**
   * Deactivates the hitbox by setting dimensions to zero.
   */
  deactivateHitBox() {
    this.collisionOffsetX = 0
    this.collisionOffsetY = 0
    this.collisionWidth = 0
    this.collisionHeight = 0
  }
}
