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
        if (keyIsDown(UP_ARROW) &&
        !this.detectWallCollisionY(this.x, this.y - this.speed)) { this.angle = 3*HALF_PI; } // Up
        else if (keyIsDown(DOWN_ARROW) &&
        !this.detectWallCollisionY(this.x, this.y + this.speed)) { this.angle = HALF_PI; } // Down
        else if (keyIsDown(RIGHT_ARROW) &&
        !this.detectWallCollisionX(this.x + this.speed, this.y)) { this.angle = 0; } // Right
        else if (keyIsDown(LEFT_ARROW) &&
        !this.detectWallCollisionX(this.x - this.speed, this.y)) { this.angle = PI; } // Left

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
        } // X collision
        if (this.detectWallCollisionY(this.x, this.y)) {
            this.y = this.prevY;
        } // Y collision
        
        // Check collision with ghost
        for (let i = 0; i < ghosts.length; ++i) {
            let ghost = ghosts[i];
            this.detectEnemyCollision(ghost);
        }
        // Eat pellets
        this.eatPellets();
        // Check if all the pellets have been eaten
        if (pellets.length == 0) state = 3;
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
        // Get potential wall coordinates
        this.initializeCorners(x, y);
        if (this.leftX < TILE_SIZE || this.rightX > width - TILE_SIZE) { return true; }
        let left = floor(this.leftX / 20);
        let right = floor(this.rightX / 20);
        let topWall = floor(this.topY / 20);
        let bottomWall = floor(this.bottomY / 20);

        // Top collision
        if (TILE_MAP[topWall][left] == '#') { return true; }
        else if (TILE_MAP[topWall][right] == '#' && left*20 != this.leftX) { return true; }
        
        // Bottom collision
        if (TILE_MAP[bottomWall][left] == '#') { return true; }
        else if (TILE_MAP[bottomWall][right] == '#' && left*20 != this.leftX) { return true; }
        if (TILE_MAP[bottomWall][left] == '-') { return true; }
        else if (TILE_MAP[bottomWall][right] == '-' && left*20 != this.leftX) { return true; }
        return false;
    }
    eatPellets() {
        this.initializeCorners(this.x, this.y);
        for (let i = 0; i < pellets.length; ++i) {
            let pellet = pellets[i];
            if ((this.leftX == pellet.x || this.rightX + 1 == pellet.x) &&
                 abs(this.y - pellet.y) < pellet.size) { pellets.splice(i, 1); }
            if ((this.topY == pellet.y || this.bottomY == pellet.y) &&
                 abs(this.x - pellet.x) < pellet.size) { pellets.splice(i, 1); }
        }
    }
    initializeCorners(x, y) {
        this.leftX = x - this.radius;
        this.rightX = x + this.radius - 1;
        this.topY = y - this.radius;
        this.bottomY = y + this.radius - 1;
    }
    getCoordinates() {
        this.coordX = floor(this.x / 20);
        this.coordY = floor(this.y / 20);
        for (let i = 0; i < nodes.length; ++i ) {
            if (nodes[i].x == this.coordX && 
                nodes[i].y == this.coordY) { this.node = nodes[i]; break; }
        }
    }
    detectEnemyCollision(ghost) {
        if ((abs(this.x - (ghost.x + 10)) <= 15 && abs(this.y - (ghost.y + 10)) <= 2) ||
            (abs(this.x - (ghost.x + 10)) <= 2 && abs(this.y - (ghost.y + 10)) <= 15)) { state = 2; }
    }
}