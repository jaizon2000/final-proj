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
    // Event Listeners //
    //--------------- //

    // Reset Button
    document.getElementById('reset-btn').addEventListener('click', reset);
    // How To Button
    document.getElementById('how-to-btn').addEventListener('click', showHowTo);
    document.body.addEventListener('mousedown', hideHowTo);
    // Name
    document.addEventListener('keydown', keyDown);


    // Functions //
    //---------- //
    // space bar event.keyCode == 32

    // 

    // Reset
    function reset() {
        console.log('randomize grid and restart all stats');
    }

    // Get Value On ENTER
    function keyDown(event) {
        let key = event.keyCode;

        if (key == 13) { // ENTER Key
            let name = document.getElementById('name').value;
            console.log(name);
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
}

function buildGrid() {
    for (let col = 1; col < 16 + 1; col++) {
        for (let row = 1; row < 2; row++) {
            // col=x, row=y
            document.getElementById('grid').innerHTML += "<div id='cell" + col + "-" + row + "'></div>";
        }
    }
}