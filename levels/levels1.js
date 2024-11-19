//definiert wie viele Objekte auftauchen
const level1 = new Level(
  [new Salsa(), new Salsa(), new Salsa(), new Salsa()],
  [new Coin(), new Coin()],
  [
    //enemies Parameter
    new ChickenSmall(),
    new ChickenSmall(),
    new ChickenSmall(),
    new ChickenNormal(),
    new Endboss(),
  ],
  [
    new Cloud("img/5_background/layers/4_clouds/1.png"),
    new Cloud("img/5_background/layers/4_clouds/2.png"),
  ],
  [
    new BackgroundObject("img/5_background/layers/air.png", -739),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -739),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -739),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -739),

    new BackgroundObject("img/5_background/layers/air.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

    new BackgroundObject("img/5_background/layers/air.png", 739),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 739),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 739),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 739),

    new BackgroundObject("img/5_background/layers/air.png", 739 * 2),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/1.png",
      739 * 2
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/1.png",
      739 * 2
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/1.png",
      739 * 2
    ),

    new BackgroundObject("img/5_background/layers/air.png", 739 * 3),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/2.png",
      739 * 3
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      739 * 3
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      739 * 3
    ),
  ]
);
