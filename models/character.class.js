class Character extends MovableObject {
  height = 200;
  width = 90;
  y = 220;

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
  }

  jump() {}
}
