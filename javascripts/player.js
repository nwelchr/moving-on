import Vector from './vector';

class Player {
    constructor(pos, ch, speed, size, xSpeed, jumpSpeed) {
        this.pos = pos;
        this.speed = speed || new Vector(0, 0); // initial speed
        this.size = size;
        this.xSpeed = xSpeed;
        this.jumpSpeed = jumpSpeed;
    }

    moveX(time, state, keys, overlap) {
        this.speed.x = 0;
        if (keys.left && this === state.player && !(overlap === 'rightOverlap')) this.speed.x -= this.xSpeed;
        if (keys.right && this === state.player && !(overlap === 'leftOverlap')) this.speed.x += this.xSpeed;

        if (this !== state.player && ['topOverlap'].includes(overlap)) { 
            this.speed.x += state.player.speed.x;
         }


        const movedX = this.pos.plus(new Vector(this.speed.x * time, 0));
        if (state.level.touching(movedX, this.size) !== 'wall') {
            this.pos = movedX;
        }
    }

    moveY(time, state, keys, overlap) {
        this.speed.y += time * state.gravity;
        const motion = new Vector(0, this.speed.y * time);
        const newPos = this.pos.plus(motion); 
        const obstacle = state.level.touching(newPos, this.size);
        if (obstacle || ['topOverlap', 'bottomOverlap'].includes(overlap) && (this === state.player || state.nonPlayers.includes(this))) {
            if (overlap === 'topOverlap' && this.speed.y < 0) {
                this.pos = newPos;
            } else if (obstacle === 'trampoline') {
                this.speed.y = -(Math.floor(Math.random() * 4 + 10));
                // this.jumpSpeed = -this.jumpSpeed;
                this.pos = newPos;
            } else if (overlap === 'bottomOverlap') {
                this.speed.y = this.jumpSpeed * .1;
                if (newPos < this.pos || !['water', 'wall'].includes(obstacle)) {
                    this.pos = newPos;
                }
            }
            else if (keys.up && (this.speed.y >= 0 || overlap === 'topOverlap') && this === state.player) {
                this.speed.y = -this.jumpSpeed;
            } else if (obstacle === 'water') {
                if (this.size.x === .8) this.pos = newPos;
                else this.pos.y = 8.1;
            } 
            else if (['gravity', 'poison', 'instruction'].includes(obstacle)) {
                this.pos = newPos;
            } else {
                this.speed.y = 0;
            }
        } else { 
            this.pos = newPos;
        }

    }

    update (time, state, keys) {
        let overlap;
        for(let actor of state.actors) {
            if (!(this === actor)) {
                overlap = state.overlap(this, actor);
                if (overlap) break;
            }
        }

        if (state.status !== 'won') {
        this.moveX(time, state, keys, overlap);
        this.moveY(time, state, keys, overlap);
        }

        const Actor = this.constructor;
        return new Actor(this.pos, null, new Vector(this.speed.x, this.speed.y));
    }

}

export default Player;