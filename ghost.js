class Ghost {
    constructor(posX, posY, drawing) {
        this.x = posX;
        this.y = posY;
        this.drawing = drawing;
    }
    draw() {
        image(this.drawing, this.x, this.y, TILE_SIZE, TILE_SIZE);
    }
    findPath() {

    }
}