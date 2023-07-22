/**
 * Add event listener to every button
 */

const buttons = document.getElementsByClassName("choice");

for (let button of buttons) {
    button.removeEventListener("click", handleClick); // Remove any existing event listener
    button.addEventListener("click", handleClick); // Add the updated event listener
}

function handleClick() {
    if (!finalResultDisplay.textContent) { // Check if the game has ended
        const playerSelection = this.getAttribute("data-type");
        playRound(playerSelection);
    }
}

let playerScore = 0;
let computerScore = 0;

/*
Declare the display elements
*/

const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");
const roundResultDisplay = document.getElementById("round-result");
const finalResultDisplay = document.getElementById("final-result");

/*
Declare the choices
*/

function playRound(playerSelection) {
    if (!finalResultDisplay.textContent) { // Check if the game has ended
        const choices = ["rock", "paper", "scissors", "lizard", "spock"];
        const computerSelection = choices[Math.floor(Math.random() * choices.length)];

        // Display computer's selection
        const computerSelectionDisplay = document.getElementById("computer-selection");
        computerSelectionDisplay.textContent = "Computer picked: " + computerSelection;

        if (playerSelection === computerSelection) {
            roundResultDisplay.textContent = "It's a tie!";
            console.log("REGISTERING TIED ROUND");
        } else if (
            (playerSelection === "rock" && (computerSelection === "scissors" || computerSelection === "lizard")) ||
            (playerSelection === "paper" && (computerSelection === "rock" || computerSelection === "spock")) ||
            (playerSelection === "scissors" && (computerSelection === "paper" || computerSelection === "lizard")) ||
            (playerSelection === "lizard" && (computerSelection === "paper" || computerSelection === "spock")) ||
            (playerSelection === "spock" && (computerSelection === "rock" || computerSelection === "scissors"))
        ) {
            roundResultDisplay.textContent = "Yaaaay!! You win this round!";
            playerScore++;
            console.log("REGISTERING WON ROUND");
        } else {
            roundResultDisplay.textContent = "Oops! You lose this round!";
            computerScore++;
            console.log("REGISTERING LOST ROUND");
        }
        playerScoreDisplay.textContent = "Player Score: " + playerScore;
        computerScoreDisplay.textContent = "Computer Score: " + computerScore;
        checkGameEnd();
    }
}



function checkGameEnd() {
    if (playerScore >= 10 || computerScore >= 10) {
        console.log("GAME SHOULD BE OVER NOW!!!");
        const finalResult = playerScore === 10 ? "You won the game!" : "Computer won the game!";
        finalResultDisplay.textContent = finalResult;
        disableButtons();

        // Reset the game after 2 seconds
        setTimeout(() => {
            resetGame();
            console.log("RESET GAME NOW!!!");
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

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerScoreDisplay.textContent = "Player Score: " + playerScore; // Add the label "Player Score"
    computerScoreDisplay.textContent = "Computer Score: " + computerScore; // Add the label "Computer Score"
    roundResultDisplay.textContent = "";
    finalResultDisplay.textContent = "";

    // Enable all choice buttons

    for (let button of buttons) {
        button.disabled = false;
    }
}