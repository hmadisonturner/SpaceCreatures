import SpaceCreaturesCreature from "./Creature.js"

export default class SpaceCreaturesOcythe extends SpaceCreaturesCreature {
  constructor(x, y, constrainX, constrainY) {
    super(x, y, constrainX, constrainY)
    this.height = this.width = 16
    this.direction = 1
    this.sprites.push('ocythe_001')
    this.sequences = [
      [
        {frame: this.sprites[0], duration: 0}
      ]
    ]
  }
}

