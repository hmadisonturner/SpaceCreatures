var SpaceCreatures = SpaceCreatures || {}

SpaceCreatures.Graphics = class SpaceCreaturesGraphics {
  constructor() {
    
    let containerDiv = document.getElementById('cvs')
    this.canvas = containerDiv.appendChild(document.createElement('canvas'))
    this.context = this.canvas.getContext('2d')
    this.context.imageSmoothingEnabled = false
    this.width = this.height = 500

    this.size = (event) => {
      this.canvas.width = this.canvas.height = Math.min(window.innerWidth, window.innerHeight)
      this.context.scale(this.canvas.width/this.width, this.canvas.height/this.height)
      let pad = document.getElementById('pad_ctrl')
      let btn = document.getElementById('button_ctrl')
      btn.style.top = pad.style.top = window.innerHeight - pad.clientHeight - (0.05*window.innerHeight)
      
    }

    this.size()
    this.context.imageSmoothingEnabled = false

    window.addEventListener('resize',this.size)
  }
  drawErrorMessage(text) {
    this.context.fillStyle = 'red'
    this.context.font = '16px monospace'
    this.context.textAlign = 'left'
    this.context.textBaseline = 'alphabetic'
    this.context.fillText(text,0,0)
  }
  drawMessage (text) {
    this.context.fillStyle = 'white'
    this.context.font = '36px monospace'
    this.context.textAlign = 'center'
    this.context.textBaseline = 'middle'
    this.context.fillText(text,this.width/2,this.height/2)
  }
  drawScores (current, oneUp, hi) {
    this.context.fillStyle = '#ccc'
    this.context.font = '16px monospace'
    this.context.textBaseline = 'top'
    if (current !== undefined) {
      this.context.textAlign = 'left'
      this.context.fillText('SCORE' + pad(current),2,2)
    }
    if (oneUp !== undefined) {
      this.context.textAlign = 'right'
      this.context.fillText('1UP' + pad(oneUp),this.width-2,2)
    }
    if (hi !== undefined) {
      this.context.textAlign = 'center'
      this.context.fillText('HI' + pad(hi),this.width/2,2)
    }
    function pad(num) {
      let str = '' + num 
      while (str.length < 9) str = '0' + str
      return str
    }
  }
  drawLives(num) {
    let x = 0
    let y = this.height - 24
    while (num > 0) {
      this.context.drawImage(SpaceCreatures.game.graphicsLibrary.player_002, x, y)
      x += 24
      num--
    }
  }
  background() {
    this.context.fillStyle = 'black'
    this.context.fillRect(0,0,this.width,this.height)
  }
  drawSprite(sprite, position) {
      this.context.drawImage(sprite,position.x,position.y)
  }
}

