// unsure how to manage current player

class State {
    constructor(level, actors, status, player) {
        this.level = level;
        this.actors = actors;
        // this.player = this.actors.find(a => a.constructor.name === 'Player');
        // this.player = this.actors.find(a => a.constructor.name === 'Finley'); 
        console.log(player);
        this.player = this.actors.find(actor => actor.constructor.name === player.constructor.name);
        this.nonPlayers = this.actors.filter(actor => Object.getPrototypeOf(Object.getPrototypeOf(actor)).constructor.name === 'Player' && actor !== this.player);
        // console.log(this.player, this.nonPlayers);
        // this.currPlayer = currPlayer;
        this.status = status;
        this.gravity = 10;

        this.switchPlayer = this.switchPlayer.bind(this);
    }

    static start(level) {
        return new State(level, level.actors, "playing", level.actors.find(a => a.constructor.name === 'Finley'));
    }

    overlap(actor, other) {
        return actor.pos.x + actor.size.x > other.pos.x && actor.pos.x < other.pos.x + other.size.x && actor.pos.y + actor.size.y > other.pos.y && actor.pos.y < other.pos.y + other.size.y;
    }

    switchPlayer() {
        return this.nonPlayers[0];
    }

    update(time, keys) {
        let actors = this.actors.map(actor => actor.update(time, this, keys));
        if (keys.switch) return new State(this.level, actors, this.status, this.nonPlayers[0]);

        let newState = new State(this.level, actors, this.status, this.player);
        if (newState.status !== 'playing') return newState;

        let player = newState.player;

        switch (this.level.touching(player.pos, player.size)) {
            case 'poison':
                return new State(this.level, actors, 'lost', this.player);
            case 'finleyGoal':
                return new State(this.level, actors, 'won', this.player);
            default:
                break;
        }

        // if (keys.esc) {
        //     return new State(this.level, actors, 'paused');
        // }

        for (let actor of actors) {
            if (Object.getPrototypeOf(Object.getPrototypeOf(actor)).constructor.name !== 'Player' && this.overlap(actor, player)) {
                newState = actor.collide(newState);
            }
        }

        return newState;
    }
}

export default State;