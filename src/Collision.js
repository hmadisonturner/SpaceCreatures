var SpaceCreatures = SpaceCreatures || {}

SpaceCreatures.Collision = class SpaceCreaturesCollision {
  static collide(a,b) {
    let ax1=a.x, ay1=a.y, ax2=a.x+a.width, ay2=a.y+a.height,
        bx1=b.x, by1=b.y, bx2=b.x+b.width, by2=b.y+b.height
  
    let overlapX=false, overlapY=false

    if ((ax1===bx1 || ax2===bx2 || ax1===bx2 || ax2===bx1) ||
       (ax1<bx1 && ax2>bx1) ||
       (bx1<ax1 && bx2>ax1)) overlapX=true

    if ((ay1===by1 || ay2===by2 || ay1===by2 || ay2===by1) ||
       (ay1<by1 && ay2>by1) ||
       (by1<ay1 && by2>ay1)) overlapY=true

    return overlapX && overlapY
  }
}

