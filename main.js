const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let start = document.getElementById('start');
let lastHole;
let timeUp = false;
let score = 0;



function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}


function peep() {
  const time = randomTime(1000, 2000);
  const hole = randomHole(holes);
  hole.classList.add('up')

  setTimeout(function () {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);

}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false
  score = 0;
  peep();

  setTimeout(function () {
    timeUp = true;
  }, 10000);
}

function bank(e) {
  if (!e.isTrusted) return;
  // console.log(e);
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bank));

start.addEventListener('click', startGame);
