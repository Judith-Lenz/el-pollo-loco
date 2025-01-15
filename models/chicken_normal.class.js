/**
 * Class representing a normal chicken enemy.
 * Inherits from MovableObject and includes animations and sounds.
 */
class ChickenNormal extends MovableObject {
  y = 335
  height = 85
  width = 70
  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
  ]

  IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'

  dead_enemy_sound = new Audio('audio/chicken_dead.mp3')

  /**
   * Creates a ChickenNormal object.
   * @param {number} x - The initial x-coordinate of the chicken.
   */
  constructor(x) {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/2_w.png')
    this.loadImages(this.IMAGES_WALKING)
    this.x = x
    this.energy = null
    this.isDeadFlag = false
    this.speed = 0.05 + Math.random() * 0.5
    this.animate()
    this.collisionOffsetX = 1
    this.collisionOffsetY = 1
    this.collisionWidth = 68
    this.collisionHeight = 83
  }

  /**
   * Checks if the chicken is dead.
   * @returns {boolean} True if the chicken is dead, false otherwise.
   */
  isDead() {
    return this.isDeadFlag
  }

  /**
   * Animates the chicken's walking and updates its position.
   */
  animate() {
    this.walkingInterval = setInterval(() => {
      if (!this.isDead()) this.moveLeft()
    }, 1000 / 60)

    this.animationInterval = setInterval(() => {
      if (!this.isDead()) this.playAnimation(this.IMAGES_WALKING)
    }, 200)
  }

  /**
   * Handles the chicken's death, including animation, sound, and removal.
   */
  deadEnemy() {
    this.isDeadFlag = true
    this.playDeadEnemySound()
    this.startDeadEnemyAnimation()
    this.stopAnimation()
    this.deactivateHitBox()
    setTimeout(() => {
      this.removeDeadEnemyFromWorld()
    }, 5000)
  }

  /**
   * Plays the sound effect for a dead chicken.
   */
  playDeadEnemySound() {
    this.dead_enemy_sound.play()
  }

  /**
   * Starts the animation for a dead chicken and sets its speed to zero.
   */
  startDeadEnemyAnimation() {
    this.speed = 0
    this.loadImage(this.IMAGE_DEAD)
  }

  /**
   * Stops all animation intervals for the chicken.
   */
  stopAnimation() {
    clearInterval(this.walkingInterval)
    clearInterval(this.animationInterval)
  }

  /**
   * Removes the chicken from the game world after a delay.
   */
  removeDeadEnemyFromWorld() {
    const index = world.level.enemies.indexOf(this)
    if (index > -1) {
      world.level.enemies.splice(index, 1)
    }
  }

  /**
   * Deactivates the chicken's hitbox by setting collision dimensions to zero.
   */
  deactivateHitBox() {
    this.collisionOffsetX = 0
    this.collisionOffsetY = 0
    this.collisionWidth = 0
    this.collisionHeight = 0
  }
}
