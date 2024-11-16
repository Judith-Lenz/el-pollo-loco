class Coin extends MovableObject {
  height = 50;
  width = 50;
  y = 350;
  baseY = 350; // Grundposition
  floatDirection = 1; // 1: nach oben, -1: nach unten
  floatRange = 3; // Wie weit die Coins schweben
  floatSpeed = 0.2; // Geschwindigkeit der Bewegung

  constructor() {
    super().loadImage("img/8_coin/coin_1.png");
    this.x = 200 + Math.random() * 500;
    this.animateFloating();
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
}
