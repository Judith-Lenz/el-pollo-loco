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
  backgroundMusic = new Audio('audio/Bassa_Island_Game_Loop.mp3')
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
    this.soundManager = new SoundManager(this)
    this.soundManager.applyInitialMuteState()
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
    }, 1000 / 60)

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
      }, 900)
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
   * Checks collisions between the character and enemies.
   * If the character is jumping on an enemy, it kills the enemy.
   * Otherwise, the character takes damage.
   */
  checkCollisionEnemies() {
    let hasJumpedOnEnemy = this.checkJumpOnEnemy()
    if (!hasJumpedOnEnemy) {
      this.checkEnemyCollisionDamage()
    }
  }

  /**
   * Checks if the character is jumping on any enemy.
   * If so, it kills that enemy and returns true; otherwise false.
   * @returns {boolean} - True if the character jumped on an enemy, otherwise false.
   */
  checkJumpOnEnemy() {
    let jumpedOnEnemy = false
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDead()) {
        if (this.character.isAboveGround() && this.character.speedY < 0 && this.character.isColliding(enemy)) {
          this.character.speedY = 25
          this.handleJumpOnEnemy(enemy) // kills enemy
          jumpedOnEnemy = true
        }
      }
    })
    return jumpedOnEnemy
  }

  /**
   * Deals damage to the character if it collides with any still-alive enemy
   * and does not jump on them first.
   */
  checkEnemyCollisionDamage() {
    this.level.enemies.forEach((enemy) => {
      if (!enemy.isDead() && this.character.isColliding(enemy)) {
        this.character.hit()
        this.statusBarHealth.setPercentage(this.character.energy)
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

  /**
   * Handles coin collision by collecting the coin, incrementing the coin count, and updating the status bar.
   * @param {Object} coin - The coin object being collected.
   */
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
   * Draws the entire game frame.
   */
  draw() {
    this.clearCanvas()
    this.moveCamera()
    this.drawBackground()
    this.drawMovableObjects()
    this.drawUI()
    this.startAnimation()
  }

  /**
   * Clears the canvas for a new frame.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  /**
   * Moves the camera based on the current position.
   */
  moveCamera() {
    this.ctx.translate(this.camera_x, 0)
  }

  /**
   * Draws background and cloud objects.
   */
  drawBackground() {
    this.addObjectsToMap(this.level.backgroundObjects)
    this.addObjectsToMap(this.level.clouds)
  }

  /**
   * Draws all movable objects like enemies and collectibles.
   */
  drawMovableObjects() {
    this.addObjectsToMap(this.level.bottles)
    this.addObjectsToMap(this.level.coins)
    this.addObjectsToMap(this.level.enemies)
    this.addObjectsToMap(this.throwableObjects)
    this.addToMap(this.character)
    this.addToMap(this.statusBarEndboss)
    this.ctx.translate(-this.camera_x, 0)
  }

  /**
   * Draws the UI elements such as status bars.
   */
  drawUI() {
    this.addToMap(this.statusBarHealth)
    this.addToMap(this.statusBarCoin)
    this.addToMap(this.statusBarBottle)
  }

  /**
   * Starts the animation loop by recursively calling draw.
   */
  startAnimation() {
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

  /**
   * Stops all game-related activities, including sounds, animations,
   * and intervals. Clears the canvas and halts the character's actions.
   */
  stop() {
    this.soundManager.stopBackgroundMusic()
    this.soundManager.stopCharacterSounds()
    this.soundManager.stopCoinSounds()
    this.soundManager.stopBottleSounds()
    this.soundManager.stopOtherEnemySounds()
    this.soundManager.stopEndbossSounds()
    clearInterval(this.intervalID1)
    clearInterval(this.intervalID2)
    cancelAnimationFrame(this.frameId)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.character.stop()
  }

  /**
   * Toggles the mute state for all game sounds.
   */
  toggleMuteAllSounds() {
    this.soundManager.toggleMuteAllSounds()
  }
}
