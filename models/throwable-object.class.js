class ThrowableObject extends MovableObject {
  speedX = 20;
  speedY = 30;

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 50;
    this.throw();
  }

  throw() {
    //je nachdem wo der Character steht, werden die Koordinaten dazu gesetzt.
    this.speedY = 30; //Tempo nach oben
    this.applyGravity(); //damit es auch wieder runter fällt.
    setInterval(() => {
      this.x += 10; //Geschwindigkeit, also x soll sich immer um 10 erhöhen.
    }, 25); //je kleiner, desto schneller fliegt die Flasche
  }
}
