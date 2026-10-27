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
    let game = null;
    let isPlayable = false;

    const gameSpace = document.querySelector(".game-space");
    const screenBoard = document.createElement("div");
    screenBoard.classList.add("screen-board");
    gameSpace.appendChild(screenBoard);

    const playBtn = document.querySelector(".play-icon");
    const restartBtn = document.querySelector(".restart-icon");

    const playGame = () => {
        const playerOneInput = document.querySelector("#player-one-input");
        const playerTwoInput = document.querySelector("#player-two-input");
        const displayNames = document.querySelectorAll(".player-name")

        const playerOneName = playerOneInput.value;
        const playerTwoName = playerTwoInput.value;

        if ((playerOneName && playerTwoName) && !(playerOneName === playerTwoName)) {
            game = gameController(createPlayer(playerOneName, 1), createPlayer(playerTwoName, 2));
            isPlayable = true;
            updateScreen();

            playerOneInput.style.display = "none";
            playerTwoInput.style.display = "none";

            for (let i = 0; i < 2; i++) {
                displayNames[i].style.display = "block";
                if (i === 0) {
                    displayNames[i].textContent = playerOneName;
                } else if (i === 1) {
                    displayNames[i].textContent = playerTwoName;
                }
            }

            playBtn.style.display = "none";
            restartBtn.style.display = "flex";
        }
    }

    const checkPlayableState = () => {
        if (!isPlayable) {
            const screenCells = document.querySelectorAll(".cell");
            screenCells.forEach(element => {
                element.disabled = true;
            });
        }
    }

    const updateScreen = () => {
        screenBoard.textContent = "";

        const BOARD_STATE = gameBoard.getBoard();

        const MARK_X = `<svg class="mark-x" viewBox="0 0 100 100" width="100" height="100"><line x1="10" y1="10" x2="90" y2="90" stroke="var(--black)" stroke-width="4"/><line x1="90" y1="10" x2="10" y2="90" stroke="var(--black)" stroke-width="4"/></svg>`;
        const MARK_O = `<svg class="mark-o" viewBox="0 0 100 100" height="100" width="100"><circle r="40" cx="50" cy="50" fill="none" stroke="var(--yellow)" stroke-width="4" /></svg>`;
        const FILL_MARK_X = `<svg class="mark-x" viewBox="0 0 100 100" width="100" height="100"><line x1="10" y1="10" x2="90" y2="90" stroke="var(--black)" stroke-width="6"/><line x1="90" y1="10" x2="10" y2="90" stroke="var(--black)" stroke-width="6"/></svg>`;
        const FILL_MARK_O = `<svg class="mark-o" viewBox="0 0 100 100" height="100" width="100"><circle r="40" cx="50" cy="50" fill="var(--yellow)" stroke="var(--yellow)" stroke-width="4" /></svg>`;

        for (let i = 0; i < 3; i++) {
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
                if (BOARD_STATE[i][j] === 1) {
                    if (i === 1 && j === 1) {
                        cellButton.innerHTML = FILL_MARK_X;
                    } else {
                        cellButton.innerHTML = MARK_X;
                    }
                } else if (BOARD_STATE[i][j] === 2) {
                    if (i === 1 && j === 1) {
                        cellButton.innerHTML = FILL_MARK_O;
                    } else {
                        cellButton.innerHTML = MARK_O;
                    }
                } else {
                    cellButton.textContent = "";
                }
                screenBoard.appendChild(cellButton);
            }
        }
        checkPlayableState();
    }

    const clickHandlerBoard = (e) => {
        const selectedCellRow = e.target.dataset.row;
        const selectedCellColumn = e.target.dataset.column;
        if (!selectedCellRow || !selectedCellColumn) return;

        game.playRound(Number(selectedCellRow), Number(selectedCellColumn));
        updateScreen();
    }

    screenBoard.addEventListener("click", clickHandlerBoard);
    playBtn.addEventListener("click", playGame);

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

function gameController(playerOne, playerTwo) {
    const players = [playerOne, playerTwo];

    let currentTurn = 0;
    let activePlayer = players[0];
    let winCells = [];

    const getActivePlayer = () => {
        return activePlayer;
    };
    const getWinCells = () => {
        return winCells;
    }
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const newMatch = () => {
        gameBoard.reset();
        currentTurn = 0;
        winCells = [];
    };
    const playRound = (row, column) => {
        if (!activePlayer.markSpot(row, column)) {
            return;
        }

        if (++currentTurn > 2) {
            if (checkWinCondition()) {
                activePlayer.increaseScore();
                newMatch();
                return;
            };
        }
        if (currentTurn >= 9) {
            newMatch();
            return;
        }

        switchPlayerTurn();
    };
    const checkWinCondition = () => {
        const PLAYER_ORDER = activePlayer.order;
        const BOARD_STATE = gameBoard.getBoard();
        let winCondition = false;

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
                winCells = leftDiagonal > rightDiagonal ? [[0, 0], [1, 1], [2, 2]] : [[0, 2], [1, 1], [2, 0]];
                return winCondition = true;
            }
        }
        function checkVerticals() {
            for (let i = 0; i < 3; i++) {
                if (BOARD_STATE[i][0] === PLAYER_ORDER &&
                    BOARD_STATE[i][1] === PLAYER_ORDER &&
                    BOARD_STATE[i][2] === PLAYER_ORDER) {
                    winCells = [[i, 0], [i, 1], [i, 2]];
                    return winCondition = true;
                }
            }
        }
        function checkHorizontals() {
            for (let i = 0; i < 3; i++) {
                if (BOARD_STATE[0][i] === PLAYER_ORDER &&
                    BOARD_STATE[1][i] === PLAYER_ORDER &&
                    BOARD_STATE[2][i] === PLAYER_ORDER) {
                    winCells = [[0, i], [1, i], [2, i]];
                    return winCondition = true;
                }
            }
        }

        checkDiagonals();
        checkVerticals();
        checkHorizontals();

        return winCondition;
    };

    return {getActivePlayer, getWinCells, playRound};
}