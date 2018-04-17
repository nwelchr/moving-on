import Vector from './vector';

// PLAYER CONSTRUCTOR
class Player {
    constructor(pos) {
      this.pos = pos.plus(new Vector(0, -0.5)); // establish current position is half a square higher because it's 1.5 squares high and pos it top left corner of actor
      this.size  = new Vector(.8, 1.5); // it is .8 wide and 1.5 tall as a vector
      this.speed = new Vector(0, 0); // stationary starting speed
    }
  
    moveX(step, level, keys) {
      console.log(this.speed.x);
      console.log(keys);

      if (keys.left || keys.right || keys.up) {
        if (this.speed.x < jumpSpeed && this.speed.x > -jumpSpeed) {
        if (keys.left) this.speed.x -= playerXSpeed;
        if (keys.right) this.speed.x += playerXSpeed;
        } else if (this.speed.x === jumpSpeed || this.speed.x === -jumpSpeed) {
          if (keys.left && this.speed.x === jumpSpeed) this.speed.x -= playerXSpeed;
          if (keys.right && this.speed.x === -jumpSpeed) this.speed.x += playerXSpeed;
        } 
      } else { 
        if (this.speed.x > 0) this.speed.x -= this.speed.x < playerXSpeed ? this.speed.x : playerXSpeed;
        if (this.speed.x < 0) this.speed.x += this.speed.x > -playerXSpeed ? -this.speed.x : playerXSpeed;
      }
  
      const motion = new Vector(this.speed.x * step, 0);
      const newPos = this.pos.plus(motion);
      const obstacle = level.obstacleAt(newPos, this.size);
      if (obstacle) {
        level.playerTouched(obstacle);
      } else {
        this.pos = newPos;
      }
    }
  
    moveY(step, level, keys) {
      this.speed.y += step * gravity;
      const motion = new Vector(0, this.speed.y * step);
      const newPos = this.pos.plus(motion);
      const obstacle = level.obstacleAt(newPos, this.size);
      if (obstacle) {
        level.playerTouched(obstacle);
        if(keys.up && this.speed.y > 0) {
          this.speed.y = -jumpSpeed;
        } else {
          this.speed.y = 0;
        }
      } else {
        this.pos = newPos;
      }
    }
  
    act(step, level, keys) {
      this.moveX(step, level, keys);
      this.moveY(step, level, keys);
  
      const otherActor = level.actorAt(this);
      if (otherActor) {
        level.playerTouched(otherActor.type, otherActor);
      }
      if (level.status === "lost") { // losing animation
        this.pos.y += step;
        this.size.y -= step;
      }
    }
  }
  
  Player.prototype.type = "player";
  
  var playerXSpeed = .5;
  
  var gravity = 10;
  var jumpSpeed = 7;

  export default Player;