const cards = document.querySelectorAll('.card');

let livesCounter = document.getElementById('lives-counter');
let lives = 9;
livesCounter.textContent = lives;

let firstReveal;
let secondReveal;
let hasRevealedCard = false;

let matchedCards = []
let totalCards = 16;

function cardReveal() {
  // removes double click bug//
  if (this === firstReveal) return;

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
      function flipback() {
        firstReveal.classList.add('unflipped');
        secondReveal.classList.add('unflipped');
      } setTimeout(flipback, 500);
    }
  }
}

cards.forEach(card => card.addEventListener('click', cardReveal))
