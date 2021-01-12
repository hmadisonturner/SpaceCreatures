var SpaceCreatures = SpaceCreatures || {}

SpaceCreatures.Animation = class SpaceCreaturesAnimation {
  static animate(callback) {
    requestAnimationFrame(()=>{callback(); this.animate(callback)})
  }
}

