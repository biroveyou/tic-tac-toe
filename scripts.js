"use strict";

const gameBoard = (() => {
    let board = [[0, 0, 0],
                 [0, 0, 0],
                 [0, 0, 0]];

    const getBoard = () => {return board};
    const setBoardCell = (row, column, player) => {
        board[row][column] = player;
    };
    const reset = () => {
        board = [[0, 0, 0],
                 [0, 0, 0],
                 [0, 0, 0]];
    }

    return {getBoard, setBoardCell, reset};
})();