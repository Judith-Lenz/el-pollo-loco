class Bottle extends MovableObject {
  height = 75
  width = 75
  y = 355

  collect_bottle_sound = new Audio('audio/collect_pop2.mp3')

  BOTTLE__GROUND_IMAGES = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
  ]

  constructor(x) {
    super()
    const randomIndex = Math.floor(Math.random() * this.BOTTLE__GROUND_IMAGES.length)
    this.loadImage(this.BOTTLE__GROUND_IMAGES[randomIndex])
    // this.x = 200 + Math.random() * 500; //an zufälliger Stelle
    this.x = x
    this.collisionOffsetX = 26
    this.collisionOffsetY = 12
    this.collisionWidth = 32
    this.collisionHeight = 55
  }

  collectBottle() {
    this.playBottleSound()
    this.removeBottleFromWorld()
  }

  playBottleSound() {
    console.log('Bottle-Sound abgespielt')
    this.collect_bottle_sound.play()
  }

  removeBottleFromWorld() {
    const index = world.level.bottles.indexOf(this)
    if (index > -1) {
      world.level.bottles.splice(index, 1)
    }
  }
}
