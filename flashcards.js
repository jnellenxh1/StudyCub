const flashcard = document.getElementById("flashcard");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const progress = document.getElementById("progress");

let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is 2 + 2?", answer: "4" },
    { question: "Who wrote 'To Kill a Mockingbird'?", answer: "Harper Lee" }
];

let currentIndex = 0;
let streak = localStorage.getItem("streak") || 0;
document.getElementById("streak-count").textContent = streak;

// Update Flashcard
function updateFlashcard() {
    question.textContent = flashcards[currentIndex].question;
    answer.textContent = flashcards[currentIndex].answer;
    progress.style.width = ((currentIndex + 1) / flashcards.length) * 100 + "%";
    flashcard.classList.remove("flipped");
}

// Flip Flashcard
document.getElementById("flip").addEventListener("click", () => {
    flashcard.classList.toggle("flipped");
});

// Navigation
document.getElementById("next").addEventListener("click", () => {
    if (currentIndex < flashcards.length - 1) {
        currentIndex++;
        updateFlashcard();
    }
});

document.getElementById("prev").addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateFlashcard();
    }
});

// Study Streak System
function updateStreak() {
    let lastStudyDate = localStorage.getItem("lastStudyDate");
    let today = new Date().toDateString();

    if (lastStudyDate !== today) {
        streak++;
        localStorage.setItem("streak", streak);
        localStorage.setItem("lastStudyDate", today);
        document.getElementById("streak-count").textContent = streak;
    }
}

updateStreak();

// Add New Flashcard
document.getElementById("add-flashcard").addEventListener("click", () => {
    let newQuestion = document.getElementById("new-question").value;
    let newAnswer = document.getElementById("new-answer").value;

    if (newQuestion && newAnswer) {
        flashcards.push({ question: newQuestion, answer: newAnswer });
        localStorage.setItem("flashcards", JSON.stringify(flashcards));
        alert("New flashcard added!");
    }
});

updateFlashcard();
