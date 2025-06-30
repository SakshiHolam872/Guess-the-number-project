let random = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess) || guess < 1 || guess > 100) {
    alert('pls enter valid number');
  } else {
    prevGuess.push(guess);
    if (numGuess === 11) {
      displayGuess(guess);
      displayMsg('Game Over');
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === random) {
    displayMsg('You guessed it right');
    endGame();
  } else if (guess < random) {
    displayMsg('Number is too low');
  } else if (guess > random) {
    displayMsg('Number is too high');
  }
}

function displayGuess(guess) {
  userInput.value = ' ';
  guessSlot.innerHTML += `${guess}  ,  `;
  numGuess++;
  remaining.innerHTML = `${11 - numGuess}`;
}

function displayMsg(msg) {
  lowOrHi.innerHTML = `<h2> ${msg}</h2>`;
}

function endGame() {
  userInput.value = ' ';
  userInput.setAttribute('disabled', ' ');
  p.classList.add('button');
  p.innerHTML = `<h2 id="newGame">Start new game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function (e) {
    random = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = ' ';
    remaining.innerHTML = `${11 - numGuess}`;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
  });
}
