document.addEventListener("DOMContentLoaded", () => {
    const answersContainer = document.getElementById("answersContainer");

    // Retrieve quiz data from sessionStorage
    const quizData = JSON.parse(sessionStorage.getItem("quiz")) || [];
    const totalQuestions = quizData.length;

    if (quizData.length === 0) {
        answersContainer.innerHTML = "<p>No quiz data available!</p>";
        return;
    }

    // Generate the answers dynamically
    quizData.forEach((question, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";

        // Add the question text
        const questionText = document.createElement("p");
        questionText.textContent = `${index + 1}. ${question.question}`;
        questionDiv.appendChild(questionText);

        // Add the options and highlight the correct answer
        question.options.forEach((option, optionIndex) => {
            const optionText = document.createElement("p");
            optionText.textContent = `${String.fromCharCode(65 + optionIndex)}. ${option}`;
            
            // Highlight correct answer
            if (optionIndex === question.correct) {
                optionText.style.color = "green";
                optionText.style.fontWeight = "bold";
            }

            questionDiv.appendChild(optionText);
        });

        answersContainer.appendChild(questionDiv);
    });
});

// Function to restart the game
function startOver() {
    localStorage.removeItem("score");
    localStorage.removeItem("answeredQuestions");
    window.location.href = "index.html";
}
