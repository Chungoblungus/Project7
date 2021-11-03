class Wall {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 20;
    }
    draw() {
        noStroke();
        fill('blue');
        rect(this.x, this.y, this.size, this.size);
    }
}