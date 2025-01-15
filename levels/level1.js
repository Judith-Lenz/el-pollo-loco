/**
 * Initializes the first level of the game.
 * This level includes bottles, coins, enemies, clouds, and background objects.
 */
let level1

/**
 * Creates and initializes the first game level with predefined game elements.
 *
 * @function initLevel
 * @description Sets up the level with the following:
 * - Bottles at specific positions
 * - Coins with positions and values
 * - Enemies, including normal chickens, small chickens, and an end boss
 * - Clouds with specific images and positions
 * - Background layers for scenery
 */
function initLevel() {
  level1 = new Level(
    [
      new Bottle(100),
      new Bottle(150),
      new Bottle(190),
      new Bottle(550),
      new Bottle(600),
      new Bottle(800),
      new Bottle(1050),
      new Bottle(1100),
      new Bottle(1200),
      new Bottle(1300),
      new Bottle(1400),
      new Bottle(1500),
      new Bottle(1550),
      new Bottle(1650),
      new Bottle(1700),
      new Bottle(1750),
      new Bottle(1800),
      new Bottle(1900),
      new Bottle(2000),
      new Bottle(2050),
    ],
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
      new ChickenNormal(550),
      new ChickenNormal(750),
      new ChickenNormal(2000),
      new ChickenNormal(1050),
      new ChickenNormal(1150),
      new ChickenNormal(2600),
      new ChickenNormal(2850),
      new ChickenSmall(1000),
      new ChickenSmall(1500),
      new ChickenSmall(900),
      new ChickenSmall(1900),
      new ChickenSmall(1700),
      new ChickenSmall(4000),
      new ChickenSmall(4400),
      new ChickenSmall(3500),
      new ChickenSmall(3800),
      new ChickenSmall(2800),
      new ChickenSmall(2900),
      new ChickenSmall(3100),
      new ChickenSmall(3900),
      new ChickenSmall(5000),
      new ChickenSmall(5500),
      new Endboss(this),
    ],
    [
      new Cloud('img/5_background/layers/4_clouds/1.png', 0, 50),
      new Cloud('img/5_background/layers/4_clouds/2.png', 500, 45),
      new Cloud('img/5_background/layers/4_clouds/1.png', 1100, 55),
      new Cloud('img/5_background/layers/4_clouds/2.png', 1650, 60),
      new Cloud('img/5_background/layers/4_clouds/1.png', 2200, 48),
      new Cloud('img/5_background/layers/4_clouds/2.png', 2800, 63),
    ],
    [
      new BackgroundObject('img/5_background/layers/air.png', -739),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -739),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -739),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -739),

      new BackgroundObject('img/5_background/layers/air.png', 0),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

      new BackgroundObject('img/5_background/layers/air.png', 739),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 739),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 739),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 739),

      new BackgroundObject('img/5_background/layers/air.png', 739 * 2),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 739 * 2),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 739 * 2),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 739 * 2),

      new BackgroundObject('img/5_background/layers/air.png', 739 * 3),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 739 * 3),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 739 * 3),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 739 * 3),
    ]
  )
}
