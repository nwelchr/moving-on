// unsure how to manage current player

class State {
    constructor(level, actors, status, player, switchKey, gravity, finleyStatus, frankieStatus) {
        this.level = level;
        this.actors = actors;
        this.player = this.actors.find(actor => actor.constructor.name === player.constructor.name);
        this.nonPlayers = this.actors.filter(actor => Object.getPrototypeOf(Object.getPrototypeOf(actor)).constructor.name === 'Player' && actor !== this.player);
        this.status = status;
        this.gravity = gravity || 10;
        // if (this.level.width === 15) this.gravity = -1;
        // if (this.level.width === 66 && this.player.pos.y < 60 && this.player.pos.y > 4) this.gravity = .05;
        // this.finleyStatus = finleyStatus || null;
        // this.frankieStatus = frankieStatus || null;
        // console.log (this.finleyStatus);
        // console.log (this.frankieStatus);

        // to check whether switch is currently being pressed to prevent repeat switching on update
        this.switch = switchKey;
    }

    static start(level) {
        return new State(level, level.actors, "playing", level.actors.find(a => a.constructor.name === 'Finley'));
    }

    overlap(player, actor) {

        // player on top if actor.y - player.y > 0
        // player on bottom if actor.y - player.y < 0

        // player on left if actor.x - player.x > 0
        // player on right if actor.x - player.x < 0

        // if player.pos.x + player.size.x  / 2 (center of player) - actor.pos.x + actor.size.x / 2 (center of actor) +-.01(-(player.size.x / 2 + actor.size.x/2)) -- player can't move right

        const horizontalOverlap = (player.pos.x + player.size.x / 2) - (actor.pos.x + actor.size.x / 2);
        const horizontalDistance = player.size.x / 2 + actor.size.x / 2;

        const verticalOverlap = (player.pos.y + player.size.y / 2) - (actor.pos.y + actor.size.y / 2);
        const verticalDistance = player.size.y / 2 + actor.size.y / 2;

        // if (horizontalOverlap >= horizontalDistance - .2 && horizontalOverlap <= horizontalDistance + .2) { console.log('left overlap', horizontalDistance); }

        // if (-horizontalOverlap >= horizontalDistance - .2 && horizontalOverlap <= horizontalDistance + .2) { console.log('right overlap', horizontalDistance); }

        // if (verticalOverlap >= verticalDistance - .2 && verticalOverlap <= verticalDistance + .2) { console.log('bottom overlap', verticalDistance); }

        if ((-verticalOverlap >= verticalDistance - .2 && verticalOverlap <= verticalDistance + .2) && (player.pos.x + player.size.y > actor.pos.x && player.pos.x + player.size.y < actor.pos.x + actor.size.x) || (player.pos.x > actor.pos.x && player.pos.x < actor.pos.x + actor.size.x) || (player.pos.x < actor.pos.x && player.pos.x + player.size.x > actor.pos.x + actor.size.x) || (player.pos.x > actor.pos.x && player.pos.x + player.size.x < actor.pos.x + actor.size.x )) { console.log('top overlap', verticalDistance); }

        // console.log(verticalOverlap, "vo", verticalDistance, "vd");

        // const leftOverlap = (player.pos.x + player.size.x > actor.pos.x && player.pos.x < actor.pos.x);

        // const rightOverlap = (player.pos.x < actor.pos.x + actor.size.x && player.pos.x + player.size.x > actor.pos.x + actor.size.x);

        // const topOverlap = (player.pos.y + player.size.y > actor.pos.y && player.pos.y < actor.pos.y);

        // const bottomOverlap = (player.pos.y < actor.pos.y + actor.size.y && player.pos.y + player.size.y > actor.pos.y + actor.size.y);


        // if (leftOverlap && !rightOverlap && (topOverlap || bottomOverlap)) {
        //     debugger;
        //     return 'left';
        // }

        // if (rightOverlap && !leftOverlap && (topOverlap || bottomOverlap)) {
        //     debugger;            
        //     return 'right';
        // }

        // if (topOverlap && !bottomOverlap && (leftOverlap || rightOverlap)) {
        //     debugger;
        //     return 'top';
        // }
        
        // if (bottomOverlap && !topOverlap && (leftOverlap || rightOverlap)) {
        //     debugger;
        //     return 'bottom';
        // }

        // return false;
        // return actor.pos.x + actor.size.x > other.pos.x && actor.pos.x < other.pos.x + other.size.x && actor.pos.y + actor.size.y > other.pos.y && actor.pos.y < other.pos.y + other.size.y;
    }

    // any place I return keys.switch is to make sure the user doesn't hold down the switch key and have the characters switch rapidly between each other
    update(time, keys) {
        let actors = this.actors.map(actor => actor.update(time, this, keys));
        
        // if s is being pressed and wasn't already being pressed, AND if the current player isn't jumping/falling/etc, switch player
        if (keys.switch && !this.switch && this.player.speed.y === 0) return new State(this.level, actors, this.status, this.nonPlayers[0], keys.switch);

        let newState = new State(this.level, actors, this.status, this.player, keys.switch, this.gravity, this.finleyStatus, this.frankieStatus);
        if (newState.status !== 'playing') return newState;

        let player = newState.player;

        switch (this.level.touching(player.pos, player.size)) {
            case 'poison':
                return new State(this.level, actors, 'lost');
            case 'trampoline':
                return new State(this.level, actors, 'playing', this.player, keys.switch, -this.gravity, this.finleyStatus, this.frankieStatus);
            case 'finleyGoal':
                return new State(this.level, actors, 'won', this.player);
            default:
                break;
        }

        // if (player.constructor.name === 'Finley' && this.level.touching(player.pos, player.size) === 'finleyGoal') {
        //     if (this.status === 'frankieWon') return new State(this.level, actors, 'won');
        //     return new State(this.level, actors, this.status, this.player, this.switch, this.gravity, 'finleyWon', this.frankieStatus);
        // } else if (player.constructor.name === 'Frankie' && this.level.touching(player.pos, player.size) == 'frankieGoal') {
        //     if (this.status === 'finleyWon') return new State(this.level, actors, 'won');
        //     return new State(this.level, actors, this.status, this.player, this.switch, this.gravity, this.finleyStatus, 'frankieWon');
        // }

        // if ((this.level.touching(player.pos, player.size)) === 'finleyGoal' || 'frankieGoal') {
        //     return new State(this.level, actors, 'won');
        // }

        // if (keys.esc) {
        //     return new State(this.level, actors, 'paused');
        // }

        for (let actor of actors) {
            if (Object.getPrototypeOf(Object.getPrototypeOf(actor)).constructor.name === 'Player')
            this.overlap(player, actor);
        }

            // const overlap = this.overlap(player, actor);
            // if (overlap && Object.getPrototypeOf(Object.getPrototypeOf(actor)).constructor.name !== 'Player') {
            //     newState = actor.collide(newState);
            // }
        // }

        return newState;
    }
}

export default State;