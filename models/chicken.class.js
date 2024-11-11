class Chicken extends MovableObject {
  y = 370; //Höhe plazieren. Mehr ist dann weiter unten, erst Größe, dann Plazierung!
  height = 45;
  width = 45;
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/2_w.png");
    this.x = 200 + Math.random() * 500;
  }
}
