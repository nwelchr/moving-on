import Level from './level';
import Display from './display';
import levelMaps from './level_maps';
import State from './state';


const keyCodes = {
    37: 'left',
    38: 'up',
    39: 'right'
};

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
    const display = new Display(document.body, level);
    const state = State.start(level);
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
};

const keys = detectKeys(keyCodes);
runGame();