const player = (symbol) => {
    const spaces = [];
    return {symbol, spaces};
};

let player1 = player('X');
let player2 = player('O');

const gameBoard = (() => {
    const board = [];
    let gameOn = true;
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return {board, gameOn, winConditions};
})();

const displayController = (() => {
    let symbol = player1.symbol;
    const boardSpaces = Array.from(document.querySelector('#game-board').children);
    boardSpaces.forEach(space => {
        space.addEventListener('click', e => {
            if (e.target.textContent == '' && gameBoard.gameOn == true) {
                if (symbol == player1.symbol) {
                    //gamePlay(e, player1.spaces, boardSpaces, symbol);
                    e.target.textContent = player1.symbol;
                    player1.spaces.push(boardSpaces.indexOf(e.target));
                    gameBoard.board[boardSpaces.indexOf(e.target)] = e.target.textContent;
                    console.log(player1.spaces);
                    winCheck(player1.spaces);
                    symbol = player2.symbol;
                } else {
                    e.target.textContent = player2.symbol;
                    player2.spaces.push(boardSpaces.indexOf(e.target));
                    gameBoard.board[boardSpaces.indexOf(e.target)] = e.target.textContent;
                    console.log(player2.spaces);
                    winCheck(player2.spaces);
                    symbol = player1.symbol;
                }
            } else {
                return;
            }
            console.log(gameBoard.board);
        });
    });
})();

function gamePlay(event, spaces, boardSpaces, symbol) {
    event.target.textContent = player1.symbol;
    player1.spaces.push(boardSpaces.indexOf(event.target));
    gameBoard.board[boardSpaces.indexOf(event.target)] = event.target.textContent;
    console.log(player1.spaces);
    winCheck(player1.spaces);
    symbol = player2.symbol;
    return symbol;
}

function winCheck(playerSpaces) {
    let arrayCheck = [];
    for(let i = 0; i < gameBoard.winConditions.length; i++) {
        for(let j = 0; j < gameBoard.winConditions[i].length; j++) {
            if (playerSpaces.includes(gameBoard.winConditions[i][j]) === true) {
                arrayCheck.push('true');
            } else {
                arrayCheck.push('false');
            }
            if (arrayCheck.length == 3) {
                if (arrayCheck.includes('false') === false) {
                    console.log(arrayCheck);
                    gameBoard.gameOn = false;
                } else {
                    arrayCheck = [];
                }
            }
        }
    }
    if (gameBoard.board.length === 9 && gameBoard.board.includes() === false && gameBoard.gameOn === true) {
        console.log('tie game');
    }
}
