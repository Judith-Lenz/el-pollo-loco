class World {
  //an der x-Koordinate 0 werden 4 Grafiken eingefügt.

  character = new Character(); //Variable character wurde Objekt namens Character zugewiesen
  level = level1;

  canvas;
  ctx; //Variable context
  keyboard; // leere Variable
  camera_x = 0;

  constructor(canvas, keyboard) {
    //geben die Variable canvas zu world, damit die da existiert.
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  //zur Verknüpfung, also Referenz auf world. aktuelle Instanz von world.
  setWorld() {
    this.character.world = this;
  }

  // Variablen die oben deklariert sind und auf die man zugreifen möchte, muss man mit this ansprechen

  draw() {
    //hier kommt es auf die Reihenfolge an. alles wird von oben nach unten geschichtet.
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // hier wird erstmal gelöscht
    this.ctx.translate(this.camera_x, 0); //Ausschnitt nach links verschieben, je nachdem wie viel oben drin steht, z.B. 100px
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.salsas);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.coins);
    this.ctx.translate(-this.camera_x, 0);

    //draw() wird immer wieder aufgerufen.
    let self = this; //this klappt hier nicht, daher das self=this
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0); //Elemente spiegelverkehrt einfügen
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    if (mo.otherDirection) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  }
}
