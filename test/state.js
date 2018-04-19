// unsure how to manage current player

class State {
    constructor(level, actors, status, player, switchKey, gravity) {
        this.level = level;
        this.actors = actors;
        this.player = this.actors.find(actor => actor.constructor.name === player.constructor.name);
        this.nonPlayers = this.actors.filter(actor => Object.getPrototypeOf(Object.getPrototypeOf(actor)).constructor.name === 'Player' && actor !== this.player);
        this.status = status;
        this.gravity = gravity || 7;
        debugger;
        if (this.level.actors.length === 1 && this.player.pos.y < 40 && this.player.pos.y > 4) this.gravity = .3;

        // to check whether switch is currently being pressed to prevent repeat switching on update
        this.switch = switchKey;
    }

    static start(level) {
        return new State(level, level.actors, "playing", level.actors.find(a => a.constructor.name === 'Finley'));
    }

    overlap(actor, other) {
        return actor.pos.x + actor.size.x > other.pos.x && actor.pos.x < other.pos.x + other.size.x && actor.pos.y + actor.size.y > other.pos.y && actor.pos.y < other.pos.y + other.size.y;
    }

    // any place I return keys.switch is to make sure the user doesn't hold down the switch key and have the characters switch rapidly between each other
    update(time, keys) {
        let actors = this.actors.map(actor => actor.update(time, this, keys));
        
        // if s is being pressed and wasn't already being pressed, AND if the current player isn't jumping/falling/etc, switch player
        if (keys.switch && !this.switch && this.player.speed.y === 0) return new State(this.level, actors, this.status, this.nonPlayers[0], keys.switch);

        let newState = new State(this.level, actors, this.status, this.player, keys.switch);
        if (newState.status !== 'playing') return newState;

        let player = newState.player;

        switch (this.level.touching(player.pos, player.size)) {
            case 'poison':
                return new State(this.level, actors, 'lost', this.player);
            case 'finleyGoal':
                return new State(this.level, actors, 'won', this.player);
            case 'gravity':
                return new State(this.level, actors, 'playing', this.player, -this.gravity);
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