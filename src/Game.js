var SpaceCreatures = SpaceCreatures || {}

SpaceCreatures.Game = class SpaceCreaturesGame {
  constructor() {
    this.frameCounter = 0
    this.graphics = new SpaceCreatures.Graphics()
    this.graphicsLibrary = new SpaceCreatures.GraphicsLibrary()
    this.hiScore = localStorage.hiScore ? localStorage.hiScore : 0
    this.events = { 1 : () => this.start() }

    SpaceCreatures.Animation.animate(()=>this.draw())
  }
  initGame () {
    this.initPlayer()
    this.level = 1
    this.score = 0
    this.lives = 0
    this.nextOneUp = 99
    this.initLevel()
  }
  initLevel() {
    this.player.x = this.player.y = -100
    this.creatures = []
    this.missiles = []
    this.explosions = []
    this.message = ''
    this.events = {}
  }
  initPlayer() {
    if (this.player) this.player.releaseControls()
    delete this.player
    this.player = new SpaceCreatures.Player()
    this.player.x = (this.graphics.width/2) - (this.player.width/2)
    this.player.y = this.graphics.height - this.player.height - 24 
  }
  draw() {
    this.graphics.background()
    if (this.score || this.nextOneUp || this.hiScore) this.graphics.drawScores(this.score, this.nextOneUp, this.hiScore)
    if (this.missiles) this.missiles.forEach((x)=>this.graphics.drawSprite(x.sprite, x.position))
    if (this.player) this.graphics.drawSprite(this.player.sprite, this.player.position)
    if (this.lives) this.graphics.drawLives(this.lives)
    if (this.creatures) this.creatures.forEach((x)=>this.graphics.drawSprite(x.sprite, x.position))
    if (this.message) this.graphics.drawMessage(this.message)
    if (this.errorMessage) this.graphics.drawErrorMessage(this.errorMessage)
    if (this.events[this.frameCounter]) this.events[this.frameCounter]()
    this.frameCounter++
  }
  nextLevel () {
    this.initLevel()
    this.level++
    this.message = 'Level ' + this.level
    this.events[this.frameCounter + 100] = () => {this.levelOne()}
  }
  over() {
    if (this.score >= this.hiScore) localStorage.hiScore = this.score
    this.initGame()
    this.message = 'GAME OVER'
    this.events[this.frameCounter + 100] = () => {this.start()}
  }
  die() {
    if (this.lives===0) this.over()
    else {
      this.initPlayer()
      this.lives--
    }
  }
  start() {
    this.initGame()
    this.message = 'Start!'
    this.events[this.frameCounter + 100] = () => {this.levelOne()}
  }
  levelOne() {
    this.initLevel()
    this.initPlayer()
    for (let i=0; i<10; i++) { this.creatures.push(new SpaceCreatures.Teuthid((24*i)+20, 30))}
    for (let i=0; i<10; i++) { this.creatures.push(new SpaceCreatures.Magentoid((24*i)+20, 60))}
    for (let i=0; i<10; i++) { this.creatures.push(new SpaceCreatures.Lewloy((24*i)+24, 90))}
    for (let i=0; i<10; i++) { this.creatures.push(new SpaceCreatures.Ocythe(24*i+20, 120))}
    this.levelLoop()
  }
  levelLoop() {
    this.events[this.frameCounter + 1] = () => { 
      if (this.score >= this.nextOneUp) this.oneUp()
      if (this.score > this.hiScore) this.hiScore = this.score
      if (this.creatures.length === 0) this.nextLevel()
      else this.levelLoop() 
    }
  }
  oneUp() {
    this.nextOneUp += Math.floor(this.nextOneUp*1.6) 
    this.lives++
  }
}

