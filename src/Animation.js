
export default class SpaceCreaturesAnimation {
  static animate(callback) {
    requestAnimationFrame(()=>{callback(); this.animate(callback)})
  }
}

