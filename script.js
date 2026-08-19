"use strict";

/* =========================================================
   AI DEVELOPMENT FIELD GUIDE
   Interactive Technical Documentation
   Marsharine A. Simpson
   ========================================================= */


/* =========================================================
   DOM REFERENCES
   ========================================================= */

const root = document.documentElement;

const themeToggle =
    document.getElementById("theme-toggle");

const themeLabel =
    document.querySelector(".theme-label");

const mobileMenuButton =
    document.getElementById("mobile-menu-button");

const sidebar =
    document.getElementById("docs-sidebar");

const sidebarOverlay =
    document.getElementById("sidebar-overlay");

const readingProgressBar =
    document.getElementById("reading-progress-bar");

const documentationSearch =
    document.getElementById("documentation-search");

const searchResults =
    document.getElementById("search-results");

const glossarySearch =
    document.getElementById("glossary-search");

const glossaryCount =
    document.getElementById("glossary-count");

const copyNotification =
    document.getElementById("copy-notification");

const navigationLinks =
    Array.from(
        document.querySelectorAll(".docs-nav-link")
    );

const documentationSections =
    Array.from(
        document.querySelectorAll(
            ".documentation-section[id]"
        )
    );

const conceptCards =
    Array.from(
        document.querySelectorAll(".concept-card")
    );

const copyButtons =
    Array.from(
        document.querySelectorAll(".copy-button")
    );

const glossaryItems =
    Array.from(
        document.querySelectorAll(".glossary-item")
    );

const internalLinks =
    Array.from(
        document.querySelectorAll('a[href^="#"]')
    );


/* =========================================================
   THEME
   ========================================================= */

const THEME_STORAGE_KEY =
    "ai-field-guide-theme";


function getPreferredTheme() {

    const savedTheme =
        localStorage.getItem(
            THEME_STORAGE_KEY
        );


    if (
        savedTheme === "light" ||
        savedTheme === "dark"
    ) {
        return savedTheme;
    }


    if (
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
    ) {
        return "dark";
    }


    return "light";
}


function applyTheme(theme) {

    root.setAttribute(
        "data-theme",
        theme
    );


    if (!themeToggle) {
        return;
    }


    const nextTheme =
        theme === "dark"
            ? "light"
            : "dark";


    themeToggle.setAttribute(
        "aria-label",
        `Switch to ${nextTheme} theme`
    );


    if (themeLabel) {

        themeLabel.textContent =
            theme === "dark"
                ? "Dark"
                : "Light";

    }

}


function toggleTheme() {

    const currentTheme =
        root.getAttribute(
            "data-theme"
        ) || "light";


    const nextTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";


    applyTheme(nextTheme);


    localStorage.setItem(
        THEME_STORAGE_KEY,
        nextTheme
    );

}


applyTheme(
    getPreferredTheme()
);


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        toggleTheme
    );

}


/* =========================================================
   MOBILE SIDEBAR
   ========================================================= */

function openSidebar() {

    if (!sidebar) {
        return;
    }


    sidebar.classList.add("open");

    document.body.classList.add(
        "sidebar-open"
    );


    if (sidebarOverlay) {
        sidebarOverlay.classList.add(
            "active"
        );
    }


    if (mobileMenuButton) {

        mobileMenuButton.classList.add(
            "active"
        );

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileMenuButton.setAttribute(
            "aria-label",
            "Close documentation navigation"
        );

    }

}


function closeSidebar() {

    if (!sidebar) {
        return;
    }


    sidebar.classList.remove("open");

    document.body.classList.remove(
        "sidebar-open"
    );


    if (sidebarOverlay) {

        sidebarOverlay.classList.remove(
            "active"
        );

    }


    if (mobileMenuButton) {

        mobileMenuButton.classList.remove(
            "active"
        );

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenuButton.setAttribute(
            "aria-label",
            "Open documentation navigation"
        );

    }

}


function toggleSidebar() {

    if (!sidebar) {
        return;
    }


    const isOpen =
        sidebar.classList.contains(
            "open"
        );


    if (isOpen) {
        closeSidebar();
    } else {
        openSidebar();
    }

}


if (mobileMenuButton) {

    mobileMenuButton.addEventListener(
        "click",
        toggleSidebar
    );

}


if (sidebarOverlay) {

    sidebarOverlay.addEventListener(
        "click",
        closeSidebar
    );

}


window.addEventListener(
    "resize",
    function () {

        if (window.innerWidth > 900) {
            closeSidebar();
        }

    }
);


/* =========================================================
   READING PROGRESS
   ========================================================= */

function updateReadingProgress() {

    if (!readingProgressBar) {
        return;
    }


    const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop;


    const scrollableHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


    const progress =
        scrollableHeight > 0
            ? (
                scrollTop /
                scrollableHeight
            ) * 100
            : 0;


    readingProgressBar.style.width =
        `${Math.min(
            Math.max(progress, 0),
            100
        )}%`;

}


