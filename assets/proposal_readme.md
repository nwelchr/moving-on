## **The Power of Friendship** - A Minimalist Puzzle Game

### Background and Overview
Inspired by the game *Thomas was Alone*, **The Power of Friendship** is a minimalist puzzle platformer where a single player controls multiple characters that must work together in order to reach their goal. Each character is gifted and hindered by their own individual characteristics.

### Functionality and MVPs
**The Power of Friendship** will feature the following:
- [ ] Different characters that the player will need to use to complete each level (to start: two characters)
- [ ] Ability for users to pause and restart levels
- [ ] Simple interface, controls, and instructions that make the game self-explanatory
- [ ] A camera that pans on the current character 
- [ ] Multiple levels of puzzle goodness that test the brain!

My current ideas for specific features for the app:
- Characters:
    - Finley: Thinner and taller, jumps higher, impervious to poison, instantly drowns in water
    - Frankie:  Wider and shorter, jumps low, instantly killed by poison, can float on water
- Obstacles:
    - Poison: Vats of poison as well as flying and falling poison that can only be traversed by certain characters
    - Water: Bodies of water that players must traverse to get to their goal
    - Switches: Certain obstacles (such as wall height) may block all characters from passing. Switches will be used as "solo missions" that only certain characters can reach to eliminate obstacles for the others.
- Special Features:
    - Gravity: While most of the game will operate under normal physics mechanics, certain areas of the game may trigger gravity to reverse or otherwise change.

### Wireframes

![Level Example](/assets/wireframe.png)

### Architecture and Technologies
This project will only be implemented with the following technologies:

- [ ] Vanilla JavaScript for game logic, HTML element creation, and DOM manipulation
- [ ] CSS for styling

Other than the webpack entry file as well as the main `HTML` and `CSS` files, there will be multiple other scripts used to complete this project:
- `level.js` will be responsible for laying out each level, determining the status of a level (completed, lost, etc.), and manage object positions and animation.
- various `actor` files (`poison`, `water`, `player`, etc.) will manage the behavior of each `actor`, i.e. a non-background object.
- `display.js` will take in various `levelMaps`, actually draw the background and each `actor`, and ensure the camera is panned on the current player.
- helper files (`vector.js`, `level_maps.js`, `util.js`) that will allow my project to operate under the Single Responsibility Principle and be easily scalable.

### Implementation Timeline

#### Weekend
- [ ] Look through similar works to get an idea of implementation scale and difficulty
- [ ] Plan out features, create wireframes, etc.
- [ ] Have based `HTML` and `CSS` files and begin laying out game logic and implementation
- Major credit goes to [The MDN Web Docs](https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps) and [Eloquent Javascript](https://eloquentjavascript.net) for giving me plenty of resources regarding the tilemap data structure and considerations in making platforming games in Javascript.

#### Day 1:
- [ ] Have basic movement, color, size, speed, etc. properties on a character
- [ ] Build out first basic level with background and actor layers

#### Day 2:
- [ ] Add other actors: `poison`, `water`, etc. and implement logic for each
- [ ] Add collision detection and logic of winning/losing a level

#### Day 3:
- [ ] Finish adding actors and other features if time permits (gravity, moving platforms, etc.)
- [ ] Add second character and grant the player ability to switch between characters
- [ ] Level design! Create level maps that implement all features of the game

#### Day 4:
- [ ] Continue creating level maps and test code
- [ ] Create title and win screens
- [ ] Build out instructions and tutorial

#### Day 5:
- [ ] Test, debug, and clean up code

### Bonus Features
- [ ] Audio that responds to collisions, jumps, coin collection, level completion, etc.
- [ ] Visual responsiveness: bouncing effects, simulation of moving water, etc.
- [ ] 2.5D background that moves dynamically to give a 3D-esque effect to gameplay
- [ ] More characters, more features, more levels, more types of objects
    - [ ] Portals that teleport players to different areas of the level