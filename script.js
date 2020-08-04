const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let cardOne, cardTwo;

function flipCard() {
  if (lockBoard) return;
  if (this === cardOne) return;

  this.classList.add('flip');

  if(!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    cardOne = this;
  } else {
    // second click
    hasFlippedCard = false;
    cardTwo = this;

    checkForMatch();
  }  
}

function checkForMatch() {
  let isMatch = cardOne.dataset.guardian === cardTwo.dataset.guardian;
  
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  cardOne.removeEventListener('click', flipCard);
  cardTwo.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    cardOne.classList.remove('flip');
    cardTwo.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [cardOne, cardTwo] = [null, null];
}

/* --- IIFE --- */
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();


cards.forEach(card => card.addEventListener('click', flipCard));