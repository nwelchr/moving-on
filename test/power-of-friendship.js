import Level from './level';
import Display from './display';
import levelMaps from './level_maps';
import State from './state';


let simpleLevel = new Level(levelMaps[0]);
let display = new Display(document.body, simpleLevel);
display.drawFrame(State.start(simpleLevel));
