const gameBoard = (() => {
    const board = ['X', 'O', 'O'];
    const showBoard = () => console.log(board);
    return {showBoard};
})();

const displayController = (() => {
    let symbol = 'X'; //Placeholder value
    let boardSpaces = document.querySelectorAll('.game-space');
    boardSpaces.forEach(space => {
        space.addEventListener('click', e => {
            if (e.target.textContent == '') {
                if (symbol == 'O') {
                    e.target.textContent = 'O';
                    symbol = 'X';
                } else {
                    e.target.textContent = 'X';
                    symbol = 'O';
                }
            } else {
                return;
            }
        });
    });
})();

const player = (symbol) => {
    return {symbol};
};

gameBoard.showBoard();

let player1 = player('X');
console.log(player1.symbol);

let player2 = player('O');
console.log(player2.symbol);
