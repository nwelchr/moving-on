// unsure how to manage current player

class State {
    constructor(level, actors, status, currPlayer) {
        this.level = level;
        this.actors = actors;
        this.currPlayer = currPlayer;
        this.status = status;
    }

    static start(level) {
        return new State(level, level.actors, "playing", this.currPlayer);
    }
}

export default State;