/**
 * Represents a game board.
 */
type Board = boolean[][];

/**
 * Creates a new game board with the specified number of rows and columns.
 * @param rows The number of rows in the board.
 * @param cols The number of columns in the board.
 * @returns A newly created game board.
 */
function createBoard(rows: number, cols: number): Board {
    let board: Board = new Array(rows);
    for (let i = 0; i < rows; i++) {
        board[i] = new Array(cols).fill(false).map(() => Math.random() > 0.8);
    }
    return board;
}

/**
 * Counts the number of live neighbors around a cell on the board.
 * @param board The game board.
 * @param row The row index of the cell.
 * @param col The column index of the cell.
 * @returns The number of live neighbors.
 */
function countNeighbors(board: Board, row: number, col: number): number {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            let newRow = row + i;
            let newCol = col + j;
            if (newRow >= 0 && newRow < board.length && newCol >= 0 && newCol < board[0].length && board[newRow][newCol]) {
                count++;
            }
        }
    }
    return count;
}

/**
 * Computes the next generation of the game board based on the rules of Conway's Game of Life.
 * @param board The current game board.
 * @returns The new game board representing the next generation.
 */
function tick(board: Board): Board {
    let newBoard = createBoard(board.length, board[0].length);
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            let neighbors = countNeighbors(board, i, j);
            if (board[i][j] && (neighbors === 2 || neighbors === 3)) {
                newBoard[i][j] = true;
            } else if (!board[i][j] && neighbors === 3) {
                newBoard[i][j] = true;
            }
        }
    }
    return newBoard;
}

/**
 * Prints the current state of the game board.
 * @param board The game board to print.
 */
function printBoard(board: Board): void {
    for (let i = 0; i < board.length; i++) {
        let row = '';
        for (let j = 0; j < board[0].length; j++) {
            row += board[i][j] ? 'O' : ' ';
        }
        console.log(row);
    }
}

/**
 * Pauses execution for the specified number of milliseconds.
 * @param ms The number of milliseconds to sleep.
 * @returns A promise that resolves after the specified time.
 */
function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Prints a message with optional vertical spacing above it.
 * @param message The message to print.
 * @param spaces The number of vertical spaces before the message.
 */
function printMessage(message: string, spaces: number): void {
    for (let i = 0; i < spaces; i++) {
        console.log();
    }
    console.log('\x1b[31m%s\x1b[0m', message);
}

/**
 * Runs the Game of Life simulation.
 * @param rows The number of rows in the initial game board.
 * @param cols The number of columns in the initial game board.
 * @param maxGenerations The maximum number of generations to run the simulation.
 */
async function gameOfLife(rows: number, cols: number, maxGenerations: number): Promise<void> {
    let board = createBoard(rows, cols);
    let generations = 0;
    while (generations < maxGenerations) {
        console.clear();
        printBoard(board);
        board = tick(board);
        generations++;
        await sleep(1000);
    }
    printMessage("Max generations reached. Game over.", rows);
}

// Start the Game of Life simulation
gameOfLife(10, 30, 50);
