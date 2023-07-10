/*------ Constants ------*/
const DIFFICULTY_LVL = {
    // easy: {mines: 10, boardSize: 'small'},
    // med: {mines: 40, boardSize: 'medium'},
    // hard: {mines: 99, boardSize: 'large'},
    square: {mines: 10, boardSize: 'square'},
    test: {mines: 3, boardSize: 'test'}
};
// Will always reference at least square. With diff

const BOARD_OPTIONS = {
    // easy: {rows: 9, columns: 19},
    // med: {rows: 15, columns: 31},
    // hard: {rows: 21, columns: 43},
    square: {rows: 10, columns: 10},
    test: {rows: 4, columns: 4}
};


/*------ State Variables ------*/
let board;      // array; square (or cone if enough time)

let timer;      // counts time taken from first click. timer element that always starts at 0, counts up as time passes while result = inGame

let result;         // initially at inGame, changes to gameWon or gameLost

let difficulty;     // ? Optional ? easy, med or hard

let visibility;     // cells change to visable after being clicked

let minesRemaing;   // depends on difficulty. easy = 10, med = 40, hard = 99
 
let mineLocations;  // num = ^. randomCell (use Math.random row * collumn). While loop to iterate loops = ^

/*------ Cached Elements ------*/
// Elements to be accessed repeatedly. saved here for efficency

const resetBtn = document.getElementById('reset');
const diffSelection = document.getElementById(diffChoice);

/*------ Event Listeners ------*/
document.querySelector('.board').addEventListener('click', sonarPing); // player choice of cell selection
// document.getElementById('diff-options').addEventListener('click', diffChoice);
// document.getElementById('reset').addEventListener('click', initialise);


/*------ Functions ------*/

initialise();
// prepares the game to be played, readies all state

function initialise() {
    // rotate 90deg counter-clockwise to visualise to DOM.
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ];
    // // path for desired board info: BOARD_OPTIONS[DIFFICULTY_LVL.boardSize] TODO: find function that makes array based on paramaters supplied
    timer = 0;
    // result = inGame;
    // visibility = hidden; 
    difficulty = diffChoice;
    // minesRemaing = DIFFICULTY_LVL.{diffChoice.mines};
    render();
};




// // Render: displays/ visualise the game to the DOM
function render() {
    renderBoard();
    // renderTimer();
    // renderMines();
};

function renderBoard() {
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cellVal, rowIdx) {
            const cellId = `r${rowIdx}c${colIdx}`;
            const cellEl = document.querySelector(`.${cellId}`);
            // console.log(cellEl);
            // cellEl.classList.add("hidden"); todo delete?
            // cellEl.style.backgroundColor = 'purple';
            // cellEl.innerText = "";
        });
    });
};

// function renderTimer() {

// };

// function renderMines() {

// };


// guard: if (evt.target.tagName !== 'CELL') return; // this should prevent clicks from happening "out of bounds"
                      // ^ or className, if that works

function sonarPing(evt) {
    console.log(evt.target, 'ping');
    evt.target.classList.remove('hidden');
    evt.target.classList.add('revealed');
    console.log(evt.target, 'woop');
    
    render();

    // EventTarget.class = visable;
};
// sonarPing: responds to user interaction. (probably not the best name, but it is on theme)






// ?O?  diffuculty. defaults to easy if nothing is picked
function diffChoice() {
    // difficulty = square if no 'click' detected. If click detected then use that result.
    return difficulty = 'test';

};


// reset: may not add hiddem class. or may add second. currently hard coded html
// might need to move hidden to init function.