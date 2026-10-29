# Tic-Tac-Toe

🇧🇷 [Leia em português](./README.pt-BR.md)

A two-player Tic-Tac-Toe game for the browser, built with plain HTML, CSS and JavaScript. Enter two player names, press play, and keep a running score across rounds.

**[Live demo](https://biroveyou.github.io/tic-tac-toe)**

![Tic-Tac-Toe screenshot](./screenshot.png)

## Features

- Two players with custom names (both required, and they must be different)
- Turn indicator showing whose move it is
- Win and tie detection (rows, columns and diagonals)
- Score tracking: the board resets after each round, the scores stay
- Restart button that clears the scores and goes back to the name screen
- Cells are disabled while no game is running
- Marks drawn as inline SVG (`X` and `O`), with a special highlighted centre cell

## How to play

1. Type a name for **Player 1** (`X`) and **Player 2** (`O`).
2. Click the orange **play** button.
3. Take turns clicking the empty cells.
4. Get three marks in a row, column or diagonal to win the round and score a point.
5. Click the **restart** button at any time to reset the scores and change players.

## Running locally

No build step or dependencies are needed.

```bash
git clone https://github.com/biroveyou/tic-tac-toe.git
cd tic-tac-toe
```

Then open `index.html` in your browser.

## Project structure

```
.
├── index.html
├── styles.css
├── scripts.js
└── fonts/
    ├── Arvo/   (Regular, Bold, Italic)
    └── Lato/   (Regular, Bold)
```

## Code overview

The logic in `scripts.js` is organised using the module and factory patterns, keeping responsibilities separated:

- **`gameBoard`** (module / IIFE): holds the 3×3 board state and exposes methods to read it, set a cell, list empty cells and reset it.
- **`createPlayer`** (factory): creates a player with a name, order, sign, score and a `markSpot` method.
- **`gameController`** (factory): runs the game flow: turns, win and tie checks, and score updates.
- **`displayController`** (module / IIFE): handles the DOM: rendering the board, names, turn text and scores, plus the click events.

## Built with

- HTML5
- CSS3 (custom properties, Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- Fonts: [Arvo](https://fonts.google.com/specimen/Arvo) and [Lato](https://fonts.google.com/specimen/Lato)

## Author

**Daniel Macedo** ([@biroveyou](https://github.com/biroveyou))