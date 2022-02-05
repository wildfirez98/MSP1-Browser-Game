// Declare Canvas variable and grab it in the DOM
const canvas = document.getElementById("canvas-top");
// Declare CTX variable to store 2D rendering context (tool we use to paint on Canvas)
const ctx = canvas.getContext("2d");

// Define default state of game in an object with properties
let gameDefault = {
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
};

// Random number generator. Gives a random integer number between 0 and num, including 0, but not including num.
function random(num) {
  return Math.floor(Math.random() * num);
}

// Define class for Rectangle Player
class RectPlayer {
  constructor(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  playerColliding(RectPlayer){
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
}

// Define function to check for 2d collision
// Reference Mozilla: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
function checkCollision(gameDefault) {
  let playerRect = new RectPlayer (
    gameDefault.rectPosX,
    gameDefault.rectPosY,
    10,
    10
  );
  for (let i = 0; i < gameDefault.enemies.length; ++i){
    let computerRect = new RectPlayer (
      gameDefault.enemies[i].x,
      gameDefault.enemies[i].y,
      10,
      10
    );
    if (playerRect.playerColliding(computerRect)){
      return true;
    }
  }
  for (let i = 0; i < gameDefault.bonus.length; i++) {
    let bonusRect = new RectPlayer(
      gameDefault.bonus[i].x,
      gameDefault.bonus[i].y,
      5,
      5
    );
    if (playerRect.playerColliding(bonusRect)){
      gameDefault.playerSpeed*=1.05;
      gameDefault.bonus.splice(i, 1);
    }
  }
}

// Define master function to draw everything onto the Canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //Erase Canvas https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
  gameDefault.enemyTimeout -= 1;
  if (gameDefault.enemyTimeout == 0) { //If game is timeout, begin creating enemy blocks at random spots on Canvas
    gameDefault.enemyTimeout = Math.floor(gameDefault.enemyTimeoutInit);
    gameDefault.enemies.push({ 
      x: canvas.width,
      y: random(canvas.height),
      velocity: gameDefault.enemySpeed
    });
    gameDefault.enemySpeed *= 1.001;
    gameDefault.enemyTimeoutInit = gameDefault.enemyTimeoutInit * 0.999;
  }
  ctx.fillStyle = "#34EB3A"; //Player's color
  gameDefault.rectPosX += gameDefault.rectVelocity.x;
  gameDefault.rectPosY += gameDefault.rectVelocity.y;
  if (gameDefault.rectPosX > canvas.width - 10) {
    gameDefault.rectPosX = canvas.width - 10;
    gameDefault.rectVelocity.x = 0;
  }
  if (gameDefault.rectPosX < 0) {
    gameDefault.rectPosX = 0;
    gameDefault.rectVelocity.x = 0;
  }
  if (gameDefault.rectPosY < 0) {
    gameDefault.rectPosY = 0;
    gameDefault.rectVelocity.y = 0;
  }
  if (gameDefault.rectPosY > canvas.height - 10) {
    gameDefault.rectPosY = canvas.height - 10;
    gameDefault.rectVelocity.y = 0;
  }
  ctx.fillRect(gameDefault.rectPosX, gameDefault.rectPosY, 10, 10); //Render Rectangle to Canvas https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect
  
  ctx.fillStyle = "#EB8F34"; //Computer player's color
  for (let i = 0; i < gameDefault.enemies.length; ++i) {
    gameDefault.enemies[i].x -= gameDefault.enemies[i].velocity;
    ctx.fillRect(gameDefault.enemies[i].x, gameDefault.enemies[i].y, 10, 10)
  }
  for (let i = 0; i < gameDefault.enemies.length; ++i) {
    if (gameDefault.enemies[i].x < -10) {
      gameDefault.enemies.splice(i, 1);
      gameDefault.score++;
    }
  }
  document.getElementById("score").innerHTML = "Score: " + gameDefault.score; //Update Score via the DOM
  //Bonus Cubes code
  if(gameDefault.score%10 == 0 && gameDefault.bonusAdded == false) {
    gameDefault.bonus.push({
      x: random(canvas.width-20),
      y: random(canvas.height-20),
    });
    gameDefault.bonusAdded = true;
  }
  if(gameDefault.score%10 == 1 && gameDefault.bonusAdded == true) {
    gameDefault.bonusAdded = false;
  }
  for (let i = 0; i < gameDefault.bonus.length; ++i) {
    ctx.fillStyle = "#34BAEB"; //Bonus cube color
    ctx.fillRect(gameDefault.bonus[i].x, gameDefault.bonus[i].y, 5, 5); //Create bonus cube. Making it 5x5 so its smaller and tougher to get to
  }
  //If Collision detected reset game
  if(checkCollision(gameDefault)==true) {
    gameDefault = {
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
    };
  }
}

//Call setInterval to update Canvas
setInterval(draw, 20);

//Event listener for arrow keys for player movement
document.addEventListener("keydown", function(event) {
  if (event.key == 'ArrowRight') {
    //right arrow
    gameDefault.rectVelocity.x = gameDefault.playerSpeed;
  }
  if (event.key == 'ArrowLeft') {
    //left arrow
    gameDefault.rectVelocity.x = -gameDefault.playerSpeed;
  }
  if (event.key == 'ArrowDown') {
    //up arrow
    gameDefault.rectVelocity.y = gameDefault.playerSpeed;
  }
  if (event.key == 'ArrowUp') {
    //down arrow
    gameDefault.rectVelocity.y = -gameDefault.playerSpeed;
  }
});