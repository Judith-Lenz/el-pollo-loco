class Character extends MovableObject {
  height = 310 //CAVE: wenn ich hier was ändere, muss ich Schwellenwert für Gravitation anpassen!
  width = 150
  y = 120 //muss gleich sein wie y in aboveGround(), sonst fällt er ins Bild, anstatt zu stehen.
  speed = 10

  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png',
  ]

  IMAGES_LONG_IDLE = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png',
  ]

  IMAGES_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png',
  ]

  IMAGES_JUMPING_UP = [
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
  ]

  IMAGES_JUMPING_DOWN = [
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
  ]

  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
  ]

  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ]

  world
  walking_sound = new Audio('audio/running2.mp3')
  snoring_sound = new Audio('audio/snoring.mp3')
  hurting_sound = new Audio('audio/hurt.mp3')
  jumping_sound = new Audio('audio/jump2.mp3')
  gameOver_sound = new Audio('audio/game_over2.mp3')

  constructor() {
    super().loadImage('img/2_character_pepe/1_idle/idle/I-1.png')
    this.loadImages(this.IMAGES_IDLE)
    this.loadImages(this.IMAGES_LONG_IDLE)
    this.loadImages(this.IMAGES_WALKING)
    this.loadImages(this.IMAGES_JUMPING_UP)
    this.loadImages(this.IMAGES_JUMPING_DOWN)
    this.loadImages(this.IMAGES_HURT)
    this.loadImages(this.IMAGES_DEAD)
    this.applyGravity()
    this.idleStartTime = null
    this.animate()
    this.collisionOffsetX = 18
    this.collisionOffsetY = 115
    this.collisionWidth = 100
    this.collisionHeight = 180
  }

  animate() {
    const idleThreshold = 50000
    this.intervalID1 = setInterval(() => {
      this.walking_sound.pause()
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight()
        this.otherDirection = false
        if (!this.isAboveGround()) {
          if (this.walking_sound.paused) {
            this.walking_sound.play()
          }
        } else {
          this.walking_sound.pause()
        }
        this.idleStartTime = null
      }
      if (this.world.keyboard.LEFT && this.x >= -100) {
        this.moveLeft()
        this.otherDirection = true
        if (!this.isAboveGround()) {
          if (this.walking_sound.paused) {
            this.walking_sound.play()
          }
        } else {
          this.walking_sound.pause()
        }
        this.idleStartTime = null
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump()
        this.idleStartTime = null
      }
      this.world.camera_x = -this.x + 100
    }, 1000 / 60)
    this.intervalID2 = setInterval(() => {
      this.snoring_sound.pause()
      if (this.isDead()) {
        this.handleCharacterDeathEvents()
        this.idleStartTime = null
        return
      } else if (this.isHurt()) {
        const currentTime = new Date().getTime()
        const hurtSoundCooldown = 1500
        if (currentTime - this.lastHurtSoundTime > hurtSoundCooldown) {
          this.hurting_sound.play()
          this.lastHurtSoundTime = currentTime
        }
        this.playAnimation(this.IMAGES_HURT)
        this.idleStartTime = null
      } else if (this.isAboveGround()) {
        if (this.speedY > 0) {
          this.playAnimation(this.IMAGES_JUMPING_UP, 4)
        } else {
          this.playAnimation(this.IMAGES_JUMPING_DOWN, 10)
        }
        this.idleStartTime = null
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING)
        this.idleStartTime = null
      } else {
        if (!this.idleStartTime) {
          this.idleStartTime = Date.now()
        } else if (Date.now() - this.idleStartTime >= idleThreshold) {
          this.playAnimation(this.IMAGES_LONG_IDLE, 4)
          this.snoring_sound.play()
          return
        }
        this.playAnimation(this.IMAGES_IDLE, 4)
      }
    }, 50)
  }

  jump() {
    this.speedY = 30
    this.jumping_sound.play()
  }

  handleCharacterDeathEvents() {
    this.playAnimation(this.IMAGES_DEAD, 40, false)
    const animationDuration = this.IMAGES_DEAD.length * 200
    setTimeout(() => {
      this.world.backgroundMusic.volume = 0
      this.gameOver_sound.play()
      document.getElementById('gameOverScreen').classList.remove('d-none')
      document.getElementById('home').classList.remove('d-none')
      document.getElementById('btnNewGame').classList.remove('d-none')
      document.getElementById('muteDiv').classList.add('d-none')
      document.getElementById('mblTouchBtnArrows').classList.add('d-none')
      document.getElementById('mblTouchBtnAction').classList.add('d-none')
      this.stop()
    }, animationDuration)
  }

  stop() {
    clearInterval(this.intervalID1)
    clearInterval(this.intervalID2)
    this.walking_sound.pause()
    this.walking_sound.currentTime = 0
    this.snoring_sound.pause()
    this.snoring_sound.currentTime = 0
    this.hurting_sound.pause()
    this.hurting_sound.currentTime = 0
    this.jumping_sound.pause()
    this.jumping_sound.currentTime = 0
  }
}
