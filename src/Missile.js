import SpaceCreaturesSpriteObject from "./SpriteObject.js" 

export default class SpaceCreaturesMissile extends SpaceCreaturesSpriteObject {
  constructor(x,y) {
    super(x-1,y)
    this.height = 10
    this.width = 3
    this.sprites.push('missile_001')
    this.sequences.push([{frame: this.sprites[0], duration:0}])
  }
  move(){
    this.y = this.y - 10
    if (this.y < -this.height) this.die()
  }
}

