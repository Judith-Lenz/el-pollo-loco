class Character extends MovableObject {
  height = 310; //CAVE: wenn ich hier was ändere, muss ich Schwellenwert für Gravitation anpassen!
  width = 150;
  y = 120; //muss gleich sein wie y in aboveGround(), sonst fällt er ins Bild, anstatt zu stehen.
  speed = 10;

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING_UP = [
    // Absprung-Bilder
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    // "img/2_character_pepe/3_jump/J-36.png",
  ];

  IMAGES_JUMPING_DOWN = [
    // "img/2_character_pepe/3_jump/J-34.png", // Fallen-Bilder
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  world; //damit wir auf die Variablen aus world zugreifen können (siehe setWorld inn world), u.a. keyboard. Verweis auf die world-Instanz
  walking_sound = new Audio("audio/running2.mp3"); //Audio Objekt
  snoring_sound = new Audio("audio/snoring.mp3");
  hurting_sound = new Audio("audio/hurt.mp3");
  jumping_sound = new Audio("audio/jump2.mp3");
  gameOver_sound = new Audio("audio/game_over2.mp3");

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png"); //übergibt den Pfad an loadImage, das in movableObject aufgerufen wird.
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING); //das ganze Array wird als Parameter übergeben
    this.loadImages(this.IMAGES_JUMPING_UP);
    this.loadImages(this.IMAGES_JUMPING_DOWN);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.applyGravity();
    this.animate();
    // Hitbox spezifisch für den Character
    this.collisionOffsetX = 18; // Etwas schmaler links/rechts, mehr =weiternachrechts
    this.collisionOffsetY = 115; // Oben etwas weniger, mehr=weiter runter (115)
    this.collisionWidth = 100; // Breite der Hitbox (100)
    this.collisionHeight = 180; // Höhe der Hitbox (180)
  }

  //Bilder sollen immer ausgetauscht werden, die Funktion muss regelmäßig ausgeführt werden.
  // Sobald Character existiert, wird das hier jede Sekunde ausgeführt
  animate() {
    let idleStartTime = null; // Startzeit für die Idle-Animation
    const idleThreshold = 50000; // Zeit einstellen, bis er schnarcht
    // Speichere die Interval IDs, um sie später clearen zu können // <-- neu
    this.intervalID1 = setInterval(() => {
      // <-- neu

      this.walking_sound.pause(); // kein Sound, wenn er steht

      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;

        // Walking-Sound nur abspielen, wenn der Charakter am Boden ist
        if (!this.isAboveGround()) {
          if (this.walking_sound.paused) {
            this.walking_sound.play();
          }
        } else {
          this.walking_sound.pause();
        }
        idleStartTime = null; // Zurücksetzen, da Charakter nicht mehr idle ist
      }

      if (this.world.keyboard.LEFT && this.x >= -100) {
        this.moveLeft();
        this.otherDirection = true;

        // Walking-Sound nur abspielen, wenn der Charakter am Boden ist
        if (!this.isAboveGround()) {
          if (this.walking_sound.paused) {
            this.walking_sound.play();
          }
        } else {
          this.walking_sound.pause();
        }
        idleStartTime = null; // Zurücksetzen, da Charakter nicht mehr idle ist
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump(); // Springen
        idleStartTime = null; // Zurücksetzen, da Charakter nicht mehr idle ist
      }

      this.world.camera_x = -this.x + 100; // Kamera-Bewegung
    }, 1000 / 60);

    this.intervalID2 = setInterval(() => {
      this.snoring_sound.pause();

      if (this.isDead()) {
        this.handleCharacterDeathEvents();
        idleStartTime = null; // Zurücksetzen, da Charakter nicht mehr idle ist
        return; // Beende die weitere Animation, wenn Charakter tot ist
      } else if (this.isHurt()) {
        const currentTime = new Date().getTime();
        const hurtSoundCooldown = 1500; // Cooldown für den Sound (1 Sekunde), kann noch angepasst werden, falls sound zu oft wiederholt wird.
        // if (!this.lastHurtSoundTime) this.lastHurtSoundTime = 0; // <-- neu, falls nicht definiert, fraglich nötig?
        if (currentTime - this.lastHurtSoundTime > hurtSoundCooldown) {
          this.hurting_sound.play();
          this.lastHurtSoundTime = currentTime; // Zeitpunkt des letzten Sounds speichern
        }
        this.playAnimation(this.IMAGES_HURT);
        idleStartTime = null; // Zurücksetzen, da Charakter nicht mehr idle ist
      } else if (this.isAboveGround()) {
        if (this.speedY > 0) {
          this.playAnimation(this.IMAGES_JUMPING_UP, 4);
        } else {
          this.playAnimation(this.IMAGES_JUMPING_DOWN, 10);
        }
        idleStartTime = null; // Zurücksetzen, da Charakter nicht mehr idle ist
      } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
        idleStartTime = null; // Zurücksetzen, da Charakter nicht mehr idle ist
      } else {
        // Wenn der Charakter stillsteht (idle)
        if (!idleStartTime) {
          idleStartTime = Date.now(); // Idle-Zeit starten
        } else if (Date.now() - idleStartTime >= idleThreshold) {
          // Idle-Zeit erreicht
          this.playAnimation(this.IMAGES_LONG_IDLE, 4);
          this.snoring_sound.play();
          return; // Verhindert, dass die normale Idle-Animation überschrieben wird
        }
        // Normale Idle-Animation, wenn Idle-Zeit unter Threshold ist
        this.playAnimation(this.IMAGES_IDLE, 4);
      }
    }, 50);
  }

  jump() {
    this.speedY = 30;
    this.jumping_sound.play();
  }

  handleCharacterDeathEvents() {
    // Dead-Animation abspielen
    this.playAnimation(this.IMAGES_DEAD, 40, false);

    // Dauer der Dead-Animation berechnen
    const animationDuration = this.IMAGES_DEAD.length * 200; // Anzahl der Bilder * Frame-Dauer (100 ms bei Frame-Rate 10)

    // Aktionen nach der Animation ausführen
    setTimeout(() => {
      this.world.backgroundMusic.volume = 0; // Hintergrundmusik leise
      this.gameOver_sound.play(); // Game Over Sound abspielen
      document.getElementById("gameOverScreen").classList.remove("d-none"); // Game Over Bildschirm anzeigen
      this.stop(); // Intervalle und Animationen stoppen
    }, animationDuration); // Warten, bis die Dead-Animation fertig ist
  }

  // handleCharacterDeathEvents() {
  //   // Dead-Animation ohne Wiederholung abspielen, langsamer (frameRate = 10)
  //   this.playAnimation(this.IMAGES_DEAD, 10, false);
  //   this.world.backgroundMusic.volume = 0;
  //   this.gameOver_sound.play();
  //   document.getElementById("gameOverScreen").classList.remove("d-none");
  //   //einblenden gameOverScreen, d-none entfernen
  //   this.stop();
  //   //Character entfernen oder alles deaktivieren, sonst kann er noch laufen, springen usw.
  //   //   // 1. Hier könnte ein Sound abgespielt werden, z.B.:
  //   //   //death_sound.play();
  //   //   // 2. Hier kannst du eine Funktion aufrufen, um die Death-Animation abzuspielen.
  //   //   // Wenn deine isDead()-Methode die Animation schon abspielt, brauchst du das hier vielleicht nicht doppelt.
  //   //   // startDeathAnimation(character); // Beispielhafte Funktion.
  //   //   // 3. Nachdem die Animation fertig ist (du kannst z.B. ein setTimeout benutzen oder auf ein Event warten),
  //   //   // könntest du ein weiteres Timeout setzen, um nach 2 Sekunden den Game Over Screen anzuzeigen.
  //   //   // setTimeout(() => {
  //   //   //     showGameOverScreen();
  //   //   // }, 2000);
  //   //   // 4. Weitere Ereignisse, wie das Stoppen aller Hintergrundgeräusche, kannst du hier einfügen.
  //   //   // stopAllSoundsExceptDeathSound(character); // Beispielhafte Funktion.
  //   //   // 5. Du kannst hier auch noch Events für ein Leaderboard, Score-Anzeige oder ähnliches hinzufügen.
  //   //   // displayFinalScore(character.score); // Beispielhafte Funktion.
  // }

  stop() {
    // Intervalle stoppen
    clearInterval(this.intervalID1);
    clearInterval(this.intervalID2);
    // Sounds stoppen und zurücksetzen
    this.walking_sound.pause();
    this.walking_sound.currentTime = 0;

    this.snoring_sound.pause();
    this.snoring_sound.currentTime = 0;

    this.hurting_sound.pause();
    this.hurting_sound.currentTime = 0;

    this.jumping_sound.pause();
    this.jumping_sound.currentTime = 0;
  }
}
