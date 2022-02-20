document.addEventListener('DOMContentLoaded', shuffleCards);

const cards = document.querySelectorAll('.card');
const cardsArray = Array.from(cards);
const deck = document.querySelector('.game-container');
const resetButton = document.getElementById('reset-button');

resetButton.addEventListener('click', refreshPage);

let livesCounter = document.getElementById('lives-counter');
let lives = 9;
livesCounter.textContent = lives;

let firstReveal;
let secondReveal;
let hasRevealedCard = false;

let matchedCards = []
let totalCards = 16;

// shuffle cards
const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
  'brown'
];

function shuffleCards() {
  for (let color of colors) {
    const cardAIndex = parseInt(Math.random() * cardsArray.length);
    const cardA = cardsArray[cardAIndex];
    cardsArray.splice(cardAIndex, 1);
    cardA.classList.add(`${color}`);
    cardA.setAttribute('data-card-color', color);
 
    const cardBIndex = parseInt(Math.random() * cardsArray.length);
    const cardB = cardsArray[cardBIndex];
    cardsArray.splice(cardBIndex, 1);
    cardB.classList.add(`${color}`);
    cardB.setAttribute('data-card-color', color);
  }
};

function refreshPage(){
  window.location.reload();
}

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
      let currentMatch = [firstReveal, secondReveal];
      currentMatch.push(matchedCards);
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
    refreshPage();
  }

  // not working? if (matchedCards == totalCards){
  //   alert('You have won the game! Give yourself a pat on the back!');
  // }
}

cards.forEach(card => card.addEventListener('click', cardReveal))
