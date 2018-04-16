const scale = 60; // gives the scale of number of pixels that a single unit takes up on the screen

// HELPER FUNCTION TO CREATE AN ELEMENT IN THE DOM AND GIVE IT A CLASS
const createElement = (name, className) => {
  const element = document.createElement(name); // creates the element
  if (className) element.className = className; // sets the class to className if you gave it an argument
  return element;
};

// FUNCTION CONSTRUCTOR FOR A DISPLAY BY GIVING IT A PARENT TO APPEND ITSELF TO AND A LEVEL OBJECT TO DISPLAY
class DOMDisplay {
  constructor(parent, level) {
    this.wrap = parent.appendChild(createElement("div", "game")); // create a div and give it the class called game and store it as wrapper because appendChild returns that element
    this.level = level; // the level object of the display object

    this.wrap.appendChild(this.drawBackground()); //drawBackground() has not been created yet but you will append it to the wrap or the element that holds all of this which is the immediate child of the parent given - this will draw the background and is only done once
    this.actorLayer = null; // is going to to be used to keep track of the actors so that they can be easily removed and replaced and used by drawFrame() //
    this.drawFrame(); //
  }

  drawBackground() {
    const table = createElement("table", "background"); // create a table element with a class of background
    table.style.width = `${this.level.width * scale}px`; // create the width of the background to scale

    this.level.grid.forEach(row => { // goes over each row of the built out grid of the level which is a bunch of words like lava and wall
      const rowElt = table.appendChild(createElement("tr")); // create a table row to append to the parent table for each row
      rowElt.style.height = `${scale}px`; // adjust the height of each row to the scale... i.e 20X20px means 20 px height
      row.forEach(type => { // go over each cell of the row
        rowElt.appendChild(createElement("td", type)); // create a new element with a class of type in the table
      });
    });
    return table; // return the created background
  }

  drawActors() {
    const wrap = createElement("div");  // create a div and add them to the wrapper for drawActors
    this.level.actors.forEach(actor => { // go over each actor
      const rect = wrap.appendChild(createElement("div", `actor ${actor.type}`)); // create a div with the class of actor and the type that that the actor is
      rect.style.width = `${actor.size.x * scale}px`; // the width of the actor is its vector's x property multiplied by scale
      rect.style.height = `${actor.size.y * scale}px`; // same for height but by y
      rect.style.left = `${actor.pos.x * scale}px`; // the position of the actor from the side of the screen
      rect.style.top = `${actor.pos.y * scale}px`;
    });
    return wrap; // returns the wrap with all the actors in it
  }

  drawFrame() {
    if (this.actorLayer) { // if an actorLayer exists, remove it
      this.wrap.removeChild(this.actorLayer);
    }
    this.actorLayer = this.wrap.appendChild(this.drawActors()); // add the actor layer to the wrap
    this.wrap.className = `game ${this.level.status || ""}`; // add the class game to the wrap and the status if there is one --- by adding this class we can change the style of the player when there is a status on the wrapper
    this.scrollPlayerIntoView();
  }

  scrollPlayerIntoView() {
    const width = this.wrap.clientWidth;
    const height = this.wrap.clientHeight;
    const margin = width / 3;

    const left = this.wrap.scrollLeft;
    const right = left + width;
    const top = this.wrap.scrollTop;
    const bottom = top + height;

    const player = this.level.player;
    const center = player.pos.plus(player.size.times(.5)).times(scale); // multiply by scale because we need it in pixels and not level coordinates

    if (center.x < left + margin) {
      this.wrap.scrollLeft = center.x - margin;
    } else if (center.x > right - margin) {
      this.wrap.scrollLeft = center.x + margin - width;
    }
    if (center.y < top + margin) {
      this.wrap.scrollTop = center.y - margin;
    } else if (center.y > bottom - margin) {
      this.wrap.scrollTop = center.y + margin - height;
    }
  }

  clear() {
    this.wrap.parentNode.removeChild(this.wrap);
  }
}

export default DOMDisplay;