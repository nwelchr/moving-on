import Display from './display';
import Level from './level';
import levelMaps from './level_maps';

const arrowCodes = {
  37: "left",
  38: "up",
  39: "right"
};

const detectKeys = (keyCodes) => {
// as opposed to writing just null, make an object so it doesn't error when trying to index into nothing
  const isPressed = Object.create(null);
	
	
	// Set isPressed to true when key down, false when key up
  const keyHandler = (e) => {

		// if the key pressed is in keyCodes (left/up/right)
    if (keyCodes.hasOwnProperty(e.keyCode)) {
      e.preventDefault();
      const isKeydown = (e.type === "keydown");
      isPressed[keyCodes[e.keyCode]] = isKeydown;
    }
  };

  document.addEventListener("keydown", keyHandler);
  document.addEventListener("keyup", keyHandler);

  return isPressed;
};


// currying!!
const runAnimation = (frameFunc) => {
  let lastTime = null;

  const frame = (time) => {
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

// setup display, then run Animation
const runLevel = (level, andThen) => {
	const display = new Display(document.body, level);
	
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
  const startLevel = (n) => {
    runLevel(new Level(levelMaps[n]), status => {
      if (status === "lost") {
        startLevel(n);
      } else if (n < levelMaps.length - 1) {
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