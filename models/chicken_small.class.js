class ChickenSmall extends MovableObject {
  y = 365; //Höhe plazieren. Mehr ist dann weiter unten, erst Größe, dann Plazierung!
  height = 50;
  width = 50;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGE_DEAD = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";

  dead_enemy_sound = new Audio("audio/collect_click.mp3");
  isDead = false; // Neuer Zustand: Ist der Feind tot?

  constructor(x) {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/2_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = x; //die Hühnchen starten bei 200px plus zufällige Zahl für jedes Hühnchen.
    this.speed = 0.15 + Math.random() * 0.5; //zufällige Geschwindigkeit zwischen und
    this.animate();
    this.collisionOffsetX = 1;
    this.collisionOffsetY = 1;
    this.collisionWidth = 47;
    this.collisionHeight = 47;
  }

  animate() {
    this.walkingInterval = setInterval(() => {
      if (!this.isDead) this.moveLeft(); // Nur bewegen, wenn der Feind nicht tot ist
    }, 100000 / 60);

    this.animationInterval = setInterval(() => {
      if (!this.isDead) this.playAnimation(this.IMAGES_WALKING); // Nur animieren, wenn nicht tot
    }, 200);
  }

  deadEnemy() {
    this.isDead = true; // Zustand auf "tot" setzen
    this.playDeadEnemySound();
    this.startDeadEnemyAnimation();
    // Stoppe alle Bewegungen und Animationen
    this.stopAnimation();
    this.deactivateHitBox();
    // Entferne den Enemy nach 5 Sekunden (5000ms)
    setTimeout(() => {
      this.removeDeadEnemyFromWorld();
    }, 5000); // 5 Sekunden
  }

  playDeadEnemySound() {
    console.log("DeadEnemy-Sound abgespielt");
    this.dead_enemy_sound.play();
  }

  startDeadEnemyAnimation() {
    console.log("DeadEnemyAnimation gestartet");
    this.speed = 0; // Feind bleibt stehen
    this.loadImage(this.IMAGE_DEAD); //Dead-Image laden
    // Animation für den toten Enemy einfügen
  }

  stopAnimation() {
    clearInterval(this.walkingInterval); // Bewegen stoppen
    clearInterval(this.animationInterval); // Animation stoppen
  }

  removeDeadEnemyFromWorld() {
    console.log("Feind wird entfernt");
    const index = world.level.enemies.indexOf(this);
    if (index > -1) {
      world.level.enemies.splice(index, 1);
    }
  }
  deactivateHitBox() {
    this.collisionOffsetX = 0;
    this.collisionOffsetY = 0;
    this.collisionWidth = 0;
    this.collisionHeight = 0;
  }
}
