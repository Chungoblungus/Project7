class MyNode {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // Score
        this.g = 0;
        this.f = 0;
        // Previous and next nodes
        this.prev = null;
        // Key value
        this.key = this.x.toString() + '+' + this.y.toString();
    }
}