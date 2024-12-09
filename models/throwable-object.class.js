//Klsse ist wie ein BauPlan eines throwableObjects, aber nicht das Objekt selbst!!!
//Eine Instanz wäre dann ein konkretes Objekt, das mit dem Bauplan erstellt wurde. => new ThrowableObject
class ThrowableObject extends MovableObject {
  speedX = 20; //Flasche bewegt sich mit 20Pixeln pro Frame nach rechts
  speedY = 15; //Flasche beginnt mit der Aufwärtsbewegung (=> negative Y-Geschwindigkeit)
  acceleration = 1.0; // Individueller Wert für Gravitation nur für ThrowableObject

  BOTTLE_FLY_IMAGES = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  BOTTLE_SPLASH_IMAGES = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png"); //mit super () wird erstmal die übergeordnete Klasse aufgerufen.
    this.loadImages(this.BOTTLE_FLY_IMAGES);
    this.loadImages(this.BOTTLE_SPLASH_IMAGES);
    this.x = x; //je nachdem was man übergeben hat siehe world.class)
    this.y = y;
    this.width = 70;
    this.height = 65;
    this.collisionOffsetX = 10; // mehr =weiternachrechts
    this.collisionOffsetY = 5; // mehr=weiter runter
    this.collisionWidth = 50; // Breite der Hitbox
    this.collisionHeight = 55; // Höhe der Hitbox
    this.throw();
  }

  throw() {
    this.startBottleAnimation();
    this.speedY = 10; // Tempo nach oben
    this.applyGravity(); // Gravitation hinzugefügt, die alle 1/60 Sek ausgeführt wird
    this.throwInterval = setInterval(() => {
      this.x += 20; // Geschwindigkeit der Flasche
      if (this.y > 600) {
        // Flasche verschwindet außerhalb des Bildschirms
        clearInterval(this.throwInterval); // Intervall stoppen
      }
    }, 25); // 25 ms für glatte Bewegung
  }

  startBottleAnimation() {
    setInterval(() => {
      this.playAnimation(this.BOTTLE_FLY_IMAGES, 4);
    }, 1000 / 60);
  }
}
