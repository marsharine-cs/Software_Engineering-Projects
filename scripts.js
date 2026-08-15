"use strict";

/* =========================================================
   PALINDROME CHECKER
   Marsharine A. Simpson
   ========================================================= */


/* -------------------------
   DOM ELEMENTS
------------------------- */

const form = document.getElementById("palindrome-form");
const textInput = document.getElementById("text-input");
const clearButton = document.getElementById("clear-btn");

const resultPanel = document.getElementById("result");
const resultIcon = resultPanel.querySelector(".result-icon");
const resultText = document.getElementById("result-text");
const resultDetail = document.getElementById("result-detail");

const characterCount = document.getElementById("character-count");
const exampleButtons = document.querySelectorAll(".example-button");

const MAX_CHARACTERS = 250;


/* -------------------------
   NORMALIZE TEXT
------------------------- */

/*
   Converts text to lowercase and keeps only
   letters and numbers.

   Spaces, punctuation, and special characters
   are ignored when checking the palindrome.
*/

function normalizeText(text) {
    return text
        .toLocaleLowerCase()
        .match(/[\p{L}\p{N}]/gu)
        ?.join("") || "";
}


/* -------------------------
   PALINDROME LOGIC
------------------------- */

function isPalindrome(text) {
    const normalizedText = normalizeText(text);

    const reversedText = normalizedText
        .split("")
        .reverse()
        .join("");

    return normalizedText === reversedText;
}


/* -------------------------
   RESULT STATES
------------------------- */

function resetResult() {
    resultPanel.classList.remove(
        "is-palindrome",
        "not-palindrome",
        "has-warning"
    );

    resultIcon.textContent = "✦";
    resultText.textContent = "Your result will appear here.";

    resultDetail.textContent =
        "Try one of the examples below or enter your own text.";
}


function showWarning() {
    resultPanel.classList.remove(
        "is-palindrome",
        "not-palindrome"
    );

    resultPanel.classList.add("has-warning");

    resultIcon.textContent = "!";

    resultText.textContent = "Enter some text first.";

    resultDetail.textContent =
        "Type a word, phrase, or sentence before checking.";

    textInput.focus();
}


function showPalindrome(originalText) {
    resultPanel.classList.remove(
        "not-palindrome",
        "has-warning"
    );

    resultPanel.classList.add("is-palindrome");

    resultIcon.textContent = "✓";

    resultText.textContent = "Yes — it’s a palindrome!";

    resultDetail.textContent =
        `"${originalText.trim()}" reads the same forward and backward when spaces, punctuation, and capitalization are ignored.`;
}


function showNotPalindrome(originalText) {
    resultPanel.classList.remove(
        "is-palindrome",
        "has-warning"
    );

    resultPanel.classList.add("not-palindrome");

    resultIcon.textContent = "↔";

    resultText.textContent = "No — it’s not a palindrome.";

    resultDetail.textContent =
        `"${originalText.trim()}" does not read the same forward and backward after the text is normalized.`;
}


/* -------------------------
   CHECK INPUT
------------------------- */

function checkPalindrome() {
    const originalText = textInput.value;
    const normalizedText = normalizeText(originalText);

    if (!originalText.trim() || !normalizedText) {
        showWarning();
        return;
    }

    if (isPalindrome(originalText)) {
        showPalindrome(originalText);
    } else {
        showNotPalindrome(originalText);
    }
}


/* -------------------------
   CHARACTER COUNTER
------------------------- */

function updateCharacterCount() {
    const currentLength = textInput.value.length;

    characterCount.textContent =
        `${currentLength} / ${MAX_CHARACTERS}`;
}


/* -------------------------
   FORM SUBMISSION
------------------------- */

form.addEventListener("submit", function (event) {
    event.preventDefault();

    checkPalindrome();
});


/* -------------------------
   TEXT INPUT
------------------------- */

textInput.addEventListener("input", function () {
    updateCharacterCount();

    /*
       Return the result panel to its neutral state
       after the user begins editing a previous entry.
    */

    if (
        resultPanel.classList.contains("is-palindrome") ||
        resultPanel.classList.contains("not-palindrome") ||
        resultPanel.classList.contains("has-warning")
    ) {
        resetResult();
    }
});


/* -------------------------
   KEYBOARD SUPPORT
------------------------- */

/*
   Press Enter to check the text.
   Shift + Enter still allows a new line.
*/

textInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();

        checkPalindrome();
    }
});


/* -------------------------
   CLEAR BUTTON
------------------------- */

clearButton.addEventListener("click", function () {
    textInput.value = "";

    updateCharacterCount();
    resetResult();

    textInput.focus();
});


/* -------------------------
   EXAMPLE BUTTONS
------------------------- */

exampleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const exampleText = button.dataset.example;

        textInput.value = exampleText;

        updateCharacterCount();
        checkPalindrome();

        /*
           Move the result into view on smaller screens
           without creating an abrupt jump.
        */

        resultPanel.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    });
});


/* -------------------------
   INITIAL STATE
------------------------- */

updateCharacterCount();
resetResult();
