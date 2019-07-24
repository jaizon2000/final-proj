/* THE CONQUEST SCRIPT */
'use strict';


// Global Vars //
// ----------- //
let grid = document.getElementById('grid');
let history = document.getElementById('history');
let expBar = document.getElementById('exp');


// STATS
let user = {
    lvl: 10,
    str: 0,
    killed: 0,
    exp: 0,
    health: [],
};

let lvl = 0;
let atk = 0;
let str = 1;


let killed = 0;
let exp = 0;
let life = document.getElementById('life');
let health = [];
let heart = '<img src="images/heart.png"><br>';



// TILE LOCATIONS LIST
let tiles = {
    flower: [],
    bush: [],
    slime: [],
    king: [],
    sword: []
};

let flowerTiles = [];
let bushTiles = [];
let slimeTiles = [];
let kingTiles = [];
let swordTiles = [];

// HISTORY LIST
let histList = [];

// KNIGHT STUFF
let knightImg = '<img id="knight" src="images/knight.png">';
let sword = 'sword tile';
let getSword = false;


let walker = {
    col: 6,
    row: 6,
};

let walkerCol = 6;
let walkerRow = 6;
let walkerId = 'cell' + walkerCol + '-' + walkerRow;

// SLIME
let slime = {
    life: 4,
    atk: 1
};

let kingSlime = {
    life: 10,
    atk: 2
}
// Draw Hearts
for (let x = 1; x <= 10; x++) {
    health.push(heart);
}
drawHearts();

buildGrid();
play();

// --- PLAY.HTML --- //
function play() {

    // Event Listeners //
    //--------------- //

    // Reset Button
    document.getElementById('reset-btn').addEventListener('click', reset);
    // New Map Button
    document.getElementById('new-map').addEventListener('click', newMap);
    // How To Button
    document.getElementById('how-to-btn').addEventListener('click', showHowTo);
    document.body.addEventListener('mousedown', hideHowTo);
    // Key Down Event
    document.addEventListener('keydown', keyDown);
    displayStats();
}


// Functions //
//---------- //
function drawHearts() {
    // Draw hearts
    if (health.length < 1) {
        console.log('dead')
    }
    life.innerHTML = health.join('');
}
// Changes the display of Stats
function displayStats() {
    document.getElementById('lvl').innerHTML = lvl;
    document.getElementById('str').innerHTML = str;
    document.getElementById('killed').innerHTML = killed;
}

// RESET GAME
function reset() {
    // Reset Stats
    lvl = 0;
    first_str = 1;
    str = 0;
    killed = 0;
    expBar.value = 0;

    displayStats();

    // Reset Hearts
    health = [];
    // Draw Reset Hearts
    for (let x = 1; x <= 10; x++) {
        health.push(heart);
    }
    drawHearts();

    // Reset Weapon
    sword = 'sword1.png';
    document.getElementById('sword').src = 'images/' + sword;

    newMap();
}

// BUILD NEW MAP
function newMap() {
    // Reset Knight coordinates
    walkerRow = 6;
    walkerCol = 6;

    // Reset Tiles lists
    flowerTiles = [];
    bushTiles = [];
    slimeTiles = [];
    kingTiles = [];
    swordTiles = [];

    // Reset History
    histList = [];
    history.innerHTML = histList;

    // Remove Current Grid
    grid.innerHTML = '';
    // New Random Grid
    buildGrid();
}

// DISPLAY IMG IN HISTORY
function displayOnHistory(tile) {
    let displayKey = '<div><img src="images/' + tile + '"></div>';
    fixList(histList, displayKey);
    // Display histList on web
    history.innerHTML = histList.join('');
}

// REPLACE CURRENT TILE --> GRASS
function replaceTile() {
    let tile = 'grass_tile.png';

    // REPLACE TILE WITH A SWORD
    if (getSword == true) {
        let randSword = Math.random();
        console.log(randSword)
        if (randSword < 0.75) { // 75%
            sword = 'sword1.png';
        } else if (randSword < 0.95) { //15%
            sword = 'sword2.png';
        } else if (randSword < 0.998) { // 9%
            sword = 'sword3.png';
        } else { // 0.2%
            sword = 'sword-extra.png';
        }
        // Replace Tile w/ sword
        document.getElementById(walkerId).innerHTML = knightImg + "<img src='images/" + sword + "'>";
        // Put sword coord in array
        swordTiles.push(walkerId);
        // sword = tile;
    } else {
        document.getElementById(walkerId).innerHTML = knightImg + "<img src='images/" + tile + "'>";
        sword = 'sword1.png';
    }
}

