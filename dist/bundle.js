/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//  VECTOR CONSTRUCTOR
class Vector {
  constructor(x, y) {
    // constructor for the function object with an x and y coordinate as an input
    this.x = x;
    this.y = y;
  }

  plus(other) {
    // takes another vector as an argument
    return new Vector(this.x + other.x, this.y + other.y); // creates a new Vector object from the current one and the argument and returns it
  }

  times(factor) {
    return new Vector(this.x * factor, this.y * factor); // returns a new vector multiplied by the argument which will be useful when given a time interval to get the distance traveled
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Vector);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__display__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__level__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__level_maps__ = __webpack_require__(7);




const arrowCodes = {
  37: "left",
  38: "up",
  39: "right"
};

const detectKeys = keyCodes => {
  // as opposed to writing just null, make an object so it doesn't error when trying to index into nothing
  const isPressed = Object.create(null);

  // Set isPressed to true when key down, false when key up
  const keyHandler = e => {

    // if the key pressed is in keyCodes (left/up/right)
    if (keyCodes.hasOwnProperty(e.keyCode)) {
      e.preventDefault();
      const isKeydown = e.type === "keydown";
      isPressed[keyCodes[e.keyCode]] = isKeydown;
    }
  };

  document.addEventListener("keydown", keyHandler);
  document.addEventListener("keyup", keyHandler);

  return isPressed;
};

// frameFunc is 
const runAnimation = frameFunc => {
  let lastTime = null;

  const frame = time => {
    let stop = false;

    if (lastTime != null) {
      const timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) === false;
    }

    lastTime = time;
    if (!stop) {
      requestAnimationFrame(frame);
    }
  };

  requestAnimationFrame(frame);
};

// currying!!
const runLevel = (level, andThen) => {
  const display = new __WEBPACK_IMPORTED_MODULE_0__display__["a" /* default */](document.body, level);

  runAnimation(step => {
    level.animate(step, arrows);
    display.drawFrame(step);

    if (level.isFinished()) {
      display.clear();
      if (andThen) {
        andThen(level.status);
      }
      return false;
    }
  });
};

const runGame = () => {
  // Defining beginning of game conditions

  // Recursive function that increments level when its finished, resets if not, goes to win screen if won
  const startLevel = n => {
    runLevel(new __WEBPACK_IMPORTED_MODULE_1__level__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__level_maps__["a" /* default */][n]), status => {
      if (status === "lost") {
        startLevel(n);
      } else if (n < __WEBPACK_IMPORTED_MODULE_2__level_maps__["a" /* default */].length - 1) {
        startLevel(n + 1);
      } else {
        alert("you win!");
      }
    });
  };

  startLevel(0);
};

const arrows = detectKeys(arrowCodes);
// const simpleLevel = new Level(simpleLevelPlan);
runGame();

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const scale = 60; // gives the scale of number of pixels that a single unit takes up on the screen

// HELPER FUNCTION TO CREATE AN ELEMENT IN THE DOM AND GIVE IT A CLASS
const createElement = (name, className) => {
  const element = document.createElement(name); // creates the element
  if (className) element.className = className; // sets the class to className if you gave it an argument
  return element;
};

// FUNCTION CONSTRUCTOR FOR A DISPLAY BY GIVING IT A PARENT TO APPEND ITSELF TO AND A LEVEL OBJECT TO DISPLAY
class DOMDisplay {
  constructor(parent, level) {
    this.wrap = parent.appendChild(createElement("div", "game")); // create a div and give it the class called game and store it as wrapper because appendChild returns that element
    this.level = level; // the level object of the display object

    this.wrap.appendChild(this.drawBackground()); //drawBackground() has not been created yet but you will append it to the wrap or the element that holds all of this which is the immediate child of the parent given - this will draw the background and is only done once
    this.actorLayer = null; // is going to to be used to keep track of the actors so that they can be easily removed and replaced and used by drawFrame() //
    this.drawFrame(); //
  }

