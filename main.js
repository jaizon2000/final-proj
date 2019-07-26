/* THE CONQUEST SCRIPT */
'use strict';

// MUSIC //
document.getElementById('bg-music').volume = 0.2;


// Global Vars //
// ----------- //
let grid = document.getElementById('grid');
let history = document.getElementById('history');
let expBar = document.getElementById('exp');
let healthBar = document.getElementById('life');


// STATS
let knight = {
    name: 'TheKnight',
    lvl: 1,
    str: 1,
    atk: 0,
    killed: 0,
    exp: 0,
    health: [],
};

// TILE LOCATIONS LIST
let tiles = {
    Flower: [],
    Burger: [],
    Bush: [],
    Slime: [],
    King: [],
    Sword: []
};

// HISTORY LIST
let histList = [];

// KNIGHT STUFF
let knightImg = '<img id="knight" src="images/knight.png">';
// let sword = '';
let getSword = false;

// WALKER ID
let walkerCol = 6;
let walkerRow = 6;
let walkerId = 'cell' + walkerCol + '-' + walkerRow;

/* 
.:HOW ENEMY HEALTH WORKS:.
health - org starting health. 
newHealth - ALWAYS == org health.

health - always changing since used for user interaction.
newHealth - used for reseting health of enemy when user moves.
newHealth - ONLY changes when user LVLS UP. (make it harder)
 */

// SLIME
let slime = {
    health: 4,
    newHealth: 4,
    extra: 3,
    atk: 1,
};

// KING SLIME
let king = {
    health: 10,
    newHealth: 10,
    extra: 5,
    atk: 2,
};

// Draw Hearts
let heart = '<img src="images/heart.png"><br>';
for (let x = 1; x <= 10; x++) {
    knight.health.push(heart);
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

    // AUDIO Event Listeners
    // HOVER
    document.getElementById('menu').addEventListener('mouseover', sound)
    document.getElementById('stats').addEventListener('mouseover', sound)
    // GET_ITEM
}

//---------- //
// Functions //
//---------- //
function sound() {
    let audio = document.getElementById('hover');
    audio.currentTime = 0;
    audio.play();
}

// FUNCTIONS FOR CREATING RANDOM GRID //
// ---------------------------------- //
function getRandSword() {
    let randSword = Math.random();
    let sword_tile = 'tile.png';
    console.log(randSword)
    if (randSword < 0.75) { // 75%
        sword_tile = 'sword1.png';
    } else if (randSword < 0.95) { //15%
        sword_tile = 'sword2.png';
    } else if (randSword < 0.998) { // 9%
        sword_tile = 'sword3.png';
    } else { // 0.2%
        sword_tile = 'sword-extra.png';
    }
    return sword_tile;
}

function displayFence(col, row) {
    // PLACE FENCE TILES
    let tile = 'fence_x_tile.png';
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
    return tile;
}

function displayGridTiles(col, row) {
    let tile = '.png';
    // RANDOM TILES
    let randomTile = Math.random(); // 0-0.99
    if (randomTile < 0.85) { // 90%
        tile = 'grass_tile.png';

    } else if (randomTile < 0.91) { // 6%
        let randFlower = Math.random();
        if (randFlower < 0.85) {
            tile = 'flower_tile.png';
            tiles.Flower.push("cell" + col + "-" + row);

        } else {
            tile = 'burger.png';
            tiles.Burger.push("cell" + col + '-' + row);
        }

    } else if (randomTile < 0.95) { // 4%
        tile = 'bush_tile.png';
        tiles.Bush.push("cell" + col + "-" + row);

    } else if (randomTile < 0.98) { // 3%
        tile = 'slime.png';
        tiles.Slime.push("cell" + col + "-" + row);

    } else if (randomTile < 10) { // 2%
        tile = 'slime_king.png';
        tiles.King.push("cell" + col + "-" + row);
    }
    return tile;
}
// ------------- FUNCTIONS FOR RAND GRID

function drawHearts() {
    // Draw hearts
    if (knight.health.length < 1) {
        console.log('dead')
    }
    healthBar.innerHTML = knight.health.join('');
}
// Changes the display of Stats
function displayStats() {
    document.getElementById('lvl').innerHTML = knight.lvl;
    document.getElementById('str').innerHTML = knight.str;
    document.getElementById('killed').innerHTML = knight.killed;
}

