// min viable prod (MVP) = 10*10 playable game
// testing reqs: 
//      4*4 board
//         starting hidden for all cells
//          
//      basic interactivity:
//          cells change when clicked



// TODO post MVP
//      dificulty - too hard basket/ not enough time
//      timer - ran out of time to figure this out (the irony is not lost to me here)
// flag count
// comments: general and re-factor


//      DONE!!!
//  reset - done
//  visuals; remove vmin units
//  better game over message


// ?O?
// 
// audio
// cone





// HTML to be returned later
//      goes into header under div class info-box
<!-- <div class="time-box time info">
<h2 class="timer time info">Timer</h2>
<h4 class="time info timer-display" id="time-taken">0</h4>
<div class="countUp time info"></div>
</div> -->

//      under h4 id remaining mines
<!-- <div class="mine-count mine info"></div> -->


//      under flag btn
<!-- <h4 class="flags" id="flags-placed">0</h4> -->
<!-- ^ to be used to count flags on field. maybe even limit amount -->


//      footer contents
<!-- <div class="diff-box diff">
            <h3 class="diff-title diff">Choose your battle:</h3>
            <div class="diff-options diff">
                <button class="easySquare-btn diff" id="easySquare">Easy Square</button>
                <button class="medSquare-btn diff" id="medSquare" >Medium Square</button>
                <button class="hardSquare-btn diff" id="hardSquare">Hard Square</button>
                <button class="easySnr-btn diff">Easy Sonar</button>
                <button class="medSnr-btn diff">Medium Sonar</button>
                <button class="hardSnr-btn diff">Hard Sonar</button> 
            these will be returned at a much later date
            </div>
        </div> -->


//  JS to be returned

        // State vars
// let flagsUsed;           // put back in later if time


        // Cache
// const diffSelection = document.getElementById(diffChoice);


        // Event Listeners
// document.getElementById('board').addEventListener('click', sonarPing); // player choice of cell selection
        // event listener re-factored into function to prevent turning entire board into single cell when any single cell was clicked.

// document.querySelector('.diff-options').addEventListener('click', diffChoice);


        // Functions
            // Init between last and 2nd last }       
// document.getElementById('board').addEventListener('click', sonarPing); // player choice of cell selection
        // event listener re-factored into function to prevent turning entire board into single cell when any single cell was clicked.

// document.querySelector('.diff-options').addEventListener('click', diffChoice);


// function diffChoice(evt) {
//     console.log(evt.target.id);
//     let difficulty = evt.target.id.toString();
//     return difficulty;
// }


            // sonarPing    
// countFlags();   // used to count total flgs on field


// function countFlags() {      // not giving a number at the end, just an array or object of HTML
//     flagsUsed = board.reduce((acc,flag) => {
//         acc[flag] = acc[flag] ? acc[flag] +1 : 1;
//         return acc;
//     }, []);
//     console.log(flagsUsed.toString())
// };



// these are pseudocode attempts at writing various functions.

// on click if cell is empty (null) ; 
// Check adjacent (adj) cells for mines: 	
    // not sure how to do this
// If (while loop) numMines = 0 , change cell style to ‘clear’      
    // should clear all adjacent cells (flooding feature?)
// If numMines = N , change cell style to N;       
    // should indicate how many mines are nearby
// If cell = mine ; gameOver()       
//gameOver func stops timer, reveals board, allows score (if using), activates reset



// purpose: look for mines adjacent to target location
// target cellID (rowIdx, colIdx)
// compare cellId with neighbourh ids 
        // -> forEach loop? would check every cell in entire array.
            // if compareTargetCellID !== (+ || -) 1; return
                // let numMines = 0
                // else  if {compTarget.cellInner('X'), numMines++} 
            // return numMines    
                
    // pattern: row = (+ 1) || (- 1)
    // pattern: col = (+ 1) || (- 1)
                

// count total numMines in 8 adj cells -> return var N
// display total as text on target cell -> not that hard. cellId.innerText=('N')


// let adjCells = [
//     [0, 1, 2],
//     [3, T, 5],
//     [6, 7, 8]
// ];

