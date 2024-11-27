const car = document.getElementById("car");
const road = document.querySelector(".road");
const scoreElement = document.getElementById("scoreValue");
const gameOverElement = document.getElementById("gameOver");
let carPosition = 50;
let score = 0;
let gameActive = true;

function moveLeft() {
  if (carPosition > 10 && gameActive) {
    carPosition -= 15;
    car.style.left = carPosition + "%";
  }
}

function moveRight() {
  if (carPosition < 90 && gameActive) {
    carPosition += 15;
    car.style.left = carPosition + "%";
  }
}

function createCoin() {
  if (!gameActive) return;
  
  const coin = document.createElement("div");
  coin.className = "coin";
  coin.style.left = Math.random() * 80 + 10 + "%";
  road.appendChild(coin);

  coin.addEventListener("animationend", () => {
    coin.remove();
  });

  checkCollision(coin, true);
}

function createHole() {
  if (!gameActive) return;
  
  const hole = document.createElement("div");
  hole.className = "hole";
  hole.style.left = Math.random() * 80 + 10 + "%";
  road.appendChild(hole);

  hole.addEventListener("animationend", () => {
    hole.remove();
  });

  checkCollision(hole, false);
}

function checkCollision(element, isCoin) {
  const checkInterval = setInterval(() => {
    if (!gameActive) {
      clearInterval(checkInterval);
      return;
    }

    const carRect = car.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    if (!(carRect.right < elementRect.left || 
          carRect.left > elementRect.right || 
          carRect.bottom < elementRect.top || 
          carRect.top > elementRect.bottom)) {
      
      if (isCoin) {
        score += 10;
        scoreElement.textContent = score;
        element.remove();
      } else {
        gameOver();
      }
      clearInterval(checkInterval);
    }
  }, 100);
}

function gameOver() {
  gameActive = false;
  gameOverElement.classList.remove("hidden");
  clearInterval(coinInterval);
  clearInterval(holeInterval);
}

function restartGame() {
  gameActive = true;
  score = 0;
  scoreElement.textContent = score;
  gameOverElement.classList.add("hidden");
  carPosition = 50;
  car.style.left = "50%";
  
  document.querySelectorAll('.coin, .hole').forEach(el => el.remove());
  
  startGame();
}

function startGame() {
  coinInterval = setInterval(createCoin, 2000);
  holeInterval = setInterval(createHole, 3000);
}

gameOverElement.addEventListener("click", restartGame);
document.addEventListener("keydown", (e) => {
  if (gameActive) {
    if (e.key === "ArrowLeft") moveLeft();
    if (e.key === "ArrowRight") moveRight();
  }
});

startGame();
 