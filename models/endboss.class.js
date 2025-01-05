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

  alert_sound = new Audio("audio/rooster2.mp3"); //Audio Objekt

  constructor() {
    super().loadImage(this.IMAGES_WALKING[1]); //Startbild laden, brauchen wir evtl. gar nicht
    this.isEndboss = true; // Spezielle Kennzeichnung für Endboss
    this.isAlert = false; // Standardmäßig nicht im Alert-Zustand
    this.loadImages(this.IMAGES_WALKING); //alle anderen Bilder laden.
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.isDeadAnimationPlaying = false; // Standard: Animation läuft nicht
    // this.statusBar = statusBar; // Statusbar des Endbosses
    this.x = 2500; //wie weit rechts er eingefügt wird.
    this.direction = -1; // -1 = nach links, 1 = nach rechts
    //Hitbox spezifische für Endboss
    this.collisionOffsetX = 40; // Etwas schmaler links/rechts, mehr =weiternachrechts
    this.collisionOffsetY = 70; // Oben etwas weniger, mehr=weiter runter
    this.collisionWidth = 295; // Breite der Hitbox
    this.collisionHeight = 360; // Höhe der Hitbox
  }

  animate() {
    const minX = 2200; // Linke Grenze
    const maxX = 2600; // Rechte Grenze
    if (this.isAlertAnimationPlaying || this.isDeadAnimationPlaying) {
      return; // Keine andere Animation starten, solange Alert oder Dead läuft
    }
    this.checkDeadInterval = setInterval(() => {
      if (this.isDead() && !this.isDeadAnimationPlaying) {
        console.log("Endboss ist tot. Starte Sterbeanimation.");
        this.deadEnemy(); // Sterbe-Animation starten
        clearInterval(this.checkDeadInterval); // Stoppe die Überprüfung endgültig
      }
    }, 100); // Überprüfung alle 100ms

    this.alertInterval = setInterval(() => {
      if (this.isCharacterClose() && !this.isAlert && !this.isDead()) {
        console.log("Alert wird aktiviert!");
        this.activateAlert(); // Aktiviere den Alert-Zustand
      } else if (!this.isCharacterClose() && this.isAlert && !this.isDead()) {
        console.log(
          "Charakter ist nicht mehr in der Nähe. Alert wird deaktiviert."
        );
        this.deactivateAlert(); // Deaktiviere den Alert-Zustand
      }
    }, 200); // Überprüfung alle 200ms

    // Bewegung des Bosses, läuft von rechts nach links.
    this.walkingInterval = setInterval(() => {
      if (!this.isDead() && !this.isHurt() && !this.isAlertAnimationPlaying) {
        // Bewegung nach links oder rechts
        if (this.direction === -1) {
          this.moveLeft();
          this.otherDirection = false; // Spiegeln aktivieren
        } else {
          this.moveRight();
          this.otherDirection = true; // Spiegeln deaktivieren
        }

        // Richtung wechseln, wenn Grenzen erreicht
        if (this.x <= minX) {
          this.direction = 1; // Richtung nach rechts ändern
        } else if (this.x >= maxX) {
          this.direction = -1; // Richtung nach links ändern
        }
      }
    }, 1000 / 60); // Bewegung alle 60 FPS

    // Geh-Animation des Bosses
    this.animationInterval = setInterval(() => {
      if (!this.isDead()) {
        this.playAnimation(this.IMAGES_WALKING); // Geh-Animation abspielen
      }
    }, 400); // Animation alle 400ms
  }

  isCharacterClose() {
    console.log("Character:", this.character);
    console.log("Endboss Position (x):", this.x);
    if (!this.character || typeof this.character.x === "undefined") {
      console.warn("Character oder seine Position ist nicht definiert!");
      return false; // Keine Nähe berechnen, wenn Character nicht existiert
    }
    const distance = Math.abs(this.character.x - this.x);
    console.log("Abstand zum Endboss:", distance);
    return Math.abs(this.character.x - this.x) < 300;
  }

  activateAlert() {
    console.log("Endboss ist alarmiert!");
    this.isAlert = true; // Setze den Alert-Zustand auf aktiv
    this.otherDirection = false; // Blickrichtung nach links setzen
    clearInterval(this.walkingInterval); // Nur Gehbewegung stoppen
    clearInterval(this.animationInterval); // Nur Geh-Animation stoppen
    this.startAlertAnimation(); // Starte die Alert-Animation
    this.alert_sound.play(); // Spiele den Alert-Sound ab
  }

  startAlertAnimation() {
    if (this.isAlertAnimationPlaying) return; // Verhindert doppelten Start
    this.isAlertAnimationPlaying = true; // Setzt den Status auf "läuft"
    console.log("Alert-Animation gestartet");
    this.currentImage = 0; // Start bei Bild 0

    const alertInterval = setInterval(() => {
      console.log("Zeige Alert-Bild:", this.currentImage);
      if (this.currentImage < this.IMAGES_ALERT.length) {
        this.img = this.imageCache[this.IMAGES_ALERT[this.currentImage]];
        this.currentImage++;
      } else {
        console.log("Alert-Animation beendet");
        clearInterval(alertInterval); // Stoppt das Intervall
        this.isAlertAnimationPlaying = false; // Setzt Status zurück
        // Der Alert-Zustand bleibt bestehen, bis `alertInterval` dies beendet
      }
    }, 150); // Zeitintervall für jedes Bild
  }

  deactivateAlert() {
    console.log(
      "Alert-Zustand deaktiviert. Normales Verhalten wird fortgesetzt."
    );
    this.isAlert = false; // Alert-Zustand deaktivieren
    this.isAlertAnimationPlaying = false; // Status zurücksetzen
    this.animate(); // Normales Verhalten (Bewegung/Animation) wieder starten
  }

  //Behalten, wenn Energie genauso abgezogen werden soll, wie beim Character (also 5 Pt.)
  // endbossHit() {
  //   console.log("Endboss getroffen!");
  //   console.log("EndbossEnergie vor dem Treffer:", this.energy); // Energie vor dem Treffer ausgeben
  //   this.hit(); // Methode ausführen, die die Energie reduziert
  //   console.log("EndbossEnergie nach dem Treffer:", this.energy); // Energie nach dem Treffer ausgeben

  //   if (this.isDead()) {
  //     console.log("Endboss ist tot, keine Hurt-Animation!");
  //     return; // Beende die Methode, wenn der Boss tot ist
  //   }
  //   this.startHurtAnimation(); // Abspielen der Hurt-Animation
  // }

  //nur zum Testen, damit schneller Energy abgezogen wird.
  endbossHit() {
    console.log("Endboss getroffen!");
    console.log("EndbossEnergie vor dem Treffer:", this.energy);

    if (this.energy === 0) {
      console.log("Endboss ist bereits tot!");
      return; // Keine weiteren Treffer, wenn der Endboss tot ist
    }

    const currentTime = new Date().getTime();
    if (currentTime - this.lastHit > 500) {
      // Zeit zwischen Treffern
      this.energy -= 20; // Ziehe 20 Lebenspunkte ab
      console.log("EndbossEnergie nach dem Treffer:", this.energy);

      if (this.energy <= 0) {
        this.energy = 0;
        console.log("Endboss ist tot, keine Hurt-Animation!");
        this.deadEnemy(); // Starte Sterbeanimation
      } else {
        this.lastHit = currentTime; // Aktualisiere den letzten Trefferzeitpunkt
        this.startHurtAnimation(); // Starte Hurt-Animation
      }
    }
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
    if (this.isDeadAnimationPlaying) {
      console.log("Sterbeanimation läuft bereits. Abbruch.");
      return; // Abbruch, wenn die Animation bereits läuft
    }
    console.log("deadEnemy() wird aufgerufen");

    // Deaktiviere den Alert-Zustand, falls er aktiv ist
    this.isAlert = false;
    this.isAlertAnimationPlaying = false;

    // Stoppe alle anderen Animationen und Bewegungen
    this.stopAnimation();

    // Starte die Sterbeanimation
    this.startDeadAnimation();

    // Markiere die Sterbeanimation als aktiv
    this.isDeadAnimationPlaying = true;
  }

  startDeadAnimation() {
    console.log("Sterbeanimation gestartet");

    // Stelle sicher, dass keine Alert-Animation läuft
    this.isAlert = false;
    this.isAlertAnimationPlaying = false;

    this.currentImage = 0; // Starte bei Bild 0
    const deadInterval = setInterval(() => {
      if (this.currentImage < this.IMAGES_DEAD.length) {
        this.img = this.imageCache[this.IMAGES_DEAD[this.currentImage]];
        this.currentImage++;
      } else {
        console.log("Sterbeanimation beendet");
        clearInterval(deadInterval); // Stoppe das Sterbeanimation-Intervall
        this.fallDown(); // Starte das Fallen
      }
    }, 150); // Zeitintervall für jedes Bild
  }

  fallDown() {
    const fallInterval = setInterval(() => {
      this.y += 5; // Endboss bewegt sich nach unten
      if (this.y > 720) {
        // Stoppe die Bewegung, wenn er aus dem Bild ist (z. B. Bildschirmhöhe 720px)
        clearInterval(fallInterval);
        console.log("Endboss ist aus dem Bild geflogen");
      }
    }, 50); // Bewegung alle 50ms
  }

  // Methode, um die Animation zu stoppen, wenn der Endboss getroffen wird
  stopAnimation() {
    clearInterval(this.walkingInterval);
    clearInterval(this.animationInterval);
    clearInterval(this.hurtInterval);
    clearInterval(this.alertInterval); // Stoppe den Alert-Prozess
    clearInterval(this.checkDeadInterval); // Stoppe den Todes-Check
    console.log("Alle laufenden Animationen und Intervalle gestoppt");
  }
}
