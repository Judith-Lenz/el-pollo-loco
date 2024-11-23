class ChickenNormal extends MovableObject {
  y = 335; //Höhe plazieren. Mehr ist dann weiter unten, erst Größe, dann Plazierung!
  height = 85;
  width = 70;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  walking_sound = new Audio("audio/chickens.mp3"); //Audio Objekt

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/2_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 200 + Math.random() * 500; //die Hühnchen starten bei 200px plus zufällige Zahl für jedes Hühnchen.
    this.speed = 0.15 + Math.random() * 0.5; //zufällige Geschwindigkeit zwischen und
    this.animate();
    // Hitbox spezifisch für Hühner
    this.collisionOffsetX = 1;
    this.collisionOffsetY = 1;
    this.collisionWidth = 68;
    this.collisionHeight = 83;
  }

  animate() {
    setInterval(() => {
      //chicken soll sich mit 60fps nach links bewegen.
      this.moveLeft();
    }, 100000000 / 60); //1000/60 ist standard Wert

    setInterval(() => {
      // this.walking_sound.play();  // geht nur mit voriger Interaktion also mit Klick auf StartButton (oder mit Druck auf Taste) verbinden z.B.
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
