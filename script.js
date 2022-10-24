'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const diceEl = document.querySelector('.dice');

const bttnNew = document.querySelector('.btn--new');
const bttnRoll = document.querySelector('.btn--roll');
const bttnhold = document.querySelector('.btn--hold');
const setcurrscore0 = document.getElementById('current--0');
const setcurrscore1 = document.getElementById('current--1');

// starting conditions

let currscore;
const finalscores = [0, 0];
let activeplayer;
let playing;

function initiate() {
  setcurrscore0.textContent = 0;
  setcurrscore1.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  currscore = 0;
  activeplayer = 0;
  playing = true;
  finalscores[0] = 0;
  finalscores[1] = 0;
}

initiate();
//function to switch player

function switchplayer() {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currscore = 0;
  activeplayer = activeplayer === 1 ? 0 : 1;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

bttnRoll.addEventListener('click', function () {
  if (playing) {
    // roll the dice display
    const randomnumber = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomnumber}.png`;
    //if(roll!==1) switch player
    if (randomnumber !== 1) {
      currscore += randomnumber;
      document.getElementById(`current--${activeplayer}`).textContent =
        currscore;
    }
    //else add to current score
    else {
      switchplayer();
    }
  }
});

bttnhold.addEventListener('click', function () {
  if (playing) {
    //add currscore to activeplayer display finalscore
    finalscores[activeplayer] += currscore;
    document.getElementById(`score--${activeplayer}`).textContent =
      finalscores[activeplayer];
    //if(score>=100) endgame
    if (finalscores[activeplayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    }
    //switchplayer
    switchplayer();
  }
});

bttnNew.addEventListener('click', function () {
  player0.classList.remove('player--winner');

  player1.classList.remove('player--winner');

  player0.classList.add('player--active');

  player1.classList.remove('player--active');

  initiate();
});