  drawBackground() {
    const table = createElement("table", "background"); // create a table element with a class of background
    table.style.width = `${this.level.width * scale}px`; // create the width of the background to scale

    this.level.grid.forEach(row => {
      // goes over each row of the built out grid of the level which is a bunch of words like lava and wall
      const rowElt = table.appendChild(createElement("tr")); // create a table row to append to the parent table for each row
      rowElt.style.height = `${scale}px`; // adjust the height of each row to the scale... i.e 20X20px means 20 px height
      row.forEach(type => {
        // go over each cell of the row
        rowElt.appendChild(createElement("td", type)); // create a new element with a class of type in the table
      });
    });
    return table; // return the created background
  }

  drawActors() {
    const wrap = createElement("div"); // create a div and add them to the wrapper for drawActors
    this.level.actors.forEach(actor => {
      // go over each actor
      const rect = wrap.appendChild(createElement("div", `actor ${actor.type}`)); // create a div with the class of actor and the type that that the actor is
      rect.style.width = `${actor.size.x * scale}px`; // the width of the actor is its vector's x property multiplied by scale
      rect.style.height = `${actor.size.y * scale}px`; // same for height but by y
      rect.style.left = `${actor.pos.x * scale}px`; // the position of the actor from the side of the screen
      rect.style.top = `${actor.pos.y * scale}px`;
    });
    return wrap; // returns the wrap with all the actors in it
  }

  drawFrame() {
    if (this.actorLayer) {
      // if an actorLayer exists, remove it
      this.wrap.removeChild(this.actorLayer);
    }
    this.actorLayer = this.wrap.appendChild(this.drawActors()); // add the actor layer to the wrap
    this.wrap.className = `game ${this.level.status || ""}`; // add the class game to the wrap and the status if there is one --- by adding this class we can change the style of the player when there is a status on the wrapper
    this.scrollPlayerIntoView();
  }

  scrollPlayerIntoView() {
    const width = this.wrap.clientWidth;
    const height = this.wrap.clientHeight;
    const margin = width / 3;

    const left = this.wrap.scrollLeft;
    const right = left + width;
    const top = this.wrap.scrollTop;
    const bottom = top + height;

    const player = this.level.player;
    const center = player.pos.plus(player.size.times(.5)).times(scale); // multiply by scale because we need it in pixels and not level coordinates

    if (center.x < left + margin) {
      this.wrap.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
      this.wrap.scrollLeft = center.x + margin - width;
    }
    if (center.y < top + margin) {
      this.wrap.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
      this.wrap.scrollTop = center.y + margin - height;
    }
  }

