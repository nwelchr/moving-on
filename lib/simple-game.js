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
  console.log("set lastTime to null");
  

  const frame = (time) => {
    let stop = false;

    if (lastTime != null) {
      console.log("lastTime is not null");
      // maximum frame step of 100 milliseconds
      // difference between lastTime and time is how long the page was hidden
      // convert between milliseconds and seconds to work with better
      const timeStep = Math.min(time - lastTime, 100) / 1000;
      stop = frameFunc(timeStep) === false;
    }

    lastTime = time;
    console.log("lasttime is time!");
    if (!stop) {
      console.log("!stop so requestAnimationFrame)");
      requestAnimationFrame(frame);
    }
  };
  console.log("request animation fRame");  
  requestAnimationFrame(frame);
};

// setup display in document.body as parent and curr level
// then run Animation
const runLevel = (level, andThen) => {
  const display = new Display(document.body, level);
  console.log("new display");
  
  
  // takes in a timeStep
  runAnimation(step => {
    console.log("about to animate level");
    
    level.animate(step, arrows);
    console.log("about to drawFrame");
		display.drawFrame(step);
		
    if (level.isFinished()) {
      display.clear();
      if (andThen) {
        console.log("andThen!!!!");
        
        andThen(level.status);
      }
      console.log("no andThen");
      
      return false;
		}
	});

};


const runGame = () => {
	// Defining beginning of game conditions

  // Recursive function that increments level when its finished, resets if not, goes to win screen if won
  console.log("runGame");
  
  const startLevel = (n) => {
    console.log("startLevel");
    
    runLevel(new Level(levelMaps[n]), status => {
      console.log("actually run level...");
      
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