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

    moveX(time, state, keys, overlap) {
        this.speed.x = 0;
        if (keys.left && this === state.player && !(overlap === 'rightOverlap')) this.speed.x -= this.xSpeed;
        if (keys.right && this === state.player && !(overlap === 'leftOverlap')) this.speed.x += this.xSpeed;

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

        const movedX = this.pos.plus(new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](this.speed.x * time, 0));
        if (state.level.touching(movedX, this.size) !== 'wall') {
            this.pos = movedX;
        }
    }

    moveY(time, state, keys, overlap) {
        this.speed.y += time * state.gravity;
        const motion = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, this.speed.y * time);
        const newPos = this.pos.plus(motion);
        const obstacle = state.level.touching(newPos, this.size);
        if (obstacle || overlap === 'topOverlap' && this === state.player) {
            if (overlap === 'topOverlap' && this.speed.y < 0) {
                this.pos = newPos;
            } else if (obstacle === 'trampoline') {
                this.speed.y = -this.jumpSpeed;
                this.jumpSpeed = -this.jumpSpeed;
            } else if (keys.up && (this.speed.y >= 0 || overlap === 'topOverlap') && this === state.player) {
                this.speed.y = -this.jumpSpeed;
            } else if (['water', 'instruction', 'trampoline'].includes(obstacle)) {
                // console.log('hi');
                this.pos = newPos;
            } else {
                this.speed.y = 0;
            }
        } else {
            this.pos = newPos;
        }
    }

    update(time, state, keys) {
        let overlap;
        for (let actor of state.actors) {
            if (actor !== state.player) {
                overlap = state.overlap(this, actor);
                if (overlap) break;
            }
        }

        this.moveX(time, state, keys, overlap);
        this.moveY(time, state, keys, overlap);

        const Actor = this.constructor;
        return new Actor(this.pos, null, new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](this.speed.x, this.speed.y));
    }

}

/* harmony default export */ __webpack_exports__["a"] = (Player);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(0);


// unsure how to manage current player

class State {
    constructor(level, actors, status, player, switchKey, gravity, finleyStatus, frankieStatus) {
        this.level = level;
        this.actors = actors;
        this.player = this.actors.find(actor => actor.constructor.name === player.constructor.name);
        this.nonPlayers = this.actors.filter(actor => Object.getPrototypeOf(Object.getPrototypeOf(actor)).constructor.name === 'Player' && actor !== this.player);
        this.status = status;
        if (this.level.width === 66 && this.player.pos.y < 50 && this.player.pos.y > 4) {
            this.gravity = -.3;
        } else {
            this.gravity = gravity || 10;
        }
        // console.log(this.gravity);
        // if (this.level.width === 15) this.gravity = -1;
        // this.finleyStatus = finleyStatus || null;
        // this.frankieStatus = frankieStatus || null;
        // console.log (this.finleyStatus);
        // console.log (this.frankieStatus);

        // to check whether switch is currently being pressed to prevent repeat switching on update
        this.switch = switchKey;
    }

    static start(level) {
        return new State(level, level.actors, "playing", level.actors.find(a => a.constructor.name === 'Finley'));
    }

