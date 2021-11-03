var player;

function setup() {
    createCanvas(400, 420);
    player = new Player(width/2, height/2);
    initializeTilemap();
}

function draw() {
    background(0);
    player.draw();
    for (let i = 0; i < walls.length; ++i) {
        walls[i].draw();
    }
}