import SpaceCreaturesControl from "./Control.js"

export default class SpaceCreaturesDirectionalPad extends SpaceCreaturesControl {
  constructor(goFunction, stopFunction) {
    super()
    if ('ontouchstart' in document.documentElement) {
      this.element = document.getElementById('pad_ctrl')
      this.element.style.visibility = 'visible'
      this.move = (event) => {
            event.preventDefault()
	    //event.stopPropogation()
            let touch = event.changedTouches[0]
            let touchX = touch.clientX
            let touchY = touch.clientY
    //  let element = document.getElementById('pad_ctrl')
            let pad = this.element.getBoundingClientRect()
            let centerX = pad.x + (pad.width/2)
            let centerY = pad.y + (pad.height/2)
            let x = touchX - centerX
            let y = touchY - centerY
            let r = Math.sqrt(x**2 + y**2)
	    let xFactor = r===0 ? 0 : x/r
	    let yFactor = r===0 ? 0 : y/r

            //let theta = Math.atan(y/x)
            // r = sqrt(x^2 + y^2)
            // theta = Math.atan(y/x)
            //SpaceCreatures.game.message = '' + x + ' ' + y + ' ' + speed
            goFunction(xFactor,yFactor)
      }
      super.bind(this.element, 'touchstart', event => this.move(event))
      super.bind(this.element, 'touchmove', event => this.move(event))
      super.bind(this.element, 'touchend', event => stopFunction())
    }
  }

}

