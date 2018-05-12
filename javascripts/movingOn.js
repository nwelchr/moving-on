import Level from './level';
import Display from './display';
import levelMaps from './level_maps';
import State from './state';

const keyCodes = {
    37: 'left',
    38: 'up',
    39: 'right',
    83: 'switch'
};

const audio = document.getElementById('intro');
audio.volume = 0.2;
audio.loop = true;
let isPlaying = false;

const finish = document.getElementById('level-finish');
finish.volume = 0.05;

const pauseModal = document.querySelector('.pause-modal');
const pauseButton = document.querySelector('.unpause');
const restartButton = document.querySelector('.restart');
const titleScreen = document.querySelector('.title-screen');
const startButton = document.querySelector('.start');

const gameWrapper = document.getElementById('game-wrapper');

class Game {
    constructor() {
        this.musicIsPlaying = false;
        this.gameIsRunning = true;
        this.keys = Object.create(null);
        this.levelId = 0;
        this.display = {};
        this.state = {};
        this.ending = 0;
        this.lastTime = null;
    }

    trackKeys(e) {
        if (keyCodes.hasOwnProperty(e.keyCode)) {
            e.preventDefault();
            const isKeydown = (e.type === 'keydown');
            this.keys[keyCodes[e.keyCode]] = isKeydown;
        }
    }

    startGame() {
        this.musicIsPlaying = true;
        audio.play();
    
        titleScreen.classList.remove('show');
        this.startLevel(0);
    }

    startLevel() {
        this.runLevel(new Level(levelMaps[this.levelId], this.levelId + 1), this.statusFunction);
    }

    statusFunction(status) {
        if (status.includes('lost')) {
            this.startLevel();
        } else if (this.levelId < levelMaps.length - 1) {
            this.levelId += 1;
            this.startLevel();
        } else {
            this.titleScreen.classList.add('show');
        }
    }

    rotateLevel10() {
        const wrap = document.getElementById('game-wrapper');
        wrap.classList.add('rotated');
    }

    frameFunction(time) {
        this.state = this.state.update(time, this.keys);
        this.display.drawFrame(this.state);

        if (this.state.status.includes('playing')) {
            return true;
        } else if (this.ending > 0) {
            finish.play();
            this.ending -= time;
            return true;
        } else {
            this.display.clear('else statement of runAnimation', this.state.status);
            this.statusFunction(this.state.status);
            return false;
        }
    }

    runLevel(level, statusFunction) {
        this.display = new Display(gameWrapper, level);
        this.state = State.start(level);
        this.ending = 1;
    
        // Rotate on the 10th level after 10 seconds
        if (level.levelId === 10) setTimeout(this.rotateLevel10, 10000);
        else if (gameWrapper.classList.contains('rotated')) {
            gameWrapper.classList.remove('rotated');
        }
           
        this.runAnimation(this.frameFunction);
    }

    runAnimation(frameFunction) {
        // last time since window has been open
        this.lastTime = null;
    
        if (this.gameIsRunning) requestAnimationFrame(this.frame);
    }

    frame(time) {
        if (this.gameIsRunning === false) {
            return;
        }

        if (this.lastTime !== null) {
            // converts time between ms and s for convenience
            let timeStep = Math.min(time - this.lastTime, 100) / 1000;
            if (this.frameFunction(timeStep) === false) return;
        }

        this.lastTime = time;
        requestAnimationFrame(this.frame);
    }

    restartLevel(e)  {
        e.preventDefault();
        this.gameIsRunning = !this.gameIsRunning;
        pauseModal.classList.toggle("show");

        this.musicIsPlaying = false;
        audio.pause();

        this.ending = 0;

        this.display.clear('restart button clicked', this.state.status);
        this.statusFunction('lost');
    }

}


const game = new Game;
game.trackKeys();
game.startGame();

restartButton.addEventListener('click', game.restartLevel());
window.addEventListener('keydown', game.trackKeys);
window.addEventListener('keyup', game.trackKeys);

