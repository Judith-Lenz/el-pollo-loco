class Level {
  enemies;
  clouds;
  backgroundObjects;
  coins;
  bottles;

  level_end_x = 2300;

  //hier werden die Objekte aus level1 übergebeben
  constructor(bottles, coins, enemies, clouds, backgroundObjects) {
    this.bottles = bottles;
    this.coins = coins;
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
  }
}