    overlap(player, actor) {

        if (Object.getPrototypeOf(Object.getPrototypeOf(actor)).constructor.name === 'Player') {

            // player on top if actor.y - player.y > 0
            // player on bottom if actor.y - player.y < 0

            // player on left if actor.x - player.x > 0
            // player on right if actor.x - player.x < 0

            // if player.pos.x + player.size.x  / 2 (center of player) - actor.pos.x + actor.size.x / 2 (center of actor) +-.01(-(player.size.x / 2 + actor.size.x/2)) -- player can't move right

            const horizontalOverlap = player.pos.x + player.size.x / 2 - (actor.pos.x + actor.size.x / 2);
            const horizontalDistance = player.size.x / 2 + actor.size.x / 2;

            const verticalOverlap = player.pos.y + player.size.y / 2 - (actor.pos.y + actor.size.y / 2);
            const verticalDistance = player.size.y / 2 + actor.size.y / 2;

            // if (horizontalOverlap >= horizontalDistance - .2 && horizontalOverlap <= horizontalDistance + .2) { console.log('left overlap', horizontalDistance); }

            // if (-horizontalOverlap >= horizontalDistance - .2 && horizontalOverlap <= horizontalDistance + .2) { console.log('right overlap', horizontalDistance); }

            // if (verticalOverlap >= verticalDistance - .2 && verticalOverlap <= verticalDistance + .2) { console.log('bottom overlap', verticalDistance); }

            if (-verticalOverlap >= verticalDistance - .1 && -verticalOverlap <= verticalDistance + .1 && (player.pos.x + player.size.x > actor.pos.x && player.pos.x + player.size.x < actor.pos.x + actor.size.x || player.pos.x > actor.pos.x && player.pos.x < actor.pos.x + actor.size.x || player.pos.x < actor.pos.x && player.pos.x + player.size.x > actor.pos.x + actor.size.x || player.pos.x > actor.pos.x && player.pos.x + player.size.x < actor.pos.x + actor.size.x)) {
                debugger;return 'topOverlap';
            }

            if (verticalOverlap >= verticalDistance - .1 && verticalOverlap <= verticalDistance + .1 && (player.pos.x + player.size.x > actor.pos.x && player.pos.x + player.size.x < actor.pos.x + actor.size.x || player.pos.x > actor.pos.x && player.pos.x < actor.pos.x + actor.size.x || player.pos.x < actor.pos.x && player.pos.x + player.size.x > actor.pos.x + actor.size.x || player.pos.x > actor.pos.x && player.pos.x + player.size.x < actor.pos.x + actor.size.x)) {
                debugger;return 'bottomOverlap';
            }

            if (-horizontalOverlap >= horizontalDistance - .1 && -horizontalOverlap <= horizontalDistance + .1 && (player.pos.y + player.size.y > actor.pos.y && player.pos.y + player.size.y < actor.pos.y + actor.size.y || player.pos.y > actor.pos.y && player.pos.y < actor.pos.y + actor.size.y || player.pos.y < actor.pos.y && player.pos.y + player.size.y > actor.pos.y + actor.size.y || player.pos.y > actor.pos.y && player.pos.y + player.size.y < actor.pos.y + actor.size.y)) {
                debugger;return 'leftOverlap';
            }

            if (horizontalOverlap >= horizontalDistance - .1 && horizontalOverlap <= horizontalDistance + .1 && (player.pos.y + player.size.y > actor.pos.y && player.pos.y + player.size.y < actor.pos.y + actor.size.y || player.pos.y > actor.pos.y && player.pos.y < actor.pos.y + actor.size.y || player.pos.y < actor.pos.y && player.pos.y + player.size.y > actor.pos.y + actor.size.y || player.pos.y > actor.pos.y && player.pos.y + player.size.y < actor.pos.y + actor.size.y)) {
                debugger;return 'rightOverlap';
            }

            // console.log(horizontalOverlap, "vo", verticalDistance, "vd");

            // console.log(-verticalOverlap > verticalDistance - .2 && -verticalOverlap < verticalDistance + .2, verticalOverlap, verticalDistance);

            // const leftOverlap = (player.pos.x + player.size.x > actor.pos.x && player.pos.x < actor.pos.x);

            // const rightOverlap = (player.pos.x < actor.pos.x + actor.size.x && player.pos.x + player.size.x > actor.pos.x + actor.size.x);

            // const topOverlap = (player.pos.y + player.size.y > actor.pos.y && player.pos.y < actor.pos.y);

            // const bottomOverlap = (player.pos.y < actor.pos.y + actor.size.y && player.pos.y + player.size.y > actor.pos.y + actor.size.y);


            // if (leftOverlap && !rightOverlap && (topOverlap || bottomOverlap)) {
            //     debugger;
            //     return 'left';
            // }

            // if (rightOverlap && !leftOverlap && (topOverlap || bottomOverlap)) {
            //     debugger;            
            //     return 'right';
            // }

            // if (topOverlap && !bottomOverlap && (leftOverlap || rightOverlap)) {
            //     debugger;
            //     return 'top';
            // }

            // if (bottomOverlap && !topOverlap && (leftOverlap || rightOverlap)) {
            //     debugger;
            //     return 'bottom';
            // }
        } else {
            return player.pos.x + player.size.x > actor.pos.x && player.pos.x < actor.pos.x + actor.size.x && player.pos.y + player.size.y > actor.pos.y && player.pos.y < actor.pos.y + actor.size.y;
        }
    }

