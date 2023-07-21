/**
 * Add event listener to every button
 */

const buttons = document.getElementsByClassName("choice");

for (let button of buttons) {
    button.addEventListener("click", function () {
        let playerSelection = this.getAttribute("data-type");
        playRound(playerSelection);
        checkGameEnd();
    });
}

let playerScore = 0;
let computerScore = 0;

/**
 * Declare the display elements
 */

const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const roundResultDisplay = document.getElementById("round-result");
const finalResultDisplay = document.getElementById("final-result");

/**
 * Declare the choices
 */

function playRound(playerSelection) {
    const choices = ["rock", "paper", "scissors", "lizard", "spock"];

    /**
     * Generate computer's selection randomly
     */

    const computerSelection = choices[Math.floor(Math.random() * choices.length)];

    /**
     * Check the outcome of the round
     */

    if (playerSelection === computerSelection) {
        roundResultDisplay.textContent = "It's a tie!";
    } else if (
        (playerSelection === "rock" && (computerSelection === "scissors" || computerSelection === "lizard")) ||
        (playerSelection === "paper" && (computerSelection === "rock" || computerSelection === "spock")) ||
        (playerSelection === "scissors" && (computerSelection === "paper" || computerSelection === "lizard")) ||
        (playerSelection === "lizard" && (computerSelection === "paper" || computerSelection === "spock")) ||
        (playerSelection === "spock" && (computerSelection === "rock" || computerSelection === "scissors"))
    ) {
        roundResultDisplay.textContent = "Yaaaay!! You win this round!";
        playerScore++;
    } else {
        roundResultDisplay.textContent = "Oops! You lose this round!";
        computerScore++;
    }

    /**
     * Update the score displays
     */

    playerScoreDisplay.textContent = "Player: " + playerScore;
    computerScoreDisplay.textContent = "Computer: " + computerScore;
}

function checkGameEnd() {
    if (playerScore === 10 || computerScore === 10) {
        const finalResult = playerScore === 10 ? "You won the game!" : "Computer won the game!";
        finalResultDisplay.textContent = finalResult;
        disableButtons();

        // Reset the game after 2 seconds
        setTimeout(() => {
            resetGame();
        }, 2000);
    }
}

/**
 * Disable all choice buttons
 */

function disableButtons() {
    for (let button of buttons) {
        button.disabled = true;
    }
}

/**
 * Reset the game
 */

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = "Player: 0";
    computerScoreDisplay.textContent = "Computer: 0";
    roundResultDisplay.textContent = "";
    finalResultDisplay.textContent = "";

    // Enable all choice buttons

    for (let button of buttons) {
        button.disabled = false;
    }
}