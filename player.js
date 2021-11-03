class Player {
    constructor(posX, posY) {
        // Positional properties
        this.x = posX;
        this.y = posY;
        this.speed = 1;

        // Controls mouth of the pacman
        this.angle = 0;
        this.opening = 0.1;
        this.openRate = 0.05;

        // Size of pacman
        this.size = 20;
        this.radius = this.size / 2;
    }
    draw() {
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        fill('yellow');
        stroke('black');
        if (this.opening === 0) { circle(0, 0, this.size); }
        else {
            arc(0, 0,  // Position
                this.size, this.size,  // Size
                this.opening, -this.opening); // Opening
        }
        pop();
        this.update();
    }
    update() {
        // Control opening of pacman
        if (this.opening > PI/4 || this.opening < 0.02) { this.openRate = -this.openRate; }
        this.opening += this.openRate;

        // Control movement of pacman according to user input
        if (keyIsDown(UP_ARROW)) {
            this.angle = 3*HALF_PI;
        } else if (keyIsDown(DOWN_ARROW)) {
            this.angle = HALF_PI;
        } else if (keyIsDown(RIGHT_ARROW) &&
        !this.detectWallCollisionX(this.x + this.speed, this.y)) { this.angle = 0; } 
        else if (keyIsDown(LEFT_ARROW) &&
        !this.detectWallCollisionX(this.x - this.speed, this.y)) { this.angle = PI; }

        // Mark previous positions for collisions
        this.prevX = this.x;
        this.prevY = this.y;

        // Speed control
        if (this.angle == 0) { this.x += this.speed; }
        else if (this.angle == HALF_PI) { this.y += this.speed; }
        else if (this.angle == PI) { this.x -= this.speed; }
        else if (this.angle == 3*HALF_PI) { this.y -= this.speed; }

        // If pacman goes out of bounds on the x-axis
        if (this.x < -this.radius) { this.x = width + this.radius; }
        else if (this.x > width + this.radius) { this.x = -this.radius; }

        // Detect wall collision
        if (this.detectWallCollisionX(this.x, this.y)) {
            this.x = this.prevX;
        }
    }
    detectWallCollisionX(x, y) {
        // Get potential wall coordinates
        this.initializeCorners(x, y);
        if (this.leftX < 0) { return false; }
        let leftWall = floor(this.leftX / 20);
        let rightWall = floor(this.rightX / 20);
        let top = floor(this.topY / 20);
        let bottom = floor(this.bottomY / 20);

        // Left collision
        if (TILE_MAP[top][leftWall] == '#') { return true; }
        else if (TILE_MAP[bottom][leftWall] == '#' && top*20 != this.topY) { return true; }
        
        // Right collision
        if (TILE_MAP[top][rightWall] == '#') { return true; }
        else if (TILE_MAP[bottom][rightWall] == '#' && top*20 != this.topY) { return true; }
        return false;
    }
    detectWallCollisionY(x, y) {
        this.initializeCorners(x, y);
        for (let i = 0; i < walls.length; ++i) {
            if (((this.topY <= walls[i].y + TILE_SIZE && this.topY > walls[i].y) ||
                (this.bottomY >= walls[i].y && this.bottomY < walls[i].y + TILE_SIZE)) &&
                ((this.leftX >= walls[i].x && this.leftX <= walls[i].x + TILE_SIZE) ||
                (this.rightX <= walls[i].x + TILE_SIZE && this.rightX >= walls[i].x))) {
                    this.y = this.prevY;
            }
        }
    }
    initializeCorners(x, y) {
        this.leftX = x - this.radius;
        this.rightX = x + this.radius;
        this.topY = y - this.radius;
        this.bottomY = y + this.radius;
    }
}