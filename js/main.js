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

let minesTotal;   // depends on difficulty. easy = 10, med = 40, hard = 99
 
// let mineLocations;  // num = ^. randomCell (use Math.random row * collumn). While loop to iterate loops = ^

/*------ Cached Elements ------*/
// Elements to be accessed repeatedly. saved here for efficency

const resetBtn = document.getElementById('reset');
const diffSelection = document.getElementById(diffChoice);

/*------ Event Listeners ------*/
document.querySelector('.board').addEventListener('click', sonarPing); // player choice of cell selection
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
    ];
    // // path for desired board info: BOARD_OPTIONS[DIFFICULTY_LVL.boardSize] TODO: find function that makes array based on paramaters supplied
    timer = 0;
    // result = inGame;
    // visibility = hidden; // this is currently being done by renderBoard.
    difficulty = 'test'; // hard code for testing. todo remove when diff options work
    minesTotal = 3 // hard code for testing. todo remove when diff options work
    // path for mines. DIFFICULTY_LVL.{diffChoice.mines}; todo: fix this
    render();
};




// // Render: displays/ visualise the game to the DOM
//  !!! HELP !!! returns undefined in console
function render() {
    renderBoard();
    // renderTimer();
    // renderMines();
};

//  !!! HELP !!! returns undefined in console
function renderBoard() {
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cellVal, rowIdx) {
            const cellId = `r${rowIdx}c${colIdx}`;
            const cellEl = document.querySelector(`.${cellId}`);
            // console.log(cellEl);
            // cellEl.classList.remove("revealed"); //  having this here cancels out sonarPing. todo delete?
            cellEl.classList.add("hidden"); // todo delete?
            // cellEl.innerText = ""; // this is/was a test finction. maybe needed later?
        });
    });
};

// function renderTimer() {

// };

//  !!! HELP !!! works independantly, calls sub functions
function renderMines() { 
    mineLocations();
};

//  !!! HELP !!! works independantly, calls place mine, which displays its code rather than running
function mineLocations() { 
    let i = 0;
    while (i < minesTotal) {
        placeMine();
        i++;
        console.log(placeMine)
    }
};

//  !!! HELP !!! works independantly with hard coded cellId
function placeMine() { 
    let rowIdx = Math.floor(Math.random() * (1, 4)); // 3 is hard code for diff. todo remove when diff options work
    let colIdx = Math.floor(Math.random() * (1, 4));
    let cellId = `r${rowIdx}c${colIdx}`;
    const cellEl = document.querySelector(`.${cellId}`);
    cellEl.innerText = 'X';
    console.log(cellEl)
};


// guard: if (evt.target.tagName !== 'CELL') return; // this should prevent clicks from happening "out of bounds"
                      // ^ or className, if that works

function sonarPing(evt) {
    // console.log(evt.target, 'ping'); // test
    evt.target.classList.remove('hidden');
    evt.target.classList.add('revealed');
    // console.log(evt.target, 'woop'); // test
    
    render();

    // EventTarget.class = visable;
};
// sonarPing: responds to user interaction. (probably not the best name, but it is on theme)






// ?O?  diffuculty. defaults to easy if nothing is picked
function diffChoice() {
    // difficulty = square if no 'click' detected. If click detected then use that result.
    return difficulty = 'test';

};

function resetGame(evt) {
    initialise(); 
    //  !!! HELP !!!  this doesn't appear to do anything... not even console.log undefined
    console.log('game reset');
};
// reset: may not add hiddem class. or may add second. currently hard coded html
// might need to move hidden to init function.