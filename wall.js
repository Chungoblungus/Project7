class Wall {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 20;
    }
    draw() {
        stroke('blue');
        noFill();
        rect(this.x, this.y, this.size, this.size);
    }
}