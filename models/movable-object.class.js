class MovableObject {
  x = 0; //hier startet der Character,also camera auch direkt um soviel verschoben
  y = 280;
  img;
  height = 150;
  width = 90;
  imageCache = {}; //in dieses JSON laden wir Bilder rein.
  currentImage = 0;
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

  //loadImage('img/test.png);
  loadImage(path) {
    //lädt ein einzelnes Bild und speichert es im Objekt.
    this.img = new Image(); //this.img =dasselbe wie: document.getElementById ('image') <img id = "image" src>
    this.img.src = path;
  }

  draw(ctx) {
    //womit wir zeichnen wollen, ist ctx.
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof ChickenNormal ||
      this instanceof ChickenSmall
    ) {
      //hier lege ich fest bei welchen Objekten ich einen Rand sehen möchte.
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height); //hier brauchen wir die Koordinaten vom jeweiligen Objekt!
      ctx.stroke();
    }
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

  //lädt mehrere Bilder, indem es ein Array von Bildpfaden verwendet und diese in einem Cache speichert.
  loadImages(arr) {
    // hier wurde als Parameter das ganze Array reingegeben. und dann iteriert man durch
    arr.forEach((path) => {
      //path hat jedes mal den Pfad von einem Bild
      let img = new Image(); //hier laden wir das Bild in das image Objekt.
      img.src = path; // hier ist nur innerhalb dieser Funktion gültige Variable
      this.imageCache[path] = img; //hier greifen wir auf die Variable von dem Objekt zu (s.o.) ,
      //Update vom imageCache
    });
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
