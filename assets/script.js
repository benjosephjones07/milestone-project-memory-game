console.log('working');

const cards = document.querySelectorAll('.card');

function cardReveal() {
  this.classList.toggle('card-visible');
}

cards.forEach(card => card.addEventListener('click', cardReveal))
