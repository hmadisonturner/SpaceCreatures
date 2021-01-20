import SpaceCreaturesSpriteObject from "./SpriteObject.js"

export default class SpaceCreaturesCreature extends SpaceCreaturesSpriteObject{
  constructor(x, y, constrainX, constrainY) {
    super(x, y, constrainX, constrainY)
    this.xSpeed = 1
    this.yCounter = 0
    this.direction = 0
  }
  move() {
    if (this.yCounter === this.height) {
      this.yCounter = 0
      this.ySpeed = 0
    }

    if ((this.x < 0) || (this.x + this.width >= this.constrainX)) {
      this.xSpeed = -this.xSpeed
      this.ySpeed = this.direction  
    }

    if ((this.y < 0) || (this.y + this.height >= this.constrainY)) {
      this.direction = -this.direction
      this.ySpeed = this.direction
    }

    if (this.ySpeed) this.yCounter++

    this.x += this.xSpeed 
    this.y += this.ySpeed 
  }
}

