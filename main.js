/* TITLE */
'use strict';

// Event Listener

// --- INDEX.HTML --- //
if (window.location.pathname == "/index.html") {
    console.log('take me home, country road');
}
else if (window.location.pathname == "/play.html") {
    console.log('play to win');
    play()
    
}

// --- PLAY.HTML --- //
function play() {
    document.getElementById('reset-btn').addEventListener('click', reset);

    function reset() {
        console.log('randomize grid and restart all stats');
    }

    var name = document.getElementById('name').value;
    console.log(name);
}
