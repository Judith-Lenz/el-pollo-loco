class MovableObject extends DrawableObject {
  speed = 0.15; //standard, wird jeweils evtl. überschrieben
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5; //so schnell fällt das Objekt
  energy = 100; //100%
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  //braucht man später, wenn man wissen will, ob Objekt sich grade in der Luft befindet.
  isAboveGround() {
    return this.y < 215; //gibt nur den Wert von y zurück. siehe y in ApplyGravity
  }

  //z.B. character.isColliding(chicken), Formel gibt true oder false zurück
  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.height >= obj.y &&
      this.y <= obj.y + obj.height
    );
  }

  // //gibt einfach nur true oder false zurück
  // isColliding(mo) {
  //   return (
  //     this.x + this.width > mo.x &&
  //     this.y + this.height > mo.y &&
  //     this.x < mo.x &&
  //     this.y < mo.y + mo.height
  //   );
  // }

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

  playAnimation(images) {
    let i = this.currentImage % images.length; // Index berechnen
    let path = images[i]; // Aktuelles Bild holen
    this.img = this.imageCache[path]; // Bild aktualisieren
    this.currentImage++; // Nächste Bildposition vorbereiten
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
