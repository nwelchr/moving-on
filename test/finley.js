import Player from './player';
import Vector from './vector';

class Finley extends Player {
    constructor(pos, speed, jumpSpeed) {
        // -.5 and 1.5 to compensate for tilemap
        this.pos = pos.plus(new Vector(0, -0.5));
        this.size = new Vector(.8, 1.5);
        this.speed = 
        this.jumpSpeed = 
    }
}

export default Finley;