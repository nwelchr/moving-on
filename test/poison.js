import Vector from './vector';

class Poison {
    constructor(pos, ch) {
        this.pos = pos;
        this.size = new Vector(1, 1);
        switch(ch) {
            case '=':
                this.speed = new Vector(2, 0); // sideways lava
                break;
            case '|':
                this.speed = new Vector(0, 2); // speed in terms of vector, up & down
                break;
            case 'v':
                this.speed = new Vector(0, 3);
                this.repeatPos - pos; // original starting position
                break;
            default:
                this.speed = new Vector(0, 0);
                break;
        }
    }
}

export default Poison;