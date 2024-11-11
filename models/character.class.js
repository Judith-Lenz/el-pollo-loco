class Character extends MovableObject {
  height = 200;
  width = 90;
  y = 220;

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages([
      "img/2_character_pepe/2_walk/W-21.png",
      "img/2_character_pepe/2_walk/W-22.png",
      "img/2_character_pepe/2_walk/W-23.png",
      "img/2_character_pepe/2_walk/W-24.png",
      "img/2_character_pepe/2_walk/W-25.png",
      "img/2_character_pepe/2_walk/W-26.png",
    ]); //das ganze Array wird als Parameter übergeben
  }

  jump() {}
}
