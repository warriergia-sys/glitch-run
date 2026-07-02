const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameBox = document.getElementById("game-box");
const scoreBoard = document.getElementById("score-board");
const glitchWarning = document.getElementById("glitch-warning");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");

let score = 0;
let isJumping = false;
let gameRunning = false;

let gameInterval;
let scoreInterval;
let glitchInterval;

// ====== FIXED: Universal Spacebar Detection ======
document.addEventListener("keydown", function(event) {
    // Checking for literal " " fixes compatibility across all modern web browsers
    if ((event.key === " " || event.code === "Space") && gameRunning) {
        event.preventDefault(); // Prevents the browser page from scrolling down when pressing space
        if (!isJumping) {
            jump();
        }
    }
});

function jump() {
    isJumping = true;
    player.classList.add("jump");
    setTimeout(function() {
        player.classList.remove("jump");
        isJumping = false;
    }, 500);
}

// ====== NEW: Start Engine Logic ======
startBtn.addEventListener("click", () => {
    if (gameRunning) return;
    
    gameRunning = true;
    startBtn.disabled = true;
    stopBtn.disabled = false;
    glitchWarning.innerText = "STATUS: STABLE";
    glitchWarning.style.color = "#00ffcc";
    
    // Start obstacle moving animation
    obstacle.classList.add("move-obstacle");
    
    // Start tracking score
    scoreInterval = setInterval(() => {
        score++;
        scoreBoard.innerText = "Score: " + score;
    }, 100);
    
    // Start real-time collision testing
    startCollisionTracking();
    
    // Start Twist glitch loop
    startGlitchEngine();
});

// ====== NEW: Stop / Pause Engine Logic ======
stopBtn.addEventListener("click", () => {
    pauseGame("GAME PAUSED");
});

function pauseGame(message) {
    gameRunning = false;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    glitchWarning.innerText = message;
    
    // Stop animations and data intervals completely
    obstacle.classList.remove("move-obstacle");
    gameBox.classList.remove("glitch-dark");
    document.body.classList.remove("glitch-invert");
    
    clearInterval(gameInterval);
    clearInterval(scoreInterval);
    clearInterval(glitchInterval);
}

// Collision tracking system
function startCollisionTracking() {
    gameInterval = setInterval(function() {
        let playerRect = player.getBoundingClientRect();
        let obstacleRect = obstacle.getBoundingClientRect();

        if (
            playerRect.right > obstacleRect.left &&
            playerRect.left < obstacleRect.right &&
            playerRect.bottom > obstacleRect.top &&
            playerRect.top < obstacleRect.bottom
        ) {
            pauseGame("💥 SYSTEM CRASHED! GAME OVER 💥");
            glitchWarning.style.color = "#ff0055";
            alert("Game Over! Your Final Score: " + score);
            
            // Reset core system parameters
            score = 0;
            scoreBoard.innerText = "Score: 0";
        }
    }, 10);
}

// Glitch engine routine
function startGlitchEngine() {
    glitchInterval = setInterval(function() {
        gameBox.classList.remove("glitch-dark");
        document.body.classList.remove("glitch-invert");
        
        let randomEvent = Math.floor(Math.random() * 3);

        if (randomEvent === 0) {
            glitchWarning.innerText = "STATUS: STABLE";
            glitchWarning.style.color = "#00ffcc";
        } 
        else if (randomEvent === 1) {
            glitchWarning.innerText = "⚠️ GLITCH: TOTAL BLACKOUT! MEMORIZE THE RHYTHM! ⚠️";
            glitchWarning.style.color = "#ff0055";
            gameBox.classList.add("glitch-dark");
        } 
        else if (randomEvent === 2) {
            glitchWarning.innerText = "⚠️ GLITCH: SPATIAL INVERSION! (UPSIDE DOWN) ⚠️";
            glitchWarning.style.color = "#ffcc00";
            document.body.classList.add("glitch-invert");
        }
    }, 8000);
}
