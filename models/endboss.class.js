class Endboss extends MovableObject {
  height = 450;
  width = 350;
  y = 0;
  speed = 1;

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

  alert_sound = new Audio("audio/rooster2.mp3");

  constructor() {
    super().loadImage(this.IMAGES_WALKING[1]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);

    this.isEndboss = true;
    this.x = 2500;
    this.direction = -1;

    // Neue State-Variable
    this.currentState = "idle"; // weitere States: "alert", "attack", "hurt", "dead"
    this.currentImageIndex = 0; // für Animationen

    this.frameCounterAlert = 0; // Für Alert
    this.frameCounterAttack = 0; // Für Attack
    this.frameCounterIdle = 0; // Für Idle
    this.frameCounterHurt = 0; // Für Hurt
    this.frameCounterDead = 0; // Für Dead
    this.frameCounterWalk = 0; // Für Walk
    // Hitbox
    this.collisionOffsetX = 40;
    this.collisionOffsetY = 70;
    this.collisionWidth = 295;
    this.collisionHeight = 360;

    this.lastHit = 0; // für Treffer-Logik
  }

  /**
   * Hier in `animate()` gibt es nur noch ein zentrales Intervall,
   * das alle Zustände im Auge behält.
   */
  animate() {
    const minX = 2200;
    const maxX = 2600;

    // Check, ob Boss tot ist (damit wir sein Dead-Verhalten regeln können)
    this.checkDeadInterval = setInterval(() => {
      if (this.isDead() && this.currentState !== "dead") {
        this.currentState = "dead";
      }
    }, 100);

    // Zentrales State-Intervall
    this.stateMachineInterval = setInterval(() => {
      this.evaluateState(minX, maxX);
    }, 16);
  }

  /**
   * In `evaluateState` entscheidest du je nach `this.currentState`,
   * was als Nächstes passieren soll.
   */
  evaluateState(minX, maxX) {
    switch (this.currentState) {
      case "idle":
        this.handleIdle(minX, maxX);
        break;

      case "alert":
        this.handleAlert();
        break;

      case "attack":
        this.handleAttack();
        break;

      case "hurt":
        this.handleHurt();
        break;

      case "dead":
        this.handleDead();
        break;

      default:
        console.warn("Unbekannter State:", this.currentState);
    }
  }

  /**
   * State: Idle (bzw. "Normalzustand")
   */
  handleIdle(minX, maxX) {
    this.frameCounterWalk++; // Zähle bei jedem evaluateState()-Aufruf hoch
    const FRAMES_TO_SKIP = 15; // z.B. 3 -> jedes 3. Mal Bilderwechsel
    if (this.frameCounterWalk >= FRAMES_TO_SKIP) {
      this.frameCounterWalk = 0;
      // Zuerst die Geh-Animation
      this.playAnimation(this.IMAGES_WALKING);

      // Bewegung nach links oder rechts
      this.moveBoss(minX, maxX);

      // Check, ob Character nahe ist
      if (this.isCharacterClose() && !this.isDead()) {
        // Dann gehen wir in den Alert-Zustand
        this.currentState = "alert";
        this.currentImageIndex = 0;
        this.alert_sound.play();
      }
    }
  }

  /**
   * State: Alert
   */
  handleAlert() {
    this.frameCounterAlert++; // Zähle bei jedem evaluateState()-Aufruf hoch
    const FRAMES_TO_SKIP = 13; // z.B. 3 -> jedes 3. Mal Bilderwechsel
    if (this.frameCounterAlert >= FRAMES_TO_SKIP) {
      this.frameCounterAlert = 0;
      // Alert-Animation
      if (this.currentImageIndex < this.IMAGES_ALERT.length) {
        this.img = this.imageCache[this.IMAGES_ALERT[this.currentImageIndex]];
        this.currentImageIndex++;
      } else {
        // Fertig mit Alert-Animation -> Angriff starten
        this.currentState = "attack";
        this.currentImageIndex = 0;
      }
    }

    // Falls der Character NICHT mehr nah ist, gehen wir zurück zu "idle"
    if (!this.isCharacterClose() && !this.isDead()) {
      this.currentState = "idle";
      this.currentImageIndex = 0;
    }
  }

  /**
   * State: Attack
   */
  handleAttack() {
    this.frameCounterAttack++; // Zähle bei jedem evaluateState()-Aufruf hoch
    const FRAMES_TO_SKIP = 12; // z.B. 3 -> jedes 3. Mal Bilderwechsel
    if (this.frameCounterAttack >= FRAMES_TO_SKIP) {
      this.frameCounterAttack = 0;
      if (this.currentImageIndex < this.IMAGES_ATTACK.length) {
        this.img = this.imageCache[this.IMAGES_ATTACK[this.currentImageIndex]];
        this.currentImageIndex++;
      } else {
        // Angriff abgeschlossen
        // Falls Character immer noch nah -> wieder Alert
        if (this.isCharacterClose() && !this.isDead()) {
          this.currentState = "alert";
        } else {
          this.currentState = "idle";
        }
        this.currentImageIndex = 0;
      }
    }
  }

  /**
   * State: Hurt
   */
  handleHurt() {
    this.frameCounterHurt++; // Zähle bei jedem evaluateState()-Aufruf hoch
    const FRAMES_TO_SKIP = 11; // z.B. 3 -> jedes 3. Mal Bilderwechsel
    if (this.frameCounterHurt >= FRAMES_TO_SKIP) {
      this.frameCounterHurt = 0;
      // Hurt-Animation
      if (this.currentImageIndex < this.IMAGES_HURT.length) {
        this.img = this.imageCache[this.IMAGES_HURT[this.currentImageIndex]];
        this.currentImageIndex++;
      } else {
        // Nach "Hurt" wieder gucken, ob Character nah ist
        if (this.isCharacterClose() && !this.isDead()) {
          this.currentState = "alert";
        } else {
          this.currentState = "idle";
        }
        this.currentImageIndex = 0;
      }
    }
  }

  /**
   * State: Dead
   */
  handleDead() {
    this.frameCounterDead++; // Zähle bei jedem evaluateState()-Aufruf hoch
    const FRAMES_TO_SKIP = 5; // z.B. 3 -> jedes 3. Mal Bilderwechsel
    if (this.frameCounterDead >= FRAMES_TO_SKIP) {
      this.frameCounterDead = 0;
      // Wenn Sterbeanimation noch nicht abgeschlossen ist
      if (this.currentImageIndex < this.IMAGES_DEAD.length) {
        this.img = this.imageCache[this.IMAGES_DEAD[this.currentImageIndex]];
        this.currentImageIndex++;
      } else {
        // Wenn durch mit der Animation -> fallen lassen
        this.fallDown();
      }
    }
  }

  /**
   * Diese Methode übernehmen wir größtenteils aus deinem Code.
   * Bewegung: von rechts nach links, bzw. Richtungswechsel an Grenzen.
   */
  moveBoss(minX, maxX) {
    // Nur wenn Boss nicht tot und nicht hurt
    if (!this.isDead() && this.currentState !== "hurt") {
      if (this.direction === -1) {
        this.moveLeft();
        this.otherDirection = false;
      } else {
        this.moveRight();
        this.otherDirection = true;
      }
      // Richtung wechseln
      if (this.x <= minX) {
        this.direction = 1;
      } else if (this.x >= maxX) {
        this.direction = -1;
      }
    }
  }

  /**
   * isCharacterClose() bleibt unverändert
   */
  isCharacterClose() {
    if (!this.character || typeof this.character.x === "undefined") {
      console.warn("Character oder Position nicht definiert!");
      return false;
    }
    const distance = Math.abs(this.character.x - this.x);
    return distance < 300;
  }

  /**
   * Hit-Logik bleibt ähnlich,
   * ABER wir setzen am Ende den State auf "hurt".
   */
  endbossHit() {
    if (this.currentState === "attack") {
      console.log("Endboss ist im Angriff. Treffer ignoriert.");
      return;
    }
    console.log("Endboss getroffen!");
    console.log("EndbossEnergie vor dem Treffer:", this.energy);

    if (this.energy === 0) {
      console.log("Endboss ist bereits tot!");
      return;
    }

    const currentTime = new Date().getTime();
    if (currentTime - this.lastHit > 500) {
      this.energy -= 20;
      console.log("EndbossEnergie nach dem Treffer:", this.energy);

      if (this.energy <= 0) {
        this.energy = 0;
        this.currentImageIndex = 0;
        this.frameCounterDead = 0;
        this.currentState = "dead";
      } else {
        this.lastHit = currentTime;
        // State auf "hurt" wechseln
        this.currentState = "hurt";
        this.currentImageIndex = 0;
      }
    }
  }

  /**
   * Deine Fall-Logik (nach dead)
   */
  fallDown() {
    if (this.hasFallen) {
      return; // Abbruch, wenn wir schon gefallen sind
    }
    this.hasFallen = true;

    let fallInterval = setInterval(() => {
      this.y += 5;
      if (this.y > 720) {
        clearInterval(fallInterval);
        console.log("Endboss ist aus dem Bild geflogen");
      }
    }, 50);
  }

  /**
   * isDead() kannst du so lassen wie bisher,
   * oder du sagst: "dead" wenn energy == 0
   */
  isDead() {
    return this.energy <= 0;
  }

  /**
   * Stoppe ggf. alle alten Intervalle beim Tod,
   * falls du da etwas aufräumen willst.
   * Oder du verwendest nur noch das `stateMachineInterval`.
   */
  stopAnimation() {
    clearInterval(this.stateMachineInterval);
    clearInterval(this.checkDeadInterval);
    console.log("Alle laufenden Animationen und Intervalle gestoppt");
  }
}
