import Player from './player';
import Vector from './vector';

class Finley extends Player {
    constructor(pos, ch, speed) {
        super(pos, ch, speed);
        this.size = new Vector(.8, 1.5);
        this.xSpeed = 7;
        this.jumpSpeed = 7;
    }
}

export default Finley;