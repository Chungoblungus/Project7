class Ghost {
    constructor(posX, posY, drawing) {
        // Positional properties
        this.x = posX;
        this.y = posY;
        this.speed = 1;

        this.drawing = drawing;

        // Used to maneuver ghost on path
        this.path = null;
    }
    draw() {
        this.getCoordinates();
        image(this.drawing, this.x, this.y, TILE_SIZE, TILE_SIZE);
    }
    // Retrieve grid coordinates of ghost
    getCoordinates() {
        this.coordX = floor(this.x / 20);
        this.coordY = floor(this.y / 20);
        for (let i = 0; i < nodes.length; ++i ) {
            if (nodes[i].x == this.coordX && 
                nodes[i].y == this.coordY) { this.node = nodes[i]; break; }
        }
    }
    // Get manhattan distance between 2 points
    manhattan(x1, x2, y1, y2) {
        return abs(x2-x1) + abs(y2-y1);
    }
    // Get minimum g-score
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
    // Create vectors for the path
    setupPath() {
        this.points = [];
        this.points.push(new p5.Vector(this.path.x, this.path.y));
        let next = this.path.prev;
        while (next != null) {
            this.points.push(new p5.Vector(next.x, next.y));
            next = next.prev;
        }
        this.points.pop();
    }
    // Make the ghost follow the path
    move(target) {
        let x = target.x;
        let y = target.y;
        if (this.x < (x*20)) { this.x += this.speed; }
        else if (this.x > (x*20)) { this.x -= this.speed; }
        else if (this.y < (y*20)) { this.y += this.speed; }
        else if (this.y > (y*20)) { this.y -= this.speed; }
    }
    currentNode() {
        for (let i = 0; i < nodes.length; ++i ) {
            if (nodes[i].x == this.coordX && 
                nodes[i].y == this.coordY) { this.curr = nodes[i]; break; }
        }
    }
    wander() {
        this.getCoordinates();
        this.currentNode();
        if (this.wanderTarget == undefined ||
            this.chased) { this.chased = false; this.wanderTarget = this.curr; }
        
        if (this.x == this.wanderTarget.x*20 &&
            this.y == this.wanderTarget.y*20) {
            let num = floor(random(this.curr.neighbors.length));
            this.wanderTarget = this.curr.neighbors[num];
        }
        this.move(this.wanderTarget);
    }
    // Once the path is found, it begins chasing
    chase() {
        this.chased = true;
        if (this.path === null) return;
        if (this.points.length == 0) {
            this.findPath();
            this.setupPath();
        }
        let target = this.points[this.points.length-1];
        if (this.x == target.x*20 && this.y == target.y*20) {
            this.points.pop();
        }
        this.move(target);
    }
    // Uses A* search
    findPath() {
        // Initialize variables
        player.getCoordinates();
        this.getCoordinates();
        let visited = [];
        let unvisited = [];
        
        // Fill the unvisited list of nodes
        for (let i = 0; i < nodes.length; ++i) {
            let node = nodes[i];
            node.f = Number.MAX_SAFE_INTEGER;
            node.g = Number.MAX_SAFE_INTEGER;
            unvisited.push(node);
        }
        // Creating first node of path
        let h = this.manhattan(this.coordX, player.coordX,
                               this.coordY, player.coordY);
        this.node.g = 0;
        this.node.f = h;
        this.node.prev = null;

        // Visiting neighbors to find the optimal path
        let finished = false;
        while (!finished) {
            if (unvisited.length === 0) break;
            let currNode = this.getMinimum(unvisited);
            if (currNode === player.node) { this.path = currNode; return;}
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
            // Move from unvisited to visited
            visited.push(currNode);
            unvisited.splice(unvisited.indexOf(currNode), 1);
        }
        this.path = null;
    }
}