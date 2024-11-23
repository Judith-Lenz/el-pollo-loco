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

  constructor(canvas, keyboard) {
    //geben die Variable canvas zu world, damit die da existiert.
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
  }

  //zur Verknüpfung, also Referenz auf world. aktuelle Instanz von world.
  setWorld() {
    this.character.world = this;
  }

  checkCollisions() {
    setInterval(() => {
      this.level.coins.forEach((coin) => {
        if (this.character.isColliding(coin)) {
          this.handleCoinCollision(coin);
        }
      });

      this.level.bottles.forEach((bottle) => {
        if (this.character.isColliding(bottle)) {
          this.handleBottleCollision(bottle);
        }
      });

      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          console.log("Kollision mit Gegner, Energie", this.character.energy);
        }
      });
    }, 100); // alle 100ms wird das in der geschweiften Klammer ausgeführt.
  }

  handleCoinCollision(coin) {
    coin.collectCoin(); // Auf das richtige Coin-Objekt zugreifen
    console.log("Kollision mit Münze");
  }

  handleBottleCollision(coin) {
    coin.collectBottle(); // Auf das richtige Bottle-Objekt zugreifen
    console.log("Kollision mit Flasche");
  }

  // Variablen die oben deklariert sind und auf die man zugreifen möchte, muss man mit this ansprechen

  draw() {
    //hier kommt es auf die Reihenfolge an. alles wird von oben nach unten geschichtet.
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // hier wird erstmal gelöscht
    this.ctx.translate(this.camera_x, 0); //Ausschnitt nach links verschieben, je nachdem wie viel oben drin steht, z.B. 100px
    this.updateCloudPositions(); // Vor dem Hinzufügen der Wolken aufrufen
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds); //Iteriert durch die Wolken aus level1 und ruft für jede addToMap() auf.
    this.addObjectsToMap(this.level.bottles);
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
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

  updateCloudPositions() {
    this.level.clouds.forEach((cloud) => {
      cloud.x -= 0.2; // Wolken bewegen sich langsam nach links
      const rightEdgeOfCamera = this.camera_x + this.canvas.width;
      if (cloud.x + cloud.width < this.camera_x) {
        // Wolke ist komplett aus dem sichtbaren Bereich nach links herausgerutscht
        cloud.x = rightEdgeOfCamera; // Neue Position: genau am rechten Rand des sichtbaren Bereichs
      }
    });
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
      muteDiv.innerHTML = //hier noch die img Pfade einfügen für die sound on und off einfügen
        '<img src="play-icon.png" alt="Play Icon" style="height: 20px; vertical-align: middle;"> Play Sounds';
    } else {
      muteDiv.innerHTML =
        '<img src="mute-icon.png" alt="Mute Icon" style="height: 20px; vertical-align: middle;"> Mute Sounds';
    }
  }
}
