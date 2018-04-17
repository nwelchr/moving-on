import Vector from "../lib/vector";

const actorChars = {
    '1': Finley, '2': Frankie,
    '=': Poison, '|': Poison, 'v': Poison
};

class Level {
    constructor(levelMap) {
        this.rows = [];
        this.height = levelMap[0].length; // width of level determined my first row
        this.height = levelMap.length; // # of rows in array
        this.actors = []; // array of 'actors' i.e. non-background objs

        levelMap.map((line, y) => {
            const currRow = [];

            line.map((ch, x) => {
                let fieldType;

                const Actor = actorChars[ch];
                if (Actor) this.actors.push(new Actor(new Vector(x, y), ch));

                else {
                    switch(ch) {
                        case Actor:
                        case 'x':
                            fieldType = 'wall';
                        case 'w':
                            fieldType = 'water';
                        case 'p':
                            fieldType = 'poison';
                        case '!':
                            fieldType = 'finleyGoal';
                        case '@':
                            fieldType = 'frankieGoal';
                        default:
                            fieldType = null;
                    }
                }

                ch = fieldType;
            });

            currRow = line;
        });

    }
}

export default Level;