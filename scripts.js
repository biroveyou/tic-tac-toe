"use strict";

const gameBoard = (() => {
    let board = [[0, 0, 0],
                 [0, 0, 0],
                 [0, 0, 0]];
    const getBoard = () => {
        return board;
    };
    const setBoardCell = (row, column, player) => {
        return board[row][column] = player;
    };
    const getEmptyCells = () => {
        const emptyCells = [];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === 0) {
                    emptyCells.push([i, j]);
                }
            }
        }
        return emptyCells;
    };
    const reset = () => {
        return board = [[0, 0, 0],
                        [0, 0, 0],
                        [0, 0, 0]];
    };

    return {getBoard, setBoardCell, getEmptyCells, reset};
})();

function createPlayer(name, order) {
    let playerScore = 0;
    const sign = order === 1 ? "X" : "O"
    const getScore = () => {
        return playerScore;
    }
    const increaseScore = () => {
        return ++playerScore;
    }
    const resetScore = () => {
        return playerScore = 0;
    }
    const markSpot = (row, column) => {
        return gameBoard.setBoardCell(row, column, order);
    }

    return {name, order, sign, getScore, increaseScore, resetScore, markSpot};
};

function gameController() {
    const players = [createPlayer("Daniel", 1), createPlayer("Passos", 2)]

    let currentTurn = 0;
    let activePlayer = players[0];

    const getActivePlayer = () => {
        return activePlayer;
    };
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const printNewRound = () => {
        console.log(console.log(gameBoard.getBoard()));
        console.log(`${activePlayer.name}'s turn.`)
        currentTurn++;
    };
    const playRound = (row, column) => {
        activePlayer.markSpot(row, column);
        console.log(`${activePlayer.name} played on row ${row + 1} and column ${column + 1}`)
        switchPlayerTurn();
        printNewRound();
    };

    return {getActivePlayer, playRound};
}

const match = gameController();