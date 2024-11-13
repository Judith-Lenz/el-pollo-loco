class Character extends MovableObject {
  height = 200;
  width = 90;
  y = 220;
  speed = 5;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  world; //damit wir auf die Variablen aus world zugreifen können (siehe setWorld inn world), u.a. keyboard.

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png"); //übergibt den Pfad an loadImage, das in movableObject aufgerufen wird.
    this.loadImages(this.IMAGES_WALKING); //das ganze Array wird als Parameter übergeben

    this.animate();
  }

  //Bilder sollen immer ausgetauscht werden, die Funktion muss regelmäßig ausgeführt werden.
  // Sobald Character existiert, wird das hier jede Sekunde ausgeführt
  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT) {
        this.x += this.speed;
      }
      if (this.world.keyboard.LEFT) {
        this.x -= this.speed;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        //also entweder links ODER rechts ist true
        //Walk Animation
        let i = this.currentImage % this.IMAGES_WALKING.length; //let i=0 % 6, modulu ist der mathematische Rest
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 30);
  }

  jump() {}
}
