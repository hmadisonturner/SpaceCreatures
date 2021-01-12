var SpaceCreatures = SpaceCreatures || {}

SpaceCreatures.Player = class SpaceCreaturesPlayer extends SpaceCreatures.SpriteObject {
  constructor(x,y) {
    super(x,y)
    this.height = 23
    this.width = 23
    this.speed = 4

    let image = SpaceCreatures.game.graphicsLibrary.player_002

    this.sprites.push(image)
    this.sequences.push([{frame: this.sprites[0], duration:0}])

    this.touchPad = new SpaceCreatures.DirectionalPad((x,y)=>this.go(x,y), ()=>this.stop())
    this.button = new SpaceCreatures.Button(()=>this.shoot())
    this.keyboard = new SpaceCreatures.Keyboard()
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
    if (this.x + this.xSpeed < 0 || this.x + this.xSpeed > SpaceCreatures.game.graphics.width - this.width) {
      this.xSpeed = 0
    }
    if (this.y + this.ySpeed < 0 || this.y + this.ySpeed > SpaceCreatures.game.graphics.height - this.height) {
      this.ySpeed = 0
    }
    super.move()
    let creatures = SpaceCreatures.game.creatures
    for (let i=0; i<creatures.length; i++) {
      if(SpaceCreatures.Collision.collide(creatures[i],this)){
	this.die()
      }
    }
//    if (this.y<-this.height) this.die()

  }
  shoot() {
    SpaceCreatures.game.missiles.push(new SpaceCreatures.Missile(this.x+this.width/2,this.y))
  }
  die() {
    SpaceCreatures.game.die()
  }
}

