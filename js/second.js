// min viable prod (MVP) = 10*10 playable game
// testing reqs: 
//      4*4 board
//         starting hidden for all cells
//          
//      basic interactivity:
//          cells change when clicked



// TODO
// flood fill
// win logic







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


let adjCells = [
    [0, 1, 2],
    [3, T, 5],
    [6, 7, 8]
];

let adjExample = [
    ['r0c1', 'r0c2', 'r0c3'],
    ['r1c1',    T, 'r1c3'],
    ['r2c1', 'r2c2', 'r2c3'],
];

// NW id = r-1, c-1     N id = r-1 c===     NE id = r-1 c+1
// W id = r===, c-1     TARGET r1c2         E id = r=== c+1
// NW id = r+1, c-1     N id = r+1 c===     NE id = r+1 c+1




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

