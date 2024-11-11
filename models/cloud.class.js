class Cloud extends MovableObject {
  height = 250;
  width = 500;
  y = 20;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = 0 + Math.random() * 500; // zufällig Zahl zwi. 0 und 500. zwischen 200 und 700?
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.x -= 1;
    }, 1000 / 60); //60xproSekunde wird WErt abgezogen.
  }
}
