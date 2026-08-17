"use strict";

/* =========================================================
   LUMA ONE — INTERACTIVE PRODUCT LANDING PAGE
   Marsharine A. Simpson
   ========================================================= */


/* -------------------------
   APPLICATION STATE
------------------------- */

const state = {
    finish: "Sand",
    theme: "sand",
    quantity: 1,
    cartCount: 0
};


/* -------------------------
   DOM ELEMENTS
------------------------- */

const menuButton =
    document.getElementById("menu-button");

const navigation =
    document.getElementById("main-navigation");

const navigationLinks =
    document.querySelectorAll("#main-navigation a");

const finishButtons =
    document.querySelectorAll(".finish-button");

const selectedFinish =
    document.getElementById("selected-finish");

const productVisual =
    document.getElementById("product-visual");

const decreaseQuantityButton =
    document.getElementById("decrease-quantity");

const increaseQuantityButton =
    document.getElementById("increase-quantity");

const quantityDisplay =
    document.getElementById("quantity");

const addToCartButton =
    document.getElementById("add-to-cart");

const cartButton =
    document.getElementById("cart-button");

const cartCountDisplay =
    document.getElementById("cart-count");

const cartMessage =
    document.getElementById("cart-message");

const faqQuestions =
    document.querySelectorAll(".faq-question");


/* -------------------------
   MOBILE NAVIGATION
------------------------- */

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


/* -------------------------
   PRODUCT FINISH
------------------------- */

function selectFinish(button) {
    const finish =
        button.dataset.finish;

    const theme =
        button.dataset.theme;

    state.finish = finish;
    state.theme = theme;

    selectedFinish.textContent =
        finish;

    productVisual.dataset.theme =
        theme;


    finishButtons.forEach(
        function (finishButton) {
            const isSelected =
                finishButton === button;

            finishButton.classList.toggle(
                "active",
                isSelected
            );

            finishButton.setAttribute(
                "aria-pressed",
                String(isSelected)
            );
        }
    );


    cartMessage.textContent =
        `${finish} finish selected.`;
}


finishButtons.forEach(function (button) {
    button.addEventListener(
        "click",
        function () {
            selectFinish(button);
        }
    );
});


/* -------------------------
   QUANTITY
------------------------- */

function updateQuantityDisplay() {
    quantityDisplay.textContent =
        state.quantity;

    decreaseQuantityButton.disabled =
        state.quantity <= 1;

    decreaseQuantityButton.setAttribute(
        "aria-disabled",
        String(state.quantity <= 1)
    );
}


function increaseQuantity() {
    if (state.quantity < 10) {
        state.quantity += 1;
        updateQuantityDisplay();
    } else {
        cartMessage.textContent =
            "Maximum demo quantity is 10.";
    }
}


function decreaseQuantity() {
    if (state.quantity > 1) {
        state.quantity -= 1;
        updateQuantityDisplay();
    }
}


increaseQuantityButton.addEventListener(
    "click",
    increaseQuantity
);


decreaseQuantityButton.addEventListener(
    "click",
    decreaseQuantity
);


/* -------------------------
   DEMO CART
------------------------- */

function updateCartDisplay() {
    cartCountDisplay.textContent =
        state.cartCount;

    cartButton.setAttribute(
        "aria-label",
        `Demo cart with ${state.cartCount} ${
            state.cartCount === 1
                ? "item"
                : "items"
        }`
    );
}


function addToDemoCart() {
    state.cartCount +=
        state.quantity;

    updateCartDisplay();


    const itemWord =
        state.quantity === 1
            ? "light"
            : "lights";


    cartMessage.textContent =
        `${state.quantity} Luma One ${itemWord} in ${state.finish} added to the demo cart.`;


    state.quantity = 1;

    updateQuantityDisplay();
}


addToCartButton.addEventListener(
    "click",
    addToDemoCart
);


cartButton.addEventListener(
    "click",
    function () {
        if (state.cartCount === 0) {
            cartMessage.textContent =
                "Your demo cart is currently empty.";
        } else {
            cartMessage.textContent =
                `Your demo cart contains ${state.cartCount} ${
                    state.cartCount === 1
                        ? "item"
                        : "items"
                }. No checkout is processed in this portfolio project.`;
        }


        cartMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
);


/* -------------------------
   FAQ ACCORDION
------------------------- */

function closeFaqItem(question) {
    const faqItem =
        question.closest(".faq-item");

    faqItem.classList.remove("open");

    question.setAttribute(
        "aria-expanded",
        "false"
    );
}


function openFaqItem(question) {
    const faqItem =
        question.closest(".faq-item");

    faqItem.classList.add("open");

    question.setAttribute(
        "aria-expanded",
        "true"
    );
}


faqQuestions.forEach(function (question) {

    question.addEventListener(
        "click",
        function () {

            const isOpen =
                question.getAttribute(
                    "aria-expanded"
                ) === "true";


            faqQuestions.forEach(
                function (otherQuestion) {
                    closeFaqItem(
                        otherQuestion
                    );
                }
            );


            if (!isOpen) {
                openFaqItem(question);
            }
        }
    );

});


/* -------------------------
   RESPONSIVE CLEANUP
------------------------- */

window.addEventListener(
    "resize",
    function () {
        if (window.innerWidth > 760) {
            closeNavigation();
        }
    }
);


/* -------------------------
   INITIALIZE
------------------------- */

updateQuantityDisplay();
updateCartDisplay();
