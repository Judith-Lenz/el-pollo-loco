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
    // Animationen
    this.animationInterval = setInterval(() => {
      if (!this.isDead) {
        if (this.isHurt) {
          this.playAnimation(this.IMAGES_HURT, 20); // Wenn verletzt, spiele Hurt-Animation
        } else {
          this.playAnimation(this.IMAGES_WALKING); // Ansonsten normale Geh-Animation
        }
      }
    }, 400);
  }

  endbossHit() {
    console.log("Endboss getroffen!");
    this.isHurt = true; // Setze den Endboss in den "Hurt"-Zustand
    this.playHurtAnimation(); // Neue Methode zum Abspielen der Hurt-Animation
    // Verzögerung für die Hurt-Animation
    setTimeout(() => {
      this.isHurt = false; // Setze den Zustand nach einiger Zeit zurück
    }, this.IMAGES_HURT.length * 200); // Dauer der Hurt-Animation (1200ms pro Bild)
  }

  playHurtAnimation() {
    // Hier wird die Verletzungsanimation abgespielt
    this.playAnimation(this.IMAGES_HURT, 1); // IMAGES_HURT enthält die Bilder für die verletzte Animation
  }

  // takeDamage(amount) {
  //   if (!this.isDead) {
  //     this.health -= amount;
  //     if (this.health <= 0) {
  //       this.health = 0;
  //       this.die();
  //     }
  //     // Statusbar aktualisieren
  //     this.statusBar.setPercentage((this.health / 100) * 100);
  //   }
  // }

  // die() {
  //   this.isDead = true;
  //   clearInterval(this.walkingInterval);
  //   clearInterval(this.animationInterval);
  //   this.playAnimation(this.IMAGES_DEAD); // Abspielen der "Tot"-Animation
  //   console.log("Endboss besiegt!");
  // }

  deadEnemy() {
    this.isDead = true; // Setze den Status auf "tot", daher stoppt die animation.
    console.log("Endboss besiegt!");
    stopAnimation();
    this.playAnimation(this.IMAGES_DEAD); // Abspielen der "Tot"-Animation
    // Hier kannst du weitere Aktionen ergänzen, z. B. Animationen oder Sounds
  }

  // Methode, um die Animation zu stoppen, wenn der Endboss getroffen wird
  stopAnimation() {
    clearInterval(this.walkingInterval); // Stoppe das Intervall für die Bewegung
    clearInterval(this.animationInterval); // Stoppe das Intervall für die Animation
  }
}
