import Player from './player';
import Vector from './vector';

class Finley extends Player {
    constructor(pos, ch, speed) {
        this.pos = pos;
        this.size = new Vector(.8, 1.5);
        this.speed = speed || new Vector(0, 0); // initial speed
        this.xSpeed = 7;
        this.jumpSpeed = 7;
        this.gravity = 10;
    }
}

export default Finley;