/* TITLE */
'use strict';

// Event Listener
document.getElementById('enter').addEventListener('click', startPage);

// Functions
function startPage() {
    var name = document.getElementById('name').value;
    console.log(name);
    document.getElementById('start-page').classList.add('hide');
    document.getElementById('play-page').classList.remove('hide');
}