class ChickenSmall extends MovableObject {
  y = 375; //Höhe plazieren. Mehr ist dann weiter unten, erst Größe, dann Plazierung!
  height = 40;
  width = 40;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/2_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 200 + Math.random() * 500; //die Hühnchen starten bei 200px plus zufällige Zahl für jedes Hühnchen.
    this.speed = 0.15 + Math.random() * 0.5; //zufällige Geschwindigkeit zwischen und
    this.animate();
  }

  animate() {
    setInterval(() => {
      //chicken soll sich mit 60fps nach links bewegen.
      this.moveLeft();
    }, 1000000000 / 60); //eigtl. 1000/60 als StandardWert

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
