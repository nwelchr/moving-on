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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(0);


class Player {
    constructor(pos, ch, speed, size, xSpeed, jumpSpeed) {
        this.pos = pos;
        this.speed = speed || new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, 0); // initial speed
        this.size = size;
        this.xSpeed = xSpeed;
        this.jumpSpeed = jumpSpeed;
    }

    moveX(time, state, keys) {
        // this.speed.x = 0;
        // if (keys.left) this.speed.x -= this.xSpeed;
        // if (keys.right) this.speed.x += this.xSpeed;
        if ((keys.left || keys.right || keys.up) && this === state.player) {
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

        const movedX = this.pos.plus(new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](this.speed.x * time, 0));
        if (state.level.touching(movedX, this.size) !== 'wall') {
            this.pos = movedX;
        }
    }

    moveY(time, state, keys) {
        this.speed.y += time * state.gravity;
        const motion = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, this.speed.y * time);
        const newPos = this.pos.plus(motion);
        const obstacle = state.level.touching(newPos, this.size);
        if (obstacle) {
            if (keys.up && this.speed.y >= 0 && this === state.player) {
                this.speed.y = -this.jumpSpeed;
            } else {
                this.speed.y = 0;
            }
        } else {
            this.pos = newPos;
        }
    }

    update(time, state, keys) {
        this.moveX(time, state, keys);
        this.moveY(time, state, keys);

        const Actor = this.constructor;
        return new Actor(this.pos, null, new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](this.speed.x, this.speed.y));
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Player);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// unsure how to manage current player

class State {
    constructor(level, actors, status, player) {
        this.level = level;
        this.actors = actors;
        // this.player = this.actors.find(a => a.constructor.name === 'Player');
        // this.player = this.actors.find(a => a.constructor.name === 'Finley'); 
        console.log(player);
        this.player = this.actors.find(actor => actor.constructor.name === player.constructor.name);
        this.nonPlayers = this.actors.filter(actor => Object.getPrototypeOf(Object.getPrototypeOf(actor)).constructor.name === 'Player' && actor !== this.player);
        // console.log(this.player, this.nonPlayers);
        // this.currPlayer = currPlayer;
        this.status = status;
        this.gravity = 10;

        this.switchPlayer = this.switchPlayer.bind(this);
    }

    static start(level) {
        return new State(level, level.actors, "playing", level.actors.find(a => a.constructor.name === 'Finley'));
    }

    overlap(actor, other) {
        return actor.pos.x + actor.size.x > other.pos.x && actor.pos.x < other.pos.x + other.size.x && actor.pos.y + actor.size.y > other.pos.y && actor.pos.y < other.pos.y + other.size.y;
    }

    switchPlayer() {
        return this.nonPlayers[0];
    }

    update(time, keys) {
        let actors = this.actors.map(actor => actor.update(time, this, keys));
        if (keys.switch) return new State(this.level, actors, this.status, this.nonPlayers[0]);

        let newState = new State(this.level, actors, this.status, this.player);
        if (newState.status !== 'playing') return newState;

        let player = newState.player;

        switch (this.level.touching(player.pos, player.size)) {
            case 'poison':
                return new State(this.level, actors, 'lost', this.player);
            case 'finleyGoal':
                return new State(this.level, actors, 'won', this.player);
            default:
                break;
        }

        // if (keys.esc) {
        //     return new State(this.level, actors, 'paused');
        // }

        for (let actor of actors) {
            if (Object.getPrototypeOf(Object.getPrototypeOf(actor)).constructor.name !== 'Player' && this.overlap(actor, player)) {
                newState = actor.collide(newState);
            }
        }

        return newState;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (State);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__level__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__display__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__level_maps__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__state__ = __webpack_require__(2);





const keyCodes = {
    37: 'left',
    38: 'up',
    39: 'right',
    83: 'switch'
};

const detectKeys = () => {
    // to avoid error with indexing into something that doesn't exist
    const isPressed = Object.create(null);

    const track = e => {
        if (keyCodes.hasOwnProperty(e.keyCode)) {
            e.preventDefault();
            const isKeydown = e.type === 'keydown';
            isPressed[keyCodes[e.keyCode]] = isKeydown;
        }
    };

    window.addEventListener('keydown', track);
    window.addEventListener('keyup', track);

    return isPressed;
};

// calls requestAnimation again after every frame
const runAnimation = frameFunction => {
    // last time since window has been open
    let lastTime = null;

    const frame = time => {
        if (lastTime !== null) {
            // converts time between ms and s for convenience
            let timeStep = Math.min(time - lastTime, 100) / 1000;
            if (frameFunction(timeStep) === false) return;
        }

        lastTime = time;
        requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
};

const runLevel = (level, successFunction) => {
    const gameWrapper = document.getElementById('game-wrapper');
    const display = new __WEBPACK_IMPORTED_MODULE_1__display__["a" /* default */](gameWrapper, level);
    let state = __WEBPACK_IMPORTED_MODULE_3__state__["a" /* default */].start(level);
    let ending = 1;

    runAnimation(time => {
        state = state.update(time, keys);
        display.drawFrame(state);
        if (state.status === 'playing') {
            return true;
        } else if (ending > 0) {
            ending -= time;
            return true;
        } else {
            display.clear();
            successFunction(state.status);
            return false;
        }
    });
};

const runGame = () => {

    const startLevel = n => {
        runLevel(new __WEBPACK_IMPORTED_MODULE_0__level__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__level_maps__["a" /* default */][n]), status => {
            if (status === 'lost') {
                startLevel(n);
            } else if (n < __WEBPACK_IMPORTED_MODULE_2__level_maps__["a" /* default */].length - 1) {
                startLevel(n + 1);
            } else {
                alert('you win!');
            }
        });
    };

    // goToTitleScreen();
    startLevel(0);
};

const keys = detectKeys();
runGame();

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__finley__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__frankie__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__poison__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__player__ = __webpack_require__(1);






const actorChars = {
    '1': __WEBPACK_IMPORTED_MODULE_1__finley__["a" /* default */],
    '2': __WEBPACK_IMPORTED_MODULE_2__frankie__["a" /* default */],
    // '1': Player,
    '=': __WEBPACK_IMPORTED_MODULE_3__poison__["a" /* default */], '|': __WEBPACK_IMPORTED_MODULE_3__poison__["a" /* default */], 'v': __WEBPACK_IMPORTED_MODULE_3__poison__["a" /* default */]
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
        // console.log (xStart, xEnd, yStart, yEnd);

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
                const fieldType = this.rows[y][x];
                // console.log(fieldType);
                if (fieldType) return fieldType;
            }
        }
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Level);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vector__ = __webpack_require__(0);



