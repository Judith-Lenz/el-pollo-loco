class MovableObject extends DrawableObject {
  speed = 0.15; //standard, wird jeweils evtl. überschrieben
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5; //so schnell fällt das Objekt
  energy = 100; //100%
  lastHit = 0;
  // Eigenschaften für die Hitbox
  collisionOffsetX = 0; // Abstand zur linken Kante
  collisionOffsetY = 0; // Abstand zur oberen Kante
  collisionWidth = this.width; // Breite der Hitbox
  collisionHeight = this.height; // Höhe der Hitbox

  //Lässt Objekt fallen, wenn in der Luft.
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY; //Character wird nach unten bewegt.
        this.speedY -= this.acceleration; //Geschwindigkeit nimmt ab.
      }
    }, 1000 / 25);
  }

  //gibt zurück, ob Objekt gerade in der Luft ist oder nicht. Wenn Nein, Objekt fällt.
  //hier Bodenniveau einstellen.
  isAboveGround() {
    return this.y < 115; //Bodenniveau, muss gleich sein y Character, sonst fällt er ins Bild
    //ab diesem Wert wird Objekt von Gravitation beeinflusst. Muss gleich sein Y in Character
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

  // Kollisionsprüfung mit der Hitbox NEU
  isColliding(obj) {
    const thisBox = this.getCollisionBox();
    const otherBox = obj.getCollisionBox();
    return (
      thisBox.x + thisBox.width >= otherBox.x &&
      thisBox.x <= otherBox.x + otherBox.width &&
      thisBox.y + thisBox.height >= otherBox.y &&
      thisBox.y <= otherBox.y + otherBox.height
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
    this.energy -= 5;
    if (this.energy < 0) {
      //wenn unter Null, zurücksetzen auf Null
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime(); //so speichert man Zeit in Zahlenform Zeit seit dem 01.01.1970
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; //Differenz in MilliSekunden.
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

  playAnimation(images, frameRate = 1) {
    if (this.currentImage % frameRate === 0) {
      let i = (this.currentImage / frameRate) % images.length; // Index basierend auf Frame-Rate
      let path = images[i];
      this.img = this.imageCache[path];
    }
    this.currentImage++; // Bildposition hochzählen
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
