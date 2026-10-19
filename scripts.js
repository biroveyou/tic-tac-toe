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
    };
    const playRound = (row, column) => {
        activePlayer.markSpot(row, column);
        console.log(`${activePlayer.name} played on row ${row + 1} and column ${column + 1}`)
        switchPlayerTurn();
        if (++currentTurn > 2) {
            if (checkWinCondition()) {
                activePlayer.increaseScore();
                console.log(`${activePlayer.name} won the match! Total score of ${activePlayer.getScore()}`)
                gameBoard.reset();
                return;
            };
        }
        printNewRound();
    };
    const checkWinCondition = () => {
        const PLAYER_ORDER = activePlayer.order;
        const BOARD_STATE = gameBoard.getBoard();

        function checkDiagonals() {
            let rightDiagonal = 0, leftDiagonal = 0;
            for (let i = 0; i < 3; i++) {
                let j = BOARD_STATE.length - 1 - i;

                if (BOARD_STATE[i][i] === PLAYER_ORDER) {
                    leftDiagonal++;
                }
                if (BOARD_STATE[i][j] === PLAYER_ORDER) {
                    rightDiagonal++;
                }
            }
            if ((rightDiagonal === 3) || (leftDiagonal === 3)) {
                return true;
            }
        }

        if (BOARD_STATE.find((item) => item == [PLAYER_ORDER, PLAYER_ORDER, PLAYER_ORDER])) {
            return true;
        }
        for (let i = 0; i < 3; i++) {
            let sequenceCounter = 0;
            for (let j = 0; j < 3; j++) {
                if (BOARD_STATE[j][i] === PLAYER_ORDER) {
                    sequenceCounter++;
                }
            }
            if (sequenceCounter === 3) {
                return true;
            }
        }

        return checkDiagonals() ? true : false;
    };

    return {getActivePlayer, playRound};
}

const match = gameController();