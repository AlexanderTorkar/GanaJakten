document.addEventListener("DOMContentLoaded", () => {
    // Retrieve score and answered questions from localStorage
    const score = parseInt(localStorage.getItem("score")) || 0;
    const totalQuestions = 10; // Adjust to the actual number of questions in your quiz

    // Display the results message
    const resultElement = document.getElementById("finalScore");
    resultElement.textContent = `You got ${score} out of ${totalQuestions} right, congrats! 🎉`;

    // Optionally, you can add personalized messages based on the score
    if (score === totalQuestions) {
        resultElement.textContent += " Perfect score, well done!";
    } else if (score >= totalQuestions / 2) {
        resultElement.textContent += " Great job!";
    } else {
        resultElement.textContent += " Better luck next time!";
    }
});

function answers() {
    window.location.href = 'answers.html';
}

// Function to reset the game
function resetGame() {
    localStorage.clear;
    sessionStorage.clear;
    window.location.href = 'index.html'; // Redirect to the start page
}
