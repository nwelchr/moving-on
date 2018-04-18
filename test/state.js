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

    overlap(actor, other) {
        return actor.pos.x + actor.size.x > other.pos.x && actor.pos.x < other.pos.x + other.size.x && actor.pos.y + actor.size.y > other.pos.y && actor.pos.y < other.pos.y + other.size.y;
    }

    update(time, keys) {
        let actors = this.actors.map(actor => actor.update(time, this, keys));
        let newState = new State(this.level, actors, this.status);
        if (newState.status != 'playing') return newState;

        let player = newState.player;

        if (this.level.touching(player.pos, player.size) === 'poison') {
            return new State(this.level, actors, 'lost');
        }

        // if (keys.esc) {
        //     return new State(this.level, actors, 'paused');
        // }

        for (let actor of actors) {
            if (actor != player && this.overlap(actor, player)) {
                newState = actor.collide(newState);
            }
        }

        return newState;
    }
}

export default State;