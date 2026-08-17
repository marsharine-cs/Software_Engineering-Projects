"use strict";

/* =========================================================
   JAVASCRIPT KNOWLEDGE QUIZ
   Marsharine A. Simpson
   ========================================================= */

const questions = [
    {
        category: "Variables",
        question: "Which keyword declares a block-scoped variable that can be reassigned?",
        answers: ["const", "let", "static", "define"],
        correct: 1,
        explanation:
            "`let` creates a block-scoped variable whose value can be reassigned. `const` is also block-scoped, but its binding cannot be reassigned."
    },
    {
        category: "Comparison Operators",
        question: "What does the strict equality operator (===) compare in JavaScript?",
        answers: [
            "Only the values",
            "Only the data types",
            "Both value and data type",
            "Whether two variables have the same name"
        ],
        correct: 2,
        explanation:
            "The strict equality operator compares both value and type without performing type coercion."
    },
    {
        category: "Arrays",
        question: "Which method adds one or more items to the end of an array?",
        answers: ["push()", "pop()", "shift()", "slice()"],
        correct: 0,
        explanation:
            "`push()` adds one or more elements to the end of an array and returns the array's new length."
    },
    {
        category: "Functions",
        question: "What is the primary purpose of a return statement inside a function?",
        answers: [
            "To repeat the function automatically",
            "To send a value back to the code that called the function",
            "To print the function to the console",
            "To create a new variable"
        ],
        correct: 1,
        explanation:
            "A `return` statement ends the function's execution and can send a value back to the caller."
    },
    {
        category: "DOM",
        question: "Which method returns the first element that matches a CSS selector?",
        answers: [
            "document.getElements()",
            "document.querySelector()",
            "document.createNode()",
            "document.findElement()"
        ],
        correct: 1,
        explanation:
            "`document.querySelector()` returns the first element that matches the CSS selector supplied to it."
    },
    {
        category: "Events",
        question: "Which method is commonly used to respond to a user's click on a button?",
        answers: [
            "addEventListener()",
            "appendChild()",
            "getAttribute()",
            "setInterval()"
        ],
        correct: 0,
        explanation:
            "`addEventListener()` allows JavaScript to listen for events such as clicks, keyboard input, form submissions, and more."
    },
    {
        category: "Data Types",
        question: "What does typeof \"JavaScript\" return?",
        answers: ["\"text\"", "\"character\"", "\"string\"", "\"object\""],
        correct: 2,
        explanation:
            "Text enclosed in quotation marks is a JavaScript string, so `typeof \"JavaScript\"` returns `\"string\"`."
    },
    {
        category: "Template Literals",
        question: "Which syntax inserts a JavaScript expression into a template literal?",
        answers: [
            "{{ expression }}",
            "${expression}",
            "<%= expression %>",
            "#{expression}"
        ],
        correct: 1,
        explanation:
            "Template literals use backticks, and `${expression}` inserts a JavaScript value or expression into the resulting string."
    },
    {
        category: "Conditional Logic",
        question: "Which statement executes code only when a specified condition evaluates to true?",
        answers: ["import", "if", "return", "class"],
        correct: 1,
        explanation:
            "An `if` statement evaluates a condition and runs its code block when that condition is truthy."
    },
    {
        category: "Constants",
        question: "Which statement about const is correct?",
        answers: [
            "A const variable must always contain a number",
            "A const declaration can be reassigned at any time",
            "A const binding cannot be reassigned after it is created",
            "const variables are available only inside functions"
        ],
        correct: 2,
        explanation:
            "A variable declared with `const` must be initialized when declared, and its binding cannot later be reassigned."
    }
];

const quizApp = document.getElementById("quiz-app");
const currentQuestionElement = document.getElementById("current-question");
const totalQuestionsElement = document.getElementById("total-questions");
const progressPercent = document.getElementById("progress-percent");
const progressBar = document.getElementById("progress-bar");
const progressFill = document.getElementById("progress-fill");
const questionCategory = document.getElementById("question-category");
const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const feedback = document.getElementById("answer-feedback");
const feedbackIcon = document.getElementById("feedback-icon");
const feedbackTitle = document.getElementById("feedback-title");
const feedbackExplanation = document.getElementById("feedback-explanation");
const previousButton = document.getElementById("previous-btn");
const nextButton = document.getElementById("next-btn");

