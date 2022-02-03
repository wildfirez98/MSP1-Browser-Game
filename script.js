// Declare Canvas variable and grab it in the DOM
const canvas = document.getElementById("canvas-top");
// Declare CTX variable to store 2D rendering context (tool we use to paint on Canvas)
const ctx = canvas.getContext("2d");

// Define initial state of game in an object with properties
let gameInit = {
    rectPosX: 10,
    rectPosY: canvas.height / 2 - 10,
    rectVelocity: { x: 0, y: 0 },
    playerSpeed: 0.5,
    enemyTimeout: 60,
    enemyTimeoutInit: 60,
    enemySpeed: 1,
    enemies: [],
    friends: [],
    friendAdded: false,
    Score: 0,
};

// Random number generator. Gives a random integer number between 0 and num, including 0, but not including num.
function random(num) {
  return Math.floor(Math.random() * num);
}

// Define class for Rectangle Player








// Define function to check for 2d collision
// Reference Mozilla: https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection







// Define master function to draw everything onto the Canvas