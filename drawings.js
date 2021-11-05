class Drawings {
    constructor() {
        this.redGhost = this.makeGhost1('red');
    }
    makeGhost1(color) {
        let x = 200;
        let y = 200;
        fill(color);
        noStroke();
        ellipse(x, y, 40, 40);
        rect(x-20, y, 40, 20);
        triangle(x-20, y+20, x-20, y+30, x-
        10, y+20);
        triangle(x-10, y+20, x-5, y+30, x, 
        y+20);
        triangle(x, y+20, x+5, y+30, x+10, 
        y+20);
        triangle(x+10, y+20, x+20, y+20, 
        x+20, y+30);
        fill(255, 255, 255);
        ellipse(x-8, y, 10, 15);
        ellipse(x+8, y, 10, 15);
        fill(0, 0, 0);
        ellipse(x-8, y+3, 8, 8);
        ellipse(x+8, y+3, 8, 8);
        return get(180, 180, 40, 50);
    }
}