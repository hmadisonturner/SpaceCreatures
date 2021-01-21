export default class SpaceCreaturesControl {
  constructor() {
    this.handlers = []
    window.foo = this.handlers
  }
  unbindAll() {
    this.handlers.forEach(x => x.target.removeEventListener(x.type, x.handler))
  }
  bind(target,type,handler) {
    target.addEventListener(type,handler)
    this.handlers.push({target:target,type:type,handler:handler})
  }
}
