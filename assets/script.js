const cards = document.querySelectorAll('.card');
const cardsArray = Array.from(cards);
const deck = document.querySelector('.game-container');
// const startButton = document.getElementById('start-button');
// startButton.addEventListener('click', startGame);

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

// function shuffle(colors) {
//   let currentIndex = colors.length, randomIndex;

//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;
//     [colors[currentIndex], colors[randomIndex]] = [
//       colors[randomIndex], colors[currentIndex]
//     ];
//   }
//   return colors;
// }

// function startGame() {
//   const shuffledCards = shuffle(colors);

//   for (let i = 0; i < shuffledCards.length; i++) {
//     [].forEach.call(shuffledCards, function (item) {
//       deck.appendChild(item);
//     });
//   }
// }

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

// possible shuffle method? document.addEventListener('DOMContentLoaded', () => {
//   Array.from(cards).sort(() => 0.5 - Math.random());
// })

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
