import Vector from './vector';

class Player {
    constructor(pos, ch, speed, size, xSpeed, jumpSpeed) {
        this.pos = pos;
        this.speed = speed || new Vector(0, 0); // initial speed
        this.size = size;
        this.xSpeed = xSpeed;
        this.jumpSpeed = jumpSpeed;
    }

    moveX(time, state, keys) {
        this.speed.x = 0;
        if (keys.left && this === state.player) this.speed.x -= this.xSpeed;
        if (keys.right && this === state.player) this.speed.x += this.xSpeed;


        // if ((keys.left || keys.right || keys.up) && this === state.player) {
        //     if (this.speed.x < this.xSpeed && this.speed.x > -this.xSpeed) {
        //     if (keys.left) this.speed.x -= this.xSpeed;
        //     if (keys.right) this.speed.x += this.xSpeed;
        //     } else if (this.speed.x === this.xSpeed || this.speed.x === -this.xSpeed) {
        //       if (keys.left && this.speed.x === this.xSpeed) this.speed.x -= this.xSpeed;
        //       if (keys.right && this.speed.x === -this.xSpeed) this.speed.x += this.xSpeed;
        //     } 
        //   } else { 
        //     if (this.speed.x > 0) this.speed.x -= this.speed.x < this.xSpeed ? this.speed.x : this.xSpeed;
        //     if (this.speed.x < 0) this.speed.x += this.speed.x > -this.xSpeed ? -this.speed.x : this.xSpeed;
        //   }

        const movedX = this.pos.plus(new Vector(this.speed.x * time, 0));
        if (state.level.touching(movedX, this.size) !== 'wall') {
            this.pos = movedX;
        }
    }

    collide(state) {

    }

    moveY(time, state, keys) {
        this.speed.y += time * state.gravity;
        const motion = new Vector(0, this.speed.y * time);
        const newPos = this.pos.plus(motion);
        const obstacle = state.level.touching(newPos, this.size);
        if (obstacle) {
            console.log(obstacle);
            if (obstacle === 'trampoline') {
                this.speed.y = -this.jumpSpeed;
                this.jumpSpeed = -this.jumpSpeed;
            }
            else if (keys.up && this.speed.y >= 0 && this === state.player) {
                this.speed.y = -this.jumpSpeed;
            } else if (obstacle === 'water' || obstacle === 'instruction') {
                this.pos = newPos;
            } else {
                this.speed.y = 0;
            }
        } else { 
            this.pos = newPos;
        }
    }

    update (time, state, keys) {

        this.moveX(time, state, keys);
        this.moveY(time, state, keys);

        const Actor = this.constructor;
        return new Actor(this.pos, null, new Vector(this.speed.x, this.speed.y));
    }

}

export default Player;