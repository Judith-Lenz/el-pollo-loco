class Character extends MovableObject {
  height = 200;
  width = 90;
  y = 220;
  speed = 10;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  world; //damit wir auf die Variablen aus world zugreifen können (siehe setWorld inn world), u.a. keyboard. Verweis auf die world-Instanz
  walking_sound = new Audio("audio/running2.mp3"); //Audio Objekt

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png"); //übergibt den Pfad an loadImage, das in movableObject aufgerufen wird.
    this.loadImages(this.IMAGES_WALKING); //das ganze Array wird als Parameter übergeben
    this.animate();
  }

  //Bilder sollen immer ausgetauscht werden, die Funktion muss regelmäßig ausgeführt werden.
  // Sobald Character existiert, wird das hier jede Sekunde ausgeführt
  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_sound.play();
      }
      if (this.world.keyboard.LEFT && this.x >= -100) {
        //hier kann ich sagen, wie weit Character nach links laufen kann.
        this.x -= this.speed;
        this.otherDirection = true;
        this.walking_sound.play();
      }
      this.world.camera_x = -this.x + 100; //hier wird ja die Kamera x Kooridnate gleichgesetzt mit der vom character, wenn wir +100 machen, ist das versetzt, wie wir es wollen.
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        //also entweder links ODER rechts ist true
        //Walk Animation
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 50);
  }

  jump() {}
}
