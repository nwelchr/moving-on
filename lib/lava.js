import Vector from './vector';

// LAVA CONSTRUCTOR
class Lava {
    constructor(pos, ch) {
      this.pos = pos;
      this.size = new Vector(1, 1); // takes up 1X1
      if (ch === "=") {
        this.speed = new Vector(2, 0); // sideways lava
      } else if (ch === "|") {
        this.speed = new Vector(0, 2); // speed in terms of vector, up & down
      } else if (ch === "v") {
        this.speed = new Vector(0, 3);
        this.repeatPos = pos; // the original starting position to later repeat to
      }
    }
  
    act(step, level) {
      const newPos = this.pos.plus(this.speed.times(step));
      if(!level.obstacleAt(newPos, this.size)) {
        this.pos = newPos;
      } else if (this.repeatPos) {
        this.pos = this.repeatPos;
      } else {
        this.speed = this.speed.times(-1);
      }
    }
  }
  
  Lava.prototype.type = "lava";

  export default Lava;