import Vector from "./vector";
import State from "./state";

export class FrankieGoal {
    constructor(pos, ch) {
        this.pos = pos;
        this.ch = ch;
        this.size = new Vector(1.5, .8);
    }

    update() {
        return this;
    }

    collide(state) {
        return new State(state.level, state.actors, state.status, state.player, state.switchKey, state.gravity, state.finleyStatus, 'true');
    }
}

export class FinleyGoal {
    constructor(pos, ch) {
        this.pos = pos.plus(new Vector(0, -.5));
        this.ch = ch;
        this.size = new Vector(.8, 1.5);
    }

    update() {
        return this;
    }

    collide(state) {
        return new State(state.level, state.actors, state.status, state.player, state.switchKey, state.gravity, 'true', state.frankieStatus);
    }
}