"use strict";

/* =========================================================
   INTERACTIVE BALANCE SHEET
   Marsharine A. Simpson
   ========================================================= */


/* -------------------------
   SAMPLE FINANCIAL DATA
------------------------- */

const initialFinancialData = {
    2024: {
        cash: 18500,
        receivables: 12400,
        investments: 32000,
        loans: 24000,
        credit: 6500,
        otherLiabilities: 3100
    },

    2025: {
        cash: 22300,
        receivables: 15100,
        investments: 38000,
        loans: 19500,
        credit: 4200,
        otherLiabilities: 2800
    },

    2026: {
        cash: 27800,
        receivables: 18400,
        investments: 45000,
        loans: 14000,
        credit: 2800,
        otherLiabilities: 2100
    }
};


function cloneSampleData() {
    return JSON.parse(
        JSON.stringify(initialFinancialData)
    );
}


let financialData = cloneSampleData();
let currentYear = "2026";


/* -------------------------
   DOM ELEMENTS
------------------------- */

const cashInput =
    document.getElementById("cash");

const receivablesInput =
    document.getElementById("receivables");

const investmentsInput =
    document.getElementById("investments");

const loansInput =
    document.getElementById("loans");

const creditInput =
    document.getElementById("credit");

const otherLiabilitiesInput =
    document.getElementById("other-liabilities");


const summaryAssets =
    document.getElementById("summary-assets");

const summaryLiabilities =
    document.getElementById("summary-liabilities");

const summaryNetWorth =
    document.getElementById("summary-net-worth");

const summaryRatio =
    document.getElementById("summary-ratio");

const netWorthStatus =
    document.getElementById("net-worth-status");


const assetsTotal =
    document.getElementById("assets-total");

const liabilitiesTotal =
    document.getElementById("liabilities-total");


const equationAssets =
    document.getElementById("equation-assets");

const equationLiabilities =
    document.getElementById("equation-liabilities");

const equationNetWorth =
    document.getElementById("equation-net-worth");


const resetButton =
    document.getElementById("reset-btn");

const printButton =
    document.getElementById("print-btn");

const yearButtons =
    document.querySelectorAll(".year-button");

const netWorthCard =
    document.querySelector(".highlight-card");


/* -------------------------
   INPUT COLLECTION
------------------------- */

const financialInputs = [
    cashInput,
    receivablesInput,
    investmentsInput,
    loansInput,
    creditInput,
    otherLiabilitiesInput
];


/* -------------------------
   CURRENCY FORMATTER
------------------------- */

const currencyFormatter =
    new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }
    );


function formatCurrency(value) {
    return currencyFormatter.format(value);
}


/* -------------------------
   SAFE INPUT VALUES
------------------------- */

function getValue(input) {
    const value =
        Number.parseFloat(input.value);

    if (Number.isNaN(value)) {
        return 0;
    }

    return Math.max(0, value);
}


/* -------------------------
   LOAD YEAR
------------------------- */

function loadYear(year) {
    currentYear = year;

    const data =
        financialData[currentYear];

    cashInput.value =
        data.cash;

    receivablesInput.value =
        data.receivables;

    investmentsInput.value =
        data.investments;

    loansInput.value =
        data.loans;

    creditInput.value =
        data.credit;

    otherLiabilitiesInput.value =
        data.otherLiabilities;

    updateYearButtons();
    updateCalculations();
}


/* -------------------------
   YEAR BUTTONS
------------------------- */

function updateYearButtons() {
    yearButtons.forEach(function (button) {
        const isActive =
            button.dataset.year === currentYear;

        button.classList.toggle(
            "active",
            isActive
        );

        button.setAttribute(
            "aria-pressed",
            String(isActive)
        );
    });
}


yearButtons.forEach(function (button) {
    button.addEventListener(
        "click",
        function () {
            loadYear(button.dataset.year);
        }
    );
});


/* -------------------------
   SAVE USER INPUT
------------------------- */

function saveCurrentValues() {
    financialData[currentYear] = {
        cash: getValue(cashInput),

        receivables:
            getValue(receivablesInput),

        investments:
            getValue(investmentsInput),

        loans:
            getValue(loansInput),

        credit:
            getValue(creditInput),

        otherLiabilities:
            getValue(otherLiabilitiesInput)
    };
}


/* -------------------------
   CALCULATIONS
------------------------- */

function calculateFinancialPosition() {
    const data =
        financialData[currentYear];

    const totalAssets =
        data.cash +
        data.receivables +
        data.investments;

    const totalLiabilities =
        data.loans +
        data.credit +
        data.otherLiabilities;

    const netWorth =
        totalAssets -
        totalLiabilities;

    const debtToAssets =
        totalAssets > 0
            ? (
                totalLiabilities /
                totalAssets
              ) * 100
            : null;

    return {
        totalAssets,
        totalLiabilities,
        netWorth,
        debtToAssets
    };
}


/* -------------------------
   UPDATE DASHBOARD
------------------------- */

function updateCalculations() {
    const results =
        calculateFinancialPosition();


    /* Summary cards */

    summaryAssets.textContent =
        formatCurrency(
            results.totalAssets
        );

    summaryLiabilities.textContent =
        formatCurrency(
            results.totalLiabilities
        );

    summaryNetWorth.textContent =
        formatCurrency(
            results.netWorth
        );


    if (results.debtToAssets === null) {
        summaryRatio.textContent = "—";
    } else {
        summaryRatio.textContent =
            `${results.debtToAssets.toFixed(1)}%`;
    }


    /* Panel totals */

    assetsTotal.textContent =
        formatCurrency(
            results.totalAssets
        );

    liabilitiesTotal.textContent =
        formatCurrency(
            results.totalLiabilities
        );


    /* Equation */

    equationAssets.textContent =
        formatCurrency(
            results.totalAssets
        );

    equationLiabilities.textContent =
        formatCurrency(
            results.totalLiabilities
        );

    equationNetWorth.textContent =
        formatCurrency(
            results.netWorth
        );


    /* Financial-position message */

    updateNetWorthStatus(
        results.netWorth
    );
}


/* -------------------------
   NET WORTH STATUS
------------------------- */

function updateNetWorthStatus(netWorth) {
    netWorthCard.classList.remove(
        "negative"
    );


    if (netWorth > 0) {
        netWorthStatus.textContent =
            "Positive financial position";

    } else if (netWorth === 0) {
        netWorthStatus.textContent =
            "Balanced financial position";

    } else {
        netWorthStatus.textContent =
            "Liabilities exceed assets";

        netWorthCard.classList.add(
            "negative"
        );
    }
}


/* -------------------------
   INPUT EVENTS
------------------------- */

financialInputs.forEach(function (input) {

    input.addEventListener(
        "input",
        function () {
            saveCurrentValues();
            updateCalculations();
        }
    );


    /*
       Ensure negative values are corrected
       when the user leaves the field.
    */

    input.addEventListener(
        "change",
        function () {

            const safeValue =
                getValue(input);

            input.value =
                safeValue;

            saveCurrentValues();
            updateCalculations();
        }
    );
});


/* -------------------------
   RESET SAMPLE DATA
------------------------- */

resetButton.addEventListener(
    "click",
    function () {

        financialData =
            cloneSampleData();

        currentYear = "2026";

        loadYear(currentYear);
    }
);


/* -------------------------
   PRINT REPORT
------------------------- */

printButton.addEventListener(
    "click",
    function () {
        window.print();
    }
);


/* -------------------------
   INITIALIZE APPLICATION
------------------------- */

loadYear(currentYear);
