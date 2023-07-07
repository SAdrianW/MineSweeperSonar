/*------ Constants ------*/
const DIFFICULTY_LVL = {
    easy: {mines: 10, boardSize: 'small'},
    med: {mines: 40, boardSize: 'medium'},
    hard: {mines: 10, boardSize: 'large'}
};
// Will always reference at least easy. With diff

const BOARD_OPTIONS = {
    easy: {rows: 9, columns: 19},
    med: {rows: 15, columns: 31},
    hard: {rows: 21, columns: 43}
};


/*------ State Variables ------*/
let board;  // array, square (or cone or cone if enough time)

let timer;  // counts time taken from first click. timer element that always starts at 0, counts up as time passes while result = inGame

let result; // initially at inGame, changes to gameWon or gameLost
// ?O?  let difficulty; // ? Optional ? easy, med or hard
let visibility;
let minesRemaing; // depends on difficulty. easy = 10, med = 40, hard = 99
 


/*------ Cached Elements ------*/
const resetBtn = document.getElementById('reset');


/*------ Event Listeners ------*/
document.getElementById('cell').addEventListener('click', sonarPing); // player choice of cell selection
document.getElementById('diff-btn').addEventListener('click', diffChoice)


/*------ Functions ------*/
initialise();
// prepares the game to be played


function initialise() {
    board =
    timer = 0;
    // ?O?  difficulty = 
    result = inGame;
    visibility = hidden; // cells change to visable after bing clicked
    minesRemaing = diff.mines

    render();
};




function render() {
    renderBoard();
    renderTimer();
    renderMines();
};
// Render: displays the game to the DOM

function renderBoard() {

};

function renderTimer() {

};

function renderMines() {

};



function sonarPing() {
    // guard: if (evt.target.tagName !== 'CELL') return; // this should prevent clicks from happening "out of bounds"
                          // ^ or className, if that works
    render();
    EventTarget.class = visable
};
// sonarPing: responds to user interaction. (probably not the best name, but it is on theme)






// ?O?  diffuculty. defaults to easy if nothing is picked
function diffChoice() {

};