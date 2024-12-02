document.addEventListener("DOMContentLoaded", () => {
    // Initialize quiz if not started
    if (!localStorage.getItem("score")) {
        localStorage.setItem("score", 0);
        localStorage.setItem("answeredQuestions", 0);
    }
    loadQuestion();
});

const quiz = [
    {
        question: "Vad är världens mest använda namn?",
        image: "styles/questionmark.jpg",
        options: ["A. Mohammud", "B. Emma", "C. Noah", "D. Eva"],
        correct: 0
    },
    {
        question: "Vart uppfanns drickan te?",
        image: "styles/te.jpg",
        options: ["A. Japan", "B. Storbritannien", "C. Kina", "D. Indien"],
        correct: 2
    },
    {
        question: "Vad heter Ghanas huvudstad?",
        image: "styles/flag_map_of_Ghana.svg",
        options: ["A. Lagos", "B. Kumasi", "C. Nairobi", "D. Accra"],
        correct: 3
    },
    {
        question: "Vem är den mest streamde artisten (Spotify)?",
        image: "styles/spotify.png",
        options: ["A. Drake", "B. Arianna Grande", "C. Ed Sheeran", "D. Taylor Swift"],
        correct: 3
    },
    {
        question: "Vilken film har fått bäst betyg (imdb)?",
        image: "styles/imbd.jpg",
        options: ["A. The Shawshank Redemption", "B. The godfather", "C. The dark knight", "D. The godfather II"],
        correct: 0
    },
    {
        question: "Vilket år lanserades den första iPhone?",
        image: "styles/iphone.jpg",
        options: ["A. 2005", "B. 2007", "C. 2009", "D. 2004"],
        correct: 1
    },
    {
        question: "Vilket år grundades Hogia?",
        image: "styles/hogia.jpg",
        options: ["A. 1977", "B. 1985", "C. 1980", "D. 1990"],
        correct: 2
    },
    {
        question: "Vilken Volvo såldes mest under 2023 (globalt)?",
        image: "styles/volv.jpg",
        options: ["A. XC40", "B. XC90", "C. V90", "D. XC60"],
        correct: 3
    },
    {
        question: "Vem uppfann World Wide Web (www)?",
        image: "styles/www.png",
        options: ["A. Bill Gates", "B. Tim Berners-Lee", "C. Elon Musk", "D. Steve Jobs"],
        correct: 1
    },
    {
        question: "Vilket land höll de olympiska spelen 2002?",
        image: "styles/os.png",
        options: ["A. Japan", "B. Australien", "C. England", "D. USA"],
        correct: 3
    },
];


// Global index tracker
let currentQuestionIndex = parseInt(localStorage.getItem("answeredQuestions")) || 0;

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const imageElement = document.getElementById('image');
    const optionsContainer = document.getElementById('options');

    const currentQuestion = quiz[currentQuestionIndex];

    // Set question and image
    questionElement.textContent = currentQuestion.question;
    imageElement.src = currentQuestion.image;

    // Clear previous options
    optionsContainer.innerHTML = '';

    // Add options
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
}

// Function to display the final score
function displayResults() {
    const score = localStorage.getItem("score") || 0; // Retrieve score
    const totalQuestions = 10; // Adjust if needed

    // Display score in the 'finalScore' element
    const resultElement = document.getElementById("finalScore");
    resultElement.textContent = `Du fick ${score} av ${totalQuestions} rätt!`;
}

// Function to reset the game
function resetGame() {
    localStorage.removeItem("score"); // Clear the score
    localStorage.removeItem("answeredQuestions"); // Clear progress
    window.location.href = 'index.html'; // Redirect to the start page
}

function answers() {
    window.location.href = 'answers.html';
}

function checkAnswer(selectedIndex) {
    const currentQuestion = quiz[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correct) {
        let score = parseInt(localStorage.getItem("score")) + 1;
        localStorage.setItem("score", score);
    }

    // Move to the next question
    currentQuestionIndex++;
    localStorage.setItem("answeredQuestions", currentQuestionIndex);

    if (currentQuestionIndex < quiz.length) {
        loadQuestion();
    } else {
        // Redirect to results
        window.location.href = 'results.html';
    }
}


