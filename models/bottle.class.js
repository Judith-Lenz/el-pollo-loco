class Bottle extends MovableObject {
  //wg. load image
  height = 75;
  width = 75;
  y = 355;

  collect_bottle_sound = new Audio("audio/collect_pop2.mp3");

  BOTTLE_IMAGES = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png", // Index 0
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png", // Index 1
  ];

  constructor(x) {
    super();
    const randomIndex = Math.floor(Math.random() * this.BOTTLE_IMAGES.length); // Zufälligen Index berechnen
    this.loadImage(this.BOTTLE_IMAGES[randomIndex]); // Zufälliges Bild laden
    // this.x = 200 + Math.random() * 500; //an zufälliger Stelle
    this.x = x; // an der Stelle, die übergeben wird. CAVE: bezieht sich auf Bild, nicht auf Hitbox.
    this.collisionOffsetX = 26; // mehr =weiternachrechts
    this.collisionOffsetY = 12; // Oben etwas weniger, mehr=weiter runter
    this.collisionWidth = 32; // Breite der Hitbox
    this.collisionHeight = 55; // Höhe der Hitbox
  }

  collectBottle() {
    this.playBottleSound();
    this.startAnimation();
    this.removeBottleFromWorld();
  }

  playBottleSound() {
    console.log("Bottle-Sound abgespielt");
    this.collect_bottle_sound.play();
    // Hier kannst du den Soundcode einfügen
  }

  startAnimation() {
    console.log("Bottle-Animation gestartet");
    // Animation für das Einsammeln
  }

  removeBottleFromWorld() {
    const index = world.level.bottles.indexOf(this);
    if (index > -1) {
      world.level.bottles.splice(index, 1);
    }
  }
}
