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
    }
    manhattan(x1, x2, y1, y2) {
        return abs(x2-x1) + abs(y2-y1);
    }
    getMinimum(unvisited) {
        let min = Number.MAX_SAFE_INTEGER;
        let minNode = null;
        for (let key in unvisited) {
            let val = unvisited[key].f;
            print(val);
            if (val < min) {
                min = val;
                minNode = unvisited[key];
            }
        }
        return minNode;
    }
    findPath() {
        player.getCoordinates();
        this.getCoordinates();
        let visited = {};
        let unvisited = {};

        for (let i = 0; i < nodes.length; ++i) {
            let node = nodes[i];
            node.f = Number.MAX_SAFE_INTEGER;
            node.g = Number.MAX_SAFE_INTEGER;
            unvisited[node.key] = node;
        }
        let h = this.manhattan(this.coordX, player.coordX,
                               this.coordY, player.coordY);
        let start = this.coordX.toString() + '+' + this.coordY.toString();
        unvisited[start].g = 0;
        unvisited[start].f = h;
        let finished = false;
        while (!finished) {
            if (unvisited.length == 0) break;
            break;
        }
    }
}