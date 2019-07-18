/* TITLE */
'use strict';

// Event Listener

// --- INDEX.HTML --- //
if (window.location.pathname == "/index.html") {
    console.log('take me home, country road');
} else if (window.location.pathname == "/play.html") {
    console.log('play to win');
    buildGrid();
    play();

}

// --- PLAY.HTML --- //
function play() {

    // Global Vars
    let grid = document.getElementById('grid');
    let history = document.getElementById('history');

    // Event Listeners //
    //--------------- //

    // Reset Button
    document.getElementById('reset-btn').addEventListener('click', reset);
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
        console.log('randomize grid and restart all stats');
        // Remove Current Grid
        grid.innerHTML = '';

        // New Random Grid
        buildGrid();
    }

    // Key Down Event Function
    let count = 1;

    function keyDown(event) {
        let key = event.keyCode;

        if (key == 13) { // ENTER Key
            let name = document.getElementById('name').value;
            console.log(name);
        }
        if (key == 38) { // UP KEY
            history.innerHTML += '<div><img width="32px" src="images/up_arrow.png"></div>';
        } else if (key == 39) { // RIGHT KEY
            history.innerHTML += '<div><img width="32px" src="images/right_arrow.png"></div>';
        }

    }
}



// Build Random Grid
function buildGrid() {

    let tile = 'grass_tile.png';

    for (let row = 1; row < 12 + 1; row++) { // y
        for (let col = 1; col < 12 + 1; col++) { // x
            // col=x, row=y

            // RANDOM TILES
            let randomTile = Math.random(); // 0-0.99
            if (randomTile < 0.85) { // 90%
                tile = 'grass_tile.png';
            } else if (randomTile < 0.91) { // 6%
                tile = 'flower_tile.png';
            } else if (randomTile < 0.95) { // 4%
                tile = 'bush_tile.png';
            } else if (randomTile < 0.98) {
                tile = 'slime.png';
            } else if (randomTile < 10) {
                tile = 'slime_king.png';
            }
            grid.innerHTML += "<div><img width='32px' src='images/" + tile + "' id='cell" + col + "-" + row + "'></div>";
        }
        for (row = 1; row == 1 || row == 14; row++) {
            for (col = 1; ) {
                console.log('we need to build a wall!');

            }
        }



    }
}
}

// HIDE & SHOW HOW TO
function showHowTo() {
    document.getElementById('how-to').classList.remove('hide');
}

function hideHowTo() {
    document.getElementById('how-to').classList.add('hide');
    console.log('hiding');
}