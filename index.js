const icons = ['✨', ' 🎀', ' 🦢', '🤍', ' 🧸 ', ' 💌', '🍓', '🌷͙֒'];
let cards = [...icons, ...icons];

let firstCard = null;
let secondCard = null;
let lockBoard = true;
let moves = 0;

const gridContainer = document.getElementById('grid');
const movesDisplay = document.getElementById('moves');
const restartBtn = document.getElementById('restart-btn');

const startModal = document.getElementById('start-modal');
const startBtn = document.getElementById('start-btn');
const countdownDisplay = document.getElementById('countdown');

const victoryModal = document.getElementById('victory-modal');
const finalMovesDisplay = document.getElementById('final-moves');
const modalRestartBtn = document.getElementById('modal-restart-btn');

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startCountdown() {
    startBtn.style.display = 'none'; // Oculta el botón durante el conteo
    let count = 3;
    countdownDisplay.textContent = count;

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownDisplay.textContent = count;
        } else if (count === 0) {
            countdownDisplay.textContent = "¡Ya!";
        } else {
            clearInterval(interval);
            startModal.classList.add('hidden'); // Oculta el cartel de inicio
            countdownDisplay.textContent = '';
            startBtn.style.display = 'inline-block'; // Restaura el botón para reinicios
            lockBoard = false; // Desbloquea las cartas para jugar
        }
    }, 1000);
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
    checkWin(); 
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

function checkWin() {
    const flippedCards = document.querySelectorAll('.card.flipped');
    
    if (flippedCards.length === cards.length) {
        setTimeout(() => {
            if (finalMovesDisplay) finalMovesDisplay.textContent = moves;
            if (victoryModal) victoryModal.classList.remove('hidden');
        }, 500);
    }
}

function restartGame() {
    moves = 0;
    movesDisplay.textContent = moves;
    if (victoryModal) victoryModal.classList.add('hidden');
    
    // Muestra nuevamente el cartel de inicio para reiniciar con conteo
    lockBoard = true;
    startModal.classList.remove('hidden');
    resetBoard();
    createBoard();
}

// Event Listeners
startBtn.addEventListener('click', startCountdown);
restartBtn.addEventListener('click', restartGame);

if (modalRestartBtn) {
    modalRestartBtn.addEventListener('click', restartGame);
}

// Inicialización
createBoard();