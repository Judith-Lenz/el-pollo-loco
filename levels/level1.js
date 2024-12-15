//definiert wie viele Objekte auftauchen
//diese Objekte werden über die level Klasse an die World übergeben.
let level1; // Variable wird zunächst nur deklariert

function initLevel() {
  level1 = new Level(
    [
      new Bottle(200),
      new Bottle(200),
      new Bottle(200),
      new Bottle(200),
      new Bottle(200),
      new Bottle(200),
      new Bottle(200),
      new Bottle(200),
      new Bottle(300),
      new Bottle(400),
      new Bottle(550),
      new Bottle(700),
      new Bottle(900),
      new Bottle(1050),
      new Bottle(2000),
    ], //in die Klammer bei Bedarf die genaue Position einfügen
    [
      new Coin(250, 150),
      new Coin(400, 50),
      new Coin(750, 100),
      new Coin(880, 80),
      new Coin(920, 90),
      new Coin(1290, 10),
      new Coin(1550, 150),
      new Coin(1750, 50),
      new Coin(1850, 70),
      new Coin(1950, 60),
    ],
    [
      //enemies Parameter

      new ChickenNormal(),

      new ChickenSmall(1700),
      new Endboss(),
    ],
    [
      new Cloud("img/5_background/layers/4_clouds/1.png", 0, 50),
      new Cloud("img/5_background/layers/4_clouds/2.png", 500, 45),
      new Cloud("img/5_background/layers/4_clouds/1.png", 1100, 55),
      new Cloud("img/5_background/layers/4_clouds/2.png", 1650, 60),
      new Cloud("img/5_background/layers/4_clouds/1.png", 2200, 48),
      new Cloud("img/5_background/layers/4_clouds/2.png", 2800, 63),
    ],
    [
      new BackgroundObject("img/5_background/layers/air.png", -739),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -739),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        -739
      ),
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
}
