//  VECTOR CONSTRUCTOR
class Vector {
    constructor(x, y) { // constructor with x and y coordinates as an input
      this.x = x;
      this.y = y;
    }
  
    plus(other) { // takes another vector as an argument
      return new Vector(this.x + other.x, this.y + other.y) // creates a new Vector object from the current one and the argument and returns it
    }
  
    
    times(factor) {
      return new Vector(this.x * factor, this.y * factor); // returns a new vector multiplied by the argument which will be useful when given a time interval to get the distance traveled
    }
  }

  export default Vector;