var SpaceCreatures = SpaceCreatures || {}

SpaceCreatures.Lewloy = class SpaceCreaturesLewLoy extends SpaceCreatures.Creature {
  constructor(x,y) {
    super(x,y)
    this.height = 16
    this.width = 16
    this.direction = 1 

    this.sprites.push(SpaceCreatures.game.graphicsLibrary.lewloy_001) 
    this.sprites.push(SpaceCreatures.game.graphicsLibrary.lewloy_002) 

    this.sequences.push([
      {frame: this.sprites[0], duration:24},
      {frame: this.sprites[1], duration:24}
    ])
  }
}

