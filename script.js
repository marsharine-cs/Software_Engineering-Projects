"use strict";

/* =========================================================
   MARSHARINE A. SIMPSON
   PROFESSIONAL TECHNOLOGY PORTFOLIO — FINAL V2
   PREMIUM INTERACTIONS
   ========================================================= */


/* =========================================================
   GLOBAL PREFERENCES
   ========================================================= */

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


/* =========================================================
   ENABLE MOTION STYLES
   ========================================================= */

document.documentElement.classList.add(
    "motion-ready"
);


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

const menuButton =
    document.getElementById(
        "menu-button"
    );

const navigation =
    document.getElementById(
        "main-navigation"
    );

const navigationLinks =
    document.querySelectorAll(
        "#main-navigation a"
    );


function openNavigation() {

    if (!navigation || !menuButton) {
        return;
    }

    navigation.classList.add(
        "open"
    );

    menuButton.classList.add(
        "active"
    );

    menuButton.setAttribute(
        "aria-expanded",
        "true"
    );

    menuButton.setAttribute(
        "aria-label",
        "Close navigation menu"
    );

    document.body.classList.add(
        "menu-open"
    );

}


function closeNavigation() {

    if (!navigation || !menuButton) {
        return;
    }

    navigation.classList.remove(
        "open"
    );

    menuButton.classList.remove(
        "active"
    );

    menuButton.setAttribute(
        "aria-expanded",
        "false"
    );

    menuButton.setAttribute(
        "aria-label",
        "Open navigation menu"
    );

    document.body.classList.remove(
        "menu-open"
    );

}


function toggleNavigation() {

    if (!navigation) {
        return;
    }

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


if (menuButton && navigation) {

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
                window.innerWidth >
                860
            ) {

                closeNavigation();

            }

        }
    );

}


/* =========================================================
   Q&A ACCORDION
   ========================================================= */

const questionItems =
    document.querySelectorAll(
        ".question-item"
    );


function setQuestionHeight(
    item,
    isOpen
) {

    const answer =
        item.querySelector(
            ".question-answer"
        );

    if (!answer) {
        return;
    }


    if (isOpen) {

        answer.style.maxHeight =
            `${answer.scrollHeight}px`;

    } else {

        answer.style.maxHeight =
            "0px";

    }

}


