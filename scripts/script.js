const gameInfo = document.querySelector('#info-panel');
let playerOneScore = document.querySelector('#score-p1');
let playerTwoScore = document.querySelector('#score-p2');

const player = (symbol, name, scoreDisplay) => {
    const spaces = [];
    let score = 0;
    scoreDisplay.textContent = score;
    return {symbol, spaces, name, score, scoreDisplay};
};

let player1 = player('X', 'Player 1', playerOneScore);
let player2 = player('O', 'Player 2', playerTwoScore);

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
    function displayWinConditions() {
        return winConditions;
    }

    function displayBoard() {
        return board;
    }

    function clearBoard() {
        board.splice(0, board.length);
    }

    function addSymbolToBoardSpace(symbol, space) {
        board[space] = symbol;
    }

    function displayGameState() {
        return gameOn;
    }

    function changeGameState(state) {
        if (typeof(state) == 'boolean') {
            gameOn = state;
        }
    }

    function displayCurrentPlayer() {
        return currentPlayer;
    }

    function changeCurrentPlayer() {
        if (currentPlayer == player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    return {displayWinConditions, displayBoard, addSymbolToBoardSpace, clearBoard, displayGameState, changeGameState, displayCurrentPlayer, changeCurrentPlayer};
})();

const displayController = (() => {
    const newGame = document.querySelector('#new-game');
    const boardSpaces = Array.from(document.querySelector('#game-board').children);
    boardSpaces.forEach(space => {
        space.addEventListener('click', e => {
            if (e.target.textContent == '' && gameBoard.displayGameState() == true) {
                gamePlay(e, boardSpaces);
                e.target.textContent = gameBoard.displayCurrentPlayer().symbol;
                gameBoard.displayCurrentPlayer().spaces.push(boardSpaces.indexOf(e.target));
                gameBoard.changeCurrentPlayer();
                if (gameBoard.displayGameState() == true) {
                    gameInfo.textContent = gameBoard.displayCurrentPlayer().name + '\'s Turn!';
                }
            } else {
                return;
            }
        });
    });

    newGame.addEventListener('click', () => {
        if (gameBoard.displayCurrentPlayer() != player1) {
            gameBoard.changeCurrentPlayer();
        }
        gameInfo.textContent = gameBoard.displayCurrentPlayer().name + '\'s Turn!';
        gameBoard.clearBoard();
        player1.spaces.splice(0, player1.spaces.length);
        player2.spaces.splice(0, player2.spaces.length);
        gameBoard.changeGameState(true);
        displayController.boardSpaces.forEach(space => {
            space.textContent = '';
        });
        newGame.innerText = 'Reset Game';
    });
    return {boardSpaces, newGame};
})();

function gamePlay(event, boardSpaces) {
    gameBoard.displayCurrentPlayer().spaces.push(boardSpaces.indexOf(event.target));
    gameBoard.addSymbolToBoardSpace(gameBoard.displayCurrentPlayer().symbol, boardSpaces.indexOf(event.target));
    winCheck();
}

function winCheck() {
    let winConditions = gameBoard.displayWinConditions();
    let arrayCheck = [];
    for(let i = 0; i < winConditions.length; i++) {
        for(let j = 0; j < winConditions[i].length; j++) {
            if (gameBoard.displayCurrentPlayer().spaces.includes(winConditions[i][j]) === true) {
                arrayCheck.push('true');
            } else {
                arrayCheck.push('false');
            }
            if (arrayCheck.length == 3) {
                if (arrayCheck.includes('false') === false) {
                    gameInfo.textContent = gameBoard.displayCurrentPlayer().name + ' wins!';
                    displayController.newGame.innerText = 'Start Game';
                    if (gameBoard.displayCurrentPlayer() == player1) {
                        player1.score += 1;
                        player1.scoreDisplay.innerText = player1.score;
                    } else {
                        player2.score += 1;
                        player2.scoreDisplay.innerText = player2.score;
                    }
                    gameBoard.changeGameState(false);
                } else {
                    arrayCheck = [];
                }
            }
        }
    }
    if (gameBoard.displayBoard().length === 9 && gameBoard.displayBoard().includes() === false && gameBoard.displayGameState() === true) {
        gameInfo.textContent = 'Tie game!';
        gameBoard.changeGameState(false);
        displayController.newGame.innerText = 'Start Game';
    }
}
