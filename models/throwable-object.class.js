class ThrowableObject extends MovableObject {
  speedX = 20;
  speedY = 30;
  acceleration = 1.0; // Individueller Wert für Gravitation nur für ThrowableObject

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 50;
    this.throw();
  }

  throw() {
    this.speedY = 15; // Tempo nach oben
    this.applyGravity(); // Gravitation hinzufügen
    this.throwInterval = setInterval(() => {
      this.x += 20; // Geschwindigkeit der Flasche
      if (this.x > 1000) {
        // Flasche verschwindet außerhalb des Bildschirms
        clearInterval(this.throwInterval); // Intervall stoppen
      }
    }, 25); // 25 ms für glatte Bewegung
  }
}
