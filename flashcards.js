document.addEventListener("DOMContentLoaded", function () {
    // Hardcoded flashcards (Replace or extend as needed)
    const flashcards = [
        { front: "What is the capital of France?", back: "Paris" },
        { front: "What is 2 + 2?", back: "4" },
        { front: "What is the largest planet?", back: "Jupiter" },
        { front: "Who wrote 'Hamlet'?", back: "William Shakespeare" }
    ];

    const container = document.getElementById("flashcard-container");

    flashcards.forEach(card => {
        let flashcard = document.createElement("div");
        flashcard.className = "flashcard";
        flashcard.innerHTML = `<strong>${card.front}</strong><br><span style="display:none">${card.back}</span>`;
        
        flashcard.addEventListener("click", function () {
            let answer = this.children[1];
            answer.style.display = answer.style.display === "none" ? "block" : "none";
        });

        container.appendChild(flashcard);
    });
});
