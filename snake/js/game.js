(function () {
  let FPS = 10;
  const SIZE = 40;

  let board;
  let snake;
  let gameStarted = false;
  let gamePaused = true; 
  let score = 0;
  let frameCount = 0;
  let speedMultiplier = 1;
  let intervalId; 

  function init() {
    alert("Pressione 'S' para iniciar o jogo.\nPressione 'P' para pausar e retomar o jogo.");
    createBoard();
    snake = new Snake([[20, 20], [20, 21], [20, 22]]);
    displayScore();
    placeFood();
    window.addEventListener("keydown", handleKeyDown);
  }

  function createBoard() {
    board = new Board(SIZE);
  }

  function displayScore() {
    const scoreElement = document.createElement("div");
    scoreElement.setAttribute("id", "score");
    scoreElement.textContent = "Score: " + score.toString().padStart(5, '0');
    document.body.appendChild(scoreElement);
  }

  function handleKeyDown(e) {
    if (!gameStarted) {
      if (e.key === "s" || e.key === "S") {
        startGame();
      }
    } else {
      switch (e.key) {
        case "p":
        case "P":
          togglePause();
          break;
        case "ArrowUp":
          if (snake.direction !== 2) 
            snake.changeDirection(0);
          break;
        case "ArrowRight":
          if (snake.direction !== 3) 
            snake.changeDirection(1);
          break;
        case "ArrowDown":
          if (snake.direction !== 0) 
            snake.changeDirection(2);
          break;
        case "ArrowLeft":
          if (snake.direction !== 1) 
            snake.changeDirection(3);
          break;
        default:
          break;
      }
    }
  }

  function startGame() {
    gameStarted = true;
    gamePaused = false;
    resetGame();
    intervalId = setInterval(run, 1000 / FPS); 
  }

  function togglePause() {
    if (!gamePaused) {
      clearInterval(intervalId); 
      gamePaused = true;
    } else {
      intervalId = setInterval(run, 1000 / FPS); 
      gamePaused = false;
    }
  }

  class Board {
    constructor(size) {
      this.element = document.createElement("table");
      this.element.setAttribute("id", "board");
      this.color = "#ccc";
      document.body.appendChild(this.element);
      for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        this.element.appendChild(row);
        for (let j = 0; j < size; j++) {
          const field = document.createElement("td");
          row.appendChild(field);
        }
      }
    }
  }

  class Snake {
    constructor(body) {
      this.body = body;
      this.color = "#222";
      this.direction = 1; 
      this.body.forEach(field => {
        const [row, col] = field;
        document.querySelector(`#board tr:nth-child(${row + 1}) td:nth-child(${col + 1})`).style.backgroundColor = this.color;
      });
    }

    walk() {
      const head = this.body[this.body.length - 1];
      let newHead;
      switch (this.direction) {
        case 0:
          newHead = [head[0] - 1, head[1]];
          break;
        case 1:
          newHead = [head[0], head[1] + 1];
          break;
        case 2:
          newHead = [head[0] + 1, head[1]];
          break;
        case 3:
          newHead = [head[0], head[1] - 1];
          break;
        default:
          break;
      }

      //cobra bateu na parede
      if (newHead[0] < 0 || newHead[0] >= SIZE || newHead[1] < 0 || newHead[1] >= SIZE) {
        gameOver();
        return;
      }

      //cobra bateu em seu próprio corpo
      for (let i = 0; i < this.body.length - 1; i++) {
        if (newHead[0] === this.body[i][0] && newHead[1] === this.body[i][1]) {
          gameOver();
          return;
        }
      }

      //cobra comeu a comidinha
      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        // Cobra come o alimento
        if (foodType === "black") {
          score += 1;
        } else if (foodType === "red") {
          score += 2;
        }
        document.getElementById("score").textContent = "Score: " + score.toString().padStart(5, '0');
        this.body.push(newHead);
        placeFood();
        if (frameCount % 60 === 0) {
          FPS += 2; //Aumenta FPS em 2 a cada 60 frames
          clearInterval(intervalId); 
          intervalId = setInterval(run, 1000 / FPS); 
        }
      } else {
        this.body.push(newHead);
        const oldTail = this.body.shift();
        const [oldRow, oldCol] = oldTail;
        const [newRow, newCol] = newHead;
        document.querySelector(`#board tr:nth-child(${newRow + 1}) td:nth-child(${newCol + 1})`).style.backgroundColor = this.color;
        document.querySelector(`#board tr:nth-child(${oldRow + 1}) td:nth-child(${oldCol + 1})`).style.backgroundColor = board.color;
      }

      frameCount++;
    }

    changeDirection(direction) {
      this.direction = direction;
    }
  }

  let food;
  let foodType; 

  function placeFood() {
    if (food) {
      const [row, col] = food;
      document.querySelector(`#board tr:nth-child(${row + 1}) td:nth-child(${col + 1})`).style.backgroundColor = board.color;
    }

    const randomValue = Math.random();
    if (randomValue < 0.67) { //67% de chance de ser preto
      foodType = "black";
    } else { //33% de chance de ser vermelho
      foodType = "red";
    }

    const row = Math.floor(Math.random() * SIZE);
    const col = Math.floor(Math.random() * SIZE);
    food = [row, col];

    if (foodType === "black") {
      document.querySelector(`#board tr:nth-child(${row + 1}) td:nth-child(${col + 1})`).style.backgroundColor = "black";
    } else if (foodType === "red") {
      document.querySelector(`#board tr:nth-child(${row + 1}) td:nth-child(${col + 1})`).style.backgroundColor = "red";
    }
  }

  function gameOver() {
    clearInterval(intervalId);
    gameStarted = false;
    gamePaused = true;
    alert("Game Over! Pressione 'S' para jogar novamente.");
    window.addEventListener("keydown", function restart(e) {
      if (e.key === "s" || e.key === "S") {
        window.removeEventListener("keydown", restart);
        location.reload();
      }
    });
  }

  function resetGame() {
    score = 0;
    frameCount = 0;
    FPS = 10;
    document.getElementById("score").textContent = "Score: " + score.toString().padStart(5, '0');
    snake = new Snake([[20, 20], [20, 21], [20, 22]]);
    placeFood();
  }

  function run() {
    snake.walk();
  }

  init();
})();