    // any place I return keys.switch is to make sure the user doesn't hold down the switch key and have the characters switch rapidly between each other
    update(time, keys) {

        const oldPos = this.player.pos;

        let actors = this.actors.map(actor => actor.update(time, this, keys));

        // if s is being pressed and wasn't already being pressed, AND if the current player isn't jumping/falling/etc, switch player
        if (keys.switch && !this.switch && this.player.speed.y === 0) return new State(this.level, actors, this.status, this.nonPlayers[0], keys.switch);

        let newState = new State(this.level, actors, this.status, this.player, keys.switch, null, this.finleyStatus, this.frankieStatus);
        if (newState.status !== 'playing') return newState;

        let player = newState.player;

        switch (this.level.touching(player.pos, player.size)) {
            case 'poison':
                return new State(this.level, actors, 'lost', this.player);
            case 'trampoline':
                return new State(this.level, actors, 'playing', this.player, keys.switch, -this.gravity, this.finleyStatus, this.frankieStatus);
            case 'finleyGoal':
                this.player.pos = oldPos;
                this.player.speed = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, 0);
                return new State(this.level, actors, 'won', this.player);
            default:
                break;
        }

        // if (player.constructor.name === 'Finley' && this.level.touching(player.pos, player.size) === 'finleyGoal') {
        //     if (this.status === 'frankieWon') return new State(this.level, actors, 'won');
        //     return new State(this.level, actors, this.status, this.player, this.switch, this.gravity, 'finleyWon', this.frankieStatus);
        // } else if (player.constructor.name === 'Frankie' && this.level.touching(player.pos, player.size) == 'frankieGoal') {
        //     if (this.status === 'finleyWon') return new State(this.level, actors, 'won');
        //     return new State(this.level, actors, this.status, this.player, this.switch, this.gravity, this.finleyStatus, 'frankieWon');
        // }

        // if ((this.level.touching(player.pos, player.size)) === 'finleyGoal' || 'frankieGoal') {
        //     return new State(this.level, actors, 'won');
        // }

        // if (keys.esc) {
        //     return new State(this.level, actors, 'paused');
        // }

        for (let actor of actors) {
            const overlap = this.overlap(player, actor);
            if (overlap && Object.getPrototypeOf(Object.getPrototypeOf(actor)).constructor.name !== 'Player') return actor.collide(newState);
        }

        // const overlap = this.overlap(player, actor);
        // if (overlap && Object.getPrototypeOf(Object.getPrototypeOf(actor)).constructor.name !== 'Player') {
        //     newState = actor.collide(newState);
        // }
        // }

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__display__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__level_maps__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__state__ = __webpack_require__(2);





const keyCodes = {
    37: 'left',
    38: 'up',
    39: 'right',
    83: 'switch'
};

const audio = document.getElementById('intro');
const finish = document.getElementById('level-finish');
audio.volume = finish.volume = 0.2;

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
        // console.log(state.status);
        if (state.status === 'playing') {
            // console.log(state.status);
            return true;
        } else if (ending > 0) {
            // debugger;
            finish.play();
            ending -= time;
            return true;
        } else {
            // debugger;
            display.clear();
            successFunction(state.status);
            return false;
        }
    });
};

