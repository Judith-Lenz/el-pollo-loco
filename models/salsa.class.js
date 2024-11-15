class Salsa extends MovableObject {
  height = 55;
  width = 50;
  y = 355;

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = 200 + Math.random() * 500;
  }
}
