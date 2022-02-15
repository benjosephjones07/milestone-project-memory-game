const cards = document.querySelectorAll('.card');

let livesCounter = document.getElementById('lives-counter');
let lives = 9;
livesCounter.textContent = lives;

let firstReveal;
let secondReveal;
let hasRevealedCard = false;

function cardReveal() {
  this.classList.remove('unflipped');

  if (!hasRevealedCard) {
    hasRevealedCard = true;
    firstReveal = this;
  } else {
    hasRevealedCard = false;
    secondReveal = this;

  if (firstReveal.dataset.cardColor === secondReveal.dataset.cardColor) {
    firstReveal.removeEventListener('click', cardReveal);
    secondReveal.removeEventListener('click', cardReveal);
  } else {
    firstReveal.classList.add('unflipped');
    secondReveal.classList.add('unflipped');
  }
}
}

cards.forEach(card => card.addEventListener('click', cardReveal))
