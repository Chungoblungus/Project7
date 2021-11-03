var player;

function setup() {
    createCanvas(400, 400);
    player = new Player(width/2, height/2);
}

function draw() {
    background(0);
    player.draw();
}