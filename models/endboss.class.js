class Endboss extends MovableObject {
  height = 450;
  width = 350;
  y = 0; //wo genau es eingefügt wird, also welche Höhe

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[3]); //Startbild laden, brauchen wir evtl. gar nicht
    this.loadImages(this.IMAGES_WALKING); //alle anderen Bilder laden.
    this.x = 2500; //wie weit rechts er eingefügt wird.
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
