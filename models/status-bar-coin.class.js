class StatusBarCoin extends DrawableObject {
  IMAGES_STATUSCOIN = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png", // 0
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png", //5
  ];

  percentage = 100; //Anfangswert

  constructor() {
    super();
    this.loadImages(this.IMAGES_STATUSCOIN);
    this.x = 40;
    this.y = 85;
    this.width = 200;
    this.height = 55;
    this.setPercentage(100);
  }

  //Wenn sich Wert ändert, muss diese Methode ausgeführt werden, damit der neue Wert gespeichert wird.
  setPercentage(percentage) {
    this.percentage = percentage; // Wert von übergebenem percentage wird hier gespeichert
    let path = this.IMAGES_STATUSCOIN[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  //gibt Index vom Bild im Array zurück
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
