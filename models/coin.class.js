class Coin extends MovableObject {
  height = 50;
  width = 50;
  y = 350;

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.x = 200 + Math.random() * 500;
  }
}
