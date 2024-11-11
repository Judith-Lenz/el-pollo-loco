class MovableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 90;
  imageCache = {}; //in dieses JSON laden wir Bilder rein.

  //loadImage('img/test.png);
  loadImage(path) {
    this.img = new Image(); //this.img = document.getElementById ('image') <img id = "image" src>
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      imageCache[path] = path;
    });
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {}
}
