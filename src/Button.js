import SpaceCreaturesControl from "./Control.js"

export default class SpaceCreaturesButton extends SpaceCreaturesControl {
  constructor(handlerFunction) {
    super()
    if ('ontouchstart' in document.documentElement) {
      const shootButtonDiv = document.getElementById('button_ctrl')
      shootButtonDiv.style.visibility = 'visible'

      const shootButton = document.getElementById('button_shoot')
      super.bind(shootButton,'touchstart', event => {
        event.preventDefault() 
        handlerFunction() 
        event.stopPropagation()
      })
    }
  }
}

