import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

<<<<<<< HEAD
// Initialize Supabase client
const SUPABASE_URL = 'https://zsmdppjabodiqhlgafth.supabase.co'; // Replace with your Supabase URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzbWRwcGphYm9kaXFobGdhZnRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0OTcyOTYsImV4cCI6MjA1MjA3MzI5Nn0.StC6QxS2OrBb22yggOi1Nhza_Gum5CC63iYkviuQZgg'; // Replace with your Supabase key
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
=======
const quiz = [
    {
        question: "Vad är världens mest använda namn?",
        image: "styles/questionmark.jpg",
        options: ["A. Mohammad", "B. Emma", "C. Noah", "D. Eva"],
        correct: 0
    },
    {
        question: "Vart uppfanns drycken te?",
        image: "styles/te.jpg",
        options: ["A. Japan", "B. Storbritannien", "C. Kina", "D. Indien"],
        correct: 2
    },
    {
        question: "Vad heter Ghanas huvudstad?",
        image: "styles/ghana-flagga.png",
        options: ["A. Lagos", "B. Kumasi", "C. Nairobi", "D. Accra"],
        correct: 3
    },
    {
        question: "Vem är den mest streamde artisten?",
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
        image: "styles/oss.jpg",
        options: ["A. Tokyo (Japan)", "B. Sydney (Australien)", "C. London (England)", "D. Salt lake city (USA)"],
        correct: 3
    },
];
>>>>>>> ed378e924a30335e1c3acfcbf61a934d1b50a479

let quiz = [];
let currentQuestionIndex = parseInt(localStorage.getItem("answeredQuestions")) || 0;

document.addEventListener("DOMContentLoaded", async () => {
    // Initialize score if not set
    if (!localStorage.getItem(" score")) {
        localStorage.setItem("score", 0);
    }

    // Fetch quiz data from Supabase
    await fetchQuizData();
    
    if (quiz.length > 0) {
        loadQuestion();
    } else {
        console.error("No questions found!");
        document.getElementById('question').textContent = "No quiz data available!";
    }
});


// Fetch quiz data from Supabase
async function fetchQuizData() {
    try {
        const { data, error } = await supabase
            .from('Epl') // Replace 'quiz' with your table name
            .select()
; // Adjust columns as necessary

        if (error) {
            console.error("Error fetching quiz data:", error);
            return;
        }

        // Map fetched data to your desired structure
        quiz = data.map(item => ({
            question: item.question,
            options: [item.answer_1, item.answer_2, item.answer_3, item.answer_4],
            correct: item.correct_answer // Assume `correct` is the index of the correct answer
        }));

        console.log(data)

        sessionStorage.setItem("quiz", JSON.stringify(quiz));

    } catch (err) {
        console.error("Error fetching quiz data:", err);
    }
}

// Load a question
function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options');


    const currentQuestion = quiz[currentQuestionIndex];
    console.log(quiz);
    console.log(currentQuestionIndex);

    // Set question
    questionElement.textContent = currentQuestion.question;

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

// Check the selected answer
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
        // Redirect to results page
        window.location.href = 'results.html';
    }
}



// Function to reset the game
function resetGame() {
    localStorage.clear("score");
    localStorage.clear("answeredQuestions");
    window.location.href = 'question1.html';
}

window.onpopstate = () => {
    alert("You need to restart the game to play again!");
    localStorage.clear('score');
    sessionStorage.clear('answeredQuestions');
    window.location.href = "index.html";
};



if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(() => console.log('Service Worker Registered'))
        .catch(error => console.error('Service Worker Registration Failed:', error));
}
