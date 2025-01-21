class SoundManager {
  constructor(world) {
    this.world = world
    if (localStorage.getItem('allSoundsMuted') === null) {
      localStorage.setItem('allSoundsMuted', JSON.stringify(true))
    }
    this.allSoundsMuted = JSON.parse(localStorage.getItem('allSoundsMuted'))
    this.backgroundMusic = new Audio('audio/Bassa_Island_Game_Loop.mp3')
    this.backgroundMusic.loop = true
    this.backgroundMusic.volume = 0.1
    if (!this.allSoundsMuted) {
      this.backgroundMusic.play()
    } else {
      this.backgroundMusic.muted = true
    }
  }

  /**
   * Applies the initial mute state based on local storage settings.
   * Ensures background music and all sound effects are toggled accordingly.
   */
  applyInitialMuteState() {
    this.allSoundsMuted = JSON.parse(localStorage.getItem('allSoundsMuted'))
    this.backgroundMusic.muted = this.allSoundsMuted
    if (!this.allSoundsMuted) {
      this.backgroundMusic.play()
    }
    this.toggleCharacterSounds()
    this.toggleCoinSounds()
    this.toggleBottleSounds()
    this.toggleEnemySounds()
    this.updateMuteButton()
  }

  /**
   * Toggles the mute state for all game sounds.
   */
  toggleMuteAllSounds() {
    this.allSoundsMuted = !this.allSoundsMuted
    localStorage.setItem('allSoundsMuted', JSON.stringify(this.allSoundsMuted))
    this.backgroundMusic.muted = this.allSoundsMuted
    if (!this.allSoundsMuted) {
      this.backgroundMusic.play()
    } else {
      this.backgroundMusic.pause()
    }
    this.toggleCharacterSounds()
    this.toggleCoinSounds()
    this.toggleBottleSounds()
    this.toggleEnemySounds()
    this.updateMuteButton()
  }

  /**
   * Toggles the mute state for character-related sounds.
   */
  toggleCharacterSounds() {
    const { character } = this.world
    character.walking_sound.muted = this.allSoundsMuted
    character.snoring_sound.muted = this.allSoundsMuted
    character.hurting_sound.muted = this.allSoundsMuted
    character.jumping_sound.muted = this.allSoundsMuted
    character.gameOver_sound.muted = this.allSoundsMuted
  }

  /**
   * Toggles the mute state for coin-related sounds.
   */
  toggleCoinSounds() {
    this.world.level.coins.forEach((coin) => {
      coin.collect_coin_sound.muted = this.allSoundsMuted
    })
  }

  /**
   * Toggles the mute state for bottle-related sounds.
   */
  toggleBottleSounds() {
    this.world.level.bottles.forEach((bottle) => {
      bottle.collect_bottle_sound.muted = this.allSoundsMuted
    })
  }

  /**
   * Toggles the mute state for enemy-related sounds.
   */
  toggleEnemySounds() {
    this.world.level.enemies.forEach((enemy) => {
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
   * Toggles the mute state for endboss-related sounds.
   */
  toggleEndbossSounds() {
    this.world.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.alert_sound.muted = this.allSoundsMuted
        enemy.hurt_sound.muted = this.allSoundsMuted
        enemy.winning_sound.muted = this.allSoundsMuted
        enemy.dying_sound.muted = this.allSoundsMuted
      }
    })
  }

  /**
   * Stops the background music and resets its playback position.
   */
  stopBackgroundMusic() {
    this.backgroundMusic.pause()
    this.backgroundMusic.currentTime = 0
  }

  /**
   * Stops all character-related sounds and resets their playback positions.
   */
  stopCharacterSounds() {
    const { character } = this.world
    character.walking_sound.pause()
    character.walking_sound.currentTime = 0
    character.snoring_sound.pause()
    character.snoring_sound.currentTime = 0
    character.hurting_sound.pause()
    character.hurting_sound.currentTime = 0
    character.jumping_sound.pause()
    character.jumping_sound.currentTime = 0
  }

  /**
   * Stops all coin-related sounds and resets their playback positions.
   */
  stopCoinSounds() {
    this.world.level.coins.forEach((coin) => {
      coin.collect_coin_sound.pause()
      coin.collect_coin_sound.currentTime = 0
    })
  }

  /**
   * Stops all bottle-related sounds and resets their playback positions.
   */
  stopBottleSounds() {
    this.world.level.bottles.forEach((bottle) => {
      bottle.collect_bottle_sound.pause()
      bottle.collect_bottle_sound.currentTime = 0
    })
  }

  /**
   * Stops all enemy-related sounds (excluding endboss) and resets their playback positions.
   */
  stopOtherEnemySounds() {
    this.world.level.enemies.forEach((enemy) => {
      if (enemy.walking_sound) {
        enemy.walking_sound.pause()
        enemy.walking_sound.currentTime = 0
      }
      if (enemy.dead_enemy_sound) {
        enemy.dead_enemy_sound.pause()
        enemy.dead_enemy_sound.currentTime = 0
      }
    })
  }

  /**
   * Stops all endboss-related sounds and resets their playback positions.
   */
  stopEndbossSounds() {
    this.world.level.enemies.forEach((enemy) => {
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
   * Updates the mute button icon based on the current mute state.
   */
  updateMuteButton() {
    const muteDiv = document.getElementById('muteDiv')
    muteDiv.innerHTML = this.allSoundsMuted
      ? '<img src="img/icons/volume_off.svg" alt="Mute Icon">'
      : '<img src="img/icons/volume_up.svg" alt="Volume Icon">'
  }
}
