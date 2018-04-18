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
        this.speed = new Vector(0, 0); // initial speed
        this.xSpeed = .5;
        this.jumpSpeed = 7;
        this.gravity = -10;
    }

    moveX(time, state, keys) {
        if (keys.left || keys.right || keys.up) {
            if (this.speed.x < this.jumpSpeed && this.speed.x > -this.jumpSpeed) {
            if (keys.left) this.speed.x -= this.xSpeed;
            if (keys.right) this.speed.x += this.xSpeed;
            } else if (this.speed.x === this.jumpSpeed || this.speed.x === -this.jumpSpeed) {
              if (keys.left && this.speed.x === this.jumpSpeed) this.speed.x -= this.xSpeed;
              if (keys.right && this.speed.x === -this.jumpSpeed) this.speed.x += this.xSpeed;
            } 
          } else { 
            if (this.speed.x > 0) this.speed.x -= this.speed.x < this.xSpeed ? this.speed.x : this.xSpeed;
            if (this.speed.x < 0) this.speed.x += this.speed.x > -this.xSpeed ? -this.speed.x : this.xSpeed;
          }

        const movedX = this.pos.plus(new Vector(this.xSpeed * time, 0));
        if (state.level.touching(movedX, this.size) !== 'wall') {
            this.pos = movedX;
        }
    }

    moveY(time, state, keys) {
        let ySpeed = this.speed.y + time * this.gravity;
        let movedY = this.pos.plus(new Vector(0, ySpeed * time));
        if (state.level.touching(movedY, this.size) !== 'wall') {
            ySpeed = -this.jumpSpeed;
        } else {
            ySpeed = 0;
        }

        return ySpeed;
    }

    update (time, state, keys) {
        this.moveX(time, state, keys);
        const ySpeed = this.moveY(time, state, keys);
        return new Player (this.pos, new Vector(this.xSpeed, ySpeed));
    }

}

export default Player;