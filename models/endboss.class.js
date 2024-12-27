class Endboss extends MovableObject {
  height = 450;
  width = 350;
  y = 0; //wo genau es eingefügt wird, also welche Höhe
  // health = 100; // Startwert für Lebenspunkte

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  isDead = false; // Neuer Zustand: Ist der Feind tot?
  isHurt = false; // Hurt-Status des Endbosses

  constructor() {
    super().loadImage(this.IMAGES_WALKING[1]); //Startbild laden, brauchen wir evtl. gar nicht
    this.isEndboss = true; // Spezielle Kennzeichnung für Endboss
    this.loadImages(this.IMAGES_WALKING); //alle anderen Bilder laden.
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
    // this.statusBar = statusBar; // Statusbar des Endbosses
    this.x = 2500; //wie weit rechts er eingefügt wird.
    //Hitbox spezifische für Endboss
    this.collisionOffsetX = 40; // Etwas schmaler links/rechts, mehr =weiternachrechts
    this.collisionOffsetY = 70; // Oben etwas weniger, mehr=weiter runter
    this.collisionWidth = 295; // Breite der Hitbox
    this.collisionHeight = 360; // Höhe der Hitbox
  }

  animate() {
    this.walkingInterval = setInterval(() => {
      if (!this.isDead && !this.isHurt) this.moveLeft(); // Nur bewegen, wenn nicht verletzt
    }, 1000 / 60); //Geschwindigkeit mit der sich Boss nach links bewegt.

    this.animationInterval = setInterval(() => {
      if (!this.isDead) this.playAnimation(this.IMAGES_WALKING); // Ansonsten normale Geh-Animation
    }, 400);
  }

  endbossHit() {
    console.log("Endboss getroffen!");
    console.log("EndbossEnergie vor dem Treffer:", this.energy); // Energie vor dem Treffer ausgeben
    this.hit(); // Methode ausführen, die die Energie reduziert
    console.log("EndbossEnergie nach dem Treffer:", this.energy); // Energie nach dem Treffer ausgeben
    this.isHurt = true; // Setze den Endboss in den "Hurt"-Zustand, dann stoppt er.
    this.startHurtAnimation(); // Neue Methode zum Abspielen der Hurt-Animation
    // this.statusBarEndboss.setPercentage(this.energy);
  }

  startHurtAnimation() {
    this.currentImage = 0; // Start bei Bild 0
    const hurtInterval = setInterval(() => {
      if (this.currentImage < this.IMAGES_HURT.length) {
        // Nächstes Bild aus dem Array laden
        this.img = this.imageCache[this.IMAGES_HURT[this.currentImage]];
        this.currentImage++;
      } else {
        // Intervall stoppen, wenn alle Bilder durchlaufen sind
        clearInterval(hurtInterval);
      }
    }, 150); // Zeitintervall pro Bild (z. B. 100ms)
  }

  deadEnemy() {
    this.isDead = true; // Setze den Status auf "tot", daher stoppt die animation.
    console.log("Endboss besiegt!");
    stopAnimation();
    startDeadAnimation();
    // Hier kannst du weitere Aktionen ergänzen, z. B. Animationen oder Sounds
  }

  startDeadAnimation() {
    this.currentImage = 0; // Start bei Bild 0
    const deadInterval = setInterval(() => {
      if (this.currentImage < this.IMAGES_DEAD.length) {
        // Nächstes Bild aus dem Array laden
        this.img = this.imageCache[this.IMAGES_DEAD[this.currentImage]];
        this.currentImage++;
      } else {
        // Intervall stoppen, wenn alle Bilder durchlaufen sind
        clearInterval(deadInterval);
      }
    }, 150); // Zeitintervall pro Bild (z. B. 100ms)
  }

  // Methode, um die Animation zu stoppen, wenn der Endboss getroffen wird
  stopAnimation() {
    clearInterval(this.walkingInterval); // Stoppe das Intervall für die Bewegung
    clearInterval(this.animationInterval); // Stoppe das Intervall für die Animation
  }
}
