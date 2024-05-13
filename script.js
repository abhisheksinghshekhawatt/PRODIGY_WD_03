// script.js
const X_CLASS = 'x';
const O_CLASS = 'o';
let xTurn;

const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');

startGame();

resetButton.addEventListener('click', startGame);

function startGame() {
    xTurn = true;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    status.innerText = `${xTurn ? "X" : "O"}'s turn`;
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = xTurn ? X_CLASS : O_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
        status.innerText = `${xTurn ? "X" : "O"}'s turn`;
    }
}

function endGame(draw) {
    if (draw) {
        status.innerText = "It's a draw!";
    } else {
        status.innerText = `${xTurn ? "X" : "O"} wins!`;
    }
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    xTurn = !xTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (xTurn) {
        board.classList.add(X_CLASS);
    } else {
        board.classList.add(O_CLASS);
    }
}

function checkWin(currentClass) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}
