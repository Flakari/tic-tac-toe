const player = (symbol, name) => {
    const spaces = [];
    return {symbol, spaces, name};
};

let player1 = player('X', 'Player 1');
let player2 = player('O', 'Player 2');

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
                    gamePlay(e, player1.spaces, boardSpaces, symbol, player1.name);
                    symbol = player2.symbol;
                } else {
                    gamePlay(e, player2.spaces, boardSpaces, symbol, player2.name);
                    symbol = player1.symbol;
                }
            } else {
                return;
            }
        });
    });
})();

function gamePlay(event, spaces, boardSpaces, symbol, name) {
    event.target.textContent = symbol;
    spaces.push(boardSpaces.indexOf(event.target));
    gameBoard.board[boardSpaces.indexOf(event.target)] = event.target.textContent;
    winCheck(spaces, name);
}

function winCheck(playerSpaces, name) {
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
                    console.log(name + ' wins!');
                    gameBoard.gameOn = false;
                } else {
                    arrayCheck = [];
                }
            }
        }
    }
    if (gameBoard.board.length === 9 && gameBoard.board.includes() === false && gameBoard.gameOn === true) {
        console.log('Tie game!');
    }
}
