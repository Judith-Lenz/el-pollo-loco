/**
 * Class representing a small chicken enemy.
 * Inherits from MovableObject and includes animations and sounds.
 */
class ChickenSmall extends MovableObject {
  y = 365
  height = 50
  width = 50
  IMAGES_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
  ]

  IMAGE_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png'

  dead_enemy_sound = new Audio('audio/chicken_dead.mp3')

  /**
   * Creates a ChickenSmall object.
   * @param {number} x - The initial x-coordinate of the small chicken.
   */
  constructor(x) {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/2_w.png')
    this.loadImages(this.IMAGES_WALKING)
    this.energy = null
    this.isDeadFlag = false
    this.x = x
    this.speed = 0.7 + Math.random() * 0.5
    this.animate()
    this.collisionOffsetX = 1
    this.collisionOffsetY = 1
    this.collisionWidth = 47
    this.collisionHeight = 47
  }

  /**
   * Checks if the small chicken is dead.
   * @returns {boolean} True if the chicken is dead, false otherwise.
   */
  isDead() {
    return this.isDeadFlag
  }

  /**
   * Animates the small chicken's walking and updates its position.
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
   * Handles the small chicken's death, including animation, sound, and removal.
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
   * Plays the sound effect for a dead small chicken.
   */
  playDeadEnemySound() {
    this.dead_enemy_sound.play()
  }

  /**
   * Starts the animation for a dead small chicken and sets its speed to zero.
   */
  startDeadEnemyAnimation() {
    this.speed = 0
    this.loadImage(this.IMAGE_DEAD)
  }

  /**
   * Stops all animation intervals for the small chicken.
   */
  stopAnimation() {
    clearInterval(this.walkingInterval)
    clearInterval(this.animationInterval)
  }

  /**
   * Removes the small chicken from the game world after a delay.
   */
  removeDeadEnemyFromWorld() {
    const index = world.level.enemies.indexOf(this)
    if (index > -1) {
      world.level.enemies.splice(index, 1)
    }
  }

  /**
   * Deactivates the small chicken's hitbox by setting collision dimensions to zero.
   */
  deactivateHitBox() {
    this.collisionOffsetX = 0
    this.collisionOffsetY = 0
    this.collisionWidth = 0
    this.collisionHeight = 0
  }
}