const resultsSection = document.getElementById("results-section");
const scorePercent = document.getElementById("score-percent");
const scoreMessage = document.getElementById("score-message");
const correctCount = document.getElementById("correct-count");
const incorrectCount = document.getElementById("incorrect-count");
const finalTotal = document.getElementById("final-total");
const reviewButton = document.getElementById("review-btn");
const restartButton = document.getElementById("restart-btn");

const reviewSection = document.getElementById("review-section");
const reviewList = document.getElementById("review-list");
const reviewRestartButton = document.getElementById("review-restart-btn");

let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);

totalQuestionsElement.textContent = questions.length;
finalTotal.textContent = questions.length;

function renderQuestion() {
    const question = questions[currentQuestionIndex];
    const selectedAnswer = userAnswers[currentQuestionIndex];

    const questionNumber = currentQuestionIndex + 1;
    const progress = Math.round(
        (questionNumber / questions.length) * 100
    );

    currentQuestionElement.textContent = questionNumber;
    questionCategory.textContent = question.category;
    questionText.textContent = question.question;

    progressPercent.textContent = `${progress}%`;
    progressFill.style.width = `${progress}%`;
    progressBar.setAttribute("aria-valuenow", progress);

    answerOptions.innerHTML = "";

    question.answers.forEach(function (answer, answerIndex) {
        const button = document.createElement("button");
        const letter = String.fromCharCode(65 + answerIndex);

        button.type = "button";
        button.className = "answer-option";
        button.setAttribute("role", "radio");
        button.setAttribute(
            "aria-checked",
            selectedAnswer === answerIndex ? "true" : "false"
        );

        const letterElement = document.createElement("span");
        letterElement.className = "answer-letter";
        letterElement.textContent = letter;

        const answerText = document.createElement("span");
        answerText.textContent = answer;

        button.append(letterElement, answerText);

        if (selectedAnswer !== null) {
            button.disabled = true;

            if (answerIndex === question.correct) {
                button.classList.add("correct");
            }

            if (
                answerIndex === selectedAnswer &&
                selectedAnswer !== question.correct
            ) {
                button.classList.add("incorrect");
            }

            if (answerIndex === selectedAnswer) {
                button.classList.add("selected");
            }
        } else {
            button.addEventListener("click", function () {
                selectAnswer(answerIndex);
            });
        }

        answerOptions.appendChild(button);
    });

    if (selectedAnswer === null) {
        hideFeedback();
    } else {
        showFeedback(selectedAnswer);
    }

    previousButton.disabled = currentQuestionIndex === 0;
    nextButton.disabled = selectedAnswer === null;

    nextButton.textContent =
        currentQuestionIndex === questions.length - 1
            ? "View Results →"
            : "Next Question →";
}

function selectAnswer(answerIndex) {
    if (userAnswers[currentQuestionIndex] !== null) {
        return;
    }

    userAnswers[currentQuestionIndex] = answerIndex;
    renderQuestion();
}

function hideFeedback() {
    feedback.hidden = true;
    feedback.classList.remove(
        "correct-feedback",
        "incorrect-feedback"
    );
}

function showFeedback(selectedAnswer) {
    const question = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correct;

    feedback.hidden = false;
    feedback.classList.remove(
        "correct-feedback",
        "incorrect-feedback"
    );

    if (isCorrect) {
        feedback.classList.add("correct-feedback");
        feedbackIcon.textContent = "✓";
        feedbackTitle.textContent = "Correct!";
    } else {
        feedback.classList.add("incorrect-feedback");
        feedbackIcon.textContent = "×";
        feedbackTitle.textContent = "Not quite.";
    }

    feedbackExplanation.textContent = question.explanation;
}

previousButton.addEventListener("click", function () {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
        scrollToQuiz();
    }
});

nextButton.addEventListener("click", function () {
    if (userAnswers[currentQuestionIndex] === null) {
        return;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
        scrollToQuiz();
    } else {
        showResults();
    }
});

