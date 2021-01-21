import SpaceCreaturesSpriteObject from "./SpriteObject.js"
import SpaceCreaturesDirectionalPad from "./DirectionalPad.js"
import SpaceCreaturesButton from "./Button.js"
import SpaceCreaturesKeyboard from "./Keyboard.js"

export default class SpaceCreaturesPlayer extends SpaceCreaturesSpriteObject {
  constructor(x, y, constrainX, constrainY) {
    super(x, y, constrainX, constrainY)
    this.height = 23
    this.width = 23
    this.speed = 4
    this.shot = false

    this.sprites.push('player_002')
    this.sequences.push([{frame: this.sprites[0], duration:0}])

    this.touchPad = new SpaceCreaturesDirectionalPad(
      (x,y)=>this.go(x,y), 
      ()=>this.stop()
    )

    this.button = new SpaceCreaturesButton(()=>this.shoot())
    this.keyboard = new SpaceCreaturesKeyboard()
    this.keyboard.bind('ArrowLeft',()=>this.goLeft(), ()=>this.stopLeft())
    this.keyboard.bind('ArrowRight',()=>this.goRight(), ()=>this.stopRight())
    this.keyboard.bind('ArrowUp',()=>this.goUp(),()=>this.stopUp())
    this.keyboard.bind('ArrowDown',()=>this.goDown(),()=>this.stopDown())
    this.keyboard.bind(' ',()=>this.shoot())
}
  releaseControls() {
    this.touchPad.unbindAll()
    this.keyboard.unbindAll()
    this.button.unbindAll()
  }
  go(xFactor,yFactor) {
    this.xSpeed = this.speed*xFactor
    this.ySpeed = this.speed*yFactor
  }
  goLeft() {
    this.xSpeed = -this.speed
  }
  goRight() {
    this.xSpeed = this.speed
  }
  goUp() {
    this.ySpeed = -this.speed
  }
  goDown() {
    this.ySpeed = this.speed
  }
  stop() {
    this.xSpeed = this.ySpeed = 0
  }
  stopLeft() {
    if (this.xSpeed < 0) this.xSpeed = 0
  }
  stopRight() {
    if (this.xSpeed > 0) this.xSpeed = 0
  }
  stopUp() {
    if (this.ySpeed < 0) this.ySpeed = 0
  }
  stopDown() {
    if (this.ySpeed > 0) this.ySpeed = 0
  }
  move() {
    if (this.x + this.xSpeed < 0 || 
        this.x + this.xSpeed > this.constrainX - this.width) {
      this.xSpeed = 0
    }

    if (this.y + this.ySpeed < 0 || 
        this.y + this.ySpeed > this.constrainX - this.height) {
      this.ySpeed = 0
    }
    super.move()
  }
  shoot() {
    this.shot = true
  }
}

