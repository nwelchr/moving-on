import Player from './player';
import Vector from './vector';

class Finley extends Player {
    constructor(pos) {
        // -.5 and 1.5 to compensate for tilemap
        super(this.pos, this.size, this.speed, this.jumpSpeed, this.gravity)
    }
}

export default Finley;