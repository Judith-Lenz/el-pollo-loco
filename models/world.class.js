/**
 * Represents the game world, managing the character, level, objects, and sounds.
 */
class World {
  allSoundsMuted = false
  character = new Character()
  level = level1
  canvas
  ctx
  keyboard
  backgroundMusic = new Audio('audio/Bassa Island Game Loop.mp3')
  camera_x = 0
  statusBarHealth = new StatusBarHealth()
  statusBarCoin = new StatusBarCoin()
  statusBarBottle = new StatusBarBottle()
  statusBarEndboss = new StatusBarEndboss()
  throwableObjects = []
  collectedCoins = 0
  totalCoins = 0
  collectedBottles = 0
  totalBottles = 0

  /**
   * Initializes the game world with a canvas and keyboard input.
   * @param {HTMLCanvasElement} canvas - The game canvas element.
   * @param {Object} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    this.allSoundsMuted = JSON.parse(localStorage.getItem('allSoundsMuted')) || false
    this.ctx = canvas.getContext('2d')
    this.canvas = canvas
    this.keyboard = keyboard
    this.totalCoins = this.level.coins.length
    this.totalBottles = this.level.bottles.length
    this.updateBottleStatusBar()
    this.backgroundMusic.loop = true
    this.backgroundMusic.volume = 0.1
    this.backgroundMusic.play()
    if (this.allSoundsMuted) {
      // anstatt toggleMuteAllSounds():
      this.toggleCharacterSounds()
      this.toggleCoinSounds()
      this.toggleBottleSounds()
      this.toggleEnemySounds()
      this.backgroundMusic.muted = true
      this.updateMuteButton()
    }
    this.draw()
    this.setWorld()
    this.run()
  }

  /**
   * Links the world to the character and enemies, setting up animations and interactions.
   */
  setWorld() {
    this.character.world = this
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.character = this.character
        enemy.world = this
        enemy.animate()
      }
    })
  }

  /**
   * Starts the main game loops for collision detection and throwable object handling.
   */
  run() {
    this.intervalID1 = setInterval(() => {
      this.checkCollisionCoins()
      this.checkCollisionBottles()
      this.checkCollisionEnemies()
      this.checkCollisionBottlesWithEnemies()
    }, 18)

    this.intervalID2 = setInterval(() => {
      this.checkThrowObjects()
    }, 25)
  }

  /**
   * Checks if throwable objects should be created and handles throwing mechanics.
   */
  checkThrowObjects() {
    if (!this.character.isDead() && this.keyboard.D && this.collectedBottles > 0 && !this.throwCooldown) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100)
      this.throwableObjects.push(bottle)
      this.collectedBottles--
      this.updateBottleStatusBar()
      this.character.idleStartTime = null
      this.throwCooldown = true
      setTimeout(() => {
        this.throwCooldown = false
      }, 300)
    }
  }

  /**
   * Checks for collisions between the character and coins.
   */
  checkCollisionCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.handleCoinCollision(coin)
      }
    })
  }

  /**
   * Checks for collisions between the character and bottles.
   */
  checkCollisionBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.handleBottleCollision(bottle)
      }
    })
  }

  /**
   * Checks for collisions between the character and enemies.
   */
  checkCollisionEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDead()) {
        if (this.character.isAboveGround() && this.character.speedY < 0 && this.character.isColliding(enemy)) {
          this.character.speedY = 25
          this.handleJumpOnEnemy(enemy)
        } else if (this.character.isColliding(enemy)) {
          this.character.hit()
          this.statusBarHealth.setPercentage(this.character.energy)
        }
      }
    })
  }

  /**
   * Checks for collisions between throwable bottles and enemies.
   */
  checkCollisionBottlesWithEnemies() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          if (enemy instanceof Endboss) {
            if (!enemy.isDead()) {
              this.handleBottleEnemyCollision(bottle, bottleIndex, enemy)
            }
          } else if (!enemy.isDead()) {
            this.handleBottleEnemyCollision(bottle, bottleIndex, enemy)
          }
        }
      })
    })
  }

  /**
   * Handles a bottle colliding with an enemy, triggering effects and animations.
   * @param {Object} bottle - The throwable bottle.
   * @param {number} bottleIndex - The index of the bottle in the array.
   * @param {Object} enemy - The enemy being hit.
   */
  handleBottleEnemyCollision(bottle, bottleIndex, enemy) {
    bottle.stopMovement()
    bottle.disableGravity()
    bottle.stopCurrentAnimation()
    bottle.startSplashAnimation()
    if (enemy.isEndboss) {
      enemy.endbossHit()
      this.statusBarEndboss.setPercentage(enemy.energy)
    } else {
      enemy.deadEnemy()
    }
    setTimeout(() => {
      this.throwableObjects.splice(bottleIndex, 1)
    }, bottle.BOTTLE_SPLASH_IMAGES.length * 80)
  }

  handleCoinCollision(coin) {
    coin.collectCoin()
    this.collectedCoins++
    this.updateCoinStatusBar()
  }

  /**
   * Updates the status bar after collecting a coin.
   */
  updateCoinStatusBar() {
    const percentage = Math.min((this.collectedCoins / this.totalCoins) * 100, 100)
    this.statusBarCoin.setPercentage(percentage)
  }

  /**
   * Handles a bottle collision with the character and updates the bottle status bar.
   * @param {Object} bottle - The bottle object that collided.
   */
  handleBottleCollision(bottle) {
    bottle.collectBottle()
    this.collectedBottles++
    this.updateBottleStatusBar()
  }

  /**
   * Updates the status bar after collecting a bottle.
   */
  updateBottleStatusBar() {
    const percentage = Math.min((this.collectedBottles / this.totalBottles) * 100, 100)
    this.statusBarBottle.setPercentage(percentage)
  }

  /**
   * Handles character jumping on an enemy to defeat it.
   * @param {Object} enemy - The enemy being jumped on.
   */
  handleJumpOnEnemy(enemy) {
    enemy.deadEnemy()
  }

  /**
   * Draws all game elements onto the canvas and handles camera adjustments.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.translate(this.camera_x, 0)
    this.addObjectsToMap(this.level.backgroundObjects)
    this.addObjectsToMap(this.level.clouds)
    this.addObjectsToMap(this.level.bottles)
    this.addObjectsToMap(this.level.coins)
    this.addObjectsToMap(this.level.enemies)
    this.addObjectsToMap(this.throwableObjects)
    this.addToMap(this.character)
    this.addToMap(this.statusBarEndboss)
    this.ctx.translate(-this.camera_x, 0)
    this.addToMap(this.statusBarHealth)
    this.addToMap(this.statusBarCoin)
    this.addToMap(this.statusBarBottle)
    let self = this
    this.frameId = requestAnimationFrame(function () {
      self.draw()
    })
  }

  /**
   * Adds an array of objects to the canvas map.
   * @param {Array} objects - The objects to be drawn on the canvas.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o)
    })
  }

  /**
   * Adds a single movable object to the canvas map, flipping if necessary.
   * @param {Object} mo - The movable object to be added.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo)
    }
    mo.draw(this.ctx)
    mo.drawFrame(this.ctx)
    if (mo.otherDirection) {
      this.flipImageBack(mo)
    }
  }

  /**
   * Flips an object's image horizontally for drawing in the opposite direction.
   * @param {Object} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save()
    this.ctx.translate(mo.width, 0)
    this.ctx.scale(-1, 1)
    mo.x = mo.x * -1
  }

  /**
   * Restores an object's original orientation after being flipped.
   * @param {Object} mo - The object to restore.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1
    this.ctx.restore()
  }

  // Sounds ----------------------------------------------------------------------------

  /**
   * Toggles the mute state for all game sounds.
   */
  toggleMuteAllSounds() {
    this.allSoundsMuted = !this.allSoundsMuted
    this.toggleCharacterSounds()
    this.toggleCoinSounds()
    this.toggleBottleSounds()
    this.toggleEnemySounds()
    this.backgroundMusic.muted = this.allSoundsMuted
    this.updateMuteButton()
    localStorage.setItem('allSoundsMuted', JSON.stringify(this.allSoundsMuted))
  }

  /**
   * Toggles the mute state of all character-related sounds.
   */
  toggleCharacterSounds() {
    this.character.walking_sound.muted = this.allSoundsMuted
    this.character.snoring_sound.muted = this.allSoundsMuted
    this.character.hurting_sound.muted = this.allSoundsMuted
    this.character.jumping_sound.muted = this.allSoundsMuted
    this.character.gameOver_sound.muted = this.allSoundsMuted
  }

  /**
   * Toggles the mute state of all coin-related sounds.
   */
  toggleCoinSounds() {
    this.level.coins.forEach((coin) => {
      coin.collect_coin_sound.muted = this.allSoundsMuted
    })
  }

  /**
   * Toggles the mute state of all bottle-related sounds.
   */
  toggleBottleSounds() {
    this.level.bottles.forEach((bottle) => {
      bottle.collect_bottle_sound.muted = this.allSoundsMuted
    })
  }

  /**
   * Toggles the mute state of all enemy-related sounds.
   */
  toggleEnemySounds() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.walking_sound) {
        enemy.walking_sound.muted = this.allSoundsMuted
      }
      if (enemy.dead_enemy_sound) {
        enemy.dead_enemy_sound.muted = this.allSoundsMuted
      }
    })
    this.toggleEndbossSounds()
  }

  /**
   * Toggles the mute state of all Endboss-related sounds.
   */
  toggleEndbossSounds() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.alert_sound.muted = this.allSoundsMuted
        enemy.hurt_sound.muted = this.allSoundsMuted
        enemy.winning_sound.muted = this.allSoundsMuted
        enemy.dying_sound.muted = this.allSoundsMuted
      }
    })
  }

  /**
   * Updates the mute button icon based on the current mute state.
   */
  updateMuteButton() {
    const muteDiv = document.getElementById('muteDiv')
    muteDiv.innerHTML = this.allSoundsMuted
      ? '<img src="img/icons/volume_off.svg" alt="Mute Icon">'
      : '<img src="img/icons/volume_up.svg" alt="Volume Icon">'
  }

  /**
   * Stops all Endboss sounds and resets their playback state.
   */
  stopEndbossSounds() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.alert_sound.pause()
        enemy.alert_sound.currentTime = 0
        enemy.hurt_sound.pause()
        enemy.hurt_sound.currentTime = 0
        enemy.winning_sound.pause()
        enemy.winning_sound.currentTime = 0
      }
    })
  }

  /**
   * Stops all game sounds and resets their playback state.
   */
  stop() {
    this.backgroundMusic.pause()
    this.backgroundMusic.currentTime = 0
    this.character.walking_sound.pause()
    this.character.walking_sound.currentTime = 0
    this.character.snoring_sound.pause()
    this.character.snoring_sound.currentTime = 0
    this.character.hurting_sound.pause()
    this.character.hurting_sound.currentTime = 0
    this.character.jumping_sound.pause()
    this.character.jumping_sound.currentTime = 0
    this.stopEndbossSounds()
    this.level.coins.forEach((coin) => {
      coin.collect_coin_sound.pause()
      coin.collect_coin_sound.currentTime = 0
    })
    this.level.bottles.forEach((bottle) => {
      bottle.collect_bottle_sound.pause()
      bottle.collect_bottle_sound.currentTime = 0
    })
    this.level.enemies.forEach((enemy) => {
      if (enemy.walking_sound) {
        enemy.walking_sound.pause()
        enemy.walking_sound.currentTime = 0
      }
      if (enemy.dead_enemy_sound) {
        enemy.dead_enemy_sound.pause()
        enemy.dead_enemy_sound.currentTime = 0
      }
    })
    clearInterval(this.intervalID1)
    clearInterval(this.intervalID2)
    cancelAnimationFrame(this.frameId)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.character.stop()
  }
}
