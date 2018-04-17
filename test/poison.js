import Vector from './vector';

class Poison {
    constructor(pos, ch) {
        this.pos = pos;

        switch(ch) {
            case '=':
                this.speed = new Vector(2, 0); // sideways lava
            case '|':
                this.speed = new Vector(0, 2); // speed in terms of vector, up & down
            case 'v':
                this.speed = new Vector(0, 3);
                this.repeatPos - pos; // original starting position
            default:
                this.speed = new Vector(0, 0);
        }
    }
}

export default Poison;