// let adjExample = [
//     ['r0c1', 'r0c2', 'r0c3'],
//     ['r1c1',    T, 'r1c3'],
//     ['r2c1', 'r2c2', 'r2c3'],
// ];

// NW id = r-1, c-1     N id = r-1 c===     NE id = r-1 c+1
// W id = r===, c-1     TARGET r1c2         E id = r=== c+1
// NW id = r+1, c-1     N id = r+1 c===     NE id = r+1 c+1





// The code below was borrowed from the address to help build out my initial version of the adjacent mines counting function
// https://stackoverflow.com/questions/66806921/minesweeper-problem-to-recover-the-mines-adjacent-to-a-tile

// function getAdjacentMines(row, col) {   // name is self explanatory
//     let count = 0;          // count number of mines
//     let minRow = row - 1;   // look at rows less than the current by 1
//     let maxRow = row + 1;   // up to rows more than current by 1
//     let minCol = col - 1;   // columns less than current by 1
//     let maxCol = col + 1;   // columns more than current by 1
//             // these functions?(variables?) constrain our search to 
//             // cells adjacent to current by 1. They keep the search relevant
//             // could change to different value for wider search

//     if (minRow < 0) minRow = 0;     
//     if (maxRow > board.length) maxRow = board.length - 1;
//     if (minCol < 0) minCol = 0;     
//     if (maxCol > board.length) maxCol = board.length - 1;
//             // these 4 keep the comparison within the scope of the board

//     for (row = minRow; row <= maxRow; row++) {      
//             // starting at the lowest row value, run function(?), then increase row by 1
//         for (col = minCol; col <= maxCol; col++) {
//             // as above but for column
//             if (board[row][col].boom === true) count++;
//             // if cellID.innerText === "x", add 1 to count variable
//         }
//     }

//     return count;
// }















// these two are older versions of functions that were phased out as methodology changed or better syntax was developed
// forEach(checkMines(evt){
//     if (evt.target === 'X') return;      
//     } else {
//         adjMines() 
//     }
// );

// board.forEach(function(colArr, colIdx) {
//     colArr.forEach(function(cellVal, rowIdx) {
//         const cellId = `r${rowIdx}c${colIdx}`;
//         const cellEl = document.querySelector(`.${cellId}`);
//         // console.log(cellEl);
//         // cellEl.classList.remove("revealed"); //  put entire function in reset
//         cellEl.classList.add("hidden"); // todo delete?
//         // cellEl.innerText = ""; // this is/was a test finction. maybe needed later?
//     });
// });




// OLD FUNCTIONS GRAVEYARD


// // // Render: displays/ visualise the game to the DOM
// // currently only being used for renderBoard, which is native to initialise.
// function render() {
// //     // console.log('ren-deng-deng-deng')
//     renderBoard();
// //     // renderTimer();
// };

// function renderBoard() {
//     // // New renderBoard function starts with an empty array and fills it with divs and gives cells r-c co-ordinates as numbers
//     for (let r = 0; r < rows; r++) {
//         let row = [];
//         for (let c = 0; c < columns; c++) {
//             let cell = document.createElement('div');
//             cell.id = r.toString() + '-' + c.toString();
//             cell.addEventListener('click', sonarPing);
//             document.getElementById('board').append(cell);
//             row.push(cell);

//         }
//         board.push(row);
//     }
    
    // // old version of renderBoard. worked with a pre-made 2d array. Added a hidden class to be changed to revealed class upon interaction
//     board.forEach(function(colArr, colIdx) {
//         colArr.forEach(function(cellVal, rowIdx) {
//             const cellId = `r${rowIdx}c${colIdx}`;
//             const cellEl = document.querySelector(`.${cellId}`);
//             // console.log(cellEl);
//             // cellEl.classList.remove("revealed"); //  put entire function in reset
//             cellEl.classList.add("hidden"); // todo delete?
//             // cellEl.innerText = ""; // this is/was a test finction. maybe needed later?
//         });
//     });
// };

// // function renderTimer() {

// // };



// function chooseMineLocations() { 
//     let i = 0;
//     while (i < minesTotal) {
//         placeMine();
//         i++;
//         // console.log(placeMine)
//     }
// };


