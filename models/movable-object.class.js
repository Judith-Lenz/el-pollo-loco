class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 90;
  imageCache = {}; //in dieses JSON laden wir Bilder rein.
  currentImage = 0;
  speed = 0.15;
  otherDirection = false;

  //loadImage('img/test.png);
  loadImage(path) {
    //lädt ein einzelnes Bild und speichert es im Objekt.
    this.img = new Image(); //this.img =dasselbe wie: document.getElementById ('image') <img id = "image" src>
    this.img.src = path;
  }

  //lädt mehrere Bilder, indem es ein Array von Bildpfaden verwendet und diese in einem Cache speichert.
  loadImages(arr) {
    // hier wurde als Parameter das ganze Array reingegeben. und dann iteriert man durch
    arr.forEach((path) => {
      //path hat jedes mal den Pfad von einem Bild
      let img = new Image(); //hier laden wir das Bild in das image Objekt.
      img.src = path; // hier ist nur innerhalb dieser Funktion gültige Variable
      this.imageCache[path] = img; //hier greifen wir auf die Variable von dem Objekt zu (s.o.) ,
      //Update vom imageCache
    });
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60); //60xproSekunde wird WErt abgezogen.
  }
}
