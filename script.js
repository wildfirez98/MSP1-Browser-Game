// Declare Canvas variable and grab it in the DOM
const canvas = document.getElementById("canvas-top");
// Declare CTX (short for Context) variable to store 2D rendering context (tool we use to paint on Canvas)
const ctx = canvas.getContext("2d"); 
// Create a new sound object for background music
const myMusic = new Audio("./assets/Music/Steamtech-Mayhem_Looping.mp3");
// Create a sound effect for picking up bonus cube
const bonusEffect = new Audio("./assets/Effects/SynthChime2.mp3");
// Create a sound effect for running into Computer player
const crashEffect = new Audio("./assets/Effects/SynthChime3.mp3");

// Define initial state of game in an object with properties
let gameState = {
  rectPosX: 10, //Position from the left 
  rectPosY: canvas.height / 2 - 10, //Position from the top - puts cube in center
  rectVelocity: { x: 0, y: 0 },
  playerSpeed: 0.5,
  enemyTimeout: 60,
  enemyTimeoutInit: 60,
  enemySpeed: 1,
  enemies: [],
  bonus: [],
  bonusAdded: false,
  score: 0,
};

// Define class for Rectangle Player and create playerColliding function
class RectPlayer {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  playerColliding(RectPlayer) {
    if (
      this.x < RectPlayer.x + RectPlayer.width &&
      this.x + this.width > RectPlayer.x &&
      this.y < RectPlayer.y + RectPlayer.height &&
      this.height + this.y > RectPlayer.y
    ) {
      return true;
    }
    return false;
  }
};

// Define function to check for 2d collision
// Reference Mozilla: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
function checkCollision(gameState) {
  let playerRect = new RectPlayer(
    gameState.rectPosX,
    gameState.rectPosY,
    10,
    10
  );
  for (let i = 0; i < gameState.enemies.length; ++i) {
    let computerRect = new RectPlayer(
      gameState.enemies[i].x,
      gameState.enemies[i].y,
      10,
      10
    );
    if (playerRect.playerColliding(computerRect)) {
      crashEffect.play();
      return true; //Cube collision detected return true
    }
  }
  for (let i = 0; i < gameState.bonus.length; i++) {
    let bonusRect = new RectPlayer(
      gameState.bonus[i].x,
      gameState.bonus[i].y,
      5,
      5
    );
    if (playerRect.playerColliding(bonusRect)) {
      gameState.playerSpeed *= 1.10;
      gameState.bonus.splice(i, 1);
      bonusEffect.play();
      //Note - Bonus cubes keep generating infinitely in the loop. Probably ideal to change this in the future as you add other kinds of bonues or power-ups
    }
  }
};

// Define master function to draw everything onto the Canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //Erase Canvas https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
  gameState.enemyTimeout -= 1;
  if (gameState.enemyTimeout == 0) { //If game is timeout, begin creating enemy blocks at random spots on Canvas
    gameState.enemyTimeout = Math.floor(gameState.enemyTimeoutInit);
    gameState.enemies.push({
      x: canvas.width,
      y: random(canvas.height),
      velocity: gameState.enemySpeed
    });
    gameState.enemySpeed *= 1.001;
    gameState.enemyTimeoutInit = gameState.enemyTimeoutInit * .999; //Seems to be a decent init value. Lower numbers generate a ton of cubes together sometimes creating a wall of cube death and then nothing.
  }
  ctx.fillStyle = "#7209b7"; //Player's color
  gameState.rectPosX += gameState.rectVelocity.x;
  gameState.rectPosY += gameState.rectVelocity.y;
  if (gameState.rectPosX > canvas.width - 10) {
    gameState.rectPosX = canvas.width - 10;
    gameState.rectVelocity.x = 0;
  }
  if (gameState.rectPosX < 0) {
    gameState.rectPosX = 0;
    gameState.rectVelocity.x = 0;
  }
  if (gameState.rectPosY < 0) {
    gameState.rectPosY = 0;
    gameState.rectVelocity.y = 0;
  }
  if (gameState.rectPosY > canvas.height - 10) {
    gameState.rectPosY = canvas.height - 10;
    gameState.rectVelocity.y = 0;
  }
  ctx.fillRect(gameState.rectPosX, gameState.rectPosY, 10, 10); //Render Rectangle to Canvas https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect

  ctx.fillStyle = "#EB8F34"; //Computer player's color
  for (let i = 0; i < gameState.enemies.length; ++i) {
    gameState.enemies[i].x -= gameState.enemies[i].velocity;
    ctx.fillRect(gameState.enemies[i].x, gameState.enemies[i].y, 10, 10)
  }
  for (let i = 0; i < gameState.enemies.length; ++i) {
    if (gameState.enemies[i].x < -10) {
      gameState.enemies.splice(i, 1);
      gameState.score++;
    }
  }
  document.getElementById("score").innerHTML = "Score: " + gameState.score; //Update Score via the DOM

  //Bonus Cubes 
  if (gameState.score % 10 == 0 && gameState.bonusAdded == false) {
    gameState.bonus.push({
      x: random(canvas.width - 20),
      y: random(canvas.height - 20),
    })
    gameState.bonusAdded = true;
  }
  if (gameState.score % 10 == 1 && gameState.bonusAdded == true) {
    gameState.bonusAdded = false;
  }
  for (let i = 0; i < gameState.bonus.length; ++i) {
    ctx.fillStyle = "#70e000"; //Bonus cube color
    ctx.fillRect(gameState.bonus[i].x, gameState.bonus[i].y, 5, 5); //Create bonus cube. Making it 5x5 so its smaller and tougher to get to
  }

  //If Collision detected reset game
  if (checkCollision(gameState) == true) {
    gameState = {
      rectPosX: 10,
      rectPosY: canvas.height / 2 - 10,
      rectVelocity: { x: 0, y: 0 },
      playerSpeed: 0.5,
      enemyTimeout: 60,
      enemyTimeoutInit: 60,
      enemySpeed: 1,
      enemies: [],
      bonus: [],
      bonusAdded: false,
      score: 0,
    }
  }
};

//Call setInterval to update Canvas
setInterval(draw, 15); //Lower the delay number equals more challenge with cubes. Could implement game levels with higher difficulty by lowering the refresh delay

//Event listener for arrow keys for player movement
document.addEventListener("keydown", function (event) {
  if (event.key == 'ArrowRight') {
    //right arrow
    gameState.rectVelocity.x = gameState.playerSpeed;
  }
  if (event.key == 'ArrowLeft') {
    //left arrow
    gameState.rectVelocity.x = -gameState.playerSpeed;
  }
  if (event.key == 'ArrowDown') {
    //up arrow
    gameState.rectVelocity.y = gameState.playerSpeed;
  }
  if (event.key == 'ArrowUp') {
    //down arrow
    gameState.rectVelocity.y = -gameState.playerSpeed;
  }
});

// Random number generator. Gives a random integer number between 0 and num, including 0, but not including num.
function random(num) {
  return Math.floor(Math.random() * num);
}

//Call background music
myMusic.play();
myMusic.loop = true;

