import SpaceCreaturesCreature from "./Creature.js"

export default class SpaceCreaturesLewLoy extends SpaceCreaturesCreature {
  constructor(x, y, constrainX, constrainY) {
    super(x, y, constrainX, constrainY)
    this.height = 16
    this.width = 16
    this.direction = 1 

    this.sprites.push('lewloy_001') 
    this.sprites.push('lewloy_002') 

    this.sequences.push([
      {frame: this.sprites[0], duration:24},
      {frame: this.sprites[1], duration:24}
    ])
  }
}

