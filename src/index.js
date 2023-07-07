const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score'); 
const timerDisplay = document.querySelector('#timer');

let time = 10;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";

// Limits the range of the numbers to be generated.
function randomInteger(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Moles will appear and disappear at certain intervals of time depending on difficulty.
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500;
  } else if (difficulty === "normal") {
    return 1000;
  } else if (difficulty === "hard") {
    return randomInteger(600, 1200);
  }
}

// Selects random holes from the list of holes.
function chooseHole(holes) {
  const index = randomInteger(0, 8);
  const hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
  }
  lastHole = hole;
  return hole;
}

// Determines if game should continue or stop.
function gameOver() {
  if(time > 0) {
    let timeoutId = showUp();
    return timeoutId; 
  } else {
    let gameStopped = stopGame();
    return gameStopped;
  }
}

// Calls the showAndHide function with a specific delay and hole.
function showUp() {
  let delay = setDelay("easy");
  const hole = chooseHole(holes); 
  return showAndHide(hole, delay);
}

// Calls the toggleVisibility function so that it removes the 'show' class when the timer times out.
function showAndHide(hole, delay){
  toggleVisibility(hole);
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole);
    gameOver();
  }, delay);
  return timeoutID;
}

// Adds or removes the 'show' class so the sprite appears in respective hole.
function toggleVisibility(hole){
  hole.classList.toggle('show');
  return hole;
}

// Updates the score depending on players progress.
function updateScore() {
  points++;
  score.textContent = points;
  return points;
}

// Clear's player's score. 
function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

// Updates the timer if time is greater than 0. 
function updateTimer() {
  if (time > 0){
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
}

// Starts the timer using a setInterval. 
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}

// The event handler that gets called when a player clicks on a mole.
function whack(event) {
  updateScore();
}

// Clicks on the sprites.
function setEventListeners(){
  moles.forEach(
    mole => mole.addEventListener('click', whack)
  );
  return moles;
}
setEventListeners();

// Sets the duration of the game.
function setDuration(duration) {
  time = duration;
  return time;
}


// Clears the timer when the game is stopped.
function stopGame(){
  clearInterval(timer);
  return "game stopped";
}

// Starts the game, timer, and music when the start button is clicked.
function startGame(){
  setDuration(10);
  startTimer();
  clearScore();
  showUp();
  var gameAudio = document.getElementById("gameAudio");
  gameAudio.play();
  return "game started";
}

startButton.addEventListener("click", startGame);


// Testing purposes
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
