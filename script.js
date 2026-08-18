"use strict";

/* =========================================================
   MARSHARINE A. SIMPSON
   PROFESSIONAL TECHNOLOGY PORTFOLIO — V2
   ========================================================= */


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuButton = document.getElementById("menu-button");
const navigation = document.getElementById("main-navigation");
const navigationLinks = document.querySelectorAll(
    "#main-navigation a"
);


function openNavigation() {
    navigation.classList.add("open");
    menuButton.classList.add("active");

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    menuButton.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

    document.body.classList.add("menu-open");
}


function closeNavigation() {
    navigation.classList.remove("open");
    menuButton.classList.remove("active");

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    document.body.classList.remove("menu-open");
}


function toggleNavigation() {
    const isOpen =
        navigation.classList.contains("open");

    if (isOpen) {
        closeNavigation();
    } else {
        openNavigation();
    }
}


if (menuButton && navigation) {

    menuButton.addEventListener(
        "click",
        toggleNavigation
    );


    navigationLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            closeNavigation
        );

    });


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                navigation.classList.contains("open")
            ) {
                closeNavigation();
                menuButton.focus();
            }

        }
    );


    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 830) {
                closeNavigation();
            }

        }
    );

}


/* =========================================================
   Q&A ACCORDION
   ========================================================= */

const questionItems =
    document.querySelectorAll(".question-item");


questionItems.forEach(
    function (item, index) {

        const button =
            item.querySelector(".question-button");

        const answer =
            item.querySelector(".question-answer");


        if (!button || !answer) {
            return;
        }


        /* Add accessible relationships dynamically */

        const buttonId =
            `question-button-${index + 1}`;

        const answerId =
            `question-answer-${index + 1}`;


        button.id = buttonId;

        button.setAttribute(
            "aria-controls",
            answerId
        );


        answer.id = answerId;

        answer.setAttribute(
            "role",
            "region"
        );

        answer.setAttribute(
            "aria-labelledby",
            buttonId
        );


        function closeQuestion() {
            item.classList.remove("open");

            button.setAttribute(
                "aria-expanded",
                "false"
            );
        }


        function openQuestion() {

            /*
             * Keep the accordion clean by closing
             * other open answers first.
             */

            questionItems.forEach(
                function (otherItem) {

                    if (otherItem === item) {
                        return;
                    }

                    const otherButton =
                        otherItem.querySelector(
                            ".question-button"
                        );

                    otherItem.classList.remove("open");

                    if (otherButton) {
                        otherButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );
                    }

                }
            );


            item.classList.add("open");

            button.setAttribute(
                "aria-expanded",
                "true"
            );
        }


        button.addEventListener(
            "click",
            function () {

                const isOpen =
                    item.classList.contains("open");

                if (isOpen) {
                    closeQuestion();
                } else {
                    openQuestion();
                }

            }
        );

    }
);


/* =========================================================
   ACTIVE NAVIGATION SECTION
   ========================================================= */

const sectionNavigationLinks =
    Array.from(navigationLinks).filter(
        function (link) {

            const href =
                link.getAttribute("href");

            return (
                href &&
                href.startsWith("#")
            );

        }
    );


const navigationSections =
    sectionNavigationLinks
        .map(function (link) {

            return document.querySelector(
                link.getAttribute("href")
            );

        })
        .filter(Boolean);


function updateActiveNavigation() {

    if (navigationSections.length === 0) {
        return;
    }


    const scrollPosition =
        window.scrollY + 180;

    let activeSection = null;


    navigationSections.forEach(
        function (section) {

            if (
                section.offsetTop <=
                scrollPosition
            ) {
                activeSection = section;
            }

        }
    );


    sectionNavigationLinks.forEach(
        function (link) {

            link.removeAttribute(
                "aria-current"
            );

        }
    );


    if (!activeSection) {
        return;
    }


    const activeLink =
        sectionNavigationLinks.find(
            function (link) {

                return (
                    link.getAttribute("href") ===
                    `#${activeSection.id}`
                );

            }
        );


    if (activeLink) {

        activeLink.setAttribute(
            "aria-current",
            "page"
        );

    }

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


window.addEventListener(
    "load",
    updateActiveNavigation
);


/* =========================================================
   SMOOTH INTERNAL NAVIGATION
   ========================================================= */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                history.replaceState(
                    null,
                    "",
                    targetId
                );

            }
        );

    }
);


/* =========================================================
   EXTERNAL LINK SECURITY
   ========================================================= */

const externalLinks =
    document.querySelectorAll(
        'a[target="_blank"]'
    );


externalLinks.forEach(
    function (link) {

        const relValues =
            new Set(
                (
                    link.getAttribute("rel") ||
                    ""
                )
                    .split(/\s+/)
                    .filter(Boolean)
            );


        relValues.add("noopener");
        relValues.add("noreferrer");


        link.setAttribute(
            "rel",
            Array.from(relValues).join(" ")
        );

    }
);


/* =========================================================
   INITIAL STATE
   ========================================================= */

function initializePortfolio() {

    /*
     * Ensure every Q&A begins closed.
     */

    questionItems.forEach(
        function (item) {

            const button =
                item.querySelector(
                    ".question-button"
                );


            item.classList.remove("open");


            if (button) {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    updateActiveNavigation();

}


initializePortfolio();
