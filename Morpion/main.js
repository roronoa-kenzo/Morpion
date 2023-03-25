const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.getElementById('gameStatus');
const endGameStatus = document.getElementById('endGameStatus');
const playerOne = 'X'; const playerTwo = 'O';
let playerTurn = playerOne;
let audio = new Audio('player-sound.mp3');
let home = document.getElementById('home-audio');
let win = new Audio('win-sound.mp3');
let equal = new Audio('equality.mp3');
let meme = new Audio('meme.mp3');


const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', playGame, { once: true });
});

function playGame(e) {
  e.target.innerHTML = playerTurn;

  if (checkWin(playerTurn)) {
    updateGameStatus("wins" + playerTurn);
    return endGame();
  } else if (checkDraw()) {
    updateGameStatus("draw");
    return endGame();
  }

  updateGameStatus(playerTurn);
  playerTurn == playerOne ? playerTurn = playerTwo : playerTurn = playerOne;
}

function checkWin(playerTurn) {
  return winningPatterns.some(combination => {
    return combination.every(index => {
      return cells[index].innerHTML == playerTurn;
    });
  });
}

function checkDraw() {
  return [...cells].every(cell => {
    return cell.innerHTML == playerOne || cell.innerHTML == playerTwo;
  });
}

function updateGameStatus(status) {
  let statusText;

  switch (status) {
    case 'X':
        audio.play();
      statusText = "Player 2's turn (O)";
      break;
    case 'O':
        audio.play();
      statusText = "Player 1's turn (X)";
      break;
    case 'winsX':
        win.play();
      statusText = "Player 1 (X) Wins";
      break;
    case 'winsO':
        win.play();
      statusText = "Player 2 (O) Wins";
      break;
    case 'draw':
        equal.play();
        meme.play()
      statusText = "Equality";
      break;
  }

  gameStatus.innerHTML = statusText;
  endGameStatus.innerHTML = statusText;
}

function pauseAudio() {
    home.pause()
}

function endGame() { document.getElementById('gameEnd').style.display = "block", pauseAudio();}
function reloadGame() { window.location.reload() }