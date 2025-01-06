class MovableObject extends DrawableObject {
  speed = 0.15 //standard, wird jeweils evtl. überschrieben
  otherDirection = false
  speedY = 0
  acceleration = 2.5 //so schnell fällt das Objekt, 2.5
  energy = 100 //100%
  lastHit = 0
  lastHurtSoundTime = 0 // Zeitpunkt des letzten abgespielten Sounds
  // Eigenschaften für die Hitbox
  collisionOffsetX = 0 // Abstand zur linken Kante
  collisionOffsetY = 0 // Abstand zur oberen Kante
  collisionWidth = this.width // Breite der Hitbox
  collisionHeight = this.height // Höhe der Hitbox

  //solange isAboveGround() oder this.speedY > 0 wahr sind, läuft die Funktion weiter.
  applyGravity() {
    setInterval(() => {
      this.applyGravityStep() // Gravitation auf das Objekt anwenden
      if (this instanceof ThrowableObject) {
        this.limitBottleFall() // Begrenzung der Flaschenhöhe
      } else {
        this.resetCharacterToGround() // Charakter auf Bodenhöhe zurücksetzen
      }
    }, 1000 / 60)
  }

  // Schwerkraft auf das Objekt anwenden
  applyGravityStep() {
    if (this instanceof ThrowableObject && !this.gravityEnabled) {
      return // Gravitation deaktivieren nur für Flaschen
    }

    if (this.isAboveGround() || this.speedY > 0) {
      this.y -= this.speedY
      this.speedY -= this.acceleration
    }
  }

  // Begrenzung für Flaschen
  limitBottleFall() {
    if (!this.gravityEnabled) {
      return // Keine Aktion, wenn Gravitation deaktiviert ist
    }
    if (this.y > 1000) {
      this.y = 600 // Begrenze die Y-Position
      this.speedY = 0 // Stoppe die Gravitation
    }
  }

  // Rücksetzung des Charakters auf die Bodenhöhe
  resetCharacterToGround() {
    if (this.y > 120) {
      // Beispielbodenhöhe 120
      this.y = 120
      this.speedY = 0 // Stoppe die Bewegung
    }
  }

  //gibt zurück, ob Y vom Objekt kleiner ist als 120. Wenn nein, dann fällt Objekt.
  //hier Bodenniveau einstellen.
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      //wenn es eine Instanz ist von ThrowableObject, hört sie nicht auf zu fallen
      //Bottles sollen immer weiter fallen.
      return true
    } else {
      // console.log("ist in der Luft");
      return this.y < 120
    }
    //Bodenniveau, muss gleich sein y Character, sonst fällt er ins Bild
    //ab diesem Wert wird Objekt von Gravitation beeinflusst. Muss gleich sein Y in Character
    //die Flaschen sollen nicht auf dem Boden aufkommen und liegen bleiben, daher die if Abfrage.
  }

  isColliding(obj) {
    const thisBox = this.getCollisionBox()
    const otherBox = obj.getCollisionBox()
    return (
      thisBox.x + thisBox.width >= otherBox.x &&
      thisBox.x <= otherBox.x + otherBox.width &&
      thisBox.y + thisBox.height >= otherBox.y &&
      thisBox.y <= otherBox.y + otherBox.height
    )
  }

  getCollisionBox() {
    return {
      x: this.x + this.collisionOffsetX,
      y: this.y + this.collisionOffsetY,
      width: this.collisionWidth,
      height: this.collisionHeight,
    }
  }

  hit() {
    console.log('Die Methode hit() wurde ausgeführt!')
    if (this.energy === 0) {
      return
    }
    const currentTime = new Date().getTime()
    if (currentTime - this.lastHit > 500) {
      this.energy -= 5
      if (this.energy < 0) {
        this.energy = 0
      } else {
        this.lastHit = currentTime
      }
    }
  }

  isHurt() {
    if (this.energy === 0) {
      return false
    }
    let timepassed = new Date().getTime() - this.lastHit
    timepassed = timepassed / 1000
    return timepassed < 1
  }

  isDead() {
    return this.energy == 0
  }

  playAnimation(images, frameRate = 1, loop = true) {
    if (this.currentImage % frameRate === 0) {
      let i = Math.floor(this.currentImage / frameRate)
      if (!loop && i >= images.length - 1) {
        i = images.length - 1
      } else {
        i = i % images.length
      }
      let path = images[i]
      this.img = this.imageCache[path]
    }
    if (loop || this.currentImage / frameRate < images.length - 1) {
      this.currentImage++
    }
  }

  moveRight() {
    this.x += this.speed
  }

  moveLeft() {
    this.x -= this.speed
  }

  jump() {
    this.speedY = 30
  }
}