// RESET GAME //
function reset() {
    // Reset Stats
    knight.lvl = 1;
    knight.str = 1;
    knight.atk = 0;
    knight.killed = 0;
    expBar.value = 0;

    displayStats();

    // Reset Hearts
    knight.health = [];
    // Draw Reset Hearts
    for (let x = 1; x <= 10; x++) {
        knight.health.push(heart);
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
    tiles.Flower = [];
    tiles.Bush = [];
    tiles.Slime = [];
    tiles.King = [];
    tiles.Sword = [];
    tiles.Burger = [];

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
    if (getSword == true) {
        let displayKey = '<div><img src="' + tile + '"></div>';
        fixList(histList, displayKey);

    } else {
        let displayKey = '<div><img src="images/' + tile + '"></div>';
        fixList(histList, displayKey);
    }
    // let displayKey = tile;
    // Display histList on web
    history.innerHTML = histList.join('');
}

// REPLACE CURRENT TILE --> GRASS
function replaceTile() {
    let currentTile = document.getElementById(walkerId);
    let tile = 'sword1.png';
    // REPLACE TILE WITH A SWORD
    if (getSword == true) {
        tile = getRandSword();

        // Put sword coord in array
        tiles.Sword.push(walkerId);
    }
    // IF SPACE PRESSED ON A FLOWER/BURGER/SLIME/KING
    else {
        tile = 'grass_tile.png';
    }

    // Replace Tile w/ sword or grass on SPACE
    let nameplate = '<span id="nameplate">' + knight.name + '</span>';

    currentTile.innerHTML = knightImg + "<img src='images/" + tile + "'>" + nameplate;
}

// GAINS EXP
function updateExp(tile) {
    // GAIN EXP
    if (tile == 'slime.png') {
        knight.exp = 2;

    } else if (tile == 'slime_king.png') {
        knight.exp = 5;
    }
    expBar.value += knight.exp;

    // GAIN A LEVEL if max!
    if (expBar.value >= expBar.max) {
        // AUDIO
        let audio = document.getElementById('levelup');
        audio.play();
        // Gain lvl and str
        knight.lvl++;
        knight.str += 2;

        // Display stats and lvl png
        displayStats();
        displayOnHistory('lvlup.png')

        // Leveling gets harder
        expBar.value = 0;
        expBar.max += 5;

        // Killing gets harder
        slime.health += slime.extra;
        king.health += king.extra;

        slime.newHealth += slime.extra;
        king.newHealth += king.extra;
    }

}

function startBattle(tile) {
    // AUDIO
    let audio = document.getElementById('hit');
    audio.currentTime = 0;
    audio.play();

    if (tile == 'slime.png') {
        // Remove enemy hearts
        slime.health -= knight.str;
        // Remove 1 Player heart
        knight.health.splice(0, slime.atk);
        drawHearts();

        // Enemy Dies
        if (slime.health <= 0) {
            // Add to killed counter
            knight.killed++;

            // Add exp
            updateExp(tile);

            // Reset enemy life
            slime.health = slime.newHealth;

            // Remove from array after death
            tiles.Slime.splice(tiles.Slime.indexOf(walkerId), 1);
            // Replace SLIME tile --> GRASS 
            replaceTile();
        }

    } else if (tile == 'slime_king.png') {
        // Remove enemy Hearts
        king.health -= knight.str;
        // Remove 2 Player Hearts
        knight.health.splice(0, king.atk)
        drawHearts();

        // Enemy Dies
        if (king.health <= 0) {
            // Add to killed counter
            knight.killed++;

            // Add exp
            updateExp(tile);

            // Remove from array after death
            tiles.King.splice(tiles.King.indexOf(walkerId), 1);
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

    // [n] Key
    if (key == 78) { // [n] Key
        newMap();
    }

    // [ENTER] Key
    else if (key == 13) { // [ENTER] Key
        knight.name = document.getElementById('name').value;

        while (true) {
            if (knight.name.trim().length >= 4 && knight.name.trim().length <= 9) {
                break;
            }
            knight.name = prompt('Please try again.\nName length has to be between 4-9 characters:').trim();

        }
        document.getElementById('nameplate').innerHTML = knight.name;

        console.log(knight.name);
    }

    // [SPACE] Key
    else if (key == 32) { // [SPACE] key
        // Prevent space key from clicking button
        window.event || event;
        event.preventDefault();

        // [SPACE] Slime
        if (tiles.Slime.includes(walkerId)) { // [SPACE] slime
            // Display on History
            displayOnHistory('slime.png');
            // Interaction b/w enemy and player
            startBattle('slime.png');
        }

        // [SPACE] King Slime
        else if (tiles.King.includes(walkerId)) { // [SPACE] king slime
            // Display on history
            displayOnHistory('slime_king.png');
            // Interaction b/w enemy and player
            startBattle('slime_king.png');
        }
        // -------------- END SLIMES

        // [SPACE] flower - Gives 1 heart
        else if (tiles.Flower.includes(walkerId)) { // [SPACE] flower
            displayOnHistory('flower_tile.png');
            replaceTile();

            // AUDIO
            let audio = document.getElementById('item_get');
            audio.currentTime = 0;
            audio.play();

            // Remove from array
            tiles.Flower.splice(tiles.Flower.indexOf(walkerId), 1);

            // ADD 1 HEART 
            if (knight.health.length < 20) {
                knight.health.push(heart);
                drawHearts();
            }

        }
        //----------------- END FLOWER TILE

        // [SPACE] Burger - Give 5 hearts
        else if (tiles.Burger.includes(walkerId)) { // [SPACE] Burger
            displayOnHistory('burger.png');
            replaceTile();
            // AUDIO
            let audio = document.getElementById('item_get');
            audio.currentTime = 0;
            audio.play();
            // ADD 5 HEARTS
            let j = knight.health.length + 5;
            while (knight.health.length != j) {
                if (knight.health.length < 20) {
                    knight.health.splice(1, 0, heart);
                    drawHearts();
                } else {
                    break;
                }
            }

        }
        // ------------------- BURGER TILE


        // [SPACE] Bush
        else if (tiles.Bush.includes(walkerId)) { // [SPACE] Bush
            displayOnHistory('bush_tile.png');
            // AUDIO
            let audio = document.getElementById('grass');
            audio.currentTime = 0;
            audio.play();
            getSword = true;
            replaceTile();
            getSword = false;

            // Remove Bush from array
            tiles.Bush.splice(tiles.Bush.indexOf(walkerId), 1);


        }
        //----------------- END BUSH TILE

        // [SPACE] Sword //
        else if (tiles.Sword.includes(walkerId)) {
            // Gets img src of sword at current tile
            let currentTileSrc = document.getElementById(walkerId).getElementsByTagName('img')[1];


            // CHANGE KNIGHT STR depending on sword
            console.log(currentTileSrc.src)
            console.log(knight.atk)
            // AUDIO
            let audio = document.getElementById('item_get');
            audio.currentTime = 0;
            audio.play();
            if (currentTileSrc.src == '/images/sword1.png') {
                knight.atk = 1
                console.log('changed')
            } //else if (currentTileSrc == 'sword2.png') {
            //     knight.atk = 5;
            // } else if (currentTileSrc == 'sword3.png') {
            //     knight.atk = 10;
            // } else if (currentTileSrc == 'sword-extra.png') {
            //     knight.atk = 1000;
            // }
            // console.log('before ' + knight.str)
            // knight.str = knight.atk + knight.atk;
            // console.log('a ' + knight.str)
            // displayStats();


            getSword = true;
            displayOnHistory(currentTileSrc.src);
            getSword = false;
            // CHANGE WEAPON IMG with sword at current tile
            let swordOnTable = document.getElementById('sword');
            swordOnTable.src = currentTileSrc.src;

            // REPLACE SWORD TILE --> GRASS
            replaceTile();
            // REMOVE FROM sword Tiles array
            tiles.Sword.splice(tiles.Sword.indexOf(walkerId), 1);


        }
        //----------------- END SWORD TILE


        // ARROW KEYS
    } else if (key == 38 || key == 39 || key == 40 || key == 37) { // UP, RIGHT, DOWN, LEFT
        // AUDIO
        let audio = document.getElementById('grass');
        // audio.currentTime = 0;
        audio.play();
        // Restart enemy life on move
        slime.health = slime.newHealth;
        king.health = king.newHealth;

        if (key == 38) { // UP key
            displayOnHistory('up_arrow.png');

            // FENCE BORDER CHECK
            if (walkerRow == 2) {
                walkerRow == 2;
            } else {
                walkerRow--;
            }
            // ---------- UP

        } else if (key == 39) { // RIGHT key
            displayOnHistory('right_arrow.png');

            // FENCE BORDER CHECK
            if (walkerCol == 11) {
                walkerCol == 11;
            } else {
                walkerCol++;
            }
            // ---------- RIGHT

        } else if (key == 40) { // DOWN key
            displayOnHistory('down_arrow.png');

            // FENCE BORDER CHECK 
            if (walkerRow == 11) {
                walkerRow = 11;
            } else {
                walkerRow++;
            }
            // ---------- DOWN

        } else if (key == 37) { //LEFT key
            displayOnHistory('left_arrow.png');
            // FENCE BORDER CHECK
            if (walkerCol == 2) {
                walkerCol == 2;
            } else {
                walkerCol--;
            }
            // ---------- LEFT
        }
        // DISPLAY NEW KNIGHT ON GRID
        // Remove current Knight
        document.getElementById('knight').remove();
        document.getElementById('nameplate').remove()
        // Update walkerId to ne Knight coordinate
        walkerId = 'cell' + walkerCol + '-' + walkerRow;

        // Add knight at walker id
        let currentTile = document.getElementById(walkerId);
        let nameplate = '<span id="nameplate">' + knight.name + '</span>';
        currentTile.innerHTML = knightImg + currentTile.innerHTML + nameplate;


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
            // Temp id for creating grid
            let id = 'cell' + col + '-' + row;

            // PLACE FENCE TILES
            if (row == 1 || row == 12 || col == 1 || col == 12) {
                tile = displayFence(col, row);
            }

            // PLACE RANDOM TILES
            else {
                tile = displayGridTiles(col, row);
            }

            // Give div an id and display tile
            grid.innerHTML += "<div id='" + id + "'><img src='images/" + tile + "'></div>";

            // INITIAL KNIGHT TILE
            if (row == 6 && col == 6) {
                let currentTile = document.getElementById('cell6-6');

                // Add img and name plate
                let nameplate = '<span id="nameplate">' + knight.name + '</span>';
                currentTile.innerHTML = knightImg + currentTile.innerHTML + nameplate;
            }

        }

    }
}