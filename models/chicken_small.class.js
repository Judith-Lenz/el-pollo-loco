class ChickenSmall extends MovableObject {
  y = 365; //Höhe plazieren. Mehr ist dann weiter unten, erst Größe, dann Plazierung!
  height = 50;
  width = 50;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  dead_enemy_sound = new Audio("audio/collect_click.mp3");

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/2_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 200 + Math.random() * 500; //die Hühnchen starten bei 200px plus zufällige Zahl für jedes Hühnchen.
    this.speed = 0.15 + Math.random() * 0.5; //zufällige Geschwindigkeit zwischen und
    this.animate();
    this.collisionOffsetX = 1;
    this.collisionOffsetY = 1;
    this.collisionWidth = 47;
    this.collisionHeight = 47;
  }

  animate() {
    setInterval(() => {
      //chicken soll sich mit 60fps nach links bewegen.
      this.moveLeft();
    }, 10000000 / 60); //eigtl. 1000/60 als StandardWert

    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }

  deadEnemy() {
    this.playDeadEnemySound();
    this.startDeadEnemyAnimation();
    this.removeDeadEnemyFromWorld();
  }

  playDeadEnemySound() {
    console.log("DeadEnemy-Sound abgespielt");
    this.dead_enemy_sound.play();
  }

  startDeadEnemyAnimation() {
    console.log("DeadEnemyAnimation gestartet");
    // Animation für den toten Enemy einfügen
  }

  removeDeadEnemyFromWorld() {
    const index = world.level.enemies.indexOf(this);
    if (index > -1) {
      world.level.enemies.splice(index, 1);
    }
  }
}
