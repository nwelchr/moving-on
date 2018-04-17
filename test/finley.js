import Player from './player';
import Vector from './vector';

class Finley extends Player {
    constructor(pos) {
        // -.5 and 1.5 to compensate for tilemap
        this.pos = pos.plus(new Vector(0, -0.5));
        this.size = new Vector(.8, 1.5);
        this.speed = .5;
        this.jumpSpeed = 7;
        this.gravity = -10;
    }
}

export default Finley;