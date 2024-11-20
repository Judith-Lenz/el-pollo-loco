class Salsa extends MovableObject {
  //wg. load image
  height = 70;
  width = 70;
  y = 355;

  SALSA_IMAGES = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png", // Index 0
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png", // Index 1
  ];

  constructor() {
    super();
    const randomIndex = Math.floor(Math.random() * this.SALSA_IMAGES.length); // Zufälligen Index berechnen
    this.loadImage(this.SALSA_IMAGES[randomIndex]); // Zufälliges Bild laden
    this.x = 200 + Math.random() * 500;
  }
}
