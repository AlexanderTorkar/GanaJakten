document.addEventListener("DOMContentLoaded", () => {
    // Retrieve score and answered questions from localStorage
    const score = parseInt(localStorage.getItem("score")) || 0;
    const totalQuestions = 10; // Adjust to the actual number of questions in your quiz

    // Display the results message
    const resultElement = document.getElementById("finalScore");
    if (score === totalQuestions) {
        resultElement.textContent += `You got ${score} / ${totalQuestions}, You got Perfect score 😲🎉 You are perfect! 😁`;
    } else if (score >= totalQuestions / 2) {
        resultElement.textContent += `You got ${score} / ${totalQuestions}, You did the job... Acceptable 😐`;
    } else {
        resultElement.textContent += `You got ${score} / ${totalQuestions}, Did you even try? We are DISSAPOINTED 😰 `;
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
