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
    const reset = () => {
        return board = [[0, 0, 0],
                 [0, 0, 0],
                 [0, 0, 0]];
    };
    return {getBoard, setBoardCell, reset};
})();

function createPlayer(name, order) {
    let playerScore = 0;
    const getScore = () => {
        return playerScore;
    }
    const increaseScore = () => {
        return ++playerScore;
    }
    const resetScore = () => {
        return playerScore = 0;
    }
    const playOnBoard = (row, column) => {
        return gameBoard.setBoardCell(row, column, order);
    }

    return {name, order, getScore, increaseScore, resetScore, playOnBoard};
};