class World {
  //an der x-Koordinate 0 werden 4 Grafiken eingefügt.
  allSoundsMuted = false // Statusvariable für Sound, Also grundsätzlich ist Ton an.
  character = new Character() //Variable character wurde Objekt namens Character zugewiesen
  level = level1 //das Level inklusive enemies wird direkt hier verwendet
  canvas
  ctx //Variable context
  keyboard // leere Variable
  backgroundMusic = new Audio('audio/Bassa Island Game Loop.mp3')
  camera_x = 0 //Die Position der Kamera auf der X-Achse. Sie bewegt sich, wenn der Spieler läuft.
  statusBarHealth = new StatusBarHealth()
  statusBarCoin = new StatusBarCoin()
  statusBarBottle = new StatusBarBottle()
  statusBarEndboss = new StatusBarEndboss() //Instanz
  throwableObjects = []
  collectedCoins = 0 // Neue Variable für die gesammelten Münzen
  totalCoins = 0 // Neue Eigenschaft für die ursprüngliche Anzahl Münzen
  collectedBottles = 0 // Anzahl der eingesammelten Flaschen
  totalBottles = 0 // Gesamtanzahl der Flaschen im Level

  constructor(canvas, keyboard) {
    //geben die Variable canvas zu world, damit die da existiert.
    this.ctx = canvas.getContext('2d')
    this.canvas = canvas
    this.keyboard = keyboard

    this.totalCoins = this.level.coins.length // Gesamtanzahl der Münzen speichern
    this.totalBottles = this.level.bottles.length // Anzahl der Flaschen im Level speichern
    this.updateBottleStatusBar() // StatusBar auf den Anfangswert setzen
    this.backgroundMusic.loop = true // Schleife aktivieren
    this.backgroundMusic.volume = 0.1 // Lautstärke setzen
    this.backgroundMusic.play() // Musik starten
    // Alle Sounds gleich am Anfang stumm schalten. muss ich dann am Ende wieder löschen.

    this.toggleMuteAllSounds()
    this.draw()
    this.setWorld()
    this.run() //intervall, das regelmäßig ausgeführt wird.
  }

