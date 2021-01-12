var SpaceCreatures = SpaceCreatures || {}

SpaceCreatures.Ocythe = class SpaceCreaturesOcythe extends SpaceCreatures.Creature {
  constructor(x,y) {
    super(x,y)
    this.height = this.width = 16
    this.direction = 1
    this.sprites.push(SpaceCreatures.game.graphicsLibrary.ocythe_001)
    this.sequences = [
      [
        {frame: this.sprites[0], duration: 0}
      ]
    ]
  }
}
