// unsure how to manage current player

class State {
    constructor(level, actors, status, player) {
        this.level = level;
        this.actors = actors;
        this.player = this.actors.find(a => a.constructor.name === 'Player');
        // this.currPlayer = currPlayer;
        this.status = status;
    }

    static start(level) {
        return new State(level, level.actors, "playing", this.player);
    }
}

export default State;