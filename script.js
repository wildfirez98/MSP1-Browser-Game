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
    Score: 0,
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

}