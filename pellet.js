class Pellet {
    constructor(posX, posY) {
        this.x = posX;
        this.y = posY;
        this.size = 5;
    }
    draw() {
        noStroke();
        fill(255, 200);
        circle(this.x, this.y, this.size);
    }
}