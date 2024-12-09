class World {
  //an der x-Koordinate 0 werden 4 Grafiken eingefügt.
  allSoundsMuted = false; // Statusvariable für Sound, Also grundsätzlich ist Ton an.
  character = new Character(); //Variable character wurde Objekt namens Character zugewiesen
  level = level1;
  canvas;
  ctx; //Variable context
  keyboard; // leere Variable
  camera_x = 0; //Die Position der Kamera auf der X-Achse. Sie bewegt sich, wenn der Spieler läuft.
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  throwableObjects = [];
  collectedCoins = 0; // Neue Variable für die gesammelten Münzen
  totalCoins = 0; // Neue Eigenschaft für die ursprüngliche Anzahl Münzen
  collectedBottles = 0; // Anzahl der eingesammelten Flaschen
  totalBottles = 0; // Gesamtanzahl der Flaschen im Level

  constructor(canvas, keyboard) {
    //geben die Variable canvas zu world, damit die da existiert.
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;

    this.totalCoins = this.level.coins.length; // Gesamtanzahl der Münzen speichern
    this.totalBottles = this.level.bottles.length; // Anzahl der Flaschen im Level speichern
    this.updateBottleStatusBar(); // StatusBar auf den Anfangswert setzen
    // Alle Sounds gleich am Anfang stumm schalten. muss ich dann am Ende wieder löschen.
    this.toggleMuteAllSounds();
    this.draw();
    this.setWorld();
    this.run(); //intervall, das regelmäßig ausgeführt wird.
    // Alle Sounds direkt stumm schalten
  }

  //zur Verknüpfung, also Referenz auf world. aktuelle Instanz von world.
  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisionCoins();
      this.checkCollisionBottles();
      this.checkCollisionEnemies();
    }, 5); //wird alle 5ms ausgeführt.

    setInterval(() => {
      this.checkThrowObjects(); //wenn Taste D gedrückt wird.
    }, 25); // alle 10ms wird das in der geschweiften Klammer ausgeführt.
  }

  checkThrowObjects() {
    //wird in run alle 25ms ausgeführt.
    if (this.keyboard.D && this.collectedBottles > 0 && !this.throwCooldown) {
      //Taste D gedrückt, Flaschen auch vorhanden, nicht zu viele Flaschen hintereinander werfen.
      let bottle = new ThrowableObject( //neue Instanz von throwableObject
        this.character.x + 100, //wird 100px neben dem x vom Character erstellt
        this.character.y + 100 //wird 100px unterhalb des Y vom Character erstellt.
      );
      this.throwableObjects.push(bottle); //bottle wird zum Array hinzugefügt
      this.collectedBottles--; // Anzahl der gesammelten Flaschen reduzieren
      this.updateBottleStatusBar(); // StatusBar aktualisieren
      console.log(`Flasche geworfen. Verbleibend: ${this.collectedBottles}`);

      this.throwCooldown = true; // Cooldown aktivieren
      setTimeout(() => {
        this.throwCooldown = false; // Cooldown deaktivieren nach 300 ms
      }, 300); // 300 ms Cooldown-Zeit
    }
  }

  checkCollisionCoins() {
    //checkCollisions Coin
    this.level.coins.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        this.handleCoinCollision(coin);
      }
    });
  }

  checkCollisionBottles() {
    //checkCollisions Bottle on Ground
    this.level.bottles.forEach((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.handleBottleCollision(bottle);
      }
    });
  }

  checkCollisionEnemies() {
    //checkCollisions Enemy
    this.level.enemies.forEach((enemy) => {
      // Prüfen, ob der Enemy nicht tot ist
      if (!enemy.isDead) {
        // Prüfen, ob Charakter in der Luft ist und mit dem Feind kollidiert
        if (
          this.character.isAboveGround() &&
          this.character.speedY < 0 &&
          this.character.isColliding(enemy)
        ) {
          console.log(
            "------Charakter springt auf den Gegner!-Hier komm ich manchmal nicht rein-------"
          );
          this.character.speedY = 25; // Höhe des erneuten Sprungs
          this.handleJumpOnEnemy(enemy); // Methode zum Eliminieren des Gegners
        } else if (this.character.isColliding(enemy)) {
          // Prüfen, ob eine "normale" Kollision vorliegt
          console.log("Kollision mit Gegner! Energie:", this.character.energy);
          this.character.hit(); // Charakter nimmt Schaden
          this.statusBarHealth.setPercentage(this.character.energy);
        }
      }
    });
  }

  handleCoinCollision(coin) {
    coin.collectCoin(); // Münze einsammeln
    this.collectedCoins++; // Zähler erhöhen
    this.updateCoinStatusBar(); // StatusBar aktualisieren
    console.log(`Kollision mit Münze: ${this.collectedCoins}`); // Debug: Anzahl der Münzen
  }

  updateCoinStatusBar() {
    // Prozentsatz basierend auf der Anzahl eingesammelter Münzen
    const percentage = Math.min(
      (this.collectedCoins / this.totalCoins) * 100,
      100
    );
    this.statusBarCoin.setPercentage(percentage); // StatusBar aktualisieren
    console.log("----- Debugging StatusBarCoin -----");
    console.log(`Gesammelte Münzen: ${this.collectedCoins}`);
    console.log(`Ursprüngliche Anzahl Münzen (totalCoins): ${this.totalCoins}`);
    console.log(`Berechneter Prozentsatz für StatusBar: ${percentage}%`);
    console.log("-----------------------------------");
  }

  handleBottleCollision(bottle) {
    bottle.collectBottle(); // Flasche einsammeln
    this.collectedBottles++; // Zähler für Flaschen erhöhen
    this.updateBottleStatusBar(); // StatusBar aktualisieren
    console.log(`Flasche eingesammelt: ${this.collectedBottles}`);
  }

  updateBottleStatusBar() {
    // Prozentsatz berechnen (max. 100%)
    const percentage = Math.min(
      (this.collectedBottles / this.totalBottles) * 100,
      100
    );
    this.statusBarBottle.setPercentage(percentage); // StatusBar aktualisieren
    console.log("----- Debugging StatusBarBottle -----");
    console.log(`Eingesammelte Flaschen: ${this.collectedBottles}`);
    console.log(
      `Ursprüngliche Anzahl Flaschen (totalBottles): ${this.totalBottles}`
    );
    console.log(`Berechneter Prozentsatz für StatusBar: ${percentage}%`);
    console.log("-------------------------------------");
  }

  handleJumpOnEnemy(enemy) {
    enemy.deadEnemy();
    console.log("jumped on enemy");
  }
  // Variablen die oben deklariert sind und auf die man zugreifen möchte, muss man mit this ansprechen

  draw() {
    //hier kommt es auf die Reihenfolge an. alles wird von oben nach unten geschichtet.
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // hier wird erstmal gelöscht
    this.ctx.translate(this.camera_x, 0);

    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds); //Iteriert durch die Wolken aus level1 und ruft für jede addToMap() auf.
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0); //Ausschnitt nach links verschieben, je nachdem wie viel oben drin steht, z.B. 100px
    //--------------------------- Space for fixed objects -----------
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.ctx.translate(-this.camera_x, 0);

    //draw() wird immer wieder aufgerufen.
    let self = this; //this klappt hier nicht, daher das self=this
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  //mehrere Objekte aus einem Array
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  //Verwendet die drawImage()-Methode des Canvas, um das Bild (der Wolke) basierend auf ihrer aktuellen Position (mo.x und mo.y) zu zeichnen:
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0); //Elemente spiegelverkehrt einfügen
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  toggleMuteAllSounds() {
    this.allSoundsMuted = !this.allSoundsMuted; // Status umschalten
    // Sounds für verschiedene Gruppen stummschalten
    this.toggleCharacterSounds();
    this.toggleCoinSounds();
    this.toggleBottleSounds();
    this.toggleEnemySounds();
    // Zusätzliche Aufgaben in kleinere Funktionen auslagern
    this.updateMuteButton(); // Aktualisiere das Mute-Button-Icon
    console.log(
      `Sounds ${this.allSoundsMuted ? "stummgeschaltet" : "aktiviert"}`
    );
  }

  toggleCharacterSounds() {
    this.character.walking_sound.muted = this.allSoundsMuted;
    this.character.snoring_sound.muted = this.allSoundsMuted;
    this.character.hurting_sound.muted = this.allSoundsMuted;
  }

  toggleCoinSounds() {
    this.level.coins.forEach((coin) => {
      coin.collect_coin_sound.muted = this.allSoundsMuted;
    });
  }

  toggleBottleSounds() {
    this.level.bottles.forEach((bottle) => {
      bottle.collect_bottle_sound.muted = this.allSoundsMuted;
    });
  }

  toggleEnemySounds() {
    this.level.enemies.forEach((enemy) => {
      if (enemy.walking_sound) {
        enemy.walking_sound.muted = this.allSoundsMuted;
      }
      if (enemy.dead_enemy_sound) {
        enemy.dead_enemy_sound.muted = this.allSoundsMuted;
      }
    });
  }

  updateMuteButton() {
    const muteDiv = document.getElementById("muteDiv");
    muteDiv.innerHTML = this.allSoundsMuted
      ? '<img src="img/volume_off.svg" alt="Mute Icon">'
      : '<img src="img/volume_up.svg" alt="Volume Icon">';
  }
}
