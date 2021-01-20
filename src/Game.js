import SpaceCreaturesGraphics from "./Graphics.js"
import SpaceCreaturesAnimation from "./Animation.js"
import SpaceCreaturesCollision from "./Collision.js"
import SpaceCreaturesPlayer from "./Player.js"
import SpaceCreaturesMissile from "./Missile.js"
import SpaceCreaturesTeuthid from "./Teuthid.js"
import SpaceCreaturesMagentoid from "./Magentoid.js" 
import SpaceCreaturesLewloy from "./Lewloy.js" 
import SpaceCreaturesOcythe from "./Ocythe.js" 

export default class SpaceCreaturesGame {
  constructor() {
    this.frameCounter = 0
    this.graphics = new SpaceCreaturesGraphics()
    this.hiScore = localStorage.hiScore ? localStorage.hiScore : 0
    this.events = { 1 : () => this.start() }

    SpaceCreaturesAnimation.animate(()=>this.draw())
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
    const gameSize = [this.graphics.width, this.graphics.height]

    if (this.player) this.player.releaseControls()
    delete this.player

    this.player = new SpaceCreaturesPlayer(gameSize[0] / 2, 0, ...gameSize)
    this.player.y = gameSize[1] - this.player.height - 24
  }
  draw() {
    this.graphics.background()
    this.graphics.drawScores(this.score, this.nextOneUp, this.hiScore)

    if (this.player?.shot) {
      this.missiles.push(new SpaceCreaturesMissile(
        this.player.x + (this.player.width/2), 
        this.player.y, 
        this.graphics.width, 
        this.graphics.height
      ))
      
      this.player.shot = false
    }

    this.missiles?.forEach(missile => {
      this.creatures?.forEach(creature => { 
        if (SpaceCreaturesCollision.collide(missile, creature)) {
          missile.die()
          creature.die()
          this.score++
        }
      })
    })

    this.creatures?.forEach(creature => {
      if (SpaceCreaturesCollision.collide(creature, this.player)) {
        creature.die()
        this.die()
      }
    })

    this.missiles = this.missiles?.filter(missile => !missile.dead)
    this.creatures = this.creatures?.filter(creature => !creature.dead)

    this.missiles?.forEach(x => this.graphics.drawSprite(x.sprite, x.position))
    this.player ? this.graphics.drawSprite(this.player.sprite, this.player.position) : null
    this.lives ? this.graphics.drawLives(this.lives) : null
    this.creatures?.forEach((x)=>this.graphics.drawSprite(x.sprite, x.position))
    this.message ? this.graphics.drawMessage(this.message) : null
    this.errorMessage ? this.graphics.drawErrorMessage(this.errorMessage) : null
    this.events[this.frameCounter] ? this.events[this.frameCounter]() : null
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
    const gameSize = [this.graphics.width, this.graphics.height]
    for (let i=0; i<10; i++) { 
      this.creatures.push(new SpaceCreaturesTeuthid((24*i)+20, 30, ...gameSize))
      this.creatures.push(new SpaceCreaturesMagentoid((24*i)+20, 60, ...gameSize))
      this.creatures.push(new SpaceCreaturesLewloy((24*i)+24, 90, ...gameSize))
      this.creatures.push(new SpaceCreaturesOcythe(24*i+20, 120, ...gameSize))
    }
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

