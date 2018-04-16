import Vector from './vector';
import Player from './player';
import Coin from './coin';
import Lava from './lava';

const actorChars = { // key for actor characters
    "@" : Player,
    "o" : Coin,
    "=" : Lava, "|" : Lava, "v" : Lava
  };

const maxStep = .05;

// LEVEL CONSTRUCTOR
class Level {
  constructor(plan) {
    this.width = plan[0].length; // how many characters in the string
    this.height = plan.length; // how many rows is how tall the game is
    this.grid = []; // this is the environment of empty space, walls, and lava
    this.actors = []; // array of actors

    for (let y = 0; y < this.height; y++) { // iterate over each string in the plan array
      const line = plan[y]; // the current string in the index of the input, the row of the game
      const gridLine = []; // the line to be built of environment
      for (let x = 0; x < this.width; x++) { // iterate over each character
        const ch = line[x]; // the current character of the current line which is the current string
        let fieldType = null; // checking to see if it's an actor or an emtpy space, if not it's a wall or stationary lava
        const Actor = actorChars[ch]; // haven't seen actorChars yet but this looks into that and declares Actor

        if (Actor) { // if it is an actor as defined above which will be either undefined or an actor
          this.actors.push(new Actor(new Vector(x, y), ch)); // this will push into the actors array a new object that has the name of the class i.e. "Player" and the position as a vector object and nowhere else
        } else if (ch === "x") {
          fieldType = "wall"; // set the variable fieldType to "wall"
        } else if (ch === "!") {
          fieldType = "lava"; // set the variable fieldType to "lava"
        }
        gridLine.push(fieldType); // pushes null into the grid line if it is an actor or empty space
      }
      this.grid.push(gridLine); // pushes the newly built environment line into the grid, these are all words!!!
    }

    this.player = this.actors.filter(actor => //searches for the player and returns the first instance found with [0]
    // searches the actors one by one and matches an object with type player
    actor.type === "player")[0];
    this.status = this.finishDelay = null; // sets the finishDelay and the status to null, the game is neither won nor lost
  }

  isFinished() { // checks to see if a game is finished by seeing if there is a finishDelay and the status of the level is not null
    return this.status != null && this.finishDelay < 0;
  }

  obstacleAt(pos, size) {
    const xStart = Math.floor(pos.x);
    const xEnd = Math.ceil(pos.x + size.x);
    const yStart = Math.floor(pos.y);
    const yEnd = Math.ceil(pos.y + size.y);

    // if the user hits top/right/left margins, it's a wall
    if (xStart < 0 || xEnd > this.width || yStart < 0) {
      return "wall";
    }

    //if the user hits a wall in the level, count it as lava
    if (yEnd > this.height) {
      return "lava";
    }
    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        const fieldType = this.grid[y][x];
        if (fieldType) return fieldType;
      }
    }
  }

  actorAt(actor) {
    for (const other of this.actors) {
      if (other != actor &&
          actor.pos.x + actor.size.x > other.pos.x &&
          actor.pos.x < other.pos.x + other.size.x &&
          actor.pos.y + actor.size.y > other.pos.y &&
          actor.pos.y < other.pos.y + other.size.y) {
        return other;
      }
    }
  }

  animate(step, keys) {
    if (this.status != null) {
      this.finishDelay -= step;
    }

    while (step > 0) {
      const thisStep = Math.min(step, maxStep);
      this.actors.forEach(function(actor) {
        actor.act(thisStep, this, keys);
      }, this);
      step -= thisStep;
    }
  }

  playerTouched(type, actor) {
    if (type === "lava" && this.status === null) {
      this.status = "lost";
      this.finishDelay = 1;
    } else if (type === "coin") {
      this.actors = this.actors.filter(other => // filter out the coin that you grabbed
      other !== actor);

      // if all the coins are taken
      if (!this.actors.some(actor => actor.type === "coin")) {
        this.status = "won";
        this.finishDelay = 1;
      }
    }
  }
}

export default Level;