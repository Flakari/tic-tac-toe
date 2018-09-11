const gameInfo = document.querySelector('#info-panel');

const player = (symbol, name) => {
    const spaces = [];
    return {symbol, spaces, name};
};

let player1 = player('X', 'Player 1');
let player2 = player('O', 'Player 2');

const gameBoard = (() => {
    let board = [];
    let currentPlayer = player1;
    let gameOn = false;
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
    return {board, gameOn, winConditions, currentPlayer};
})();

const displayController = (() => {
    let currentPlayer = gameBoard.currentPlayer;
    const newGame = document.querySelector('#new-game');
    const boardSpaces = Array.from(document.querySelector('#game-board').children);
    boardSpaces.forEach(space => {
        space.addEventListener('click', e => {
            if (e.target.textContent == '' && gameBoard.gameOn == true) {
                gamePlay(e, currentPlayer.spaces, boardSpaces, currentPlayer.symbol, currentPlayer.name);
                currentPlayer == player1 ? currentPlayer = player2 : currentPlayer = player1;
                if (gameBoard.gameOn == true) {
                    gameInfo.textContent = currentPlayer.name + '\'s Turn!';
                }
            } else {
                return;
            }
        });
    });

    newGame.addEventListener('click', () => {
        let {board} = gameBoard;
        currentPlayer = player1;
        gameInfo.textContent = currentPlayer.name + '\'s Turn!';
        board.splice(0, board.length);
        player1.spaces.splice(0, player1.spaces.length);
        player2.spaces.splice(0, player2.spaces.length);
        gameBoard.gameOn = true;
        displayController.boardSpaces.forEach(space => {
            space.textContent = '';
        });
    });
    return {boardSpaces};
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
                    gameInfo.textContent = name + ' wins!';
                    gameBoard.gameOn = false;
                } else {
                    arrayCheck = [];
                }
            }
        }
    }
    if (gameBoard.board.length === 9 && gameBoard.board.includes() === false && gameBoard.gameOn === true) {
        gameInfo.textContent = 'Tie game!';
        gameBoard.gameOn = false;
    }
}
