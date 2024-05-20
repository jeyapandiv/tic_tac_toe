"use strict";

const cells = document.querySelectorAll(".cell");
const messageElement = document.querySelector(".alert");
const successAlertElement = document.querySelector("#success-alert");
const refreshButton = document.getElementById("refreshbtn");

// seting initial player to 'X'
let currentPlayer = "X";
let gameBoard = Array(9).fill(null);

// click event listeners to each cell
cells.forEach((cell, index) => {
  cell.addEventListener("click", (event) => handleCellClick(event, index));
});

// handle cell click events
function handleCellClick(event, index) {
  // ignoring the click event
  if (gameBoard[index] || checkWinner() || isBoardFull()) {
    return;
  }

  // update with the current player's mark
  gameBoard[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  // remove click event from the clicked cell
  event.target.removeEventListener("click", (event) => handleCellClick(event, index));

  // check for a winner or a full board
  if (checkWinner()) {
    messageElement.innerHTML = `Congratulations! ${currentPlayer} wins the game`;
    successAlertElement.style.display = "block";
    removeAllEventListeners();
  } else if (isBoardFull()) {
    messageElement.innerHTML = "It's a tie! X and O!";
  } else {
    // switch to the other player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

// check if there's a winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],
    [1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6],
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if ( gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }
  return false;
}

// check if the board is full
function isBoardFull() {
  return gameBoard.every(cell => cell !== null);
}

// remove all event listeners from the cells
function removeAllEventListeners() {
  cells.forEach((cell, index) => {
    cell.removeEventListener("click", (event) => handleCellClick(event, index));
  });
}

// fefresh button functionality
refreshButton.addEventListener("click", () => {
  window.location.reload();
});
