class Cloud extends MovableObject {
  height = 250;
  width = 500;
  y = 20;
  CLOUDS_WALKING = [
    "img/5_background/layers/4_clouds/1.png",
    "img/5_background/layers/4_clouds/2.png",
  ];

  constructor(imagePath) {
    super(); //super() hier startet standardKonstruktor in movableObject
    this.loadImage(imagePath); // lädt das Bild, das übergeben wurde in level1
    this.loadImages([imagePath]); //lädt alle WolkenBilder in den img Cache (Bildspeicher), optional.
    // this.x = Math.random() * (700 - 200) + 200; //Positioniert die Wolken zufällig zwischen 200 und 700 Pixel in der horizontalen Achse.
    this.x = Math.random() * 1000; // Initial zufällige X-Position
    // this.moveLeft(); //Startet die Bewegung der Wolken nach links. ist in movableObject definiert
  }
}
