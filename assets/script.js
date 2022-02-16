const cards = document.querySelectorAll('.card');

let livesCounter = document.getElementById('lives-counter');
let lives = 9;
livesCounter.textContent = lives;

let firstReveal;
let secondReveal;
let hasRevealedCard = false;

let matchedCards = []
let totalCards = 16;

// shuffle cards
const colorsInGame = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
  'brown'
];
document.addEventListener('DOMContentLoaded', () => {
  Array.from(cards).sort(() => 0.5 - Math.random());
})

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
        lives--;
        livesCounter.textContent = lives;
        firstReveal.classList.add('unflipped');
        secondReveal.classList.add('unflipped');
      } setTimeout(flipback, 500);
    }
  }
  if (lives == 0){
    alert('Sorry, you have lost the game. Please try again!');
  }
}

cards.forEach(card => card.addEventListener('click', cardReveal))
