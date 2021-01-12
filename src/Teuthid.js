var SpaceCreatures = SpaceCreatures || {}

SpaceCreatures.Teuthid = class SpaceCreaturesTeuthid extends SpaceCreatures.Creature {
  constructor(x,y) {
    super(x,y)
    this.height = 16
    this.width = 16
    this.direction = 1 

    let image = SpaceCreatures.game.graphicsLibrary.teuthid_001

    this.sprites.push(image) 
    this.sequences.push([{frame: this.sprites[0], duration:0}])
  }
}

