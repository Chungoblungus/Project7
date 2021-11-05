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
        // Get neighbors of the node
        this.neighbors = [];
    }
    getNeighbors() {
        for (let i = 0; i < nodes.length; ++i) {
            let node = nodes[i];
            if (node.x == this.x - 1 && node.y == this.y) this.neighbors.push(node);
            if (node.x == this.x + 1 && node.y == this.y) this.neighbors.push(node);
            if (node.x == this.x && node.y == this.y - 1) this.neighbors.push(node);
            if (node.x == this.x && node.y == this.y + 1) this.neighbors.push(node);
        }
    }
}