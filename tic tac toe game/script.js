// script.js
const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const message = document.getElementById("message");
const restartButton = document.getElementById("restartButton");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = Array.from(cells).indexOf(cell);

  if (boardState[cellIndex] !== "" || !isGameActive) {
    return;
  }

  boardState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  checkResult();
}

function checkResult() {
  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (boardState[a] === "" || boardState[b] === "" || boardState[c] === "") {
      continue;
    }
    if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      roundWon = true;
      winningConditions[i].forEach((index) => {
        cells[index].classList.add("strike");
      });
      break;
    }
  }

  if (roundWon) {
    message.textContent = `${currentPlayer} wins!`;
    isGameActive = false;
    return;
  }

  if (!boardState.includes("")) {
    message.textContent = "It's a draw!";
    isGameActive = false;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function restartGame() {
  isGameActive = true;
  currentPlayer = "X";
  boardState = ["", "", "", "", "", "", "", "", ""];
  message.textContent = "";
  cells.forEach((cell) => {
    cell.textContent = "";
    newFunction();

    function newFunction() {
      cell.classList.remove("strike");
    }
  });
}

cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

restartButton.addEventListener("click", restartGame);