// // let mineLocations;  // num = ^. randomCell (use Math.random row * collumn). While loop to iterate loops = ^
// function placeMine() { 
//     let rowIdx = Math.floor(Math.random() * (1, 4)); // 3 is hard code for diff. todo remove when diff options work
//     let colIdx = Math.floor(Math.random() * (1, 4));
//     let cellId = `r${rowIdx}c${colIdx}`;
//     const cellEl = document.querySelector(`.${cellId}`);
//     cellEl.innerText = 'X';
//     // console.log(cellEl)
// };

 // // console.log(evt.target, 'ping'); // test
    // evt.target.classList.remove('hidden');
    // evt.target.classList.add('revealed');
    
    // // adjacent mines
    // adjMines(evt);
    
    // render();
    
    // // EventTarget.class = visable;

    // // flood fill = recursion (self call) from this function with limiter for revealed
// function adjMines (evt) {
//     let cellId = evt.target.id; 
//     cellId = cellId.split('');
//     let row = Number(cellId[1]);
//     let col = Number(cellId[3]);
//     let numMines = 0;
        
//     let minRow = row - 1;
//     let maxRow = row + 1;
//     let minCol = col - 1;
//     let maxCol = col + 1;

//     if (minRow < 0) minRow = 0;
//     if (maxRow >= board.length) maxRow = board.length - 1;
//     if (minCol < 0) minCol = 0;
//     if (maxCol >= board.length) maxCol = board.length - 1;


//     for (let rowIdx = minRow; rowIdx <= maxRow; rowIdx++) {
//         for (let colIdx = minCol; colIdx <= maxCol; colIdx++) {
//             let candidate = document.querySelector(`#r${rowIdx}c${colIdx}`);
//             if (candidate.innerText === 'X' && candidate !== evt.target) numMines++;
//             // if (board[rowIdx][colIdx].innerText === 'X') count++;
//         }
//     }
//     console.log(cellId, row, col);
//     console.log(numMines);
//     return numMines;
// };




// // ?O?  diffuculty. defaults to easy if nothing is picked
// function diffChoice() {
//     // difficulty = square if no 'click' detected. If click detected then use that result.
//     return difficulty = 'test';

// };


// board = [""]; // doesn't empty the board array in the same way that empty quotes would clear a string
    
    // // board creation "function" from initialise. was planning to reverse the process and .pop the divs, then realised a forEach loop might be better
    // // function makes divs. splice removes divs
    // for (let r = 0; r < rows; r++) {
    //     let row = [];
    //     for (let c = 0; c < columns; c++) {
    //         let cell = document.createElement('div');
    //         cell.id = r.toString() + '-' + c.toString();
    //         cell.addEventListener('click', sonarPing);
    //         document.getElementById('board').append(cell);
    //         row.push(cell);

    //     }
    //     board.push(row);
    // }
    
    // board.forEach(div.pop());
    
    // let r = board[0];
    // let c = board[1];
    
    // let cell = board[""];
    // let coords = cell.id.split("-");
    // let r = parseInt(coords[0]);
    // let c = parseInt(coords[1]);

    // board.forEach(function clearBoard(r, c) {
    //     for (let r = 0; r < rows; r++) {
    //         let row = [];
    //     for (let c = 0; c < columns; c++) {
    //         board.pop(); 
    //         }
    //     }
    // })

    // ?O? if reset doesn't work use center slot in header for flag count



// // contents of old reset function
// board.forEach(function(colArr, colIdx) {
//     colArr.forEach(function(cellVal, rowIdx) {
//         const cellId = `r${rowIdx}c${colIdx}`;
//         const cellEl = document.querySelector(`.${cellId}`);
//         cellEl.classList.remove("revealed"); 
//         cellEl.innerText = ""; // this is/was a test finction. maybe needed later?
// // reset: may not add hiddem class. or may add second. currently hard coded html
// // might need to move hidden to init function.
//     });
// });






// OLD CSS GRAVEYARD

/* not needed anymore, re-factored into default state */
/* .hidden {
    outline: 2px dotted navy;
    color: transparent;
} */





