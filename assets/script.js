const cards = document.querySelectorAll('.card');

let lives = document.getElementById('lives-counter');
let firstReveal;
let secondReveal;
let firstClick = false;

function cardReveal() {
  this.classList.toggle('unflipped');
}

cards.forEach(card => card.addEventListener('click', cardReveal))