window.addEventListener(
    "scroll",
    updateReadingProgress,
    {
        passive: true
    }
);


window.addEventListener(
    "resize",
    updateReadingProgress
);


/* =========================================================
   ACTIVE DOCUMENTATION NAVIGATION
   ========================================================= */

function updateActiveNavigation() {

    if (
        documentationSections.length === 0
    ) {
        return;
    }


    const offset =
        window.scrollY + 180;


    let activeSection =
        documentationSections[0];


    documentationSections.forEach(
        function (section) {

            if (
                section.offsetTop <= offset
            ) {
                activeSection = section;
            }

        }
    );


    navigationLinks.forEach(
        function (link) {

            const isActive =
                link.getAttribute("href") ===
                `#${activeSection.id}`;


            link.classList.toggle(
                "active",
                isActive
            );


            if (isActive) {

                link.setAttribute(
                    "aria-current",
                    "location"
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
   INTERNAL NAVIGATION
   ========================================================= */

internalLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


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


                closeSidebar();

            }
        );

    }
);


/* =========================================================
   CONCEPT ACCORDION
   ========================================================= */

conceptCards.forEach(
    function (card) {

        const toggle =
            card.querySelector(
                ".concept-toggle"
            );


        const content =
            card.querySelector(
                ".concept-content"
            );


        if (
            !toggle ||
            !content
        ) {
            return;
        }


        const startsOpen =
            toggle.getAttribute(
                "aria-expanded"
            ) === "true";


        card.classList.toggle(
            "open",
            startsOpen
        );


        toggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    card.classList.contains(
                        "open"
                    );


                card.classList.toggle(
                    "open",
                    !isOpen
                );


                toggle.setAttribute(
                    "aria-expanded",
                    String(!isOpen)
                );

            }
        );

    }
);


/* =========================================================
   COPY TO CLIPBOARD
   ========================================================= */

let copyNotificationTimer = null;


function showCopyNotification(
    message = "Copied to clipboard"
) {

    if (!copyNotification) {
        return;
    }


    copyNotification.textContent =
        message;


    copyNotification.classList.add(
        "show"
    );


    window.clearTimeout(
        copyNotificationTimer
    );


    copyNotificationTimer =
        window.setTimeout(
            function () {

                copyNotification.classList.remove(
                    "show"
                );

            },
            1800
        );

}


async function copyText(text) {

    if (
        navigator.clipboard &&
        window.isSecureContext
    ) {

        await navigator.clipboard.writeText(
            text
        );

        return;
    }


    const temporaryTextArea =
        document.createElement(
            "textarea"
        );


    temporaryTextArea.value =
        text;


    temporaryTextArea.setAttribute(
        "readonly",
        ""
    );


    temporaryTextArea.style.position =
        "fixed";

    temporaryTextArea.style.opacity =
        "0";


    document.body.appendChild(
        temporaryTextArea
    );


    temporaryTextArea.select();


    document.execCommand(
        "copy"
    );


    temporaryTextArea.remove();

}


copyButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            async function () {

                const targetId =
                    button.dataset.copyTarget;


                const target =
                    document.getElementById(
                        targetId
                    );


                if (!target) {
                    return;
                }


                const text =
                    target.textContent.trim();


                const originalText =
                    button.textContent;


                try {

                    await copyText(text);


                    button.textContent =
                        "Copied";


                    showCopyNotification();


                    window.setTimeout(
                        function () {

                            button.textContent =
                                originalText;

                        },
                        1600
                    );

                } catch (error) {

                    console.error(
                        "Unable to copy text:",
                        error
                    );


                    showCopyNotification(
                        "Copy unavailable"
                    );

                }

            }
        );

    }
);


/* =========================================================
   DOCUMENTATION SEARCH INDEX
   ========================================================= */

const searchIndex =
    documentationSections.map(
        function (section) {

            const title =
                section.dataset.searchTitle ||
                section.querySelector("h2")
                    ?.textContent
                    ?.trim() ||
                section.id;


            const keywords =
                section.dataset.searchKeywords ||
                "";


            const text =
                section.textContent
                    .replace(/\s+/g, " ")
                    .trim();


            return {
                id: section.id,
                title,
                keywords,
                text
            };

        }
    );


function clearSearchResults() {

    if (!searchResults) {
        return;
    }


    searchResults.innerHTML = "";

    searchResults.classList.remove(
        "active"
    );

}


