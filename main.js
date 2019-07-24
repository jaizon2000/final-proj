/* THE CONQUEST SCRIPT */
'use strict';


// Global Vars //
// ----------- //
let grid = document.getElementById('grid');
let history = document.getElementById('history');

// STATS
let lvl = 0;
let str = 0;
let killed = 0;
let xp = 0;
let life = document.getElementById('life');
let health = [];
let heart = '<img src="images/heart.png"><br>';


// TILE LOCATIONS LIST
let flowerTiles = [];
let bushTiles = [];
let slimeTiles = [];
let kingTiles = [];
let swordTiles = [];

// HISTORY LIST
let histList = [];

// KNIGHT STUFF
let knightImg = '<img id="knight" src="images/knight.png">';
let sword = 'sword imgKey';
let getSword = false;

let walkerCol = 6;
let walkerRow = 6;
let walkerId = 'cell' + walkerCol + '-' + walkerRow;

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
    str = 0;
    killed = 0;
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
function displayOnHistory(imgKey) {
    let displayKey = '<div><img src="images/' + imgKey + '"></div>';
    fixList(histList, displayKey);
    // Display histList on web
    history.innerHTML = histList.join('');
}

function replaceTile() {
    let imgKey = 'grass_tile.png';

    // REPLACE TILE WITH A SWORD
    if (getSword == true) {
        let randSword = Math.random();
        console.log(randSword)
        if (randSword < 0.7) { // 70%
            imgKey = 'sword1.png';
        } else if (randSword < 0.9) { //20%
            imgKey = 'sword2.png';
        } else if (randSword < 0.99) { // 9%
            imgKey = 'sword3.png';
        } else { // 1%
            imgKey = 'sword-extra.png';
        }
        // Replace Tile w/ sword
        document.getElementById(walkerId).innerHTML = knightImg + "<img src='images/" + imgKey + "'>";
        // Put sword coord in array
        swordTiles.push(walkerId);
        sword = imgKey;
    } else {
        document.getElementById(walkerId).innerHTML = knightImg + "<img src='images/" + imgKey + "'>";
        sword = 'sword1.png';
    }
}
// ----------------- // 
// KEY DOWN FUNCTION //
// ----------------- //
function keyDown(event) {
    let key = event.keyCode;
    let imgKey = '';

    if (key == 13) { // ENTER Key
        let name = document.getElementById('name').value;
        console.log(name);

    } else if (key == 32) { // SPACE key
        // Prevent space key from clicking button
        window.event || event;
        event.preventDefault();

        // SLIMES
        if (slimeTiles.includes(walkerId)) {
            imgKey = "slime.png";
            displayOnHistory(imgKey);

            // Remove hearts
            health.pop();
            drawHearts();

            // Remove from array after death
            // slimeTiles.splice(slimeTiles.indexOf(walkerId), 1);
            // Replace SLIME tile --> GRASS 
        }
        // KING SLIMES
        else if (kingTiles.includes(walkerId)) {
            imgKey = 'slime_king.png';
            displayOnHistory(imgKey);

            // Remove Hearts
            // at index 0, remove 2 elems
            health.splice(0, 2)
            drawHearts();

            // Remove from array after death
            // kingTiles.splice(kingTiles.indexOf(walkerId), 1);
            // Replace SLIME tile --> GRASS
        }
        // -------------- END SLIME

        // FLOWER TILE - Gives 1 heart
        else if (flowerTiles.includes(walkerId)) {
            imgKey = 'flower_tile.png';
            displayOnHistory(imgKey);
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
            imgKey = 'bush_tile.png';
            displayOnHistory(imgKey);

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
            let imgKey = sword;
            // console.log(imgHTML[1].src)
            // CHANGE WEAPON IMG with sword at current tile
            document.getElementById('sword').src = imgHTML[1].src;
            displayOnHistory(imgKey);

            // REPLACE SWORD TILE --> GRASS
            replaceTile();
            // REMOVE FROM swordTiles array
            swordTiles.splice(swordTiles.indexOf(walkerId), 1);
        }
        //----------------- END SWORD TILE


        // ARROW KEYS
    } else if (key == 38 || key == 39 || key == 40 || key == 37) { // UP, RIGHT, DOWN, LEFT

        if (key == 38) { // UP key
            imgKey = 'up_arrow.png';
            displayOnHistory(imgKey);

            // FENCE BORDER CHECK
            if (walkerRow == 2) {
                walkerRow == 2;
            } else {
                walkerRow--;
            }
            // ----------

        } else if (key == 39) { // RIGHT key
            imgKey = 'right_arrow.png';
            displayOnHistory(imgKey);

            // FENCE BORDER CHECK
            if (walkerCol == 11) {
                walkerCol == 11;
            } else {
                walkerCol++;
            }
            // ----------

        } else if (key == 40) { // DOWN key
            imgKey = 'down_arrow.png';
            displayOnHistory(imgKey);

            // FENCE BORDER CHECK 
            if (walkerRow == 11) {
                walkerRow = 11;
            } else {
                walkerRow++;
            }
            // ----------

        } else if (key == 37) { //LEFT key
            imgKey = 'left_arrow.png';
            displayOnHistory(imgKey);
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