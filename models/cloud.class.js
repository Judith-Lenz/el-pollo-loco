class Cloud extends MovableObject {
  height = 250;
  width = 500;
  y = 20;
  CLOUDS_WALKING = [
    "img/5_background/layers/4_clouds/1.png",
    "img/5_background/layers/4_clouds/2.png",
  ];

  constructor() {
    super().loadImage(this.CLOUDS_WALKING[1]);
    this.loadImages(this.CLOUDS_WALKING);
    this.x = 0 + Math.random() * 500; // zufällig Zahl zwi. 0 und 500. zwischen 200 und 700?
    this.moveLeft();
  }
}