function renderSearchResults(query) {

    if (!searchResults) {
        return;
    }


    const normalizedQuery =
        query
            .trim()
            .toLowerCase();


    if (
        normalizedQuery.length < 2
    ) {

        clearSearchResults();

        return;
    }


    const matches =
        searchIndex
            .filter(
                function (item) {

                    const searchable =
                        (
                            item.title +
                            " " +
                            item.keywords +
                            " " +
                            item.text
                        ).toLowerCase();


                    return searchable.includes(
                        normalizedQuery
                    );

                }
            )
            .slice(0, 7);


    searchResults.innerHTML = "";


    if (matches.length === 0) {

        const emptyMessage =
            document.createElement(
                "p"
            );


        emptyMessage.className =
            "search-empty";


        emptyMessage.textContent =
            "No matching sections found.";


        searchResults.appendChild(
            emptyMessage
        );

        searchResults.classList.add(
            "active"
        );

        return;
    }


    matches.forEach(
        function (match) {

            const link =
                document.createElement(
                    "a"
                );


            link.className =
                "search-result-link";


            link.href =
                `#${match.id}`;


            link.textContent =
                match.title;


            link.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    const target =
                        document.getElementById(
                            match.id
                        );


                    if (!target) {
                        return;
                    }


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });


                    history.replaceState(
                        null,
                        "",
                        `#${match.id}`
                    );


                    documentationSearch.value =
                        "";


                    clearSearchResults();

                    closeSidebar();

                }
            );


            searchResults.appendChild(
                link
            );

        }
    );


    searchResults.classList.add(
        "active"
    );

}


if (documentationSearch) {

    documentationSearch.addEventListener(
        "input",
        function () {

            renderSearchResults(
                documentationSearch.value
            );

        }
    );


    documentationSearch.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                documentationSearch.value =
                    "";

                clearSearchResults();

                documentationSearch.blur();

            }

        }
    );

}


/* =========================================================
   "/" SEARCH SHORTCUT
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        const activeElement =
            document.activeElement;


        const isTyping =
            activeElement &&
            (
                activeElement.tagName === "INPUT" ||
                activeElement.tagName === "TEXTAREA" ||
                activeElement.isContentEditable
            );


        if (
            event.key === "/" &&
            !isTyping &&
            documentationSearch
        ) {

            event.preventDefault();


            if (
                window.innerWidth <= 900 &&
                sidebar &&
                !sidebar.classList.contains(
                    "open"
                )
            ) {
                openSidebar();
            }


            documentationSearch.focus();

        }


        if (event.key === "Escape") {

            clearSearchResults();


            if (
                sidebar &&
                sidebar.classList.contains(
                    "open"
                )
            ) {

                closeSidebar();


                if (mobileMenuButton) {
                    mobileMenuButton.focus();
                }

            }

        }

    }
);


/* =========================================================
   CLOSE SEARCH WHEN CLICKING ELSEWHERE
   ========================================================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            !searchResults ||
            !documentationSearch
        ) {
            return;
        }


        const searchContainer =
            documentationSearch.closest(
                ".documentation-search"
            );


        if (
            searchContainer &&
            !searchContainer.contains(
                event.target
            )
        ) {

            clearSearchResults();

        }

    }
);


/* =========================================================
   GLOSSARY FILTER
   ========================================================= */

function filterGlossary(query) {

    const normalizedQuery =
        query
            .trim()
            .toLowerCase();


    let visibleCount = 0;


    glossaryItems.forEach(
        function (item) {

            const term =
                item.querySelector("dt")
                    ?.textContent
                    ?.toLowerCase() ||
                "";


            const definition =
                item.querySelector("dd")
                    ?.textContent
                    ?.toLowerCase() ||
                "";


            const matches =
                !normalizedQuery ||
                term.includes(
                    normalizedQuery
                ) ||
                definition.includes(
                    normalizedQuery
                );


            item.classList.toggle(
                "hidden",
                !matches
            );


            if (matches) {
                visibleCount += 1;
            }

        }
    );


    if (glossaryCount) {

        glossaryCount.textContent =
            `${visibleCount} ${
                visibleCount === 1
                    ? "term"
                    : "terms"
            }`;

    }

}


if (glossarySearch) {

    glossarySearch.addEventListener(
        "input",
        function () {

            filterGlossary(
                glossarySearch.value
            );

        }
    );


    glossarySearch.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                glossarySearch.value =
                    "";

                filterGlossary("");

                glossarySearch.blur();

            }

        }
    );

}


/* =========================================================
   EXTERNAL LINK SAFETY
   ========================================================= */

const externalLinks =
    document.querySelectorAll(
        'a[target="_blank"]'
    );


externalLinks.forEach(
    function (link) {

        const currentRel =
            new Set(
                (
                    link.getAttribute(
                        "rel"
                    ) || ""
                )
                    .split(/\s+/)
                    .filter(Boolean)
            );


        currentRel.add("noopener");
        currentRel.add("noreferrer");


        link.setAttribute(
            "rel",
            Array.from(
                currentRel
            ).join(" ")
        );

    }
);


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializeFieldGuide() {

    updateReadingProgress();

    updateActiveNavigation();

    filterGlossary("");


    if (
        documentationSearch
    ) {

        documentationSearch.value =
            "";

    }


    clearSearchResults();

}


initializeFieldGuide();
