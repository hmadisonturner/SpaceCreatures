import SpaceCreaturesCreature from "./Creature.js"

export default class SpaceCreaturesTeuthid extends SpaceCreaturesCreature {
  constructor(x, y, constrainX, constrainY) {
    super(x, y, constrainX, constrainY)
    this.height = 16
    this.width = 16
    this.direction = 1 

    this.sprites.push('teuthid_001') 
    this.sequences.push([{frame: this.sprites[0], duration:0}])
  }
}

