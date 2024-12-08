//Klsse ist wie ein BauPlan eines throwableObjects, aber nicht das Objekt selbst!!!
//Eine Instanz wäre dann ein konkretes Objekt, das mit dem Bauplan erstellt wurde. => new ThrowableObject
class ThrowableObject extends MovableObject {
  speedX = 20; //Flasche bewegt sich mit 20Pixeln pro Frame nach rechts
  speedY = 15; //Flasche beginnt mit der Aufwärtsbewegung (=> negative Y-Geschwindigkeit)
  acceleration = 1.0; // Individueller Wert für Gravitation nur für ThrowableObject

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.x = x; //je nachdem was man übergeben hat siehe world.class)
    this.y = y;
    this.width = 40;
    this.height = 50;
    this.throw();
  }

  throw() {
    this.speedY = 15; // Tempo nach oben
    this.applyGravity(); // Gravitation hinzugefügt, die alle 1/60 Sek ausgeführt wird
    this.throwInterval = setInterval(() => {
      this.x += 20; // Geschwindigkeit der Flasche
      if (this.y > 600) {
        // Flasche verschwindet außerhalb des Bildschirms
        clearInterval(this.throwInterval); // Intervall stoppen
      }
    }, 25); // 25 ms für glatte Bewegung
  }
}
