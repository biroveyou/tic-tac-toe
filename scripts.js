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

const displayController = (() => {
    const game = gameController();

    const body = document.querySelector("body");
    const screenBoard = document.createElement("div");
    body.appendChild(screenBoard);

    const updateScreen = () => {
        screenBoard.textContent = "";

        const BOARD_STATE = gameBoard.getBoard();

        for (let i = 0; i < 3; i++) {
            const cellRow = document.createElement("div");
            cellRow.classList.add("cell-row");
            for (let j = 0; j < 3; j++) {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                if (j === 0) {
                    cellButton.classList.add("left-column");
                } else if (j === 1) {
                    cellButton.classList.add("center-column");
                } else {
                    cellButton.classList.add("right-column");
                }
                cellButton.dataset.row = i;
                cellButton.dataset.column = j;
                cellButton.textContent = BOARD_STATE[i][j] !== 0 ? BOARD_STATE[i][j] : " - ";
                cellRow.appendChild(cellButton);
            }
            screenBoard.appendChild(cellRow);
        }
    }

    const clickHandlerBoard = (e) => {
        const selectedCellRow = e.target.dataset.row;
        const selectedCellColumn = e.target.dataset.column;
        if (!selectedCellRow || !selectedCellColumn) return;

        console.log([selectedCellRow, selectedCellColumn]);

        game.playRound(Number(selectedCellRow), Number(selectedCellColumn));
        updateScreen();
        console.log(gameBoard.getBoard());
    }

    screenBoard.addEventListener("click", clickHandlerBoard);

    updateScreen();
})();

function createPlayer(name, order) {
    let playerScore = 0;
    const sign = order === 1 ? "X" : "O";
    const getScore = () => {
        return playerScore;
    };
    const increaseScore = () => {
        return ++playerScore;
    };
    const resetScore = () => {
        return playerScore = 0;
    };
    const markSpot = (row, column) => {
        for (const emptyCell of gameBoard.getEmptyCells()) {
            if (emptyCell[0] === row && emptyCell[1] === column) {
                gameBoard.setBoardCell(row, column, order);
                return true;
            }
        }
        return false;
    };

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
    const newMatch = () => {
        gameBoard.reset();
        currentTurn = 0;
    };
    const playRound = (row, column) => {
        activePlayer.markSpot(row, column);

        if (++currentTurn > 2) {
            if (checkWinCondition()) {
                activePlayer.increaseScore();
                newMatch();
                return;
            };
        }
        if (currentTurn > 9) {
            newMatch();
            return;
        }

        switchPlayerTurn();
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

        if (BOARD_STATE.find((item) => {
            item[0] === PLAYER_ORDER &&
            item[1] === PLAYER_ORDER &&
            item[2] === PLAYER_ORDER
        })) {
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