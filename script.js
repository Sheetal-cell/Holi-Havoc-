const gameArea = document.getElementById('gameArea');
const player = document.getElementById('player');
const scoreBoard = document.getElementById('score');
const missedBoard = document.getElementById('missed');
const startBtn = document.getElementById('startBtn');
const bgMusic = document.getElementById('bgMusic');

let score = 0;
let missed = 0;
let gameInterval;
let itemInterval;
let playerPos = 0;

function startGame() {
  score = 0;
  missed = 0;
  scoreBoard.innerText = score;
  missedBoard.innerText = missed;

  // Center player
  playerPos = gameArea.clientWidth / 2 - player.offsetWidth / 2;
  player.style.left = `${playerPos}px`;

  startBtn.style.display = 'none';
  bgMusic.play();

  gameInterval = setInterval(updateGame, 20);
  itemInterval = setInterval(createItem, 1000);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(itemInterval);
  alert(`Game Over! Final Score: ${score}`);
  bgMusic.pause();
  bgMusic.currentTime = 0;
  startBtn.style.display = 'inline-block';
}

function createItem() {
  const item = document.createElement('div');
  item.classList.add('fallingItem');

  const emojis = ['💦', '🎨', '🌈', '🫧'];
  item.innerText = emojis[Math.floor(Math.random() * emojis.length)];

  const itemWidth = 30; // rough width in px for positioning
  const randomLeft = Math.random() * (gameArea.clientWidth - itemWidth);

  item.style.left = `${randomLeft}px`;
  item.style.top = '0px';
  gameArea.appendChild(item);
}

function updateGame() {
  const items = document.querySelectorAll('.fallingItem');
  items.forEach(item => {
    let top = parseInt(item.style.top);
    top += 4;
    item.style.top = `${top}px`;

    const itemLeft = parseInt(item.style.left);
    const playerLeft = playerPos;
    const playerRight = playerPos + player.offsetWidth;

    if (top > gameArea.clientHeight - player.offsetHeight - 10) {
      if (itemLeft >= playerLeft && itemLeft <= playerRight) {
        score++;
        scoreBoard.innerText = score;
        item.remove();
      } else if (top > gameArea.clientHeight - 30) {
        missed++;
        missedBoard.innerText = missed;
        item.remove();

        if (missed >= 3) {
          endGame();
        }
      }
    }
  });
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    playerPos -= 20;
  } else if (e.key === 'ArrowRight') {
    playerPos += 20;
  }
  keepPlayerInBounds();
});

// Touch controls
let touchStartX = null;

gameArea.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
});

gameArea.addEventListener('touchmove', e => {
  if (touchStartX === null) return;

  let touchMoveX = e.touches[0].clientX;
  let diff = touchMoveX - touchStartX;
  playerPos += diff;
  touchStartX = touchMoveX;
  keepPlayerInBounds();
});

function keepPlayerInBounds() {
  if (playerPos < 0) playerPos = 0;
  if (playerPos > gameArea.clientWidth - player.offsetWidth) {
    playerPos = gameArea.clientWidth - player.offsetWidth;
  }
  player.style.left = `${playerPos}px`;
}

startBtn.addEventListener('click', startGame);

// Update player position when window resizes (responsive fix)
window.addEventListener('resize', () => {
  playerPos = gameArea.clientWidth / 2 - player.offsetWidth / 2;
  player.style.left = `${playerPos}px`;
});
