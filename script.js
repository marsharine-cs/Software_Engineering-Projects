"use strict";

/* =========================================================
   MARSHARINE A. SIMPSON
   PROFESSIONAL TECHNOLOGY PORTFOLIO
   ========================================================= */


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const menuButton =
    document.getElementById("menu-button");

const navigation =
    document.getElementById("main-navigation");

const navigationLinks =
    Array.from(
        document.querySelectorAll(
            "#main-navigation a"
        )
    );

const filterButtons =
    Array.from(
        document.querySelectorAll(
            ".filter-button"
        )
    );

const projectCards =
    Array.from(
        document.querySelectorAll(
            ".project-card"
        )
    );


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

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
        navigation.classList.contains("open");

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


/* Close mobile navigation with Escape */

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


/* Reset mobile navigation when returning to desktop */

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 780 &&
            navigation.classList.contains("open")
        ) {
            closeNavigation();
        }

    }
);


/* =========================================================
   PROJECT FILTERING
   ========================================================= */

function projectMatchesFilter(
    projectCard,
    filter
) {
    if (filter === "all") {
        return true;
    }

    const categories =
        projectCard.dataset.category
            .split(" ")
            .map(function (category) {
                return category.trim();
            });

    return categories.includes(filter);
}


function updateProjects(filter) {

    projectCards.forEach(
        function (projectCard) {

            const matches =
                projectMatchesFilter(
                    projectCard,
                    filter
                );

            projectCard.classList.toggle(
                "is-hidden",
                !matches
            );

            projectCard.setAttribute(
                "aria-hidden",
                String(!matches)
            );

        }
    );

}


function selectFilter(button) {

    const selectedFilter =
        button.dataset.filter;


    filterButtons.forEach(
        function (filterButton) {

            const isSelected =
                filterButton === button;

            filterButton.classList.toggle(
                "active",
                isSelected
            );

            filterButton.setAttribute(
                "aria-pressed",
                String(isSelected)
            );

        }
    );


    updateProjects(
        selectedFilter
    );

}


filterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {
                selectFilter(button);
            }
        );

    }
);


/* =========================================================
   KEYBOARD SUPPORT FOR FILTERS
   ========================================================= */

function moveFilterFocus(
    currentIndex,
    direction
) {
    let newIndex =
        currentIndex + direction;


    if (newIndex < 0) {
        newIndex =
            filterButtons.length - 1;
    }


    if (
        newIndex >=
        filterButtons.length
    ) {
        newIndex = 0;
    }


    const nextButton =
        filterButtons[newIndex];

    nextButton.focus();
    selectFilter(nextButton);
}


filterButtons.forEach(
    function (button, index) {

        button.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "ArrowRight" ||
                    event.key === "ArrowDown"
                ) {
                    event.preventDefault();

                    moveFilterFocus(
                        index,
                        1
                    );
                }


                if (
                    event.key === "ArrowLeft" ||
                    event.key === "ArrowUp"
                ) {
                    event.preventDefault();

                    moveFilterFocus(
                        index,
                        -1
                    );
                }


                if (event.key === "Home") {
                    event.preventDefault();

                    filterButtons[0].focus();

                    selectFilter(
                        filterButtons[0]
                    );
                }


                if (event.key === "End") {
                    event.preventDefault();

                    const lastButton =
                        filterButtons[
                            filterButtons.length - 1
                        ];

                    lastButton.focus();

                    selectFilter(
                        lastButton
                    );
                }

            }
        );

    }
);


/* =========================================================
   ACTIVE NAVIGATION SECTION
   ========================================================= */

const portfolioSections =
    navigationLinks
        .map(function (link) {

            const target =
                link.getAttribute("href");

            if (
                !target ||
                !target.startsWith("#")
            ) {
                return null;
            }

            return document.querySelector(
                target
            );

        })
        .filter(Boolean);


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 180;

    let activeSection = null;


    portfolioSections.forEach(
        function (section) {

            if (
                section.offsetTop <=
                scrollPosition
            ) {
                activeSection =
                    section;
            }

        }
    );


    navigationLinks.forEach(
        function (link) {

            const target =
                link.getAttribute("href");

            const isCurrent =
                activeSection &&
                target ===
                    `#${activeSection.id}`;


            if (isCurrent) {

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            } else {

                link.removeAttribute(
                    "aria-current"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


/* =========================================================
   EXTERNAL LINK SAFETY
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
   INITIALIZATION
   ========================================================= */

function initializePortfolio() {

    /* Start with all projects visible */

    updateProjects("all");


    /* Ensure filter button states are correct */

    filterButtons.forEach(
        function (button) {

            const isAllFilter =
                button.dataset.filter ===
                "all";

            button.classList.toggle(
                "active",
                isAllFilter
            );

            button.setAttribute(
                "aria-pressed",
                String(isAllFilter)
            );

        }
    );


    /* Establish initial navigation state */

    updateActiveNavigation();

}


initializePortfolio();