function calculateScore() {
    return userAnswers.reduce(function (total, selectedAnswer, index) {
        if (selectedAnswer === questions[index].correct) {
            return total + 1;
        }

        return total;
    }, 0);
}

function showResults() {
    const correct = calculateScore();
    const incorrect = questions.length - correct;
    const percentage = Math.round(
        (correct / questions.length) * 100
    );

    quizApp.hidden = true;
    reviewSection.hidden = true;
    resultsSection.hidden = false;

    scorePercent.textContent = `${percentage}%`;
    correctCount.textContent = correct;
    incorrectCount.textContent = incorrect;

    if (percentage === 100) {
        scoreMessage.textContent =
            "Outstanding work — you answered every question correctly.";
    } else if (percentage >= 80) {
        scoreMessage.textContent =
            "Excellent work. You have a strong understanding of these JavaScript fundamentals.";
    } else if (percentage >= 60) {
        scoreMessage.textContent =
            "Good progress. Review the explanations to strengthen the concepts you missed.";
    } else {
        scoreMessage.textContent =
            "Keep learning. Review your answers and explanations, then retake the quiz when you're ready.";
    }

    resultsSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

reviewButton.addEventListener("click", renderReview);

function renderReview() {
    reviewList.innerHTML = "";

    questions.forEach(function (question, index) {
        const selectedAnswer = userAnswers[index];
        const isCorrect = selectedAnswer === question.correct;

        const card = document.createElement("article");
        card.className =
            `review-card ${
                isCorrect ? "correct-review" : "incorrect-review"
            }`;

        const number = document.createElement("p");
        number.className = "review-number";
        number.textContent =
            `Question ${index + 1} · ${question.category}`;

        const heading = document.createElement("h3");
        heading.textContent = question.question;

        const yourAnswer = document.createElement("p");
        const yourAnswerLabel = document.createElement("strong");
        yourAnswerLabel.textContent = "Your answer: ";
        yourAnswer.appendChild(yourAnswerLabel);
        yourAnswer.append(question.answers[selectedAnswer]);

        const correctAnswer = document.createElement("p");
        const correctAnswerLabel = document.createElement("strong");
        correctAnswerLabel.textContent = "Correct answer: ";
        correctAnswer.appendChild(correctAnswerLabel);
        correctAnswer.append(
            question.answers[question.correct]
        );

        const explanation = document.createElement("p");
        const explanationLabel = document.createElement("strong");
        explanationLabel.textContent = "Explanation: ";
        explanation.appendChild(explanationLabel);
        explanation.append(question.explanation);

        card.append(
            number,
            heading,
            yourAnswer,
            correctAnswer,
            explanation
        );

        reviewList.appendChild(card);
    });

    resultsSection.hidden = true;
    reviewSection.hidden = false;

    reviewSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

restartButton.addEventListener("click", restartQuiz);
reviewRestartButton.addEventListener("click", restartQuiz);

function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);

    resultsSection.hidden = true;
    reviewSection.hidden = true;
    quizApp.hidden = false;

    renderQuestion();
    scrollToQuiz();
}

function scrollToQuiz() {
    quizApp.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

answerOptions.addEventListener("keydown", function (event) {
    const validKeys = [
        "ArrowDown",
        "ArrowRight",
        "ArrowUp",
        "ArrowLeft"
    ];

    if (!validKeys.includes(event.key)) {
        return;
    }

    const availableOptions = Array.from(
        answerOptions.querySelectorAll(
            ".answer-option:not(:disabled)"
        )
    );

    if (availableOptions.length === 0) {
        return;
    }

    event.preventDefault();

    const currentIndex = availableOptions.indexOf(
        document.activeElement
    );

    let nextIndex;

    if (
        event.key === "ArrowDown" ||
        event.key === "ArrowRight"
    ) {
        nextIndex =
            currentIndex < 0
                ? 0
                : (currentIndex + 1) %
                  availableOptions.length;
    } else {
        nextIndex =
            currentIndex <= 0
                ? availableOptions.length - 1
                : currentIndex - 1;
    }

    availableOptions[nextIndex].focus();
});

renderQuestion();
