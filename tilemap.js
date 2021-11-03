const TILE_MAP = [
    "####################",
    "#                  #",
    "#                  #",
    "#                  #",
    "#                  #",
    "#                  #",
    "#                  #",
    "#                  #",
    "#                  #",
    "#                  #",
    "                    ",
    "#                  #",
    "#     #            #",
    "#    ##            #",
    "#                  #",
    "#     #            #",
    "#     #            #",
    "#    ##            #",
    "#                  #",
    "#                  #",
    "####################"
];
const TILE_SIZE = 20;

var walls = []

function initializeTilemap() {
    for (let j = 0; j < TILE_MAP.length; ++j) {
        for (let i = 0; i < TILE_MAP[j].length; ++i) {
            if (TILE_MAP[j][i] == '#') { walls.push(new Wall(i*TILE_SIZE, j*TILE_SIZE)); }
        }
    }
}