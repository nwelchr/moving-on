class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    plus(otherVector) {
        return new Vector(this.x + otherVector.x, this.y + otherVector.y);
    }

    // to get distance traveled during a particular time
    times(factor) {
        return new Vector(this.x * factor, this.y * factor);
    }
}

export default Vector;