// GAINS EXP
function updateExp(tile) {
    // GAIN EXP
    if (tile == 'slime.png') {
        exp = 1;
        expBar.value += exp;
    } else if (tile == 'slime_king.png') {
        exp = 3;
        expBar.value += exp;
    }

    // GAIN A LEVEL
    if (expBar.value >= 100) {
        lvl++;
        displayStats();
        displayOnHistory('lvlup.png')
        expBar.value = 0;
    }

}

function startBattle(tile) {
    if (tile == 'slime.png') {
        // Remove enemy hearts
        slime.life -= str;
        // Remove 1 Player heart
        health.splice(0, slime.atk);
        drawHearts();

        // Enemy Dies
        if (slime.life <= 0) {
            // Add to killed counter
            killed++;

            // Add exp
            updateExp(tile);

            // Remove from array after death
            slimeTiles.splice(slimeTiles.indexOf(walkerId), 1);
            // Replace SLIME tile --> GRASS 
            replaceTile();
        }
    } else if (tile == 'slime_king.png') {
        // Remove enemy Hearts
        kingSlime.life -= str;
        // Remove 2 Player Hearts
        health.splice(0, kingSlime.atk)
        drawHearts();

        // Enemy Dies
        if (kingSlime.life <= 0) {
            // Add to killed counter
            killed++;

            // Add exp
            updateExp(tile);

            // Remove from array after death
            kingTiles.splice(kingTiles.indexOf(walkerId), 1);
            // Replace SLIME tile --> GRASS 
            replaceTile();
        }
    }
    // Display stats on stats box
    displayStats();

}
// ----------------- // 
// KEY DOWN FUNCTION //
// ----------------- //
function keyDown(event) {
    let key = event.keyCode;
    let tile = 'this is a tile';
    if (key == 78) { // 'n' Key
        newMap();
    } else if (key == 13) { // ENTER Key
        let name = document.getElementById('name').value;
        console.log(name);

    } else if (key == 32) { // SPACE key
        // Prevent space key from clicking button
        window.event || event;
        event.preventDefault();

        // SLIMES //
        if (slimeTiles.includes(walkerId)) {
            tile = "slime.png";
            displayOnHistory(tile);

            // Interaction b/w enemy and player
            startBattle(tile);
        }
        // KING SLIMES
        else if (kingTiles.includes(walkerId)) {
            tile = 'slime_king.png';
            displayOnHistory(tile);

            // Interaction b/w enemy and player
            startBattle(tile);


        }
        // -------------- END SLIME

        // FLOWER TILE - Gives 1 heart
        else if (flowerTiles.includes(walkerId)) {
            tile = 'flower_tile.png';
            displayOnHistory(tile);
            replaceTile();
            // Remove from array
            flowerTiles.splice(flowerTiles.indexOf(walkerId), 1);

            // ADD HEART onspace on a FLOWER
            if (health.length < 20) {
                health.push(heart);
                drawHearts();
            }
        }
        //----------------- END FLOWER TILE

        // BUSH TILE - Gives a sword
        else if (bushTiles.includes(walkerId)) {
            tile = 'bush_tile.png';
            displayOnHistory(tile);

            getSword = true;
            replaceTile();
            getSword = false;

            // Remove Bush from array
            bushTiles.splice(bushTiles.indexOf(walkerId), 1);
        }
        //----------------- END BUSH TILE

        // SWORD TILE
        else if (swordTiles.includes(walkerId)) {
            // Gets img src of sword at current tile
            let imgHTML = document.getElementById(walkerId).getElementsByTagName('img');
            let swordAtk = 1;
            // CHANGE STR depending on sword
            if (sword == 'sword1.png') {
                swordAtk = 1
            } else if (sword == 'sword2.png') {
                swordAtk = 5;
            } else if (sword == 'sword3.png') {
                swordAtk = 8;
            } else if (sword == 'sword-extra.png') {
                swordAtk = 1000;
            }
            str = atk + swordAtk;
            displayStats();

            // CHANGE WEAPON IMG with sword at current tile
            document.getElementById('sword').src = imgHTML[1].src;
            displayOnHistory(sword);

            // REPLACE SWORD TILE --> GRASS
            replaceTile();
            // REMOVE FROM swordTiles array
            swordTiles.splice(swordTiles.indexOf(walkerId), 1);
        }
        //----------------- END SWORD TILE


        // ARROW KEYS
    } else if (key == 38 || key == 39 || key == 40 || key == 37) { // UP, RIGHT, DOWN, LEFT
        // Restart enemy life on move
        slime.life = 4;
        kingSlime.life = 10;

        if (key == 38) { // UP key
            tile = 'up_arrow.png';
            displayOnHistory(tile);

            // FENCE BORDER CHECK
            if (walkerRow == 2) {
                walkerRow == 2;
            } else {
                walkerRow--;
            }
            // ----------

        } else if (key == 39) { // RIGHT key
            tile = 'right_arrow.png';
            displayOnHistory(tile);

            // FENCE BORDER CHECK
            if (walkerCol == 11) {
                walkerCol == 11;
            } else {
                walkerCol++;
            }
            // ----------

        } else if (key == 40) { // DOWN key
            tile = 'down_arrow.png';
            displayOnHistory(tile);

            // FENCE BORDER CHECK 
            if (walkerRow == 11) {
                walkerRow = 11;
            } else {
                walkerRow++;
            }
            // ----------

        } else if (key == 37) { //LEFT key
            tile = 'left_arrow.png';
            displayOnHistory(tile);
            // FENCE BORDER CHECK
            if (walkerCol == 2) {
                walkerCol == 2;
            } else {
                walkerCol--;
            }
            // ----------
        }
        // DISPLAY NEW KNIGHT ON GRID
        // Remove current Knight
        document.getElementById('knight').remove();

        // Update walkerId to ne Knight coordinate
        walkerId = 'cell' + walkerCol + '-' + walkerRow;

        // Add knight at walker id
        let currentTile = document.getElementById(walkerId);
        currentTile.innerHTML = knightImg + currentTile.innerHTML;


    }
}


