class Character extends MovableObject {
  height = 310; //CAVE: wenn ich hier was ändere, muss ich Schwellenwert für Gravitation anpassen!
  width = 150;
  y = 115; //muss gleich sein wie y in aboveGround(), sonst fällt er ins Bild.
  speed = 10;

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING_UP = [
    // Absprung-Bilder
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    // "img/2_character_pepe/3_jump/J-36.png",
  ];

  IMAGES_JUMPING_DOWN = [
    // "img/2_character_pepe/3_jump/J-34.png", // Fallen-Bilder
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
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
  snoring_sound = new Audio("audio/snoring.mp3");

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png"); //übergibt den Pfad an loadImage, das in movableObject aufgerufen wird.
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING); //das ganze Array wird als Parameter übergeben
    this.loadImages(this.IMAGES_JUMPING_UP);
    this.loadImages(this.IMAGES_JUMPING_DOWN);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
    // Hitbox spezifisch für den Character
    this.collisionOffsetX = 10; // Etwas schmaler links/rechts, mehr =weiternachrechts
    this.collisionOffsetY = 90; // Oben etwas weniger, mehr=weiter runter
    this.collisionWidth = 90; // Breite der Hitbox
    this.collisionHeight = 150; // Höhe der Hitbox
  }

  //Bilder sollen immer ausgetauscht werden, die Funktion muss regelmäßig ausgeführt werden.
  // Sobald Character existiert, wird das hier jede Sekunde ausgeführt
  animate() {
    let idleStartTime = null; // Startzeit für die Idle-Animation
    const idleThreshold = 500000; // 15 Sekunden in Millisekunden //hier Zeit einstellen, bis er schnarcht.

    setInterval(() => {
      this.walking_sound.pause(); // kein Sound, wenn er steht
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        this.walking_sound.play();
        idleStartTime = null; // Zurücksetzen, da Charakter nicht mehr idle ist
      }
      if (this.world.keyboard.LEFT && this.x >= -100) {
        this.moveLeft();
        this.otherDirection = true;
        this.walking_sound.play();
        idleStartTime = null; // Zurücksetzen, da Charakter nicht mehr idle ist
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump(); // Springen
        idleStartTime = null; // Zurücksetzen, da Charakter nicht mehr idle ist
      }

      this.world.camera_x = -this.x + 100; // Kamera-Bewegung
    }, 1000 / 60);

    setInterval(() => {
      this.snoring_sound.pause();
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        idleStartTime = null; // Zurücksetzen, da Charakter nicht mehr idle ist
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
        idleStartTime = null; // Zurücksetzen, da Charakter nicht mehr idle ist
      } else if (this.isAboveGround()) {
        if (this.speedY > 0) {
          this.playAnimation(this.IMAGES_JUMPING_UP, 4);
        } else {
          this.playAnimation(this.IMAGES_JUMPING_DOWN, 10);
        }
        idleStartTime = null; // Zurücksetzen, da Charakter nicht mehr idle ist
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
        idleStartTime = null; // Zurücksetzen, da Charakter nicht mehr idle ist
      } else {
        // Wenn der Charakter stillsteht (idle)
        if (!idleStartTime) {
          idleStartTime = Date.now(); // Idle-Zeit starten
        } else if (Date.now() - idleStartTime >= idleThreshold) {
          // 15 Sekunden Idle erreicht
          this.playAnimation(this.IMAGES_LONG_IDLE, 4); // Neue Animation starten (du musst diese Animation hinzufügen)
          this.snoring_sound.play();
          return; // Verhindert, dass die normale Idle-Animation überschrieben wird
        }
        // Normale Idle-Animation, wenn Idle-Zeit unter zig Sekunden ist
        this.playAnimation(this.IMAGES_IDLE, 4);
      }
    }, 50);
  }

  jump() {
    this.speedY = 30;
  }
}
