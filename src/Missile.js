var SpaceCreatures = SpaceCreatures || {}

SpaceCreatures.Missile = class SpaceCreaturesMissile extends SpaceCreatures.SpriteObject {
  constructor(x,y) {
    super(x-1,y)
    this.height = 10
    this.width = 3
    let image = SpaceCreatures.game.graphicsLibrary.missile_001
    this.color = 'silver'
    this.sprites.push(image)
    this.sequences.push([{frame: this.sprites[0], duration:0}])
  }
  move(){
    this.y = this.y-10
    let creatures = SpaceCreatures.game.creatures
    for (let i=0; i<creatures.length; i++) {
      if(SpaceCreatures.Collision.collide(creatures[i],this)){
	this.die()
        creatures[i].die()
      }
    }
    if (this.y<-this.height) this.die()
  }
  die() {
    SpaceCreatures.game.missiles.splice(SpaceCreatures.game.missiles.indexOf(this),1)
  }
}

