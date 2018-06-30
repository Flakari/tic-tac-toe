const player = (symbol) => {
    const spaces = [];
    return {symbol, spaces};
};

let player1 = player('X');
console.log(player1.symbol);

let player2 = player('O');
console.log(player2.symbol);


const gameBoard = (() => {
    const board = [];
    let gamePlay = true;
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
    return {board, gamePlay, winConditions};
})();

const displayController = (() => {
    let symbol = player1.symbol;
    const boardSpaces = Array.from(document.querySelector('#game-board').children);
    boardSpaces.forEach(space => {
        space.addEventListener('click', e => {
            if (e.target.textContent == '' && gameBoard.gamePlay == true) {
                if (symbol == player1.symbol) {
                    e.target.textContent = player1.symbol;
                    player1.spaces.push(boardSpaces.indexOf(e.target));
                    console.log('Player 1 Spaces: ' + player1.spaces);
                    winCheck(player1.spaces, boardSpaces);
                    symbol = player2.symbol;
                } else {
                    e.target.textContent = player2.symbol;
                    player2.spaces.push(boardSpaces.indexOf(e.target));
                    console.log('Player 2 Spaces: ' + player2.spaces);
                    winCheck(player2.spaces, boardSpaces);
                    symbol = player1.symbol;
                }
            } else {
                return;
            }

            gameBoard.board[boardSpaces.indexOf(e.target)] = e.target.textContent;
            console.log(gameBoard.board);
        });
    });
})();

function winCheck(playerSpaces, boardSpaces) {
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
                    gameBoard.gamePlay = false;
                } else {
                    arrayCheck = [];
                }
            }
        }
    }
}

function gameStop(spaces) {
    spaces.forEach(space => {
        space.removeEventListener('click', e => {return});
    });
}
