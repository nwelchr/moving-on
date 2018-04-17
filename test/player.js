import Vector from './vector';

class Player {
    constructor(pos) {
        // this.pos = pos;
        // this.size = size;
        // this.speed = speed;
        // this.jumpSpeed = jumpSpeed;
        // this.gravity = gravity;
        this.pos = pos.plus(new Vector(0, -0.5));
        this.size = new Vector(.8, 1.5);
        this.speed = .5;
        this.jumpSpeed = 7;
        this.gravity = -10;
    }


}

export default Player;