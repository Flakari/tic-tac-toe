const gameBoard = (() => {
    const board = ['X', 'O', 'O'];
    const working = () => console.log('It\'s working');
    const showBoard = () => console.log(board);
    return {working, showBoard};
})();

const displayController = (() => {
    const working = () => console.log('This is working as well');
    return {working};
})();

const player = (symbol) => {
    return {symbol};
};

gameBoard.working();
displayController.working();
console.log(gameBoard.board);
gameBoard.showBoard();

let player1 = player('X');
console.log(player1.symbol);

let player2 = player('O');
console.log(player2.symbol);
