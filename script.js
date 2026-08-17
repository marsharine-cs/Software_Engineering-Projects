"use strict";

/* =========================================================
   ADA LOVELACE — THE POETRY OF COMPUTATION
   Interactive Digital History Project
   ========================================================= */


/* ---------------------------------------------------------
   TIMELINE DATA
--------------------------------------------------------- */

const timelineData = {
    "1815": {
        title: "Augusta Ada Byron is born",
        description:
            "Ada was born in London in 1815. Her education would later include mathematics, science, and logic—subjects that helped prepare her for her work with Charles Babbage."
    },

    "1833": {
        title: "Ada encounters Charles Babbage's work",
        description:
            "As a young woman, Ada became acquainted with mathematician and inventor Charles Babbage. She learned about his Difference Engine and later became deeply interested in his more ambitious design for the Analytical Engine."
    },

    "1843": {
        title: "The Analytical Engine notes are published",
        description:
            "Ada translated Luigi Menabrea's account of the Analytical Engine into English and added extensive notes of her own. Her additions were substantially longer than the original article and explored the machine's operation, possibilities, and limitations."
    },

    "1852": {
        title: "A legacy that continued beyond her lifetime",
        description:
            "Ada Lovelace died in 1852 at age 36. Her writings later became an important part of the history of computing because they captured unusually early ideas about programmable machines, algorithms, and symbolic operations."
    }
};


/* ---------------------------------------------------------
   NOTES EXPLORER DATA
--------------------------------------------------------- */

const notesData = {
    engine: {
        label: "CONCEPT 01",
        title: "A programmable mechanical engine",
        description:
            "Lovelace examined how the Analytical Engine could follow sequences of operations encoded through mechanical instructions, helping explain the machine as more than a conventional calculator.",
        keyword: "Programmability"
    },

    symbols: {
        label: "CONCEPT 02",
        title: "A machine could operate on more than quantities",
        description:
            "One of Lovelace's most influential observations was that the Analytical Engine's operations could potentially apply to symbols whenever those symbols could be represented according to rules. This suggested possibilities extending beyond ordinary numerical calculation.",
        keyword: "Symbolic Processing"
    },

    algorithm: {
        label: "CONCEPT 03",
        title: "Note G and the Bernoulli-number procedure",
        description:
            "In Note G, Lovelace described a detailed sequence of operations for using the Analytical Engine to calculate Bernoulli numbers. The procedure has become one of the most frequently discussed early examples of an algorithm designed for execution by a machine.",
        keyword: "Algorithmic Thinking"
    }
};


/* ---------------------------------------------------------
   DOM ELEMENTS
--------------------------------------------------------- */

const menuButton =
    document.getElementById("menu-button");

const navigation =
    document.getElementById("main-navigation");

const navigationLinks =
    document.querySelectorAll(
        "#main-navigation a"
    );


const timelineButtons =
    Array.from(
        document.querySelectorAll(
            ".timeline-button"
        )
    );

const timelineYear =
    document.getElementById(
        "timeline-year"
    );

const timelineTitle =
    document.getElementById(
        "timeline-title"
    );

const timelineDescription =
    document.getElementById(
        "timeline-description"
    );


const noteButtons =
    Array.from(
        document.querySelectorAll(
            ".note-button"
        )
    );

const noteLabel =
    document.getElementById(
        "note-label"
    );

const noteTitle =
    document.getElementById(
        "note-title"
    );

const noteDescription =
    document.getElementById(
        "note-description"
    );

const noteKeyword =
    document.getElementById(
        "note-keyword"
    );


/* ---------------------------------------------------------
   MOBILE NAVIGATION
--------------------------------------------------------- */

function openNavigation() {
    navigation.classList.add("open");

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    menuButton.setAttribute(
        "aria-label",
        "Close navigation menu"
    );
}


function closeNavigation() {
    navigation.classList.remove("open");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );
}


function toggleNavigation() {
    const isOpen =
        navigation.classList.contains(
            "open"
        );

    if (isOpen) {
        closeNavigation();
    } else {
        openNavigation();
    }
}


menuButton.addEventListener(
    "click",
    toggleNavigation
);


navigationLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            closeNavigation
        );

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            navigation.classList.contains(
                "open"
            )
        ) {
            closeNavigation();

            menuButton.focus();
        }

    }
);


window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 760 &&
            navigation.classList.contains(
                "open"
            )
        ) {
            closeNavigation();
        }

    }
);


/* ---------------------------------------------------------
   TIMELINE
--------------------------------------------------------- */

function selectTimelineYear(button) {
    const year =
        button.dataset.year;

    const selectedEntry =
        timelineData[year];

    if (!selectedEntry) {
        return;
    }


    timelineButtons.forEach(
        function (timelineButton) {

            const isSelected =
                timelineButton === button;

            timelineButton.classList.toggle(
                "active",
                isSelected
            );

            timelineButton.setAttribute(
                "aria-selected",
                String(isSelected)
            );

            timelineButton.tabIndex =
                isSelected ? 0 : -1;

        }
    );


    timelineYear.textContent =
        year;

    timelineTitle.textContent =
        selectedEntry.title;

    timelineDescription.textContent =
        selectedEntry.description;
}


timelineButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {
                selectTimelineYear(
                    button
                );
            }
        );

    }
);


/* ---------------------------------------------------------
   TIMELINE KEYBOARD NAVIGATION
--------------------------------------------------------- */

function moveTimelineFocus(
    currentIndex,
    direction
) {
    let newIndex =
        currentIndex + direction;

    if (
        newIndex <
        0
    ) {
        newIndex =
            timelineButtons.length - 1;
    }

    if (
        newIndex >=
        timelineButtons.length
    ) {
        newIndex = 0;
    }

    const newButton =
        timelineButtons[newIndex];

    newButton.focus();

    selectTimelineYear(
        newButton
    );
}


timelineButtons.forEach(
    function (button, index) {

        button.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                        "ArrowRight" ||
                    event.key ===
                        "ArrowDown"
                ) {
                    event.preventDefault();

                    moveTimelineFocus(
                        index,
                        1
                    );
                }


                if (
                    event.key ===
                        "ArrowLeft" ||
                    event.key ===
                        "ArrowUp"
                ) {
                    event.preventDefault();

                    moveTimelineFocus(
                        index,
                        -1
                    );
                }


                if (
                    event.key === "Home"
                ) {
                    event.preventDefault();

                    timelineButtons[0]
                        .focus();

                    selectTimelineYear(
                        timelineButtons[0]
                    );
                }


                if (
                    event.key === "End"
                ) {
                    event.preventDefault();

                    const lastButton =
                        timelineButtons[
                            timelineButtons.length -
                                1
                        ];

                    lastButton.focus();

                    selectTimelineYear(
                        lastButton
                    );
                }

            }
        );

    }
);


/* ---------------------------------------------------------
   NOTES EXPLORER
--------------------------------------------------------- */

function selectNote(button) {
    const noteKey =
        button.dataset.note;

    const selectedNote =
        notesData[noteKey];

    if (!selectedNote) {
        return;
    }


    noteButtons.forEach(
        function (noteButton) {

            const isSelected =
                noteButton === button;

            noteButton.classList.toggle(
                "active",
                isSelected
            );

            noteButton.setAttribute(
                "aria-selected",
                String(isSelected)
            );

            noteButton.tabIndex =
                isSelected ? 0 : -1;

        }
    );


    noteLabel.textContent =
        selectedNote.label;

    noteTitle.textContent =
        selectedNote.title;

    noteDescription.textContent =
        selectedNote.description;

    noteKeyword.textContent =
        selectedNote.keyword;
}


noteButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {
                selectNote(
                    button
                );
            }
        );

    }
);


/* ---------------------------------------------------------
   NOTES KEYBOARD NAVIGATION
--------------------------------------------------------- */

function moveNoteFocus(
    currentIndex,
    direction
) {
    let newIndex =
        currentIndex + direction;

    if (
        newIndex <
        0
    ) {
        newIndex =
            noteButtons.length - 1;
    }

    if (
        newIndex >=
        noteButtons.length
    ) {
        newIndex = 0;
    }

    const newButton =
        noteButtons[newIndex];

    newButton.focus();

    selectNote(
        newButton
    );
}


noteButtons.forEach(
    function (button, index) {

        button.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                        "ArrowRight" ||
                    event.key ===
                        "ArrowDown"
                ) {
                    event.preventDefault();

                    moveNoteFocus(
                        index,
                        1
                    );
                }


                if (
                    event.key ===
                        "ArrowLeft" ||
                    event.key ===
                        "ArrowUp"
                ) {
                    event.preventDefault();

                    moveNoteFocus(
                        index,
                        -1
                    );
                }


                if (
                    event.key === "Home"
                ) {
                    event.preventDefault();

                    noteButtons[0]
                        .focus();

                    selectNote(
                        noteButtons[0]
                    );
                }


                if (
                    event.key === "End"
                ) {
                    event.preventDefault();

                    const lastButton =
                        noteButtons[
                            noteButtons.length -
                                1
                        ];

                    lastButton.focus();

                    selectNote(
                        lastButton
                    );
                }

            }
        );

    }
);


/* ---------------------------------------------------------
   INITIAL ACCESSIBILITY STATE
--------------------------------------------------------- */

function initializeTabs() {

    timelineButtons.forEach(
        function (button, index) {
            button.tabIndex =
                index === 0
                    ? 0
                    : -1;
        }
    );


    noteButtons.forEach(
        function (button, index) {
            button.tabIndex =
                index === 0
                    ? 0
                    : -1;
        }
    );

}


/* ---------------------------------------------------------
   INITIALIZE APPLICATION
--------------------------------------------------------- */

initializeTabs();
