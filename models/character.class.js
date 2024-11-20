class Character extends MovableObject {
  height = 200;
  width = 90;
  y = 80; //wie hoch ist Pepe (220), weniger ist höher, weil man von oben Anfängt
  speed = 10;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    " img/2_character_pepe/3_jump/J-31.png",
    " img/2_character_pepe/3_jump/J-32.png",
    " img/2_character_pepe/3_jump/J-33.png",
    " img/2_character_pepe/3_jump/J-34.png",
    " img/2_character_pepe/3_jump/J-35.png",
    " img/2_character_pepe/3_jump/J-36.png",
    " img/2_character_pepe/3_jump/J-37.png",
    " img/2_character_pepe/3_jump/J-38.png",
    " img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  world; //damit wir auf die Variablen aus world zugreifen können (siehe setWorld inn world), u.a. keyboard. Verweis auf die world-Instanz
  walking_sound = new Audio("audio/running2.mp3"); //Audio Objekt

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png"); //übergibt den Pfad an loadImage, das in movableObject aufgerufen wird.
    this.loadImages(this.IMAGES_WALKING); //das ganze Array wird als Parameter übergeben
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
    // Hitbox spezifisch für den Character
    this.collisionOffsetX = 10; // Etwas schmaler links/rechts
    this.collisionOffsetY = 50; // Oben etwas weniger
    this.collisionWidth = 70; // Breite der Hitbox
    this.collisionHeight = 120; // Höhe der Hitbox
  }

  //Bilder sollen immer ausgetauscht werden, die Funktion muss regelmäßig ausgeführt werden.
  // Sobald Character existiert, wird das hier jede Sekunde ausgeführt
  animate() {
    setInterval(() => {
      this.walking_sound.pause(); //wenn er steht kein Sound
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
      }
      if (this.world.keyboard.LEFT && this.x >= -100) {
        //hier kann ich sagen, wie weit Character nach links laufen kann. Er soll halt nicht aus der welt rauslaufen können.
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        //spaceTaste drücken
        this.jump(); //siehe movableObject.
      }

      this.world.camera_x = -this.x + 100; //hier wird ja die Kamera x Kooridnate gleichgesetzt mit der vom character, wenn wir +100 machen, ist das versetzt, wie wir es wollen.
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD); //nur wenn energy bei null ist.
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        //wenn über dem Fußbodenniveau
        this.playAnimation(this.IMAGES_JUMPING); //spiele diese Animation ab
      } //wenn nicht, dann Walking Animation zeigen (also wenn man z.B. rechts oder links drückt)
      else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        //also entweder links ODER rechts ist true
        //Walk Animation Bilder anzeigen.
        this.playAnimation(this.IMAGES_WALKING); //wenn er läuft, dann sollen es diese Grafiken sein
      }
    }, 50);
  }

  jump() {
    this.speedY = 30;
  }
}
