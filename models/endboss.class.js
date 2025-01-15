/**
 * Represents the Endboss character in the game, extending MovableObject.
 * Handles animations, state transitions, movement, and interactions with the player.
 */
class Endboss extends MovableObject {
  height = 450
  width = 350
  y = 0
  speed = 5

  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ]

  IMAGES_ALERT = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png',
  ]

  IMAGES_ATTACK = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png',
  ]

  IMAGES_HURT = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png',
  ]

  IMAGES_DEAD = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png',
  ]

  alert_sound = new Audio('audio/rooster2.mp3')
  hurt_sound = new Audio('audio/chicken_hurt.mp3')
  winning_sound = new Audio('audio/arriba.mp3')
  dying_sound = new Audio('audio/dying_endboss.mp3')

  /**
   * Initializes the Endboss with default properties and loads images and sounds.
   */
  constructor() {
    super().loadImage(this.IMAGES_WALKING[1])
    this.world = world
    this.loadImages(this.IMAGES_WALKING)
    this.loadImages(this.IMAGES_ALERT)
    this.loadImages(this.IMAGES_ATTACK)
    this.loadImages(this.IMAGES_HURT)
    this.loadImages(this.IMAGES_DEAD)
    this.hasPlayedWinningSound = false
    this.isEndboss = true
    this.x = 2500
    this.direction = -1
    this.currentState = 'idle'
    this.currentImageIndex = 0
    this.frameCounterAlert = 0
    this.frameCounterAttack = 0
    this.frameCounterIdle = 0
    this.frameCounterHurt = 0
    this.frameCounterDead = 0
    this.frameCounterWalk = 0
    this.collisionOffsetX = 80
    this.collisionOffsetY = 80
    this.collisionWidth = 220
    this.collisionHeight = 300
    this.lastHit = 0
  }

  /**
   * Starts the Endboss animation and state evaluation loops.
   */
  animate() {
    const minX = 2200
    const maxX = 2600
    this.checkDeadInterval = setInterval(() => {
      if (this.isDead() && this.currentState !== 'dead') {
        this.currentState = 'dead'
      }
    }, 100)
    this.stateMachineInterval = setInterval(() => {
      this.evaluateState(minX, maxX)
    }, 16)
  }

  /**
   * Evaluates and transitions the Endboss state based on proximity to the player.
   */
  evaluateState(minX, maxX) {
    switch (this.currentState) {
      case 'idle':
        this.handleIdle(minX, maxX)
        break
      case 'alert':
        this.handleAlert()
        break
      case 'attack':
        this.handleAttack()
        break
      case 'hurt':
        this.handleHurt()
        break
      case 'dead':
        this.handleDead()
        break
      case 'final':
        break
    }
  }

  /**
   * Handles the idle state behavior and animations.
   */
  handleIdle(minX, maxX) {
    this.frameCounterWalk++
    const FRAMES_TO_SKIP = 11
    if (this.frameCounterWalk >= FRAMES_TO_SKIP) {
      this.frameCounterWalk = 0
      this.playAnimation(this.IMAGES_WALKING)
      this.moveBoss(minX, maxX)
      if (this.isCharacterClose() && !this.isDead()) {
        this.currentState = 'alert'
        this.currentImageIndex = 0
        this.alert_sound.play()
      }
    }
  }

  /**
   * Handles the alert state behavior and animations.
   */
  handleAlert() {
    this.incrementAlertFrame()
    this.handleAlertAnimation()
    this.handleAlertIdleCheck()
  }

  incrementAlertFrame() {
    this.frameCounterAlert++
  }

  handleAlertAnimation() {
    const FRAMES_TO_SKIP = 13
    this.otherDirection = false
    if (this.frameCounterAlert >= FRAMES_TO_SKIP) {
      this.frameCounterAlert = 0
      if (this.currentImageIndex < this.IMAGES_ALERT.length) {
        this.img = this.imageCache[this.IMAGES_ALERT[this.currentImageIndex]]
        this.currentImageIndex++
      } else {
        this.currentState = 'attack'
        this.currentImageIndex = 0
      }
    }
  }

  handleAlertIdleCheck() {
    if (!this.isCharacterClose() && !this.isDead()) {
      this.currentState = 'idle'
      this.currentImageIndex = 0
    }
  }

  /**
   * Handles the attack state behavior and animations.
   */
  handleAttack() {
    this.incrementAttackFrame()
    this.handleAttackAnimation()
  }

  incrementAttackFrame() {
    this.frameCounterAttack++
  }

  handleAttackAnimation() {
    const FRAMES_TO_SKIP = 12
    this.otherDirection = false
    if (this.frameCounterAttack >= FRAMES_TO_SKIP) {
      this.frameCounterAttack = 0
      if (this.currentImageIndex < this.IMAGES_ATTACK.length) {
        this.img = this.imageCache[this.IMAGES_ATTACK[this.currentImageIndex]]
        this.currentImageIndex++
      } else {
        if (this.isCharacterClose() && !this.isDead()) {
          this.currentState = 'alert'
        } else {
          this.currentState = 'idle'
        }
        this.currentImageIndex = 0
      }
    }
  }

  /**
   * Handles the hurt state behavior and animations.
   */
  handleHurt() {
    this.frameCounterHurt++
    const FRAMES_TO_SKIP = 11
    if (this.frameCounterHurt >= FRAMES_TO_SKIP) {
      this.frameCounterHurt = 0
      if (this.currentImageIndex < this.IMAGES_HURT.length) {
        this.img = this.imageCache[this.IMAGES_HURT[this.currentImageIndex]]
        this.currentImageIndex++
      } else {
        if (this.isCharacterClose() && !this.isDead()) {
          this.currentState = 'alert'
        } else {
          this.currentState = 'idle'
        }
        this.currentImageIndex = 0
      }
    }
  }

  /**
   * Handles the dead state behavior and animations.
   */
  handleDead() {
    this.incrementDeadFrames()
    if (!this.showDeadAnimation()) {
      this.fallDown()
      this.playDyingSoundThenDefeat()
    }
  }

  incrementDeadFrames() {
    this.frameCounterDead++
    const FRAMES_TO_SKIP = 5
    if (this.frameCounterDead >= FRAMES_TO_SKIP) {
      this.frameCounterDead = 0
      return true
    }
    return false
  }

  showDeadAnimation() {
    if (this.currentImageIndex < this.IMAGES_DEAD.length) {
      this.img = this.imageCache[this.IMAGES_DEAD[this.currentImageIndex]]
      this.currentImageIndex++
      return true
    }
    return false
  }

  playDyingSoundThenDefeat() {
    if (!this.hasPlayedDyingSound) {
      this.hasPlayedDyingSound = true
      this.dying_sound.play()
      setTimeout(() => {
        this.manageEndbossDefeat()
      }, 1800)
    }
  }

  /**
   * Moves the Endboss within the defined boundaries.
   */
  moveBoss(minX, maxX) {
    if (!this.isDead() && this.currentState !== 'hurt') {
      if (this.direction === -1) {
        this.moveLeft()
        this.otherDirection = false
      } else {
        this.moveRight()
        this.otherDirection = true
      }
      if (this.x <= minX) {
        this.direction = 1
      } else if (this.x >= maxX) {
        this.direction = -1
      }
    }
  }

  /**
   * Checks if the character is within a close distance to the Endboss.
   * @returns {boolean} True if the character is close, false otherwise.
   */
  isCharacterClose() {
    if (!this.character || typeof this.character.x === 'undefined') {
      return false
    }
    const distance = Math.abs(this.character.x - this.x)
    return distance < 300
  }

  /**
   * Applies damage to the Endboss when hit.
   */
  endbossHit() {
    if (this.preventHitDuringAttack()) {
      return
    }
    this.logHitInformation()
    if (this.isAlreadyDead()) {
      return
    }
    this.checkAndApplyHit()
  }
  preventHitDuringAttack() {
    if (this.currentState === 'attack') {
      return true
    }
    return false
  }

  logHitInformation() {}

  isAlreadyDead() {
    if (this.energy === 0) {
      return true
    }
    return false
  }

  checkAndApplyHit() {
    const currentTime = new Date().getTime()
    if (currentTime - this.lastHit > 500) {
      this.energy -= 10
      if (this.energy <= 0) {
        this.setDeadState()
      } else {
        this.setHurtState(currentTime)
      }
    }
  }

  /**
   * Sets the Endboss to the dead state and plays the dying animation.
   */
  setDeadState() {
    this.energy = 0
    this.currentImageIndex = 0
    this.frameCounterDead = 0
    this.currentState = 'dead'
  }

  setHurtState(currentTime) {
    this.lastHit = currentTime
    this.hurt_sound.play()
    this.currentState = 'hurt'
    this.currentImageIndex = 0
  }

  /**
   * Drops the Endboss off-screen after death.
   */
  fallDown() {
    if (this.hasFallen) {
      return
    }
    this.hasFallen = true
    let fallInterval = setInterval(() => {
      this.y += 5
      if (this.y > 720) {
        clearInterval(fallInterval)
      }
    }, 50)
  }

  /**
   * Determines if the Endboss is dead based on energy level.
   * @returns {boolean} True if dead, false otherwise.
   */
  isDead() {
    return this.energy <= 0
  }

  /**
   * Manages the Endboss defeat sequence, showing the winning screen.
   */
  manageEndbossDefeat() {
    if (!this.hasPlayedWinningSound) {
      this.winning_sound.play()
      this.hasPlayedWinningSound = true
    }
    const winnerScreen = document.getElementById('winningScreen')
    if (winnerScreen) {
      winnerScreen.classList.remove('d-none')
      document.getElementById('home').classList.remove('d-none')
      document.getElementById('btnNewGame').classList.remove('d-none')
      document.getElementById('muteDiv').classList.add('d-none')
      document.getElementById('mblTouchBtnArrows').classList.add('d-none')
      document.getElementById('mblTouchBtnAction').classList.add('d-none')
    }
    this.character.stop()
    this.stopAnimation()
    this.world.backgroundMusic.volume = 0
    this.currentState = 'final'
  }

  /**
   * Stops all Endboss animations and intervals.
   */
  stopAnimation() {
    clearInterval(this.stateMachineInterval)
    clearInterval(this.checkDeadInterval)
  }
}
