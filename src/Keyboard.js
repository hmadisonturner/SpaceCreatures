var SpaceCreatures = SpaceCreatures || {}

SpaceCreatures.Keyboard = class SpaceCreaturesKeyboard extends SpaceCreatures.Control {
  constructor() {
    super()
    this.keys = {}

    super.bind(document,'keydown', (event) => {
      if (event.repeat) return
      if (this.keys[event.key]) {
        if (this.keys[event.key][0]) this.keys[event.key][0]()
      }
      event.preventDefault()
    })

    super.bind(document,'keyup', (event) => {
      if (this.keys[event.key]) {
        if (this.keys[event.key][1]) this.keys[event.key][1]()
      }
      event.preventDefault()
    })
  }
  bind(key,keyDownHandler,keyUpHandler) {
    this.keys[key] = [ keyDownHandler, keyUpHandler ]
  }
}
