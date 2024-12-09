class DrawableObject {
  img;
  imageCache = {}; //in dieses JSON laden wir Bilder rein.
  currentImage = 0;
  x = 0; //hier startet der Character,also camera auch direkt um soviel verschoben
  y = 280;
  height = 150;
  width = 90;

  //loadImage('img/test.png);
  loadImage(path) {
    //lädt ein einzelnes Bild und speichert es im Objekt.
    this.img = new Image(); //this.img =dasselbe wie: document.getElementById ('image') <img id = "image" src>
    this.img.src = path;
  }

  draw(ctx) {
    //womit wir zeichnen wollen, ist ctx.
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof ChickenNormal ||
      this instanceof ChickenSmall ||
      this instanceof Coin ||
      this instanceof Bottle ||
      // this instanceof Cloud ||
      this instanceof ThrowableObject ||
      this instanceof Endboss
    ) {
      //hier lege ich fest bei welchen Objekten ich einen Rand sehen möchte.
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height); //hier brauchen wir die Koordinaten vom jeweiligen Objekt!
      ctx.stroke();
      // Zeichne die Hitbox (roter Rahmen)
      const box = this.getCollisionBox();
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle = "red";
      ctx.rect(box.x, box.y, box.width, box.height);
      ctx.stroke();
    }
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
}
