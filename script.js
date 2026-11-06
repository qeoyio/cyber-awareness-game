
const accessForm = document.getElementById("accessForm");
const quizSection = document.getElementById("quizSection");
const welcome = document.getElementById("welcome");

const termsLink = document.getElementById("termsLink");

let score = 100;

// Check whether the visitor reviewed the terms.
const params = new URLSearchParams(window.location.search);

let reviewedTerms = params.get("reviewed") === "true";

if (reviewedTerms) {
    sessionStorage.setItem("termsReviewed", "true");
}

// Remember the terms review during this browser session.
reviewedTerms =
    sessionStorage.getItem("termsReviewed") === "true";

// Calculate the score when the visitor continues.
accessForm.addEventListener("submit", function(event) {
    event.preventDefault();

    score = 100;

    const agreed = document.getElementById("agree").checked;

    const name = document.getElementById("visitorName").value.trim();

    const email = document.getElementById("visitorEmail").value.trim();

    // Deduct points if terms were not reviewed.
    if (!reviewedTerms) {
        score -= 20;
    }

    // Deduct additional points if accepted without reviewing.
    if (agreed && !reviewedTerms) {
        score -= 15;
    }

    // Deduct points for sharing a name.
    if (name !== "") {
        score -= 15;
    }

    // Deduct more points for sharing an email.
    if (email !== "") {
        score -= 25;
    }

    // Do not allow a negative score.
    score = Math.max(0, score);

    // Hide the welcome page.
    welcome.classList.add("hidden");

    // Show the fake information and quiz.
    quizSection.classList.remove("hidden");

    window.scrollTo(0, 0);
});

// Check the quiz answers.
const quizForm = document.getElementById("quizForm");

quizForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let correctAnswers = 0;

    const totalQuestions = 5;

    for (let i = 1; i <= totalQuestions; i++) {

        const answer = document.querySelector(
            `input[name="q${i}"]:checked`
        );

        if (answer && answer.value === "correct") {
            correctAnswers++;
        }
    }

    // Add 10 points for each correct answer.
    score += correctAnswers * 10;

    // Display results.
    document.getElementById("finalScore").textContent =
        score + " Points";

    const message = document.getElementById("resultMessage");

    if (score >= 130) {
        message.textContent =
            "Excellent! You made safe choices and understand cybersecurity.";
    } else if (score >= 90) {
        message.textContent =
            "Good effort! Review your choices and keep learning about online safety.";
    } else if (score >= 50) {
        message.textContent =
            "Be careful! You shared information or skipped important safety steps.";
    } else {
        message.textContent =
            "You lost many points! Remember to protect your personal information.";
    }

    // Show the results.
    document.getElementById("results").classList.remove("hidden");

    quizForm.classList.add("hidden");

    window.scrollTo(0, document.body.scrollHeight);
});
