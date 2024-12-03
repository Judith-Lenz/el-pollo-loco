class World {
  //an der x-Koordinate 0 werden 4 Grafiken eingefügt.
  allSoundsMuted = false; // Statusvariable für Sound
  character = new Character(); //Variable character wurde Objekt namens Character zugewiesen
  level = level1;
  //hier noch irgendwo initlevel1 rein
  canvas;
  ctx; //Variable context
  keyboard; // leere Variable
  camera_x = 0; //Die Position der Kamera auf der X-Achse. Sie bewegt sich, wenn der Spieler läuft.
  statusBarHealth = new StatusBarHealth();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  throwableObjects = [];

  constructor(canvas, keyboard) {
    //geben die Variable canvas zu world, damit die da existiert.
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run(); //intervall, das regelmäßig ausgeführt wird.
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
      this.checkThrowObjects(); //wenn eine Taste gedrückt wird.
    }, 100); // alle 100ms wird das in der geschweiften Klammer ausgeführt.
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
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
    //checkCollisions Bottle
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
          console.log("Charakter springt auf den Gegner!");
          this.character.speedY = 20; // Höhe des erneuten Sprungs
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
    coin.collectCoin(); // Auf das richtige Coin-Objekt zugreifen
    console.log("Kollision mit Münze");
  }

  handleBottleCollision(bottle) {
    bottle.collectBottle(); // Auf das richtige Bottle-Objekt zugreifen
    console.log("Kollision mit Flasche");
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
    // Charakter-Sounds
    this.character.walking_sound.muted = this.allSoundsMuted;
    this.character.snoring_sound.muted = this.allSoundsMuted;
    // Münz-Sounds
    this.level.coins.forEach((coin) => {
      coin.collect_coin_sound.muted = this.allSoundsMuted;
    });
    // Bottle-Sounds
    this.level.bottles.forEach((bottle) => {
      bottle.collect_bottle_sound.muted = this.allSoundsMuted;
    });

    //für weiter sounds, die noch kommen (enemy, bottle, etc.), so erweitern:

    // this.level.enemies.forEach(enemy => {
    //   if (enemy.sound) enemy.sound.muted = this.allSoundsMuted;
    // });

    console.log(
      `Sounds ${this.allSoundsMuted ? "stummgeschaltet" : "aktiviert"}`
    );
    // Text dynamisch anpassen
    const muteDiv = document.getElementById("muteDiv");
    if (this.allSoundsMuted) {
      muteDiv.innerHTML = '<img src="img/volume_off.svg" alt="Play Icon">';
    } else {
      muteDiv.innerHTML = '<img src="img/volume_up.svg" alt="Mute Icon">';
    }
  }
}
