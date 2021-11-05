const TILE_MAP = [
    "###########################",
    "#            ##            #",
    "# #### ##### ## ##### #### #",
    "# #### ##### ## ##### #### #",
    "# #### ##### ## ##### #### #",
    "#  P                       #",
    "# #### ## ######## ## #### #",
    "# #### ## ######## ## #### #",
    "#      ##    ##    ##      #",
    "###### ##### ## ##### ######",
    "~~~~~# ##### ## ##### #~~~~~",
    "~~~~~# ##          ## #~~~~~",
    "~~~~~# ## ######## ## #~~~~~",
    "###### ## #~~~~~~# ## ######",
    "......    #~~~~~~#    ......",
    "###### ## #~~~~~~# ## ######",
    "~~~~~# ## ######## ## #~~~~~",
    "~~~~~# ##    P     ## #~~~~~",
    "~~~~~# ## ######## ## #~~~~~",
    "###### ## ######## ## ######",
    "#            ##            #",
    "# #### ##### ## ##### #### #",
    "# #### ##### ## ##### #### #",
    "#   ##                ##   #",
    "### ## ## ######## ## ## ###",
    "### ## ## ######## ## ## ###",
    "#      ##    ##    ##      #",
    "# ########## ## ########## #",
    "#G########## ## ########## #",
    "#                          #",
    "############################"
];
const TILE_SIZE = 20;

var pellets = [], walls = [], ghosts = [], nodes = [];
var player;

function initializeTilemap() {
    drawings = new Drawings();
    for (let j = 0; j < TILE_MAP.length; ++j) {
        for (let i = 0; i < TILE_MAP[j].length; ++i) {
            let x = i*TILE_SIZE;
            let y = j*TILE_SIZE;
            switch(TILE_MAP[j][i]) {
                case '#':
                    walls.push(new Wall(x, y));
                    break;
                case '.':
                    nodes.push(new MyNode(i, j));
                    break;
                case ' ':
                    pellets.push(new Pellet(x + TILE_SIZE/2, y + TILE_SIZE/2))
                    nodes.push(new MyNode(i, j));
                    break;
                case 'P':
                    player = new Player(x + 10, y + 10);
                    nodes.push(new MyNode(i, j));
                    break;
                case 'G':
                    ghosts.push(new Ghost(x, y, drawings.redGhost));
                    nodes.push(new MyNode(i, j));
            }
        }
    }
    for (let i = 0; i < nodes.length; ++i) { nodes[i].getNeighbors(); }
}