import Player from './player';
import Vector from './vector';

class Finley extends Player {
    constructor(pos, ch, speed, size, xSpeed, jumpSpeed) {
        const finleySize = size || new Vector(.8, 1.5);
        const finleyXSpeed = xSpeed || 7;
        const finleyJumpSpeed = jumpSpeed || 9.5;
        super(pos, ch, speed, finleySize, finleyXSpeed, finleyJumpSpeed);
    }
}

export default Finley;