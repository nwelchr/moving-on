import Vector from "./vector";
import Finley from './finley';
import Poison from './poison';
import Player from "./player";

const actorChars = {
    '1': Player,
    '=': Poison, '|': Poison, 'v': Poison
};

class Level {
    constructor(levelMap) {
        this.rows = [];
        this.width = levelMap[0].length; // width of level determined my first row
        this.height = levelMap.length; // # of rows in array
        this.actors = []; // array of 'actors' i.e. non-background objs

        for (let y = 0; y < this.height; y++) { // iterate over each string in the map
            const line = levelMap[y];
            const currRow = [];

            for (let x = 0; x < this.width; x++) { // iterate over each character
                const ch = line[x];
                let fieldType;

                const Actor = actorChars[ch];
                if (Actor) { 
                    this.actors.push(new Actor(new Vector(x, y), ch));
                }
                else {
                    switch(ch) {
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

                console.log(fieldType);
                currRow.push(fieldType);
            }

            this.rows.push(currRow);
        }
    }
}

export default Level;