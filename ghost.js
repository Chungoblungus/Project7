class Ghost {
    constructor(posX, posY, drawing) {
        // Positional properties
        this.x = posX;
        this.y = posY;

        this.drawing = drawing;
    }
    draw() {
        this.getCoordinates();
        image(this.drawing, this.x, this.y, TILE_SIZE, TILE_SIZE);
    }
    getCoordinates() {
        this.coordX = floor(this.x / 20);
        this.coordY = floor(this.y / 20);
        for (let i = 0; i < nodes.length; ++i ) {
            if (nodes[i].x == this.coordX && 
                nodes[i].y == this.coordY) { this.node = nodes[i]; break; }
        }
    }
    manhattan(x1, x2, y1, y2) {
        return abs(x2-x1) + abs(y2-y1);
    }
    getMinimum(unvisited) {
        let min = Number.MAX_SAFE_INTEGER;
        let minNode = null;
        for (let i = 0; i < unvisited.length; ++i) {
            let val = unvisited[i].f;
            if (val < min) {
                min = val;
                minNode = unvisited[i];
            }
        }
        return minNode;
    }
    moveToNode(node) {

    }
    findPath() {
        player.getCoordinates();
        this.getCoordinates();
        let visited = [];
        let unvisited = [];

        for (let i = 0; i < nodes.length; ++i) {
            let node = nodes[i];
            node.f = Number.MAX_SAFE_INTEGER;
            node.g = Number.MAX_SAFE_INTEGER;
            unvisited.push(node);
        }

        let h = this.manhattan(this.coordX, player.coordX,
                               this.coordY, player.coordY);
        this.node.g = 0;
        this.node.f = h;
        let finished = false;
        while (!finished) {
            if (unvisited.length === 0) break;
            let currNode = this.getMinimum(unvisited);
            if (currNode === player.node) return currNode;
            for (let i in currNode.neighbors) {
                let neighbor = currNode.neighbors[i];
                if (visited[neighbor]) continue;
                let newG = currNode.g + 1;
                if (newG < neighbor.g) {
                    neighbor.g = newG;
                    neighbor.f = newG + this.manhattan(neighbor.x, player.x,
                                                       neighbor.y, player.y);
                    neighbor.prev = currNode;
                }
            }
            visited.push(currNode);
            unvisited.splice(unvisited.indexOf(currNode), 1);
        }
        return null;
    }
}