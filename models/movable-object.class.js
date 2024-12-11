class MovableObject extends DrawableObject {
  speed = 0.15; //standard, wird jeweils evtl. überschrieben
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5; //so schnell fällt das Objekt, 2.5
  energy = 100; //100%
  lastHit = 0;
  lastHurtSoundTime = 0; // Zeitpunkt des letzten abgespielten Sounds
  // Eigenschaften für die Hitbox
  collisionOffsetX = 0; // Abstand zur linken Kante
  collisionOffsetY = 0; // Abstand zur oberen Kante
  collisionWidth = this.width; // Breite der Hitbox
  collisionHeight = this.height; // Höhe der Hitbox

  //Lässt Objekt fallen, wenn in der Luft.
  // applyGravity() {
  //   setInterval(() => {
  //     if (this.isAboveGround() || this.speedY > 0) {
  //       this.y -= this.speedY; //Character wird nach unten bewegt.
  //       this.speedY -= this.acceleration; //Geschwindigkeit nimmt ab.
  //     }
  //   }, 1000 / 25);
  // }

  //solange isAboveGround() oder this.speedY > 0 wahr sind, läuft die Funktion weiter.
  applyGravity() {
    setInterval(() => {
      this.applyGravityStep(); // Gravitation auf das Objekt anwenden
      if (this instanceof ThrowableObject) {
        this.limitBottleFall(); // Begrenzung der Flaschenhöhe
      } else {
        this.resetCharacterToGround(); // Charakter auf Bodenhöhe zurücksetzen
      }
    }, 1000 / 60);
  }

  // Schwerkraft auf das Objekt anwenden
  applyGravityStep() {
    if (this instanceof ThrowableObject && !this.gravityEnabled) {
      return; // Gravitation deaktivieren nur für Flaschen
    }

    if (this.isAboveGround() || this.speedY > 0) {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }
  }

  // Begrenzung für Flaschen
  limitBottleFall() {
    if (!this.gravityEnabled) {
      return; // Keine Aktion, wenn Gravitation deaktiviert ist
    }
    if (this.y > 1000) {
      this.y = 600; // Begrenze die Y-Position
      this.speedY = 0; // Stoppe die Gravitation
    }
  }

  // Rücksetzung des Charakters auf die Bodenhöhe
  resetCharacterToGround() {
    if (this.y > 120) {
      // Beispielbodenhöhe 120
      this.y = 120;
      this.speedY = 0; // Stoppe die Bewegung
    }
  }

  //gibt zurück, ob Y vom Objekt kleiner ist als 120. Wenn nein, dann fällt Objekt.
  //hier Bodenniveau einstellen.
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      //wenn es eine Instanz ist von ThrowableObject, hört sie nicht auf zu fallen
      //Bottles sollen immer weiter fallen.
      return true;
    } else {
      // console.log("ist in der Luft");
      return this.y < 120;
    }
    //Bodenniveau, muss gleich sein y Character, sonst fällt er ins Bild
    //ab diesem Wert wird Objekt von Gravitation beeinflusst. Muss gleich sein Y in Character
    //die Flaschen sollen nicht auf dem Boden aufkommen und liegen bleiben, daher die if Abfrage.
  }

  //z.B. character.isColliding(chicken), Formel gibt true oder false zurück ALT
  // isColliding(obj) {
  //   return (
  //     this.x + this.width >= obj.x &&
  //     this.x <= obj.x + obj.width &&
  //     this.y + this.height >= obj.y &&
  //     this.y <= obj.y + obj.height
  //   );
  // }

  // Kollisionsprüfung mit der Hitbox NEU, gibt true oder false zurück
  isColliding(obj) {
    const thisBox = this.getCollisionBox(); //das Objekt, das die Methode aufgerufen hat, z.B. player
    const otherBox = obj.getCollisionBox(); //übergebenes Objekt mit dem kollidiert wird, z.B. enemy. Also z.B. player.isColliding(enemy)
    // Prüfen, ob Kollision stattfindet und ob der Charakter in der Luft ist
    return (
      //prüft, ob Kollision statt findet, wenn alle ja, dann true
      thisBox.x + thisBox.width >= otherBox.x &&
      thisBox.x <= otherBox.x + otherBox.width &&
      thisBox.y + thisBox.height >= otherBox.y &&
      thisBox.y <= otherBox.y + otherBox.height
      //&& thisBox.isAboveGround()  //dann werden bottles nur im Sprung eingesammelt.
      // Zusätzliche Bedingung: Der Charakter muss in der Luft sein, nicht hier einbauen!
    );
  }

  // Methode zum Berechnen der tatsächlichen Hitbox
  getCollisionBox() {
    return {
      x: this.x + this.collisionOffsetX,
      y: this.y + this.collisionOffsetY,
      width: this.collisionWidth,
      height: this.collisionHeight,
    };
  }

  //Ändert Wert der Energie
  hit() {
    const currentTime = new Date().getTime();
    // Holt die aktuelle Zeit in Millisekunden (Zeit seit dem 1. Januar 1970).
    if (currentTime - this.lastHit > 500) {
      // Prüft, ob seit dem letzten Treffer mehr als 500 Millisekunden vergangen sind.
      // Wenn ja, darf der Charakter erneut Energie verlieren.
      this.energy -= 5;
      // Reduziert die Energie des Charakters um 5 Punkte.
      if (this.energy < 0) {
        // Falls die Energie unter 0 fällt:
        this.energy = 0;
        // Setze die Energie auf 0, da negative Energie keinen Sinn ergibt.
      } else {
        // Wenn die Energie noch über 0 liegt:
        this.lastHit = currentTime;
        // Speichere die aktuelle Zeit als `lastHit`, um die nächste Trefferzeit zu berechnen.
      }
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; //Zeit seit letztem Treffer,Differenz in MilliSekunden.
    timepassed = timepassed / 1000; //Millisekunden durch 1000, dann haben wir die Sekunden.
    return timepassed < 1; //d.h. wir wurden innerhalb der dieser Zeitspanne gehittet, dann true.
    //dann wird die Animation mit den HurtBildern 1 Sekunde angezeigt.
  }

  //ist Objekt tot oder nicht, also true/false
  isDead() {
    return this.energy == 0;
  }

  // playAnimation(images) {
  //   let i = this.currentImage % images.length; // Index berechnen
  //   let path = images[i]; // Aktuelles Bild holen
  //   this.img = this.imageCache[path]; // Bild aktualisieren
  //   this.currentImage++; // Nächste Bildposition vorbereiten
  // }

  playAnimation(images, frameRate = 1, loop = true) {
    if (this.currentImage % frameRate === 0) {
      let i = Math.floor(this.currentImage / frameRate); // Index basierend auf Frame-Rate
      if (!loop && i >= images.length - 1) {
        // Wenn keine Schleife und letzter Frame erreicht, setze auf letztes Bild
        i = images.length - 1;
      } else {
        i = i % images.length; // Modulo für die Schleife
      }
      let path = images[i];
      this.img = this.imageCache[path];
    }
    if (loop || this.currentImage / frameRate < images.length - 1) {
      this.currentImage++; // Bildposition hochzählen
    }
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
}
