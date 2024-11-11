class BackgroundObject extends MovableObject {
  width = 740;
  height = 480;
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height; //müssen y nicht mehr einfügen, sondern wird berechnet.
  }
}
