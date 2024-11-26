class Coin extends MovableObject {
  height = 100;
  width = 100;
  y = 350;
  baseY = 350; // Grundposition
  floatDirection = 1; // 1: nach oben, -1: nach unten
  floatRange = 3; // Wie weit die Coins schweben
  floatSpeed = 0.2; // Geschwindigkeit der Bewegung

  collect_coin_sound = new Audio("audio/coins.mp3");

  constructor(x, y) {
    super().loadImage("img/8_coin/coin_1.png");
    // this.x = 200 + Math.random() * 500; // x-Wert zwischen 200 und 700
    // this.y = 100 + Math.random() * 200; // y-Wert zwischen 100 (MindestY Wert) und 300
    this.x = x; //bei Bedarf an der Stelle, die ich übergebe
    this.y = y; //bei Bedarf an der Stelle, die ich übergebe
    this.baseY = this.y; // Grundposition an den Startwert anpassen
    this.animateFloating();
    // Hitbox spezifisch für Münzen
    this.collisionOffsetX = 34;
    this.collisionOffsetY = 35;
    this.collisionWidth = 31;
    this.collisionHeight = 30;
  }

  animateFloating() {
    setInterval(() => {
      // Bewegt die Coins auf und ab
      this.y += this.floatDirection * this.floatSpeed;

      // Wenn der maximale Schweberadius erreicht ist, Richtung ändern
      if (
        this.y > this.baseY + this.floatRange ||
        this.y < this.baseY - this.floatRange
      ) {
        this.floatDirection *= -1;
      }
    }, 1000 / 60); // 60x pro Sekunde aktualisieren
  }

  collectCoin() {
    this.playSound();
    this.startAnimation();
    this.removeCoinFromWorld();
  }

  playSound() {
    console.log("Coin-Sound abgespielt");
    this.collect_coin_sound.play();
    // Hier kannst du den Soundcode einfügen
  }

  startAnimation() {
    console.log("Coin-Animation gestartet");
    // Animation für das Einsammeln
  }

  removeCoinFromWorld() {
    const index = world.level.coins.indexOf(this);
    if (index > -1) {
      world.level.coins.splice(index, 1);
    }
  }
}
