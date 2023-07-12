/*------ Constants ------*/
const DIFFICULTY_LVL = {
    easy: {mines: 10, rows: 9, columns: 19},
    med: {mines: 40, rows: 15, columns: 31},
    hard: {mines: 99 , rows: 21, columns: 43},
    easySquare: {mines: 10, rows: 10, columns: 10},
    medSquare: {mines: 40, rows: 16, columns: 16},
    hardSquare: {mines: 99, rows: 16, columns: 30},
    test: {mines: 3, rows: 4, columns: 4}
};
// Will always reference at least square.




/*------ State Variables ------*/
let board = [];      // array; square (or cone if enough time)

let timer;      // counts time taken from first click. timer element that always starts at 0, counts up as time passes while result = inGame

let difficulty;     // ? Optional ? easy, med or hard. set to 'easySquare' then change with eventListener?

let mineLocations = [];     // array holding random mine locations

let cellsRevealed = 0;      // goal of game is to click all cells minus mine cells, changes gameOver

let flagEnabled = false;    // when true enables placing of flags rather then revealing of cells. Toggle is more mobile friendly compared to using right click event listener

let gameOver = false;       // changes to true when mine clicked, or cellsRevealed

let minesTotal;

let rows;

let columns;

/*------ Cached Elements ------*/
// Elements to be accessed repeatedly. saved here for efficency

const resetBtn = document.getElementById('reset');
const flagBtn = document.getElementById('flag-btn');
// const diffSelection = document.getElementById(diffChoice);

/*------ Event Listeners ------*/
// document.getElementById('board').addEventListener('click', sonarPing); // player choice of cell selection
        // event listener re-factored into function to prevent turning entire board into single cell when any single cell was clicked.

// document.getElementById('diff-options').addEventListener('click', diffChoice);
document.querySelector('.reset').addEventListener('click', resetGame);

/*------ Functions ------*/

initialise();
// prepares the game to be played, readies all state

function initialise() {
    // rotate 90deg counter-clockwise to visualise to DOM?
    difficulty = 'easySquare'; // hard code for testing. todo remove when diff options work. defaults to easy
    minesTotal = DIFFICULTY_LVL[difficulty].mines
    rows = DIFFICULTY_LVL[difficulty].rows
    columns = DIFFICULTY_LVL[difficulty].columns
    
    document.getElementById('remaining-mines').innerText = minesTotal;
    document.getElementById('flag-btn').addEventListener('click', setFlag);

    placeMines();

    gameOver = false;

    // // create the board. would move to render board function, except variables within need to stay local
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cell = document.createElement('div');
            cell.id = r.toString() + '-' + c.toString();
            cell.addEventListener('click', sonarPing);
            document.getElementById('board').append(cell);
            row.push(cell);

        }
        board.push(row);
    }

    // timer = 0;       // TODO: implement timer
    // render(); // not using currently. game works without it. don't want to break things by moving them too much
};

function placeMines() {
    let minesLeft = minesTotal;
    while (minesLeft > 0) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();

        if (!mineLocations.includes(id)) {
            mineLocations.push(id);
            minesLeft -= 1;
        }
    }
}



function setFlag() {
    if (flagEnabled) {
        flagEnabled = false;
        flagBtn.style.backgroundColor = 'lightgrey';
    }
    else {
        flagEnabled = true;
        flagBtn.style.backgroundColor = 'greenyellow';
    }
}


// // sonarPing: responds to user interaction. (probably not the best name, but it is on theme)
// // Has built in event listener.
function sonarPing(evt) {
    if (gameOver || this.classList.contains("revealed")) {
        return;
    }

    let cell = this;    
    if (flagEnabled) {      // handles placing/ removing of flags
        if(cell.innerText === '') {
            cell.innerText = 'F';
            cell.style.color = 'greenyellow';
        } 
        else if (cell.innerText === 'F') {
            cell.innerText = '';
            cell.style.color = 'black';
        }
        return;
    }

    if (mineLocations.includes(cell.id)) {  // handles clicking on a mine and ending the game
        alert("GAME OVER!");
        gameOver = true;
        revealMines();
        return;
    }

    let coords = cell.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);

   
};

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++){
            let cell = board[r][c];
            if (mineLocations.includes(cell.id)) {
                cell.innerText = "BOOM"
                cell.style.backgroundColor = "orangered"
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns){
        return;     // if out of bounds return/ cancel function
    }
    if (board[r][c].classList.contains("revealed")){
        return;
    }

    board[r][c].classList.add("revealed");
    cellsRevealed += 1;

    let minesFound = 0;

    // 3 cells above target
    minesFound += checkCell(r-1, c-1);   // top left
    minesFound += checkCell(r-1, c);    // top 
    minesFound += checkCell(r-1, c+1);   // top right

    // same row left and right
    minesFound += checkCell(r, c-1);   // left 
    minesFound += checkCell(r, c+1);   // right 

    // 3 cells under target
    minesFound += checkCell(r+1, c-1);  // under left
    minesFound += checkCell(r+1, c);    // under 
    minesFound += checkCell(r+1, c+1);  // under right

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    }
    else {
        // 3 cells above
        checkMine(r-1, c-1);    // top left
        checkMine(r-1, c);      // top 
        checkMine(r-1, c+1);    // top right

        // same row
        checkMine(r, c-1);    // left
        checkMine(r, c+1);    // right

        // 3 cells under
        checkMine(r+1, c-1);    // under left
        checkMine(r+1, c);      // under 
        checkMine(r+1, c+1);    // under right
    }

    if (cellsRevealed === rows * columns - minesTotal) {
        document.getElementById("remaining-mines").innerText = "Cleared";
        gameOver = true;
    }
}

function checkCell(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns){
        return 0;     // if out of bounds return/ cancel function
    }
    if (mineLocations.includes(r.toString() + "-" + c.toString())) {
        return 1;
    }
    return 0;
}




function resetGame(evt) {
    // // new reset function, needs to remove board state
    // // reset looks like it works but no new functions work.

    board.splice(0, Infinity); // removes all divs from board, but doesnt change the DOM
    mineLocations.splice(0, Infinity); // removes all mines from board
    document.getElementById("board").classList.remove("revealed"); 
    document.getElementById("board").innerText = "";


    initialise(); 
    console.log('game reset');
};




