import Vector from './vector';

const wobbleSpeed = 8;
const wobbleDist = .07;

// COIN CONSTRUCTOR
class Coin {
  constructor(pos) {
    this.basePos = this.pos = pos.plus(new Vector(.2, .1)); // move it inward a little bit and track the original position
    this.size = new Vector(.6, .6); // .6X.6 in size
    this.wobble = Math.random() * Math.PI * 2; //  randomly generate position within the sine wave amplitude
  }

  act(step) {
    this.wobble += step * wobbleSpeed;
    const wobblePos = Math.sin(this.wobble) * wobbleDist;
    this.pos = this.basePos.plus(new Vector(0, wobblePos));
  }
}

Coin.prototype.type = "coin";

export default Coin;
