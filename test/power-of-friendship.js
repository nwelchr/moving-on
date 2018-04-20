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
audio.volume = 0.2;
audio.loop = true;
finish.volume = 0.05;
// const pauseModal = document.querySelector('.pause-modal');
// const pauseButton = document.querySelector('.unpause');
// // const restartButton = document.querySelector('.restart');

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

// let running = true;

// calls requestAnimation again after every frame
const runAnimation = (frameFunction) => {
    // last time since window has been open
    let lastTime = null;

    // window.addEventListener('keydown', (e) => {
    //     if (e.keyCode === 27) { 
    //         running = !running;
    //         pauseModal.classList.toggle("show");   
    //      }
    //     if (running) requestAnimationFrame(frame);
    // });

    // pauseButton.addEventListener('click', (e) => {
    //     e.preventDefault();
    //     running = !running;
    //     pauseModal.classList.toggle("show");
    //     if (running) requestAnimationFrame(frame);
    // });

    const frame = (time) => {
        // if (running === false) {
        //     return;
        // }

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

// let nextLevelCount = 0;

const runLevel = (level, successFunction) => {
    const gameWrapper = document.getElementById('game-wrapper');
    const display = new Display(gameWrapper, level);
    let state = State.start(level);
    let ending = 1;

    if (level.width === 73) {
        setTimeout(rotate, 10000);
    } else {
        if (gameWrapper.classList.contains('rotated')) {
            gameWrapper.classList.remove('rotated');
        }
    }


    runAnimation(time => {
        state = state.update(time, keys);
        display.drawFrame(state);

        // restartButton.addEventListener('click', (e) => {
        //     e.preventDefault();
        //     running = !running;
        //     pauseModal.classList.toggle("show");
        //     display.clear();
        //     successFunction('lost');
        // });

        if (state.status.includes('playing')) {
            return true;
        } else if (ending > 0) {
            finish.play();
            ending -= time;
            return true;
        } else {
            // if (nextLevelCount === 0) {
            // nextLevelCount++;
        // }
            display.clear();
            successFunction(state.status);
            return false;
        }
    });
};

const rotate = () => {
    const wrap = document.getElementById('game-wrapper');
    wrap.classList.add('rotated');
};

const runGame = () => {
    audio.play();

    const startLevel = (n) => {
        runLevel(new Level(levelMaps[n]), status => {
            if (status.includes('lost')) {
                startLevel(n);
            } else if (n < levelMaps.length - 1) {
                startLevel(n + 1);
            } else {
                alert('');
            }
        });
    };

    // goToTitleScreen();
    startLevel(0);
};


const keys = detectKeys();
runGame();