questionItems.forEach(
    function (item, index) {

        const button =
            item.querySelector(
                ".question-button"
            );

        const answer =
            item.querySelector(
                ".question-answer"
            );


        if (!button || !answer) {
            return;
        }


        const buttonId =
            `question-button-${index + 1}`;

        const answerId =
            `question-answer-${index + 1}`;


        button.id =
            buttonId;

        button.setAttribute(
            "aria-controls",
            answerId
        );


        answer.id =
            answerId;

        answer.setAttribute(
            "role",
            "region"
        );

        answer.setAttribute(
            "aria-labelledby",
            buttonId
        );


        function closeQuestion() {

            item.classList.remove(
                "open"
            );

            button.setAttribute(
                "aria-expanded",
                "false"
            );

            setQuestionHeight(
                item,
                false
            );

        }


        function openQuestion() {

            questionItems.forEach(
                function (otherItem) {

                    if (
                        otherItem === item
                    ) {
                        return;
                    }


                    const otherButton =
                        otherItem.querySelector(
                            ".question-button"
                        );


                    otherItem.classList.remove(
                        "open"
                    );


                    if (otherButton) {

                        otherButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }


                    setQuestionHeight(
                        otherItem,
                        false
                    );

                }
            );


            item.classList.add(
                "open"
            );

            button.setAttribute(
                "aria-expanded",
                "true"
            );

            setQuestionHeight(
                item,
                true
            );

        }


        button.addEventListener(
            "click",
            function () {

                const isOpen =
                    item.classList.contains(
                        "open"
                    );


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
   KEEP OPEN Q&A HEIGHT CORRECT AFTER RESIZE
   ========================================================= */

window.addEventListener(
    "resize",
    function () {

        questionItems.forEach(
            function (item) {

                if (
                    item.classList.contains(
                        "open"
                    )
                ) {

                    setQuestionHeight(
                        item,
                        true
                    );

                }

            }
        );

    }
);


/* =========================================================
   ACTIVE NAVIGATION SECTION
   ========================================================= */

const sectionNavigationLinks =
    Array.from(
        navigationLinks
    ).filter(
        function (link) {

            const href =
                link.getAttribute(
                    "href"
                );

            return (
                href &&
                href.startsWith("#")
            );

        }
    );


const navigationSections =
    sectionNavigationLinks
        .map(
            function (link) {

                return document.querySelector(
                    link.getAttribute(
                        "href"
                    )
                );

            }
        )
        .filter(Boolean);


function updateActiveNavigation() {

    if (
        navigationSections.length === 0
    ) {
        return;
    }


    const scrollPosition =
        window.scrollY + 180;

    let activeSection =
        null;


    navigationSections.forEach(
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
                    link.getAttribute(
                        "href"
                    ) ===
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
                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth",

                    block:
                        "start"
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
   PROJECT CAROUSEL
   ========================================================= */

function initializeProjectCarousel() {

    const workSection =
        document.querySelector(
            ".work-section"
        );


    if (!workSection) {
        return;
    }


    const featuredProject =
        workSection.querySelector(
            ":scope > .featured-project"
        );


    const projectGrid =
        workSection.querySelector(
            ":scope > .project-grid"
        );


    const secondaryProjects =
        projectGrid
            ? Array.from(
                projectGrid.querySelectorAll(
                    ":scope > .project-card"
                )
            )
            : [];


    const slides =
        [
            featuredProject,
            ...secondaryProjects
        ].filter(Boolean);


    if (
        slides.length < 2
    ) {
        return;
    }


    /* =====================================================
       CREATE CAROUSEL SHELL
       ===================================================== */

    const carouselShell =
        document.createElement(
            "div"
        );

    carouselShell.className =
        "project-carousel-shell";


    /* =====================================================
       TOOLBAR
       ===================================================== */

    const toolbar =
        document.createElement(
            "div"
        );

    toolbar.className =
        "project-carousel-toolbar";


    const status =
        document.createElement(
            "div"
        );

    status.className =
        "project-carousel-status";


    const counter =
        document.createElement(
            "span"
        );

    counter.className =
        "project-carousel-counter";

    counter.setAttribute(
        "aria-live",
        "polite"
    );


    const hint =
        document.createElement(
            "span"
        );

    hint.className =
        "project-carousel-hint";

    hint.textContent =
        "Swipe, drag, or use arrow keys";


    status.append(
        counter,
        hint
    );


    /* =====================================================
       PREVIOUS / NEXT CONTROLS
       ===================================================== */

    const actions =
        document.createElement(
            "div"
        );

    actions.className =
        "project-carousel-actions";


    const previousButton =
        document.createElement(
            "button"
        );

    previousButton.type =
        "button";

    previousButton.className =
        "project-carousel-arrow project-carousel-previous";

    previousButton.setAttribute(
        "aria-label",
        "Show previous project"
    );

    previousButton.innerHTML =
        '<span aria-hidden="true">←</span>';


    const nextButton =
        document.createElement(
            "button"
        );

    nextButton.type =
        "button";

    nextButton.className =
        "project-carousel-arrow project-carousel-next";

    nextButton.setAttribute(
        "aria-label",
        "Show next project"
    );

    nextButton.innerHTML =
        '<span aria-hidden="true">→</span>';


    actions.append(
        previousButton,
        nextButton
    );


    toolbar.append(
        status,
        actions
    );


    /* =====================================================
       VIEWPORT + TRACK
       ===================================================== */

    const viewport =
        document.createElement(
            "div"
        );

    viewport.className =
        "project-carousel-viewport";

    viewport.tabIndex =
        0;

    viewport.setAttribute(
        "role",
        "region"
    );

    viewport.setAttribute(
        "aria-roledescription",
        "carousel"
    );

    viewport.setAttribute(
        "aria-label",
        "Selected portfolio projects"
    );


    const track =
        document.createElement(
            "div"
        );

    track.className =
        "project-carousel-track";


    viewport.appendChild(
        track
    );


    /* =====================================================
       MOVE PROJECTS INTO CAROUSEL
       ===================================================== */

    slides.forEach(
        function (slide, index) {

            slide.classList.add(
                "project-slide"
            );

            slide.setAttribute(
                "role",
                "group"
            );

            slide.setAttribute(
                "aria-roledescription",
                "slide"
            );

            slide.setAttribute(
                "aria-label",
                `Project ${index + 1} of ${slides.length}`
            );

            track.appendChild(
                slide
            );

        }
    );


    if (projectGrid) {

        projectGrid.remove();

    }


    /* =====================================================
       DOT CONTROLS
       ===================================================== */

    const dotsContainer =
        document.createElement(
            "div"
        );

    dotsContainer.className =
        "project-carousel-dots";

    dotsContainer.setAttribute(
        "aria-label",
        "Choose project"
    );


    const dotButtons =
        slides.map(
            function (slide, index) {

                const dot =
                    document.createElement(
                        "button"
                    );

                dot.type =
                    "button";

                dot.className =
                    "project-carousel-dot";

                dot.setAttribute(
                    "aria-label",
                    `Show project ${index + 1}`
                );

                dotsContainer.appendChild(
                    dot
                );

                return dot;

            }
        );


    /* =====================================================
       INSERT CAROUSEL INTO SELECTED WORK
       ===================================================== */

    carouselShell.append(
        toolbar,
        viewport,
        dotsContainer
    );


    const workHeading =
        workSection.querySelector(
            ".section-heading"
        );


    if (
        workHeading &&
        workHeading.nextSibling
    ) {

        workSection.insertBefore(
            carouselShell,
            workHeading.nextSibling
        );

    } else {

        workSection.appendChild(
            carouselShell
        );

    }


    /* =====================================================
       ACTIVE SLIDE STATE
       ===================================================== */

    let activeIndex =
        0;

    let scrollFrame =
        null;


    function formatNumber(
        number
    ) {

        return String(
            number
        ).padStart(
            2,
            "0"
        );

    }


    function updateControls() {

        counter.textContent =
            `${formatNumber(activeIndex + 1)} / ${formatNumber(slides.length)}`;


        previousButton.disabled =
            activeIndex === 0;


        nextButton.disabled =
            activeIndex ===
            slides.length - 1;


        dotButtons.forEach(
            function (dot, index) {

                const isActive =
                    index ===
                    activeIndex;


                dot.classList.toggle(
                    "active",
                    isActive
                );


                if (isActive) {

                    dot.setAttribute(
                        "aria-current",
                        "true"
                    );

                } else {

                    dot.removeAttribute(
                        "aria-current"
                    );

                }

            }
        );

    }


    /* =====================================================
       GO TO SLIDE
       ===================================================== */

    function goToSlide(
        index
    ) {

        const safeIndex =
            Math.max(
                0,
                Math.min(
                    index,
                    slides.length - 1
                )
            );


        const targetSlide =
            slides[safeIndex];


        if (!targetSlide) {
            return;
        }


        activeIndex =
            safeIndex;


        const targetPosition =
            targetSlide.offsetLeft -
            track.offsetLeft;


        viewport.scrollTo({
            left:
                targetPosition,

            behavior:
                prefersReducedMotion
                    ? "auto"
                    : "smooth"
        });


        updateControls();

    }


    /* =====================================================
       BUTTON NAVIGATION
       ===================================================== */

    previousButton.addEventListener(
        "click",
        function () {

            goToSlide(
                activeIndex - 1
            );

        }
    );


    nextButton.addEventListener(
        "click",
        function () {

            goToSlide(
                activeIndex + 1
            );

        }
    );


    /* =====================================================
       DOT NAVIGATION
       ===================================================== */

    dotButtons.forEach(
        function (dot, index) {

            dot.addEventListener(
                "click",
                function () {

                    goToSlide(
                        index
                    );

                }
            );

        }
    );


    /* =====================================================
       KEYBOARD NAVIGATION
       ===================================================== */

    viewport.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "ArrowRight"
            ) {

                event.preventDefault();

                goToSlide(
                    activeIndex + 1
                );

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                event.preventDefault();

                goToSlide(
                    activeIndex - 1
                );

            }


            if (
                event.key ===
                "Home"
            ) {

                event.preventDefault();

                goToSlide(
                    0
                );

            }


            if (
                event.key ===
                "End"
            ) {

                event.preventDefault();

                goToSlide(
                    slides.length - 1
                );

            }

        }
    );


    /* =====================================================
       DETECT SLIDE DURING TOUCH / SWIPE / SCROLL
       ===================================================== */

    function syncActiveSlideFromScroll() {

        const scrollPosition =
            viewport.scrollLeft;


        let nearestIndex =
            0;

        let nearestDistance =
            Infinity;


        slides.forEach(
            function (slide, index) {

                const slidePosition =
                    slide.offsetLeft -
                    track.offsetLeft;


                const distance =
                    Math.abs(
                        slidePosition -
                        scrollPosition
                    );


                if (
                    distance <
                    nearestDistance
                ) {

                    nearestDistance =
                        distance;

                    nearestIndex =
                        index;

                }

            }
        );


        if (
            nearestIndex !==
            activeIndex
        ) {

            activeIndex =
                nearestIndex;

            updateControls();

        }

    }


    viewport.addEventListener(
        "scroll",
        function () {

            if (scrollFrame) {

                cancelAnimationFrame(
                    scrollFrame
                );

            }


            scrollFrame =
                requestAnimationFrame(
                    syncActiveSlideFromScroll
                );

        },
        {
            passive: true
        }
    );


    /* =====================================================
       REPOSITION CURRENT PROJECT AFTER RESIZE
       ===================================================== */

    let resizeTimer =
        null;


    window.addEventListener(
        "resize",
        function () {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    function () {

                        goToSlide(
                            activeIndex
                        );

                    },
                    120
                );

        }
    );


    updateControls();

}


/* =========================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================= */

function initializeRevealAnimations() {

    const revealTargets = [

        ...document.querySelectorAll(
            ".strength-strip"
        ),

        ...document.querySelectorAll(
            ".work-section .section-heading"
        ),

        ...document.querySelectorAll(
            ".project-carousel-shell"
        ),

        ...document.querySelectorAll(
            ".profile-heading"
        ),

        ...document.querySelectorAll(
            ".profile-content"
        ),

        ...document.querySelectorAll(
            ".experience-section .section-heading"
        ),

        ...document.querySelectorAll(
            ".experience-item"
        ),

        ...document.querySelectorAll(
            ".skills-heading"
        ),

        ...document.querySelectorAll(
            ".primary-skills"
        ),

        ...document.querySelectorAll(
            ".secondary-skills"
        ),

        ...document.querySelectorAll(
            ".currently-exploring"
        ),

        ...document.querySelectorAll(
            ".questions-introduction"
        ),

        ...document.querySelectorAll(
            ".questions-list"
        ),

        ...document.querySelectorAll(
            ".credentials-heading"
        ),

        ...document.querySelectorAll(
            ".credential-list article"
        ),

        ...document.querySelectorAll(
            ".contact-section > div"
        )

    ];


    revealTargets.forEach(
        function (target, index) {

            target.classList.add(
                "reveal-target"
            );


            if (
                index % 4 === 1
            ) {

                target.classList.add(
                    "reveal-left"
                );

            }


            if (
                index % 4 === 3
            ) {

                target.classList.add(
                    "reveal-right"
                );

            }

        }
    );


    if (prefersReducedMotion) {

        revealTargets.forEach(
            function (target) {

                target.classList.add(
                    "is-visible"
                );

            }
        );

        return;

    }


    if (
        !(
            "IntersectionObserver" in
            window
        )
    ) {

        revealTargets.forEach(
            function (target) {

                target.classList.add(
                    "is-visible"
                );

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold:
                    0.12,

                rootMargin:
                    "0px 0px -70px 0px"
            }
        );


    revealTargets.forEach(
        function (target) {

            observer.observe(
                target
            );

        }
    );

}


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
                    link.getAttribute(
                        "rel"
                    ) ||
                    ""
                )
                    .split(/\s+/)
                    .filter(Boolean)
            );


        relValues.add(
            "noopener"
        );

        relValues.add(
            "noreferrer"
        );


        link.setAttribute(
            "rel",
            Array.from(
                relValues
            ).join(" ")
        );

    }
);


/* =========================================================
   INITIAL STATE
   ========================================================= */

function initializePortfolio() {

    questionItems.forEach(
        function (item) {

            const button =
                item.querySelector(
                    ".question-button"
                );


            item.classList.remove(
                "open"
            );


            setQuestionHeight(
                item,
                false
            );


            if (button) {

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    initializeProjectCarousel();

    initializeRevealAnimations();

    updateActiveNavigation();


    requestAnimationFrame(
        function () {

            document.documentElement.classList.add(
                "page-ready"
            );

        }
    );

}


initializePortfolio();
