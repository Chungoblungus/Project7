const w = 28;
const h = 31;
var player, drawings;

function setup() {
    createCanvas(w*TILE_SIZE, h*TILE_SIZE);
    initializeTilemap();
}

function draw() {
    background(0);
    for (let i = 0; i < walls.length; ++i) walls[i].draw();  // Draw walls
    for (let i = 0; i < pellets.length; ++i) pellets[i].draw();  // Draw pellets that haven't been collected
    for (let i = 0; i < ghosts.length; ++i) ghosts[i].draw();  // Draw ghosts on the map
    if (frameCount % 500 == 0) ghosts[0].findPath();

    player.draw();
}