  //zur Verknüpfung, also Referenz auf world. aktuelle Instanz von world.
  setWorld() {
    this.character.world = this // Charakter erhält Zugriff auf die World
    // Charakter dem Endboss zuweisen und Animation starten
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.character = this.character // Endboss erhält Zugriff auf den Charakter
        enemy.world = this
        console.log('Character dem Endboss zugewiesen:', enemy.character)
        // Animation des Endbosses starten
        enemy.animate()
      }
    })
  }

  run() {
    // Speichere die Interval-IDs in einer Variable, damit wir sie später clearen können
    this.intervalID1 = setInterval(() => {
      this.checkCollisionCoins()
      this.checkCollisionBottles()
      this.checkCollisionEnemies()
      this.checkCollisionBottlesWithEnemies()
    }, 18) //Intervall von 5 ms

    this.intervalID2 = setInterval(() => {
      this.checkThrowObjects()
    }, 25)
  }

  checkThrowObjects() {
    //wird in run alle 25ms ausgeführt.
    if (!this.character.isDead() && this.keyboard.D && this.collectedBottles > 0 && !this.throwCooldown) {
      //Taste D gedrückt, Flaschen auch vorhanden, nicht zu viele Flaschen hintereinander werfen.
      let bottle = new ThrowableObject( //neue Instanz von throwableObject
        this.character.x + 100, //wird 100px neben dem x vom Character erstellt
        this.character.y + 100 //wird 100px unterhalb des Y vom Character erstellt.
      )
      this.throwableObjects.push(bottle) //bottle wird zum Array hinzugefügt
      this.collectedBottles-- // Anzahl der gesammelten Flaschen reduzieren
      this.updateBottleStatusBar() // StatusBar aktualisieren
      console.log(`Flasche geworfen. Verbleibend: ${this.collectedBottles}`)
      this.character.idleStartTime = null // Idle-Zustand zurücksetzen
      this.throwCooldown = true // Cooldown aktivieren
      setTimeout(() => {
        this.throwCooldown = false // Cooldown deaktivieren nach 300 ms
      }, 300) // 300 ms Cooldown-Zeit
    }
  }

  checkCollisionCoins() {
    //checkCollisions Coin
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.handleCoinCollision(coin)
      }
    })
  }

  checkCollisionBottles() {
    //checkCollisions Bottle on Ground, einsammeln von Bottles durch character
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.handleBottleCollision(bottle)
      }
    })
  }

  checkCollisionEnemies() {
    //checkCollisions Enemy jump oder hit
    this.level.enemies.forEach((enemy) => {
      // Prüfen, ob der Enemy nicht tot ist
      if (!enemy.isDead()) {
        // Prüfen, ob Charakter in der Luft ist und mit dem Feind kollidiert
        if (this.character.isAboveGround() && this.character.speedY < 0 && this.character.isColliding(enemy)) {
          console.log('------Charakter springt auf den Gegner!-Hier komm ich manchmal nicht rein-------')
          this.character.speedY = 25 // Höhe des erneuten Sprungs
          this.handleJumpOnEnemy(enemy) // Methode zum Eliminieren des Gegners
        } else if (this.character.isColliding(enemy)) {
          // Prüfen, ob eine "normale" Kollision vorliegt
          console.log('Kollision mit Gegner! Energie:', this.character.energy)
          this.character.hit() // Charakter nimmt Schaden
          this.statusBarHealth.setPercentage(this.character.energy)
        }
      }
    })
  }

  checkCollisionBottlesWithEnemies() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy)) {
          if (enemy instanceof Endboss) {
            // Behandlung für den Endboss
            if (!enemy.isDead()) {
              console.log('Flasche trifft Endboss!')
              this.handleBottleEnemyCollision(bottle, bottleIndex, enemy)
            }
          } else if (!enemy.isDead()) {
            // Behandlung für andere Gegner (z. B. Chickens)
            console.log('Flasche trifft Chicken!')
            this.handleBottleEnemyCollision(bottle, bottleIndex, enemy)
          }
        }
      })
    })
  }

  handleBottleEnemyCollision(bottle, bottleIndex, enemy) {
    // Flasche stoppen
    bottle.stopMovement()
    bottle.disableGravity() // Gravitation deaktivieren
    // Animation der BOTTLE_FLY_IMAGES stoppen
    bottle.stopCurrentAnimation()
    // Splash-Animation starten
    console.log('Splash-Animation gestartet!')
    bottle.startSplashAnimation()
    if (enemy.isEndboss) {
      enemy.endbossHit()
      this.statusBarEndboss.setPercentage(enemy.energy)
    } else {
      enemy.deadEnemy()
    }
    // Flasche nach der Splash-Animation entfernen
    setTimeout(() => {
      this.throwableObjects.splice(bottleIndex, 1) // Flasche aus der Liste entfernen
      console.log('Flasche entfernt.')
    }, bottle.BOTTLE_SPLASH_IMAGES.length * 80) // Zeit für die Splash-Animation warten bis sie entfernt wird.
  }

  handleCoinCollision(coin) {
    coin.collectCoin() // Münze einsammeln
    this.collectedCoins++ // Zähler erhöhen
    this.updateCoinStatusBar() // StatusBar aktualisieren
    console.log(`Kollision mit Münze: ${this.collectedCoins}`) // Debug: Anzahl der Münzen
  }

  updateCoinStatusBar() {
    // Prozentsatz basierend auf der Anzahl eingesammelter Münzen
    const percentage = Math.min((this.collectedCoins / this.totalCoins) * 100, 100)
    this.statusBarCoin.setPercentage(percentage) // StatusBar aktualisieren
    console.log('----- Debugging StatusBarCoin -----')
    console.log(`Gesammelte Münzen: ${this.collectedCoins}`)
    console.log(`Ursprüngliche Anzahl Münzen (totalCoins): ${this.totalCoins}`)
    console.log(`Berechneter Prozentsatz für StatusBar: ${percentage}%`)
    console.log('-----------------------------------')
  }

  handleBottleCollision(bottle) {
    bottle.collectBottle() // Flasche einsammeln
    this.collectedBottles++ // Zähler für Flaschen erhöhen
    this.updateBottleStatusBar() // StatusBar aktualisieren
    console.log(`Flasche eingesammelt: ${this.collectedBottles}`)
  }

  updateBottleStatusBar() {
    // Prozentsatz berechnen (max. 100%)
    const percentage = Math.min((this.collectedBottles / this.totalBottles) * 100, 100)
    this.statusBarBottle.setPercentage(percentage) // StatusBar aktualisieren
    console.log('----- Debugging StatusBarBottle -----')
    console.log(`Eingesammelte Flaschen: ${this.collectedBottles}`)
    console.log(`Ursprüngliche Anzahl Flaschen (totalBottles): ${this.totalBottles}`)
    console.log(`Berechneter Prozentsatz für StatusBar: ${percentage}%`)
    console.log('-------------------------------------')
  }

  handleJumpOnEnemy(enemy) {
    enemy.deadEnemy()
    console.log('jumped on enemy')
  }
  // Variablen die oben deklariert sind und auf die man zugreifen möchte, muss man mit this ansprechen

  draw() {
    //hier kommt es auf die Reihenfolge an. alles wird von oben nach unten geschichtet.
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) // hier wird erstmal gelöscht
    this.ctx.translate(this.camera_x, 0)
    this.addObjectsToMap(this.level.backgroundObjects)
    this.addObjectsToMap(this.level.clouds) //Iteriert durch die Wolken aus level1 und ruft für jede addToMap() auf.
    this.addObjectsToMap(this.level.bottles)
    this.addObjectsToMap(this.level.coins)
    this.addObjectsToMap(this.throwableObjects)
    this.addObjectsToMap(this.level.enemies)
    this.addToMap(this.character)

    this.addToMap(this.statusBarEndboss)
    this.ctx.translate(-this.camera_x, 0) //Ausschnitt nach links verschieben, je nachdem wie viel oben drin steht, z.B. 100px
    //---- Space for fixed objects (die also immer mitlaufen mit der Kamera) -----------
    this.addToMap(this.statusBarHealth)
    this.addToMap(this.statusBarCoin)
    this.addToMap(this.statusBarBottle)
    let self = this //this klappt hier nicht, daher das self=this
    this.frameId = requestAnimationFrame(function () {
      self.draw()
    })
  }

  //mehrere Objekte aus einem Array hinzufügen (enemies, clouds, ...)
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o)
    })
  }

  //Verwendet die drawImage()-Methode des Canvas, um das Bild (der Wolke) basierend auf ihrer aktuellen Position (mo.x und mo.y) zu zeichnen:
  //einzelne Objekte hinzufügen zur Map.
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo)
    }
    mo.draw(this.ctx)
    mo.drawFrame(this.ctx) //Hitboxen ein- bzw. ausblenden.
    if (mo.otherDirection) {
      this.flipImageBack(mo)
    }
  }

  flipImage(mo) {
    this.ctx.save()
    this.ctx.translate(mo.width, 0) //Elemente spiegelverkehrt einfügen
    this.ctx.scale(-1, 1)
    mo.x = mo.x * -1
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1
    this.ctx.restore()
  }

  // Sounds ----------------------------------------------------------------------------

  toggleMuteAllSounds() {
    this.allSoundsMuted = !this.allSoundsMuted // Status umschalten
    // Sounds für verschiedene Gruppen stummschalten
    this.toggleCharacterSounds()
    this.toggleCoinSounds()
    this.toggleBottleSounds()
    this.toggleEnemySounds()
    // Hintergrundmusik ein- oder ausschalten
    this.backgroundMusic.muted = this.allSoundsMuted
    this.updateMuteButton() // Aktualisiere das Mute-Button-Icon
    console.log(`Sounds ${this.allSoundsMuted ? 'stummgeschaltet' : 'aktiviert'}`)
  }

  toggleCharacterSounds() {
    this.character.walking_sound.muted = this.allSoundsMuted
    this.character.snoring_sound.muted = this.allSoundsMuted
    this.character.hurting_sound.muted = this.allSoundsMuted
    this.character.jumping_sound.muted = this.allSoundsMuted
    this.character.gameOver_sound.muted = this.allSoundsMuted
  }

  toggleCoinSounds() {
    this.level.coins.forEach((coin) => {
      coin.collect_coin_sound.muted = this.allSoundsMuted
    })
  }

  toggleBottleSounds() {
    this.level.bottles.forEach((bottle) => {
      bottle.collect_bottle_sound.muted = this.allSoundsMuted
    })
  }

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

  toggleEndbossSounds() {
    this.level.enemies.forEach((enemy) => {
      if (enemy instanceof Endboss) {
        enemy.alert_sound.muted = this.allSoundsMuted
        enemy.hurt_sound.muted = this.allSoundsMuted
        enemy.winning_sound.muted = this.allSoundsMuted
      }
    })
  }

  updateMuteButton() {
    const muteDiv = document.getElementById('muteDiv')
    muteDiv.innerHTML = this.allSoundsMuted
      ? '<img src="img/icons/volume_off.svg" alt="Mute Icon">'
      : '<img src="img/icons/volume_up.svg" alt="Volume Icon">'
  }

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

  stop() {
    // Alle Sounds stoppen und zurücksetzen
    this.backgroundMusic.pause()
    this.backgroundMusic.currentTime = 0

    // Charakter-Sounds stoppen
    this.character.walking_sound.pause()
    this.character.walking_sound.currentTime = 0
    this.character.snoring_sound.pause()
    this.character.snoring_sound.currentTime = 0
    this.character.hurting_sound.pause()
    this.character.hurting_sound.currentTime = 0
    this.character.jumping_sound.pause()
    this.character.jumping_sound.currentTime = 0
    //Endboss-Sounds stoppen
    this.stopEndbossSounds()
    // Coin-Sounds stoppen
    this.level.coins.forEach((coin) => {
      coin.collect_coin_sound.pause()
      coin.collect_coin_sound.currentTime = 0
    })

    // Bottle-Sounds stoppen
    this.level.bottles.forEach((bottle) => {
      bottle.collect_bottle_sound.pause()
      bottle.collect_bottle_sound.currentTime = 0
    })

    // Enemy-Sounds stoppen
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

    // Intervalle clearen
    clearInterval(this.intervalID1)
    clearInterval(this.intervalID2)

    // requestAnimationFrame stoppen
    cancelAnimationFrame(this.frameId)

    // Canvas leeren
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.character.stop() // <-- Hier jetzt auch den Charakter-Stop aufrufen
  }
}
