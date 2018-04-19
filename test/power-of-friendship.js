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
const finish = document.getElementById('level-finish');
audio.volume = finish.volume = 0.2;

const detectKeys = () => {
    // to avoid error with indexing into something that doesn't exist
    const isPressed = Object.create(null);

    const track = (e) => {
        if (keyCodes.hasOwnProperty(e.keyCode)) {
            e.preventDefault();
            const isKeydown = (e.type === 'keydown');
            isPressed[keyCodes[e.keyCode]] = isKeydown;
        }
    };

    window.addEventListener('keydown', track);
    window.addEventListener('keyup', track);
    
    return isPressed;
};

// calls requestAnimation again after every frame
const runAnimation = (frameFunction) => {
    // last time since window has been open
    let lastTime = null;

    const frame = (time) => {
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
    const display = new Display(gameWrapper, level);
    let state = State.start(level);
    let ending = 1;


    runAnimation(time => {
        state = state.update(time, keys);
        display.drawFrame(state);
        if (state.status === 'playing') {
            return true;
        } else if (ending > 0) {
            finish.play();
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
    audio.play();
    const startLevel = (n) => {
        runLevel(new Level(levelMaps[n]), status => {
            if (status === 'lost') {
                startLevel(n);
            } else if (n < levelMaps.length - 1) {
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