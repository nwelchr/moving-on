const scale = 60; // scale units into pixels

// helper function to create an element in the dom and give it a class;

const createElement = (name, className) => {
    const element = document.createElement(name);
    if (className) element.classtList.add(className);
    return element;
};

class Display {
    constructor(parent, level) {
        this.wrapper = parent.appendChild(createElement('div', 'game')); // create wrapper for actual game (since screen will be slipping off)

        this.level = level;

        // tracks element that holds actors so they can be removed/replaced
        this.actorLayer = null; // background and actor layers important for time save

        this.wrapper.appendChild(this.drawBackground());

        this.drawActors = this.drawActors.bind(this);
    }

    // drawn once
    drawBackground() {
        const table = createElement('table', 'background');
        table.style.width = `${this.level.width * scale}px`; // sets specifc style, doesn't change other inline styles

        // iterate over each row of the previously built out grid (full of just words)
        this.level.rows.forEach(row => {

            // create row to append to the parent table
            const rowElement = table.appendChild(createElement('tr'));

            rowElement.style.height = `${scale}px`;

            row.forEach(fieldType => {
                // append individual tiles onto row
                rowElement.appendChild(createElement('td', fieldType));
            });
        });

        return table;
    }

    // drawn every time the display is updated with the given state
    drawActors(actors) {
        const wrapper = createElement('div');

        actors.forEach(actor => {
            const el = wrapper.appendChild(createElement('div', `actor ${actor.constructor.name.toLowerCase()}`)); // actor.constructor.name finds the name of the class of the actor
            el.style.width = `${actor.size.x * scale}px`;
            el.style.height = `${actor.size.y * scale}px`;
            el.style.left = `${actor.pos.x * scale}px`;
            el.style.right = `${actor.pos.y * scale}px`;
        });

        return wrapper;
    }

    drawFrame(state) {
        if (this.actorLayer) this.actorLayer.remove();
        this.actorLayer = this.drawActors(state.actors);
        this.wrapper.appendChild(this.actorLayer);
        this.wrapper.className = `game ${state.status}`;
        this.scrollPlayerIntoView(state);
    }

    scrollPlayerIntoView(state) {
        let width = this.wrapper.clientWidth; // takes width of game div
        let height = this.wrapper.clientHeight;
        
    }

    clear() {
        // odd syntax to remove the wrapper because htmlelements are weird!
        this.wrapper.parentNode.removeChild(this.wrapper);
    }
}