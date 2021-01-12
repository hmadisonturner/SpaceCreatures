var SpaceCreatures = SpaceCreatures || {}

SpaceCreatures.Creature = class SpaceCreaturesCreature extends SpaceCreatures.SpriteObject{
  constructor(x,y) {
    super(x,y)
    this.xSpeed = 1
    this.yCounter = 0
    this.direction = 0
  }
  die() {
    let game = SpaceCreatures.game
    game.score++
    game.creatures.splice(game.creatures.indexOf(this),1)
  }
  move() {
    if (this.yCounter === this.height) {
      this.yCounter = 0
      this.ySpeed = 0
    }

    if ((this.x < 0) || (this.x + this.width >= SpaceCreatures.game.graphics.width)) {
      this.xSpeed = -this.xSpeed
      this.ySpeed = this.direction  
    }

    if ((this.y < 0) || (this.y + this.height >= SpaceCreatures.game.graphics.height)) {
      this.direction = -this.direction
      this.ySpeed = this.direction
    }

    if (this.ySpeed) this.yCounter++

    this.x += this.xSpeed 
    this.y += this.ySpeed 
  }
}

