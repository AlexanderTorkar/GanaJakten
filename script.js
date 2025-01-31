import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// Initialize Supabase client
const SUPABASE_URL = 'https://zsmdppjabodiqhlgafth.supabase.co'; // Replace with your Supabase URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzbWRwcGphYm9kaXFobGdhZnRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0OTcyOTYsImV4cCI6MjA1MjA3MzI5Nn0.StC6QxS2OrBb22yggOi1Nhza_Gum5CC63iYkviuQZgg'; // Replace with your Supabase key
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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
            .select(); // Adjust columns as necessary

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


// Clear storage and cache when the app is closed
window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        clearCacheAndStorage();
    }
});

// Also clear storage if the user reloads or leaves the page
window.addEventListener("beforeunload", () => {
    clearCacheAndStorage();
});

// Function to clear localStorage, sessionStorage, and cache
async function clearCacheAndStorage() {
    localStorage.clear();
    sessionStorage.clear();

    if ('caches' in window) {
        const cacheNames = await caches.keys();
        cacheNames.forEach(async (cacheName) => {
            await caches.delete(cacheName);
        });
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
