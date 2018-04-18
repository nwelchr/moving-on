import Vector from './vector';
import State from './state';

class Poison {
    constructor(pos, ch, reset) {
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

        this.resetPos = pos;
    }

    collide(state) {
        return new State(state.level, state.actors, 'lost');
    }

    update(time, state) {
        let newPos = this.pos.plus(this.speed.times(time));
        // if poison touching a wall, just reset
        if (state.level.touching(newPos, this.size) ==! 'wall') {
            return new Poison(newPos, this.speed, this.resetPos);
        } else if (this.resetPos) {
            return new Poison(this.resetPos, this.speed, this.resetPos);
        } else {
            return new Poison(this.pos, this.speed.times(-1));
        }
    }
}

export default Poison;