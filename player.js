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
        } else if (keyIsDown(RIGHT_ARROW)) {
            this.angle = 0;
        } else if (keyIsDown(LEFT_ARROW)) {
            this.angle = PI;
        }

        // Speed control
        if (this.angle == 0) { this.x += this.speed; }
        else if (this.angle == HALF_PI) { this.y += this.speed; }
        else if (this.angle == PI) { this.x -= this.speed; }
        else if (this.angle == 3*HALF_PI) { this.y -= this.speed; }

        // If pacman goes out of bounds on the x-axis
        if (this.x < -this.size / 2) { this.x = width + this.size / 2; }
        else if (this.x > width + this.size / 2) { this.x = -this.size / 2; }
    }
}