const runGame = () => {
    audio.play();
    const startLevel = n => {
        runLevel(new __WEBPACK_IMPORTED_MODULE_0__level__["a" /* default */](__WEBPACK_IMPORTED_MODULE_2__level_maps__["a" /* default */][n]), status => {
            // debugger;
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__frankie__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__poison__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__player__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__goals__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_constants__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_constants___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_constants__);








const actorChars = {
    'i': __WEBPACK_IMPORTED_MODULE_1__finley__["a" /* default */],
    'r': __WEBPACK_IMPORTED_MODULE_2__frankie__["a" /* default */],
    // '1': Player,
    '=': __WEBPACK_IMPORTED_MODULE_3__poison__["a" /* default */], '|': __WEBPACK_IMPORTED_MODULE_3__poison__["a" /* default */], 'v': __WEBPACK_IMPORTED_MODULE_3__poison__["a" /* default */],
    '!': __WEBPACK_IMPORTED_MODULE_5__goals__["a" /* FinleyGoal */], '@': __WEBPACK_IMPORTED_MODULE_5__goals__["b" /* FrankieGoal */]
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
                        case 't':
                            fieldType = 'trampoline';
                            break;
                        case '1':
                            fieldType = 'instruction one';
                            break;
                        case 'a':
                            fieldType = 'instruction awhile';
                            break;
                        case '2':
                            fieldType = 'instruction two';
                            break;
                        case '3':
                            fieldType = 'instruction three';
                            break;
                        case '4':
                            fieldType = 'instruction four';
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vector__ = __webpack_require__(0);



class Frankie extends __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */] {
    constructor(pos, ch, speed, size, xSpeed, jumpSpeed) {
        const frankieSize = size || new __WEBPACK_IMPORTED_MODULE_1__vector__["a" /* default */](1.5, .8);
        const frankieXSpeed = xSpeed || 4;
        const frankieJumpSpeed = jumpSpeed || 6;
        super(pos, ch, speed, frankieSize, frankieXSpeed, frankieJumpSpeed);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Frankie);

/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports) {

module.exports = {"O_RDONLY":0,"O_WRONLY":1,"O_RDWR":2,"S_IFMT":61440,"S_IFREG":32768,"S_IFDIR":16384,"S_IFCHR":8192,"S_IFBLK":24576,"S_IFIFO":4096,"S_IFLNK":40960,"S_IFSOCK":49152,"O_CREAT":512,"O_EXCL":2048,"O_NOCTTY":131072,"O_TRUNC":1024,"O_APPEND":8,"O_DIRECTORY":1048576,"O_NOFOLLOW":256,"O_SYNC":128,"O_SYMLINK":2097152,"O_NONBLOCK":4,"S_IRWXU":448,"S_IRUSR":256,"S_IWUSR":128,"S_IXUSR":64,"S_IRWXG":56,"S_IRGRP":32,"S_IWGRP":16,"S_IXGRP":8,"S_IRWXO":7,"S_IROTH":4,"S_IWOTH":2,"S_IXOTH":1,"E2BIG":7,"EACCES":13,"EADDRINUSE":48,"EADDRNOTAVAIL":49,"EAFNOSUPPORT":47,"EAGAIN":35,"EALREADY":37,"EBADF":9,"EBADMSG":94,"EBUSY":16,"ECANCELED":89,"ECHILD":10,"ECONNABORTED":53,"ECONNREFUSED":61,"ECONNRESET":54,"EDEADLK":11,"EDESTADDRREQ":39,"EDOM":33,"EDQUOT":69,"EEXIST":17,"EFAULT":14,"EFBIG":27,"EHOSTUNREACH":65,"EIDRM":90,"EILSEQ":92,"EINPROGRESS":36,"EINTR":4,"EINVAL":22,"EIO":5,"EISCONN":56,"EISDIR":21,"ELOOP":62,"EMFILE":24,"EMLINK":31,"EMSGSIZE":40,"EMULTIHOP":95,"ENAMETOOLONG":63,"ENETDOWN":50,"ENETRESET":52,"ENETUNREACH":51,"ENFILE":23,"ENOBUFS":55,"ENODATA":96,"ENODEV":19,"ENOENT":2,"ENOEXEC":8,"ENOLCK":77,"ENOLINK":97,"ENOMEM":12,"ENOMSG":91,"ENOPROTOOPT":42,"ENOSPC":28,"ENOSR":98,"ENOSTR":99,"ENOSYS":78,"ENOTCONN":57,"ENOTDIR":20,"ENOTEMPTY":66,"ENOTSOCK":38,"ENOTSUP":45,"ENOTTY":25,"ENXIO":6,"EOPNOTSUPP":102,"EOVERFLOW":84,"EPERM":1,"EPIPE":32,"EPROTO":100,"EPROTONOSUPPORT":43,"EPROTOTYPE":41,"ERANGE":34,"EROFS":30,"ESPIPE":29,"ESRCH":3,"ESTALE":70,"ETIME":101,"ETIMEDOUT":60,"ETXTBSY":26,"EWOULDBLOCK":35,"EXDEV":18,"SIGHUP":1,"SIGINT":2,"SIGQUIT":3,"SIGILL":4,"SIGTRAP":5,"SIGABRT":6,"SIGIOT":6,"SIGBUS":10,"SIGFPE":8,"SIGKILL":9,"SIGUSR1":30,"SIGSEGV":11,"SIGUSR2":31,"SIGPIPE":13,"SIGALRM":14,"SIGTERM":15,"SIGCHLD":20,"SIGCONT":19,"SIGSTOP":17,"SIGTSTP":18,"SIGTTIN":21,"SIGTTOU":22,"SIGURG":16,"SIGXCPU":24,"SIGXFSZ":25,"SIGVTALRM":26,"SIGPROF":27,"SIGWINCH":28,"SIGIO":23,"SIGSYS":12,"SSL_OP_ALL":2147486719,"SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION":262144,"SSL_OP_CIPHER_SERVER_PREFERENCE":4194304,"SSL_OP_CISCO_ANYCONNECT":32768,"SSL_OP_COOKIE_EXCHANGE":8192,"SSL_OP_CRYPTOPRO_TLSEXT_BUG":2147483648,"SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS":2048,"SSL_OP_EPHEMERAL_RSA":0,"SSL_OP_LEGACY_SERVER_CONNECT":4,"SSL_OP_MICROSOFT_BIG_SSLV3_BUFFER":32,"SSL_OP_MICROSOFT_SESS_ID_BUG":1,"SSL_OP_MSIE_SSLV2_RSA_PADDING":0,"SSL_OP_NETSCAPE_CA_DN_BUG":536870912,"SSL_OP_NETSCAPE_CHALLENGE_BUG":2,"SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG":1073741824,"SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG":8,"SSL_OP_NO_COMPRESSION":131072,"SSL_OP_NO_QUERY_MTU":4096,"SSL_OP_NO_SESSION_RESUMPTION_ON_RENEGOTIATION":65536,"SSL_OP_NO_SSLv2":16777216,"SSL_OP_NO_SSLv3":33554432,"SSL_OP_NO_TICKET":16384,"SSL_OP_NO_TLSv1":67108864,"SSL_OP_NO_TLSv1_1":268435456,"SSL_OP_NO_TLSv1_2":134217728,"SSL_OP_PKCS1_CHECK_1":0,"SSL_OP_PKCS1_CHECK_2":0,"SSL_OP_SINGLE_DH_USE":1048576,"SSL_OP_SINGLE_ECDH_USE":524288,"SSL_OP_SSLEAY_080_CLIENT_DH_BUG":128,"SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG":0,"SSL_OP_TLS_BLOCK_PADDING_BUG":512,"SSL_OP_TLS_D5_BUG":256,"SSL_OP_TLS_ROLLBACK_BUG":8388608,"ENGINE_METHOD_DSA":2,"ENGINE_METHOD_DH":4,"ENGINE_METHOD_RAND":8,"ENGINE_METHOD_ECDH":16,"ENGINE_METHOD_ECDSA":32,"ENGINE_METHOD_CIPHERS":64,"ENGINE_METHOD_DIGESTS":128,"ENGINE_METHOD_STORE":256,"ENGINE_METHOD_PKEY_METHS":512,"ENGINE_METHOD_PKEY_ASN1_METHS":1024,"ENGINE_METHOD_ALL":65535,"ENGINE_METHOD_NONE":0,"DH_CHECK_P_NOT_SAFE_PRIME":2,"DH_CHECK_P_NOT_PRIME":1,"DH_UNABLE_TO_CHECK_GENERATOR":4,"DH_NOT_SUITABLE_GENERATOR":8,"NPN_ENABLED":1,"RSA_PKCS1_PADDING":1,"RSA_SSLV23_PADDING":2,"RSA_NO_PADDING":3,"RSA_PKCS1_OAEP_PADDING":4,"RSA_X931_PADDING":5,"RSA_PKCS1_PSS_PADDING":6,"POINT_CONVERSION_COMPRESSED":2,"POINT_CONVERSION_UNCOMPRESSED":4,"POINT_CONVERSION_HYBRID":6,"F_OK":0,"R_OK":4,"W_OK":2,"X_OK":1,"UV_UDP_REUSEADDR":4}

/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const levelMaps = [["xxxxxxxxxxxxxxx                                  xxxxxx            ", "x             x                                  x  r x              ", "x   i         x                                  x    x              ", "x             x                                  x  @ x               ", "x             x                                  xxxxxx              ", "x             x                                    3      ", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x         1   x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x         a   x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x         2   x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x         !   x", "xxxxxxxxxxxxxxx"], ["                                                                ", "                      ", "                     ", " x                   ", " x                     ", " x                                           ", " x                                x          x         x", " x                                x          x         x", " x                              ! x          x         x", " x                      4         x          x         x", " x                                x          x         x", " x i                              xxxxxxxxxxxx      r  x", " x                                                     x", " xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"], ["                                                        ", " x                                                     x", " x                          !                          x", " x                                                     x", " x                      t                              x", " x                                                     x", " x                           t                         x", " x                    t                                x", " x                                                     x", " x               xxxxxxxxxxxxxxxxxx                    x", " x              xxxxxxxxxxxxxxxxxxxx                   x", " x i           xxxxxxxxxxxxxxxxxxxxxx               r  x", " x            xxxxxxxxxxxxxxxxxxxxxxxx                 x", " xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"], ["x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x             x", "x    i    r   x", "x             x", "xxxxxxxxxxxxxxx"]];

/* harmony default export */ __webpack_exports__["a"] = (levelMaps);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vector__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__state__ = __webpack_require__(2);



class FrankieGoal {
    constructor(pos, ch) {
        this.pos = pos;
        this.ch = ch;
        this.size = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](1.5, .8);
    }

    update() {
        return this;
    }

    collide(state) {
        return new __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */](state.level, state.actors, state.status, state.player, state.switchKey, state.gravity, state.finleyStatus, 'true');
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = FrankieGoal;


class FinleyGoal {
    constructor(pos, ch) {
        this.pos = pos.plus(new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](0, -.5));
        this.ch = ch;
        this.size = new __WEBPACK_IMPORTED_MODULE_0__vector__["a" /* default */](.8, 1.5);
    }

    update() {
        return this;
    }

    collide(state) {
        return new __WEBPACK_IMPORTED_MODULE_1__state__["a" /* default */](state.level, state.actors, state.status, state.player, state.switchKey, state.gravity, 'true', state.frankieStatus);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FinleyGoal;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map