class StatusBarBottle extends DrawableObject {
  IMAGES_STATUSBOTTLE = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png", // 0
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png", // 5
  ];

  percentage = 100; //Anfangswert

  constructor() {
    super();
    this.loadImages(this.IMAGES_STATUSBOTTLE);
    this.x = 40;
    this.y = 0;
    this.width = 200;
    this.height = 55;
    this.setPercentage(100);
  }

  //Wenn sich Wert ändert, muss diese Methode ausgeführt werden, damit der neue Wert gespeichert wird.
  setPercentage(percentage) {
    this.percentage = percentage; // Wert von übergebenem percentage wird hier gespeichert
    let path = this.IMAGES_STATUSBOTTLE[this.resolveImageIndex()];
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
