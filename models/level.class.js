class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  salsas;

  level_end_x = 2300;

  constructor(salsas, coins, enemies, clouds, backgroundObjects) {
    this.salsas = salsas;
    this.coins = coins;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
