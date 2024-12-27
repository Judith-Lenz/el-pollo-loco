//Klsse ist wie ein BauPlan eines throwableObjects, aber nicht das Objekt selbst!!!
//Eine Instanz wäre dann ein konkretes Objekt, das mit dem Bauplan erstellt wurde. => new ThrowableObject
class ThrowableObject extends MovableObject {
  speedX = 20; //Flasche bewegt sich mit 20Pixeln pro Frame nach rechts
  speedY = 10; //Flasche beginnt mit der Aufwärtsbewegung (=> negative Y-Geschwindigkeit)
  acceleration = 1.0; // Individueller Wert für Gravitation nur für ThrowableObject
  //so schnell wird die Flasche wieder nach unten gezogen. Je höher, desto eher gehts wieder abwärts.S

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
    this.gravityEnabled = true; // Gravitation standardmäßig aktiv
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
    this.speedY = 10;
    this.applyGravity();
    this.throwInterval = setInterval(() => {
      this.x += this.speedX; // Geschwindigkeit der Flasche nach rechts
      if (this.y > 600 || !this.gravityEnabled) {
        // Stoppe, wenn die Flasche den Bildschirm verlässt oder die Gravitation deaktiviert wurde
        clearInterval(this.throwInterval);
      }
    }, 25);
  }

  startBottleAnimation() {
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.BOTTLE_FLY_IMAGES, 4);
    }, 1000 / 60);
  }

  stopCurrentAnimation() {
    clearInterval(this.animationInterval); // Stoppt das Animationsintervall
  }

  startSplashAnimation() {
    this.deactivateHitBox();

    this.currentImage = 0; // Anfangsbild der Splash-Animation
    const splashInterval = setInterval(() => {
      if (this.currentImage < this.BOTTLE_SPLASH_IMAGES.length) {
        this.img =
          this.imageCache[this.BOTTLE_SPLASH_IMAGES[this.currentImage]];
        this.currentImage++; // Nächstes Bild
      } else {
        clearInterval(splashInterval); // Intervall beenden
      }
    }, 100); // 100ms pro Bild, solange sollte die Verzögerung auch sein bis Flasche entfernt wird.
  }

  stopMovement() {
    this.speedX = 0;
    this.speedY = 0;
    clearInterval(this.throwInterval); // Bewegung vollständig stoppen
  }

  disableGravity() {
    this.gravityEnabled = false; // Gravitation deaktivieren
    clearInterval(this.gravityInterval); // Beendet das Intervall
    this.speedY = 0; // Setzt die vertikale Geschwindigkeit auf 0
  }

  deactivateHitBox() {
    this.collisionOffsetX = 0;
    this.collisionOffsetY = 0;
    this.collisionWidth = 0;
    this.collisionHeight = 0;
  }
}
