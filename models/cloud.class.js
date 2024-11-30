class Cloud extends MovableObject {
  height = 250;
  width = 500;
  y = 20;
  CLOUDS_WALKING = [
    "img/5_background/layers/4_clouds/1.png",
    "img/5_background/layers/4_clouds/2.png",
  ];

  constructor(imagePath, x, y) {
    super(); //super() hier startet standardKonstruktor in movableObject
    this.loadImage(imagePath); // lädt das Bild, das übergeben wurde in level1
    this.loadImages([imagePath]); //lädt alle WolkenBilder in den img Cache (Bildspeicher), optional.
    // this.x = Math.random() * (700 - 200) + 200; //Positioniert die Wolken zufällig zwischen 200 und 700 Pixel in der horizontalen Achse.
    this.x = x; // Initial zufällige X-Position
    this.y = y;
    this.collisionOffsetX = 15; // Etwas schmaler links/rechts, mehr =weiternachrechts
    this.collisionOffsetY = 10; // Oben etwas weniger, mehr=weiter runter
    this.collisionWidth = 450; // Breite der Hitbox
    this.collisionHeight = 100; // Höhe der Hitbox
    this.speed = 1.5; // Geschwindigkeit der Wolkenbewegung

    // Bewegung der Wolke nach links starten
    setInterval(() => {
      this.moveLeft();
      if (this.x + this.width < -500) {
        this.x = 2500; // Zurück an den rechten Rand setzen (je nach Level-Breite anpassen)
      }
    }, 1000 / 60);
  }
}
