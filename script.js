document.addEventListener("DOMContentLoaded", () => {
    if (!localStorage.getItem("score")) {
        localStorage.setItem("score", 0);
        localStorage.setItem("answeredQuestions", 0); // Track answered questions
    }
});

function checkAnswer(button, correctAnswer) {
    const selectedAnswer = button.textContent[0]; // Get the first letter (A, B, C, D)
    
    // Check if the answer is correct
    if (selectedAnswer === correctAnswer) {
        let score = parseInt(localStorage.getItem("score"));
        localStorage.setItem("score", score + 1);
    }
    
    // Increment the number of answered questions
    let answeredQuestions = parseInt(localStorage.getItem("answeredQuestions")) + 1;
    localStorage.setItem("answeredQuestions", answeredQuestions);
    
    // Redirect to the next question or results page
    if (answeredQuestions < 10) { // Assuming there are 5 questions
        window.location.href = `question${answeredQuestions + 1}.html`; // Navigate to the next question
    } else {
        window.location.href = 'results.html'; // Show final results after the last question
    }
}


function displayResults() {
    const score = localStorage.getItem("score");
    const totalQuestions = 10; // Set this based on your number of questions
    
    document.getElementById("finalScore").textContent = `Du fick ${score} av ${totalQuestions} rätt!`;
}

function resetGame() {
    localStorage.removeItem("score");
    localStorage.removeItem("answeredQuestions");
    window.location.href = 'question1.html'; // Restart from the first question
}

