type Board = boolean[][];

function createBoard(rows: number, cols: number): Board {
    let board: Board = new Array(rows);
    for (let i = 0; i < rows; i++) {
        board[i] = new Array(cols).fill(false).map(() => Math.random() > 0.8);
    }
    return board;
}

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

function tick(board: Board): Board {
    let newBoard = createBoard(board.length, board[0].length);
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            let neighbors = countNeighbors(board, i, j);
            if (board[i][j] && (neighbors === 2 || neighbors === 3)) {
                newBoard[i][j] = true;
            } else if (board[i][j] === 0 && neighbors === 3) {
                newBoard[i][j] = 1;
            }
        }
    }
    return newBoard;
}

function printBoard(board: Board): void {
    for (let i = 0; i < board.length; i++) {
        let row = '';
        for (let j = 0; j < board[0].length; j++) {
            row += board[i][j] ? 'O' : ' ';
        }
        console.log(row);
    }
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function printMessage(message: string, spaces: number): void {
    for (let i = 0; i < spaces; i++) {
        console.log();
    }

    console.log('\x1b[31m%s\x1b[0m', message);
}

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

gameOfLife(10, 30, 50);
