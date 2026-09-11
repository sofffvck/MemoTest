const icons = ['✨', ' 🎀', ' 🦢', '🤍', ' 🧸 ', ' 💌', '🍓', '🌷͙֒'];
let cards = [...icons, ...icons];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;

const gridContainer = document.getElementById('grid');
const movesDisplay = document.getElementById('moves');
const restartBtn = document.getElementById('restart-btn');

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    gridContainer.innerHTML = '';
    const shuffledCards = shuffle([...cards]);

    shuffledCards.forEach((icon) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = icon;

        card.innerHTML = `
            <div class="card-face card-front">♡</div>
            <div class="card-face card-back">${icon}</div>
        `;

        card.addEventListener('click', flipCard);
        gridContainer.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard || this.classList.contains('flipped')) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    incrementMoves();
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.icon === secondCard.dataset.icon;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function incrementMoves() {
    moves++;
    movesDisplay.textContent = moves;
}

function restartGame() {
    moves = 0;
    movesDisplay.textContent = moves;
    resetBoard();
    createBoard();
}

restartBtn.addEventListener('click', restartGame);

// Inicializar el juego
createBoard();