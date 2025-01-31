document.addEventListener("DOMContentLoaded", () => {
    // Retrieve score and answered questions from localStorage
    const score = parseInt(localStorage.getItem("score")) || 0;
    const totalQuestions = 10; // Adjust to the actual number of questions in your quiz

    // Display the results message
    const resultElement = document.getElementById("finalScore");
    resultElement.textContent = `You got ${score} out of ${totalQuestions} right, congrats! 🎉`;

    // Optionally, you can add personalized messages based on the score
    if (score === totalQuestions) {
        resultElement.textContent += " Perfect score, you are perfect!";
    } else if (score >= totalQuestions / 2) {
        resultElement.textContent += " Great job! you did the job";
    } else {
        resultElement.textContent += " Hope you are smarter next time (:";
    }
});

function answers() {
    window.location.href = 'answers.html';
}

// Function to reset the game
function resetGame() {
    localStorage.removeItem("score");
    localStorage.removeItem("answeredQuestions");
    window.location.href = 'index.html'; // Redirect to the start page
}
