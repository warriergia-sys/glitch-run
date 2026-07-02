const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameBox = document.getElementById("game-box");
const scoreBoard = document.getElementById("score-board");
const glitchWarning = document.getElementById("glitch-warning");

let score = 0;
let isJumping = false;
let gameInterval;
let scoreInterval;
let glitchInterval;
let currentGlitch = "none";

// Start the game loop elements
obstacle.classList.add("move-obstacle");

// 1. Handle Jumping Controls
document.addEventListener("keydown", function(event) {
    if (event.code === "Spacebar" || event.code === "Space") {
        // If "Inverted Gravity" glitch is active, the controls switch to moving downward or custom logic,
        // but to keep it simple, we handle standard jumping here if not already mid-jump.
        if (!isJumping) {
            jump();
        }
    }
});

function jump() {
    isJumping = true;
    player.classList.add("jump");
    
    // Remove the jump class after the animation finishes (500ms)
    setTimeout(function() {
        player.classList.remove("jump");
        isJumping = false;
    }, 500);
}

// 2. Track Score Increment
scoreInterval = setInterval(() => {
    score++;
    scoreBoard.innerText = "Score: " + score;
}, 100);

// 3. Real-time Collision Detection Loop
gameInterval = setInterval(function() {
    // Get current live positions of player and obstacle
    let playerRect = player.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    // Check if the bounding boundaries overlap
    if (
        playerRect.right > obstacleRect.left &&
        playerRect.left < obstacleRect.right &&
        playerRect.bottom > obstacleRect.top &&
        playerRect.top < obstacleRect.bottom
    ) {
        // Stop all animations and intervals on collision
        obstacle.classList.remove("move-obstacle");
        clearInterval(gameInterval);
        clearInterval(scoreInterval);
        clearInterval(glitchInterval);
        
        glitchWarning.innerText = "💥 SYSTEM CRASHED! GAME OVER 💥";
        glitchWarning.style.color = "#ff0055";
        alert("Game Over! Your Final Score: " + score);
        location.reload(); // Reloads page to restart game
    }
}, 10);

// 4. THE TWIST: Random Glitch Cycle Every 8 Seconds
glitchInterval = setInterval(function() {
    // Clear any previous glitch classes applied
    gameBox.classList.remove("glitch-dark");
    document.body.classList.remove("glitch-invert");
    
    // Pick a random event: 0 = Normal, 1 = Blackout, 2 = Screen Inversion
    let randomEvent = Math.floor(Math.random() * 3);

    if (randomEvent === 0) {
        currentGlitch = "none";
        glitchWarning.innerText = "STATUS: STABLE";
        glitchWarning.style.color = "#00ffcc";
    } 
    else if (randomEvent === 1) {
        currentGlitch = "blackout";
        glitchWarning.innerText = "⚠️ GLITCH: TOTAL BLACKOUT! MEMORIZE THE RHYTHM! ⚠️";
        glitchWarning.style.color = "#ff0055";
        gameBox.classList.add("glitch-dark");
    } 
    else if (randomEvent === 2) {
        currentGlitch = "invert";
        glitchWarning.innerText = "⚠️ GLITCH: SPATIAL INVERSION! (UPSIDE DOWN) ⚠️";
        glitchWarning.style.color = "#ffcc00";
        document.body.classList.add("glitch-invert");
    }
}, 8000);
