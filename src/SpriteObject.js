var SpaceCreatures = SpaceCreatures || {}

SpaceCreatures.SpriteObject = class SpaceCreaturesSpriteObject {
  constructor(x,y) {
    this.x = x ? x : 0
    this.y = y ? y : 0
    this.height = 0
    this.width = 0
    this.xSpeed = 0
    this.ySpeed = 0
    this.sprites = []
    this.sequences = []
    this.currentSequence = 0
    this.currentFrame = 0
    this.sequenceCounter = 0
  }
  get sprite() {
    this.move()

    let currentSequence = this.sequences[this.currentSequence]

    if (this.sequenceCounter >= currentSequence[this.currentFrame].duration) {
      this.currentFrame = ++this.currentFrame % currentSequence.length
      this.sequenceCounter = 0 
    }

    this.sequenceCounter++

    return this.sequences[this.currentSequence][this.currentFrame].frame
  }
  get position() { return {x:this.x, y:this.y} }
  move() {
    this.x += this.xSpeed 
    this.y += this.ySpeed 
  }
}

