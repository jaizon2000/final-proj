/* TITLE */
'use strict';

// Event Listener


buildGrid();
play();


// --- PLAY.HTML --- //
function play() {

    // Global Vars
    let grid = document.getElementById('grid');
    let history = document.getElementById('history');

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

    // RESET GRID
    function reset() {
        document.documentElement.style.cursor = 'progress';
        console.log('randomize grid and restart all stats');
        // Remove Current Grid
        grid.innerHTML = '';

        // New Random Grid
        buildGrid();

        // Reset Stats
        document.getElementById('lvl').innerHTML = '0';
        document.getElementById('str').innerHTML ='0';
        document.getElementById('killed').innerHTML = '0';
        document.documentElement.style.cursor = 'default';
    }

function newMap() {
    grid.innerHTML = '';
    buildGrid();
}
    // Key Down Event Function
    let histList = [];
    let addKey = 'slime.png';


    function keyDown(event) {
        let key = event.keyCode;

        if (key == 13) { // ENTER Key
            let name = document.getElementById('name').value;
            console.log(name);
        }
        if (key == 38) { // UP key
            addKey = '<div><img src="images/up_arrow.png"></div>';

            fixList(histList, addKey);
            history.innerHTML += addKey;


            // history.innerHTML += '<div><img src="images/up_arrow.png"></div>';
        } else if (key == 39) { // RIGHT key
            addKey = '<div><img src="images/right_arrow.png"></div>';
            fixList(histList, addKey);
            // history.innerHTML += '<div><img src="images/right_arrow.png"></div>';
        } else if (key == 40) {
            addKey = '<div><img src="images/down_arrow.png"></div>';
            fixList(histList, addKey);
        } else if (key == 37) { //LEFT key
            addKey = '<div><img src="images/left_arrow.png"></div>';
            fixList(histList, addKey);
        }
        // for (let i = 0; i < histList.length; i++) {
        //     console.log(histList);
        // }
        history.innerHTML = histList.join('');
        console.log(histList);

    }
}

function fixList(histList, addKey) {
    if (histList.length >= 12) {
        histList.shift(); // remove elem from beginning
        histList.push(addKey); // add elem at end

    } else {
        histList.push(addKey); // add elem at end

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
    let display = '';
    let tile = 'fence_tl_tile.png';

    for (let row = 1; row <= 12; row++) { // y
        for (let col = 1; col <= 12; col++) { // x
            // col=x, row=y
            let id = 'cell' + col + '-' + row;

            if (row == 1 || row == 12 || col == 1 || col == 12) {
                tile = 'fence_x_tile.png';
                // grid.innerHTML += "<div><img  src='images/fence_x_tile.png' id='" + id + "'></div>";
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
            grid.innerHTML += "<div><img  src='images/" + tile + "' id='" + id + "'></div>";

            // console.log('we need to build a wall!');
        }

        // grid.innerHTML += "<div><img  src='images/" + tile + "' id='cell" + col + "-" + row + "'></div>";

    }
}