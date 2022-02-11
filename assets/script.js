console.log('working');

const cards=document.querySelectorAll('.card');

function cardReveal() {
  cards.classList.toggle('card-visible');
}

cards.addEventListener('click', cardReveal());