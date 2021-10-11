"use strict";

const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const dice = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const currScore0 = document.querySelector("#current--0");
const currScore1 = document.querySelector("#current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const btnHold = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new");

let score, currScore, activePlayer, isPlaying;

let init = function () {
  score = [0, 0];
  currScore = 0;
  activePlayer = 0;
  isPlaying = true;
  //alert("First Player to reach 20 wins.");
  score0.textContent = 0;
  score1.textContent = 0;
  currScore0.textContent = 0;
  currScore1.textContent = 0;
  dice.classList.add("hidden");
  document.querySelector(`#name--0`).textContent = "Player 1";
  document.querySelector(`#name--1`).textContent = "Player 2";

  player0.classList.add("player--active");
  player1.classList.remove("player--active");

  document.querySelector(".confetti").classList.add("hidden");
  document.querySelector(`.player--0`).classList.remove("player--winner");
  document.querySelector(`.player--1`).classList.remove("player--winner");
};

// setting up the page for 0th run
init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  //console.log(activePlayer);
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};

// rolling the dice

//console.log(btnRoll.textContent);

//console.log(isPlaying);
btnRoll.addEventListener("click", function () {
  if (isPlaying) {
    let randNum = Math.trunc(Math.random() * 6) + 1;
    //console.log(randNum);
    dice.classList.remove("hidden");
    dice.src = `dice-${randNum}.png`;

    if (randNum !== 1) {
      currScore += randNum;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currScore;
      //currScore1.textContent = currScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (isPlaying) {
    score[activePlayer] += currScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document.querySelector(".confetti").classList.remove("hidden");
      isPlaying = false;
      dice.classList.add("hidden");
      document.querySelector(`#name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      } wins!`;

      /* document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("confetti-piece"); */
      //console.log(isPlaying);
    } else {
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener("click", function () {
  init(); // game reset
});
