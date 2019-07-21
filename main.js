/* THE CONQUEST SCRIPT */
'use strict';


// Global Vars
let grid = document.getElementById('grid');
let history = document.getElementById('history');


// STATS
let lvl = 0;
let str = 0;
let killed = 0;

// TILE LOCATIONS LIST
let flowerTiles = [];
let bushTiles = [];
let slimeTiles = [];
let grassTiles = [];



let walkerCol = 6;
let walkerRow = 6;

let walkerId = 'cell' + walkerCol + '-' + walkerRow;
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


    // Functions //
    //---------- //
    // space bar event.keyCode == 32

    // Changes the display of Stats
    function displayStats() {
        document.getElementById('lvl').innerHTML = lvl;
        document.getElementById('grid-lvl').innerHTML = lvl;
        document.getElementById('str').innerHTML = str;
        document.getElementById('killed').innerHTML = killed;
    }

    // RESET GRID
    function reset() {
        // Remove Current Grid
        grid.innerHTML = '';

        // New Random Grid
        buildGrid();

        // Reset Stats
        lvl = 0;
        str = 0;
        killed = 0;
        displayStats();
    }

    // BUILD NEW MAP
    function newMap() {
        grid.innerHTML = '';
        buildGrid();
    }
    // Key Down Event Function
    let histList = [];

    // ----------------- // 
    // KEY DOWN FUNCTION //
    // ----------------- //
    function keyDown(event) {
        let key = event.keyCode;
        let displayKey = 'grass_tile.png';
        let imgKey = '';

        // ENTER Key
        if (key == 13) {
            let name = document.getElementById('name').value;
            console.log(name);

            // ARROW KEYS
        } else if (key == 38 || key == 39 || key == 40 || key == 37) { // UP, RIGHT, DOWN, LEFT

            if (key == 38) { // UP key
                imgKey = 'up_arrow.png';

                // FENCE BORDER CHECK
                if (walkerRow == 2) {
                    walkerRow == 2;
                } else {
                    walkerRow--;
                }
                // ----------

            } else if (key == 39) { // RIGHT key
                imgKey = 'right_arrow.png';

                // FENCE BORDER CHECK
                if (walkerCol == 11) {
                    walkerCol == 11;
                } else {
                    walkerCol++;
                }
                // ----------

            } else if (key == 40) { // DOWN key
                imgKey = 'down_arrow.png';

                // FENCE BORDER CHECK 
                if (walkerRow == 11) {
                    walkerRow = 11;
                } else {
                    walkerRow++;
                }
                // ----------

            } else if (key == 37) { //LEFT key
                imgKey = 'left_arrow.png';

                // FENCE BORDER CHECK
                if (walkerCol == 2) {
                    walkerCol == 2;
                } else {
                    walkerCol--;
                }
                // ----------
            }

            // DISPLAY IMG IN HISTORY
            displayKey = '<div><img src="images/' + imgKey + '"></div>';

            // DISPLAY KNIGHT
            walkerId = 'cell' + walkerCol + '-' + walkerRow;
            console.log(walkerRow)
            let knight = document.getElementById(walkerId);
            // let knightImg = document.getElementById('knight');
            document.getElementById('knight').remove();
            knight.innerHTML = '<img id="knight" src="images/knight.png">' + knight.innerHTML;


            fixList(histList, displayKey);
            history.innerHTML = histList.join('');

            // console.log(histList);
        }

    }
}

function fixList(histList, displayKey) {
    if (histList.length >= 12) {
        histList.shift(); // remove elem from beginning
        histList.push(displayKey); // add elem at end

    } else {
        histList.push(displayKey); // add elem at end

    }
}


// HIDE & SHOW HOW TO
function showHowTo() {
    document.getElementById('how-to').classList.remove('hide');
}

function hideHowTo() {
    document.getElementById('how-to').classList.add('hide');
}


// Build Random Grid
function buildGrid() {
    let tile = 'fence_tl_tile.png';

    for (let row = 1; row <= 12; row++) { // y
        for (let col = 1; col <= 12; col++) { // x
            // col=x, row=y
            let id = 'cell' + col + '-' + row;

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
                } else if (randomTile < 0.95) { // 4%
                    tile = 'bush_tile.png';

                } else if (randomTile < 0.98) { // 3%
                    tile = 'slime.png';
                } else if (randomTile < 10) { // 2%
                    tile = 'slime_king.png';
                }
            }
            grid.innerHTML += "<div id='" + id + "'><img src='images/" + tile + "'></div>";

            // INITIAL KNIGHT TILE
            if (row == 6 && col == 6) {
                tile = 'knight.png';
                let knight = document.getElementById('cell6-6');
                knight.innerHTML = "<img id='knight' src='images/" + tile + "'>" + knight.innerHTML;
            }

        }

    }
}
// document.getElementById('knight').remove();