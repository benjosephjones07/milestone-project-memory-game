let paused = false;
let cardsCount = 0;

document.addEventListener('DOMContentLoaded', shuffleCards);  

const cards = document.querySelectorAll('.card');
const cardsArray = Array.from(cards);
const resetButton = document.getElementById('reset-button');
const winMessage = document.getElementById('win-message');
const loseMessage = document.getElementById('lose-message');

resetButton.addEventListener('click', refreshPage);

let livesCounter = document.getElementById('lives-counter');
let lives = 9;
livesCounter.textContent = lives;

let firstReveal;
let secondReveal;
let hasRevealedCard = false;

let matchedCards = 0;
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
  'grey'
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
}

function refreshPage(){
  window.location.reload();
}

function flipback() {
  lives--;
  livesCounter.textContent = lives;
  firstReveal.classList.add('unflipped');
  secondReveal.classList.add('unflipped');
  firstReveal.addEventListener('click', cardReveal);
  secondReveal.addEventListener('click', cardReveal);
  firstReveal = null;
}

function cardReveal() {
  // removes third card click bug
  if (paused === false) {
    // removes double click bug//
    if (this === firstReveal) return;

    this.classList.remove('unflipped');


    if (!hasRevealedCard) {
      hasRevealedCard = true;
      firstReveal = this;
      firstReveal.removeEventListener('click', cardReveal);
      cardsCount+=1;
    } else {
      hasRevealedCard = false;
      secondReveal = this;
      secondReveal.removeEventListener('click', cardReveal);
      cardsCount+=1;
      paused = true;

      if (firstReveal.dataset.cardColor === secondReveal.dataset.cardColor) {
        firstReveal.classList.add('matched');
        secondReveal.classList.add('matched');
        matchedCards+=2;
      } else {
        setTimeout(flipback, 500);
      }
    }

    if (lives == 0){
      loseMessage.classList.add('show');
      setTimeout(refreshPage, 3000);
    }

    if (matchedCards == totalCards){
      winMessage.classList.add('show');
      setTimeout(refreshPage, 3000);
    }

    if(cardsCount == 2){
      setTimeout(() => {
        paused = false;
        cardsCount = 0;
      }, 900);
    }
  }
}

cards.forEach(card => card.addEventListener('click', cardReveal));