// FIX HISTORY LIST
function fixList(histList, displayKey) {
    if (histList.length >= 12) {
        histList.shift(); // remove elem from beginning
        histList.push(displayKey); // add elem at end

    } else {
        histList.push(displayKey); // add elem at end
    }
}
// ----------------
// HIDE & SHOW HOW TO
function showHowTo() {
    document.getElementById('how-to').classList.remove('hide');
}

function hideHowTo() {
    document.getElementById('how-to').classList.add('hide');
}
// ----------------- HIDE & SHOW HOW TO


// Build Random Grid //
// ----------------- //
function buildGrid() {
    let tile = 'fence_tl_tile.png';



    for (let row = 1; row <= 12; row++) { // y
        for (let col = 1; col <= 12; col++) { // x
            // col=x, row=y
            let id = 'cell' + col + '-' + row;


            // PLACE FENCE TILES
            if (row == 1 || row == 12 || col == 1 || col == 12) {
                tile = 'fence_x_tile.png';
                if (row == 1 && col == 1) {
                    tile = 'fence_tl_tile.png';
                } else if (row == 1 && col == 12) {
                    tile = 'fence_tr_tile.png';
                } else if (row == 12 && col == 1) {
                    tile = 'fence_bl_tile.png';
                } else if (row == 12 && col == 12) {
                    tile = 'fence_br_tile.png';
                } else if (col == 1) {
                    tile = 'fence_left_tile.png';
                } else if (col == 12) {
                    tile = 'fence_right_tile.png';
                }

            } else {
                // RANDOM TILES
                let randomTile = Math.random(); // 0-0.99
                if (randomTile < 0.85) { // 90%
                    tile = 'grass_tile.png';
                } else if (randomTile < 0.91) { // 6%
                    tile = 'flower_tile.png';
                    flowerTiles.push("cell" + col + "-" + row);

                } else if (randomTile < 0.95) { // 4%
                    tile = 'bush_tile.png';
                    bushTiles.push("cell" + col + "-" + row);

                } else if (randomTile < 0.98) { // 3%
                    tile = 'slime.png';
                    slimeTiles.push("cell" + col + "-" + row);

                } else if (randomTile < 10) { // 2%
                    tile = 'slime_king.png';
                    kingTiles.push("cell" + col + "-" + row);
                }
            }
            grid.innerHTML += "<div id='" + id + "'><img src='images/" + tile + "'></div>";

            // INITIAL KNIGHT TILE
            if (row == 6 && col == 6) {
                let currentTile = document.getElementById('cell6-6');
                currentTile.innerHTML = knightImg + currentTile.innerHTML;
            }

        }

    }
}