class Finley extends __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */] {
    constructor(pos, ch, speed, size, xSpeed, jumpSpeed) {
        const finleySize = size || new __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* default */](.8, 1.5);
        const finleyXSpeed = xSpeed || 7;
        const finleyJumpSpeed = jumpSpeed || 7;
        super(pos, ch, speed, finleySize, finleyXSpeed, finleyJumpSpeed);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Finley);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(2);



class Poison {
    constructor(pos, ch, speed, resetPos) {
        this.pos = pos;
        this.size = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](1, 1);
        this.ch = ch;

        switch (ch) {
            case '=':
                this.speed = speed || new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](2, 0); // sideways lava
                break;
            case '|':
                this.speed = speed || new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, 2); // speed in terms of vector, up & down
                break;
            case 'v':
                this.speed = speed || new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, 3);
                this.resetPos = resetPos || pos; // original starting position
                break;
            default:
                this.speed = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, 0);
                break;
        }
    }

    collide(state) {
        return new __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */](state.level, state.actors, 'lost', state.player);
    }

    update(time, state) {
        const newPos = this.pos.plus(this.speed.times(time));
        // if poison touching a wall, just reset
        if (!state.level.touching(newPos, this.size)) {
            return new Poison(newPos, this.ch, this.speed, this.resetPos);
        } else if (this.resetPos) {
            return new Poison(this.resetPos, this.ch, this.speed, this.resetPos);
        } else {
            return new Poison(this.pos, this.ch, this.speed.times(-1));
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Poison);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const scale = 60; // scale units into pixels

// helper function to create an element in the dom and give it a class;

const createElement = (name, className) => {
    const element = document.createElement(name);
    if (className) element.className = className;
    return element;
};

class Display {
    constructor(parent, level) {
        this.wrapper = parent.appendChild(createElement('div', 'game')); // create wrapper for actual game (since screen will be slipping off)
        // this.wrapper = parent;

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
        // console.log(player);
        const center = player.pos.plus(player.size.times(0.5)).times(scale); // to find the player's center, we add the position + half the size


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
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const levelMaps = [["  x                                                    ", "  x                    ", "  x                    ", "  x             v      ", "  x                    ", "  x                    ", "  x                    ", "  x      |                                        = ", "  x         !      x  x                    =x", "  x 12     xxxxxx   x  x                =x", "  x             =  x  x", "  xxxxx            x  xxxxxxxxxxxxxxx", "      xppwwwwwpppppx  ", "      xxxxxxxxxxxxxx  ", "                      "], ["                      ", "                      ", "   v                  ", "          v           ", "                      ", "              v       ", "                      ", "                     ", "                      ", "                      ", "  x              = x  ", "  x 1              x  ", "  x         !   xx x  ", "  xxxxx    xx    = x  ", "      xxxxxxxxxxxxxx  ", "      xxxxxxxxxxxxxx  ", "                      "]];

/* harmony default export */ __webpack_exports__["a"] = (levelMaps);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vector__ = __webpack_require__(0);



class Frankie extends __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */] {
    constructor(pos, ch, speed, size, xSpeed, jumpSpeed) {
        const frankieSize = size || new __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* default */](1.5, .8);
        const frankieXSpeed = xSpeed || 5;
        const frankieJumpSpeed = jumpSpeed || 5;
        super(pos, ch, speed, frankieSize, frankieXSpeed, frankieJumpSpeed);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Frankie);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map