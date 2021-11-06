const w = 28;
const h = 31;
var player, drawings;
var path = null;

// state: 0 - Main menu
//        1 - Game
//        2 - Pacman Dead
//        3 - Win
var state = 0;

function setup() {
    createCanvas(w*TILE_SIZE, h*TILE_SIZE);
    initializeTilemap();
}

function draw() {
    switch(state) {
        case 0: // Main Menu
            background(0);
            fill('yellow');
            noStroke();
            textSize(30);
            text('PACMAN', width/2 - 60, height/2 - 20,
            200, 50);
            textSize(20);
            fill('white');
            text('Click to button', 220, height/2 + 20,
            250, 30);
            if (mouseIsPressed) state = 1;
            break;
        case 1: // Game
            background(0);
            // Draw all the objects
            for (let i = 0; i < walls.length; ++i) walls[i].draw();  // Draw walls
            for (let i = 0; i < pellets.length; ++i) pellets[i].draw();  // Draw pellets that haven't been collected
            for (let i = 0; i < ghosts.length; ++i) ghosts[i].draw();  // Draw ghosts on the map
            player.draw();

            if (frameCount % 200 == 0) { 
                ghosts[0].findPath(); 
                ghosts[0].setupPath();
            } if (frameCount % 400 == 0) {
                ghosts[1].findPath(); 
                ghosts[1].setupPath();
            } if (frameCount % 600 == 0) {
                ghosts[2].findPath();
                ghosts[2].setupPath();
            } if (frameCount % 800 == 0) {
                ghosts[3].findPath();
                ghosts[3].setupPath();
            }
            for (let i = 0; i < ghosts.length; ++i) {
                let ghost = ghosts[i];
                if (dist(ghost.x, ghost.y, player.x, player.y) < 300) ghost.chase();
                else ghost.wander();
            }
            break;
        case 2: // Game Over
            fill('yellow');
            noStroke();
            textSize(18);
            text('Game Over!', width/2 - 50, height/2 - 20,
            200, 20);
            break;
        case 3: // Player wins
            background(0);  
            fill('yellow');
            noStroke();
            textSize(18);
            text('You Win!', width/2 - 40, height/2 - 20,
            200, 20);
            // Draw all the objects
            for (let i = 0; i < walls.length; ++i) walls[i].draw();  // Draw walls
            break;
    }
}