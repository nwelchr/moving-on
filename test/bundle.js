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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__level__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__display__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__level_maps__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__state__ = __webpack_require__(5);





let simpleLevel = new __WEBPACK_IMPORTED_MODULE_0__level__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__level_maps__["a" /* default */][0]);
let display = new __WEBPACK_IMPORTED_MODULE_1__display__["a" /* default */](document.body, simpleLevel);
display.drawFrame(__WEBPACK_IMPORTED_MODULE_3__state__["a" /* default */].start(simpleLevel));

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__finley__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__poison__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__player__ = __webpack_require__(8);





const actorChars = {
    '1': __WEBPACK_IMPORTED_MODULE_3__player__["a" /* default */],
    '=': __WEBPACK_IMPORTED_MODULE_2__poison__["a" /* default */], '|': __WEBPACK_IMPORTED_MODULE_2__poison__["a" /* default */], 'v': __WEBPACK_IMPORTED_MODULE_2__poison__["a" /* default */]
};

class Level {
    constructor(levelMap) {
        this.rows = [];
        this.width = levelMap[0].length; // width of level determined my first row
        this.height = levelMap.length; // # of rows in array
        this.actors = []; // array of 'actors' i.e. non-background objs

        for (let y = 0; y < this.height; y++) {
            // iterate over each string in the map
            const line = levelMap[y];
            const currRow = [];

            for (let x = 0; x < this.width; x++) {
                // iterate over each character
                const ch = line[x];
                let fieldType;

                const Actor = actorChars[ch];
                if (Actor) {
                    this.actors.push(new Actor(new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](x, y), ch));
                } else {
                    switch (ch) {
                        case 'x':
                            fieldType = 'wall';
                            break;
                        case 'w':
                            fieldType = 'water';
                            break;
                        case 'p':
                            fieldType = 'poison';
                            break;
                        case '!':
                            fieldType = 'finleyGoal';
                            break;
                        case '@':
                            fieldType = 'frankieGoal';
                            break;
                        default:
                            fieldType = null;
                            break;
                    }
                }
                currRow.push(fieldType);
            }

            this.rows.push(currRow);
        }
    }

    touching(pos, size) {
        // defines boundaries of what counts as touching
        const xStart = Math.floor(pos.x);
        const xEnd = Math.ceil(pos.x + size.x);
        const yStart = Math.floor(pos.y);
        const yEnd = Math.ceil(pos.y + size.y);

        // if the user hits top/right/left margins, it's a wall
        if (xStart < 0 || xEnd > this.width || yStart < 0) {
            return "wall";
        }

        // if the user hits the bottom margin, it counts as poison
        if (yEnd > this.height) {
            return "poison";
        }

        for (let y = yStart; y < yEnd; y++) {
            for (let x = xStart; x < xEnd; x++) {
                const fieldType = this.grid[y][x];
                if (fieldType) return fieldType;
            }
        }
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Level);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//  VECTOR CONSTRUCTOR
class Vector {
  constructor(x, y) {
    // constructor with x and y coordinates as an input
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const scale = 40; // scale units into pixels

// helper function to create an element in the dom and give it a class;

const createElement = (name, className) => {
    const element = document.createElement(name);
    if (className) element.className = className;
    return element;
};

class Display {
    constructor(parent, level) {
        this.wrapper = parent.appendChild(createElement('div', 'game')); // create wrapper for actual game (since screen will be slipping off)

        this.level = level;

        // tracks element that holds actors so they can be removed/replaced
        this.actorLayer = null; // background and actor layers important for time save

        this.wrapper.appendChild(this.drawBackground());

        this.drawActors = this.drawActors.bind(this);
    }

    // drawn once
    drawBackground() {
        const table = createElement('table', 'background');
        table.style.width = `${this.level.width * scale}px`; // sets specifc style, doesn't change other inline styles

        // iterate over each row of the previously built out grid (full of just words)
        this.level.rows.forEach(row => {

            // create row to append to the parent table
            const rowElement = table.appendChild(createElement('tr'));

            rowElement.style.height = `${scale}px`;

            row.forEach(fieldType => {
                // append individual tiles onto row
                rowElement.appendChild(createElement('td', fieldType));
            });
        });

        return table;
    }

    // drawn every time the display is updated with the given state
    drawActors(actors) {
        const wrapper = createElement('div');

        actors.forEach(actor => {
            const el = wrapper.appendChild(createElement('div', `actor ${actor.constructor.name.toLowerCase()}`)); // actor.constructor.name finds the name of the class of the actor
            el.style.width = `${actor.size.x * scale}px`;
            el.style.height = `${actor.size.y * scale}px`;
            el.style.left = `${actor.pos.x * scale}px`;
            el.style.top = `${actor.pos.y * scale}px`;
        });

        return wrapper;
    }

    drawFrame(state) {
        if (this.actorLayer) this.actorLayer.remove();
        this.actorLayer = this.drawActors(state.actors);
        this.wrapper.appendChild(this.actorLayer);
        this.wrapper.className = `game ${state.status}`;
        this.scrollPlayerIntoView(state);
    }

    scrollPlayerIntoView(state) {
        const width = this.wrapper.clientWidth; // takes width of game div
        const height = this.wrapper.clientHeight;
        const margin = width / 3; // it bugs out if I try too hard to make it centered???

        const left = this.wrapper.scrollLeft;
        const right = left + width;
        const top = this.wrapper.scrollTop;
        const bottom = top + height;

        const player = state.player;
        let center = player.pos.plus(player.size.times(0.5).times(scale)); // to find the player's center, we add the position + half the size


        // if we set scrollLeft or scrollTop to negative number, it will re-center to 0
        // margin creates a "neutral" area to not force player into the center
        if (center.x < left + margin) {
            this.wrapper.scrollLeft = center.x - margin;
        } else if (center.x > right - margin) {
            this.wrapper.scrollLeft = center.x + margin - width;
        }

        if (center.y < top + margin) {
            this.wrapper.scrollTop = center.y - margin;
        } else if (center.y > bottom - margin) {
            this.wrapper.scrollTop = center.y + margin - height;
        }
    }

    clear() {
        // odd syntax to remove the wrapper because htmlelements are weird!
        this.wrapper.parentNode.removeChild(this.wrapper);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Display);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const levelMaps = [["                      ", "                      ", "  x              = x  ", "  x       xxxxxx   !  ", "  x 1              x  ", "  xxxxx  wwwww     x  ", "      xppppppppppppx  ", "      xxxxxxxxxxxxxx  ", "                      "], ["                      ", "                      ", "   v                  ", "          v           ", "                      ", "              v       ", "                      ", "     v                ", "                      ", "                      ", "  x              = x  ", "  x             o  x  ", "  x @         = xx x  ", "  xxxxx    xx    = x  ", "      xxx!!!!!!!!!!x  ", "      xxxxx!!!!xxxxx  ", "                      "]];

/* harmony default export */ __webpack_exports__["a"] = (levelMaps);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// unsure how to manage current player

class State {
    constructor(level, actors, status, player) {
        this.level = level;
        this.actors = actors;
        this.player = this.actors.find(a => a.constructor.name === 'Player');
        // this.currPlayer = currPlayer;
        this.status = status;
    }

    static start(level) {
        return new State(level, level.actors, "playing", this.player);
    }

    overlap(actor, other) {
        return actor.pos.x + actor.size.x > other.pos.x && actor.pos.x < other.pos.x + other.size.x && actor.pos.y + actor.size.y > other.pos.y && actor.pos.y < other.pos.y + other.size.y;
    }

    update(time, keys) {
        let actors = this.actors.map(actor => actor.update(time, this, keys));
        let newState = new State(this.level, actors, this.status);
        if (newState.status != 'playing') return newState;

        let player = newState.player;

        if (this.level.touching(player.pos, player.size) === 'poison') {
            return new State(this.level, actors, 'lost');
        }

        // if (keys.esc) {
        //     return new State(this.level, actors, 'paused');
        // }

        for (let actor of actors) {
            if (actor != player && this.overlap(actor, player)) {
                newState = actor.collide(newState);
            }
        }

        return newState;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (State);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(otherVector) {
        return new Vector(this.x + otherVector.x, this.y + otherVector.y);
    }

    // to get distance traveled during a particular time
    times(factor) {
        return new Vector(this.x * factor, this.y * factor);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Vector);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vector__ = __webpack_require__(6);



class Finley extends __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */] {
    constructor(pos) {
        // -.5 and 1.5 to compensate for tilemap
        super(this.pos, this.size, this.speed, this.jumpSpeed, this.gravity);
    }
}

/* unused harmony default export */ var _unused_webpack_default_export = (Finley);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(6);


class Player {
    constructor(pos) {
        // this.pos = pos;
        // this.size = size;
        // this.speed = speed;
        // this.jumpSpeed = jumpSpeed;
        // this.gravity = gravity;
        this.pos = pos.plus(new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, -0.5));
        this.size = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](.8, 1.5);
        this.speed = .5;
        this.jumpSpeed = 7;
        this.gravity = -10;
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Player);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__lib_lava__ = __webpack_require__(10);




class Poison {
    constructor(pos, ch, reset) {
        this.pos = pos;
        this.size = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](1, 1);

        switch (ch) {
            case '=':
                this.speed = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](2, 0); // sideways lava
                break;
            case '|':
                this.speed = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, 2); // speed in terms of vector, up & down
                break;
            case 'v':
                this.speed = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, 3);
                this.repeatPos - pos; // original starting position
                break;
            default:
                this.speed = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, 0);
                break;
        }

        this.resetPos = pos;
    }

    collide(state) {
        return new __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */](state.level, state.actors, 'lost');
    }

    update(time, state) {
        let newPos = this.pos.plus(this.speed.times(time));
        // if poison touching a wall, just reset
        if (!state.level.touches(newPos, this.size, 'wall')) {
            return new Poison(newPos, this.speed, this.resetPos);
        } else if (this.resetPos) {
            return new Poison(this.resetPos, this.speed, this.resetPos);
        } else {
            return new Poison(this.pos, this.speed.times(-1));
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Poison);

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(2);


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

/* unused harmony default export */ var _unused_webpack_default_export = (Lava);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map