  clear() {
    this.wrap.parentNode.removeChild(this.wrap);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DOMDisplay);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__player__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__coin__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lava__ = __webpack_require__(6);





const actorChars = { // key for actor characters
  "@": __WEBPACK_IMPORTED_MODULE_1__player__["a" /* default */],
  "o": __WEBPACK_IMPORTED_MODULE_2__coin__["a" /* default */],
  "=": __WEBPACK_IMPORTED_MODULE_3__lava__["a" /* default */], "|": __WEBPACK_IMPORTED_MODULE_3__lava__["a" /* default */], "v": __WEBPACK_IMPORTED_MODULE_3__lava__["a" /* default */]
};

const maxStep = .05;

// LEVEL CONSTRUCTOR
class Level {
  constructor(plan) {
    this.width = plan[0].length; // how many characters in the string
    this.height = plan.length; // how many rows is how tall the game is
    this.grid = []; // this is the environment of empty space, walls, and lava
    this.actors = []; // array of actors

    for (let y = 0; y < this.height; y++) {
      // iterate over each string in the plan array
      const line = plan[y]; // the current string in the index of the input, the row of the game
      const gridLine = []; // the line to be built of environment
      for (let x = 0; x < this.width; x++) {
        // iterate over each character
        const ch = line[x]; // the current character of the current line which is the current string
        let fieldType = null; // checking to see if it's an actor or an emtpy space, if not it's a wall or stationary lava
        const Actor = actorChars[ch]; // haven't seen actorChars yet but this looks into that and declares Actor

        if (Actor) {
          // if it is an actor as defined above which will be either undefined or an actor
          this.actors.push(new Actor(new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](x, y), ch)); // this will push into the actors array a new object that has the name of the class i.e. "Player" and the position as a vector object and nowhere else
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

  isFinished() {
    // checks to see if a game is finished by seeing if there is a finishDelay and the status of the level is not null
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
      if (other != actor && actor.pos.x + actor.size.x > other.pos.x && actor.pos.x < other.pos.x + other.size.x && actor.pos.y + actor.size.y > other.pos.y && actor.pos.y < other.pos.y + other.size.y) {
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
      this.actors.forEach(function (actor) {
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

/* harmony default export */ __webpack_exports__["a"] = (Level);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(0);


// PLAYER CONSTRUCTOR
class Player {
  constructor(pos) {
    this.pos = pos.plus(new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, -0.5)); // establish current position is half a square higher because it's 1.5 squares high and pos it top left corner of actor
    this.size = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](.8, 1.5); // it is .8 wide and 1.5 tall as a vector
    this.speed = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, 0); // stationary starting speed
  }

  moveX(step, level, keys) {
    this.speed.x = 0;
    if (keys.left) this.speed.x -= playerXSpeed;
    if (keys.right) this.speed.x += playerXSpeed;

    const motion = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](this.speed.x * step, 0);
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
    const motion = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, this.speed.y * step);
    const newPos = this.pos.plus(motion);
    const obstacle = level.obstacleAt(newPos, this.size);
    if (obstacle) {
      level.playerTouched(obstacle);
      if (keys.up && this.speed.y > 0) {
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
    if (level.status === "lost") {
      // losing animation
      this.pos.y += step;
      this.size.y -= step;
    }
  }
}

Player.prototype.type = "player";

var playerXSpeed = 7;

var gravity = 10;
var jumpSpeed = 7;

/* harmony default export */ __webpack_exports__["a"] = (Player);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(0);


const wobbleSpeed = 8;
const wobbleDist = .07;

// COIN CONSTRUCTOR
class Coin {
  constructor(pos) {
    this.basePos = this.pos = pos.plus(new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](.2, .1)); // move it inward a little bit and track the original position
    this.size = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](.6, .6); // .6X.6 in size
    this.wobble = Math.random() * Math.PI * 2; //  something to do with where it goes on the wave of a sin curve
  }

  act(step) {
    this.wobble += step * wobbleSpeed;
    const wobblePos = Math.sin(this.wobble) * wobbleDist;
    this.pos = this.basePos.plus(new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, wobblePos));
  }
}

Coin.prototype.type = "coin";

/* harmony default export */ __webpack_exports__["a"] = (Coin);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(0);


// LAVA CONSTRUCTOR
class Lava {
  constructor(pos, ch) {
    this.pos = pos;
    this.size = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](1, 1); // takes up 1X1
    if (ch === "=") {
      this.speed = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](2, 0); // sideways lava
    } else if (ch === "|") {
      this.speed = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, 2); // speed in terms of vector, up & down
    } else if (ch === "v") {
      this.speed = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, 3);
      this.repeatPos = pos; // the original starting position to later repeat to
    }
  }

  act(step, level) {
    const newPos = this.pos.plus(this.speed.times(step));
    if (!level.obstacleAt(newPos, this.size)) {
      this.pos = newPos;
    } else if (this.repeatPos) {
      this.pos = this.repeatPos;
    } else {
      this.speed = this.speed.times(-1);
    }
  }
}

Lava.prototype.type = "lava";

/* harmony default export */ __webpack_exports__["a"] = (Lava);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const levelMaps = [[// initial input for Level
"                            xxxxxxxxxxxoxxxxx", "                                               x", "                                           x", "                                       x", "                                   x", "                               x", "                           x", "                         o", "                       xxx", "                      ", "  x =              x  xxxxxx", "  x         o o    x  ", "  x @      xxxxx   x  ", "  xxxxx            x  ", "      x!!!!!!!!!!!!x  ", "      xxxxxxxxxxxxxx  ", "                      "], ["                      ", "                      ", "   v                  ", "          v           ", "                      ", "              v       ", "                      ", "     v                ", "                      ", "                      ", "  x              = x  ", "  x             o  x  ", "  x @         = xx x  ", "  xxxxx    xx    = x  ", "      xxx!!!!!!!!!!x  ", "      xxxxx!!!!xxxxx  ", "                      "]];

/* harmony default export */ __webpack_exports__["a"] = (levelMaps);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map