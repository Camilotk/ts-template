type Board = boolean[][];

function createBoard(rows: number, cols: number): Board {
    let board: Board = new Array(rows);
    for (let i = 0; i < rows; i++) {
        board[i] = new Array(cols).fill(false).map(() => Math.random() > 0.5);
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
            } else if (!board[i][j] && neighbors === 3) {
                newBoard[i][j] = true;
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

async function gameOfLife(rows: number, cols: number, steps: number): Promise<void> {
    let board = createBoard(rows, cols);
    for (let i = 0; i < steps; i++) {
        console.clear();
        printBoard(board);
        board = tick(board);
        await sleep(1000);
    }
}

gameOfLife(10, 10, 100);
