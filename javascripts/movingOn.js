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

    statusFunction (status) {
        if (status.includes('lost')) {
            this.startLevel();
        } else if (this.levelId < levelMaps.length - 1) {
            this.levelId += 1;
            this.startLevel();
        } else {
            this.titleScreen.classList.add('show');
        }
    }

    runLevel (level, statusFunction) {
        const display = new Display(gameWrapper, level);
        let state = State.start(level);
        let ending = 1;
    
        // Rotate on the 10th level after 10 seconds

        if (level.levelId === 10) {
            setTimeout(rotate, 10000);
        } else if (gameWrapper.classList.contains('rotated')) {
                gameWrapper.classList.remove('rotated');
        }
    
        const rotate = () => {
            const wrap = document.getElementById('game-wrapper');
            wrap.classList.add('rotated');
        };
    
        restartButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.gameIsRunning = !this.gameIsRunning;
            pauseModal.classList.toggle("show");
    
            this.musicIsPlaying = false;
            audio.pause();
    
            ending = 0;
    
            display.clear('restart button clicked', state.status);
            statusFunction('lost');
            return;
        });
    
        const frameFunction = time => {
            state = state.update(time, this.keys);
            display.drawFrame(state);
    
            if (state.status.includes('playing')) {
                return true;
            } else if (ending > 0) {
                finish.play();
                ending -= time;
                return true;
            } else {
                display.clear('else statement of runAnimation', state.status);
                statusFunction(state.status);
                return false;
            }
        };
    
    
        this.runAnimation(frameFunction);
    }

    runAnimation (frameFunction) {
        // last time since window has been open
        let lastTime = null;
    
        const frame = (time) => {
            if (this.gameIsRunning === false) {
                return;
            }
    
            if (lastTime !== null) {
                // converts time between ms and s for convenience
                let timeStep = Math.min(time - lastTime, 100) / 1000;
                if (frameFunction(timeStep) === false) return;
            }
    
            lastTime = time;
            requestAnimationFrame(frame);
        };
    
        if (this.gameIsRunning) requestAnimationFrame(frame);
    }
}


window.addEventListener('keydown', Game.trackKeys);
window.addEventListener('keyup', Game.trackKeys);

