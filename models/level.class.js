/**
 * Represents a level in the game with various objects and enemies.
 */
class Level {
  enemies
  clouds
  backgroundObjects
  coins
  bottles

  level_end_x = 2300

  /**
   * Creates a new Level instance.
   */
  constructor(bottles, coins, enemies, clouds, backgroundObjects) {
    this.bottles = bottles
    this.coins = coins
    this.enemies = enemies
    this.clouds = clouds
    this.backgroundObjects = backgroundObjects
  }
}
