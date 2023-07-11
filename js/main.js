/*------ Constants ------*/
const DIFFICULTY_LVL = {
    easy: {mines: 10, rows: 9, columns: 19},
    med: {mines: 40,rows: 15, columns: 31},
    hard: {mines: 99 ,rows: 21, columns: 43},
    square: {mines: 10,rows: 10, columns: 10},
    test: {mines: 3, rows: 4, columns: 4}
};
// Will always reference at least square.




/*------ State Variables ------*/
let board;      // array; square (or cone if enough time)

let timer;      // counts time taken from first click. timer element that always starts at 0, counts up as time passes while result = inGame

let result;         // initially at inGame, changes to gameWon or gameLost

let difficulty;     // ? Optional ? easy, med or hard

let visibility;     // cells change to visable after being clicked

let minesTotal;   // depends on difficulty. easy = 10, med = 40, hard = 99
 

/*------ Cached Elements ------*/
// Elements to be accessed repeatedly. saved here for efficency

const resetBtn = document.getElementById('reset');
// const diffSelection = document.getElementById(diffChoice);

/*------ Event Listeners ------*/
document.querySelector('.board').addEventListener('click', sonarPing); // player choice of cell selection
// document.querySelector('.board').addEventListener('click', adjMines); // player choice of cell selection
// document.getElementById('diff-options').addEventListener('click', diffChoice);
document.querySelector('.reset').addEventListener('click', resetGame);


/*------ Functions ------*/

initialise();
// prepares the game to be played, readies all state

// !!! HELP !!! returns undefined in console. yet cells gain hidden style via renderBoard
function initialise() {
    // rotate 90deg counter-clockwise to visualise to DOM?
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]; // hard code. todo change
    timer = 0;
    // result = 'inGame';
    // visibility = 'hidden'; // this is currently being done by renderBoard.
    difficulty = 'test'; // hard code for testing. todo remove when diff options work
    minesTotal = 3 // hard code for testing. todo remove when diff options work
    // ??? ASK ??? path for mines. DIFFICULTY_LVL.{diffChoice.mines}; todo: fix this
    mineLocations();
    render();
};




// // Render: displays/ visualise the game to the DOM
//  !!! HELP !!! returns undefined in console. solved
function render() {
    // console.log('ren-deng-deng-deng')
    renderBoard();
    // renderTimer();
};

//  !!! HELP !!! returns undefined in console
function renderBoard() {
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cellVal, rowIdx) {
            const cellId = `r${rowIdx}c${colIdx}`;
            const cellEl = document.querySelector(`.${cellId}`);
            // console.log(cellEl);
            // cellEl.classList.remove("revealed"); //  put entire function in reset
            cellEl.classList.add("hidden"); // todo delete?
            // cellEl.innerText = ""; // this is/was a test finction. maybe needed later?
        });
    });
};

// function renderTimer() {

// };



function mineLocations() { 
    let i = 0;
    while (i < minesTotal) {
        placeMine();
        i++;
        // console.log(placeMine)
    }
};


// let mineLocations;  // num = ^. randomCell (use Math.random row * collumn). While loop to iterate loops = ^
function placeMine() { 
    let rowIdx = Math.floor(Math.random() * (1, 4)); // 3 is hard code for diff. todo remove when diff options work
    let colIdx = Math.floor(Math.random() * (1, 4));
    let cellId = `r${rowIdx}c${colIdx}`;
    const cellEl = document.querySelector(`.${cellId}`);
    cellEl.innerText = 'X';
    // console.log(cellEl)
};


// guard: if (evt.target.tagName !== 'CELL') return; // this should prevent clicks from happening "out of bounds"
                      // ^ or className, if that works

function sonarPing(evt) {
    // console.log(evt.target, 'ping'); // test
    evt.target.classList.remove('hidden');
    evt.target.classList.add('revealed');
    
    // adjacent mines
    adjMines(evt);

    render();

    // EventTarget.class = visable;
};
// sonarPing: responds to user interaction. (probably not the best name, but it is on theme)

// hard code something that works, then add variables
function adjMines (evt) {
    let cellId = evt.target.id; // 1, 2
    cellId = cellId.split('');
    let row = Number(cellId[1]);
    let col = Number(cellId[3]);
    let numMines = 0;
        // if ( row > 0 && row < 3)
    let minRow = row - 1;
    let maxRow = row + 1;
    let minCol = col - 1;
    let maxCol = col + 1;

    if (minRow < 0) minRow = 0;
    if (maxRow >= board.length) maxRow = board.length - 1;
    if (minCol < 0) minCol = 0;
    if (maxCol >= board.length) maxCol = board.length - 1;


    for (let rowIdx = minRow; rowIdx <= maxRow; rowIdx++) {
        for (let colIdx = minCol; colIdx <= maxCol; colIdx++) {
            if (document.querySelector(`#r${rowIdx}c${colIdx}`).innerText === 'X') numMines++;
            // if (board[rowIdx][colIdx].innerText === 'X') count++;
        }
    }
    console.log(cellId, row, col);
    console.log(numMines);
    return numMines;
};




// ?O?  diffuculty. defaults to easy if nothing is picked
function diffChoice() {
    // difficulty = square if no 'click' detected. If click detected then use that result.
    return difficulty = 'test';

};

function resetGame(evt) {
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cellVal, rowIdx) {
            const cellId = `r${rowIdx}c${colIdx}`;
            const cellEl = document.querySelector(`.${cellId}`);
            cellEl.classList.remove("revealed"); 
            cellEl.innerText = ""; // this is/was a test finction. maybe needed later?
        });
    });
    initialise(); 
    console.log('game reset');
};
// I think the reset function is fully working. Ignore below comments, unless it isn't
// reset: may not add hiddem class. or may add second. currently hard coded html
// might need to move hidden to init function.