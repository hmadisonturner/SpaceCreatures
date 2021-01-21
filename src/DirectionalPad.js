import SpaceCreaturesControl from "./Control.js"

export default class SpaceCreaturesDirectionalPad extends SpaceCreaturesControl {
  constructor(goFunction, stopFunction) {
    super()
    if ('ontouchstart' in document.documentElement) {
      this.element = document.getElementById('pad_ctrl')
      this.element.style.visibility = 'visible'
      this.move = (event) => {
        event.preventDefault()
        const touch = event.changedTouches[0]
        const touchX = touch.clientX
        const touchY = touch.clientY
        const pad = this.element.getBoundingClientRect()
        const centerX = pad.x + (pad.width/2)
        const centerY = pad.y + (pad.height/2)
        const x = touchX - centerX
        const y = touchY - centerY
        const r = Math.sqrt(x**2 + y**2)
      	const xFactor = r===0 ? 0 : x/r
	      const yFactor = r===0 ? 0 : y/r

        goFunction(xFactor,yFactor)
      }
      super.bind(this.element, 'touchstart', event => this.move(event))
      super.bind(this.element, 'touchmove', event => this.move(event))
      super.bind(this.element, 'touchend', event => stopFunction())
    }
  }

}

