/* =========================================================
   PERCENTAGE CALCULATOR
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       HELPERS
    ===================================================== */

    function formatNumber(value) {

        if (!Number.isFinite(value)) {
            return "0.00";
        }

        return Number(value)
            .toFixed(2)
            .replace(/\.00$/, "")
            .replace(/(\.\d)0$/, "$1");

    }


    function formatPercent(value) {

        if (!Number.isFinite(value)) {
            return "0%";
        }

        return formatNumber(value) + "%";

    }


    function getNumber(id) {

        const element = document.getElementById(id);

        if (!element) {
            return NaN;
        }

        return parseFloat(element.value);

    }


    /* =====================================================
       1. PERCENTAGE AMOUNT

       X% of Y
    ===================================================== */

    function calculatePercentageAmount() {

        const percent = getNumber("percent1");
        const number = getNumber("number1");

        const output = document.getElementById("valueOut");
        const resultText = document.getElementById("resultText1");
        const calculation = document.getElementById("calculation1");

        if (!output || !resultText || !calculation) {
            return;
        }


        if (
            !Number.isFinite(percent) ||
            !Number.isFinite(number)
        ) {

            output.textContent = "0.00";

            resultText.textContent =
                "Enter values above";

            calculation.innerHTML = `
                <div>Enter values to see the calculation.</div>
            `;

            return;
        }


        const result =
            (percent / 100) * number;


        output.textContent =
            formatNumber(result);


        resultText.textContent =
            `➟ ${formatNumber(percent)}% of ${formatNumber(number)} is ${formatNumber(result)}`;


        calculation.innerHTML = `
            <div>
                X = ${formatNumber(percent)}% of ${formatNumber(number)}
            </div>

            <div>
                ⇒ X = ${formatNumber(percent)}⁄100 × ${formatNumber(number)}
            </div>

            <div>
                ⇒ X = ${formatNumber(result)}
            </div>
        `;

    }


    /* =====================================================
       2. PERCENTAGE RATE

       X is what % of Y
    ===================================================== */

    function calculatePercentageRate() {

        const number = getNumber("number2");
        const value = getNumber("value2");

        const output = document.getElementById("percentOut");
        const resultText = document.getElementById("resultText2");
        const calculation = document.getElementById("calculation2");

        if (!output || !resultText || !calculation) {
            return;
        }


        if (
            !Number.isFinite(number) ||
            !Number.isFinite(value) ||
            value === 0
        ) {

            output.textContent = "0%";

            resultText.textContent =
                "Enter values above";

            calculation.innerHTML = `
                <div>Enter values to see the calculation.</div>
            `;

            return;
        }


        const result =
            (number / value) * 100;


        output.textContent =
            formatPercent(result);


        resultText.textContent =
            `➟ ${formatNumber(number)} is ${formatPercent(result)} of ${formatNumber(value)}`;


        calculation.innerHTML = `
            <div>
                X = ${formatNumber(number)} ÷ ${formatNumber(value)} × 100
            </div>

            <div>
                ⇒ X = ${formatNumber(number / value)} × 100
            </div>

            <div>
                ⇒ X = ${formatPercent(result)}
            </div>
        `;

    }


    /* =====================================================
       3. PRINCIPAL AMOUNT

       X is Y% of what?
    ===================================================== */

    function calculatePrincipalAmount() {

        const value = getNumber("value3");
        const percent = getNumber("percent3");

        const output = document.getElementById("numberOut");
        const resultText = document.getElementById("resultText3");
        const calculation = document.getElementById("calculation3");

        if (!output || !resultText || !calculation) {
            return;
        }


        if (
            !Number.isFinite(value) ||
            !Number.isFinite(percent) ||
            percent === 0
        ) {

            output.textContent = "0";

            resultText.textContent =
                "Enter values above";

            calculation.innerHTML = `
                <div>Enter values to see the calculation.</div>
            `;

            return;
        }


        const result =
            (value * 100) / percent;


        output.textContent =
            formatNumber(result);


        resultText.textContent =
            `➟ ${formatNumber(value)} is ${formatNumber(percent)}% of ${formatNumber(result)}`;


        calculation.innerHTML = `
            <div>
                X = ${formatNumber(value)} × 100 ÷ ${formatNumber(percent)}
            </div>

            <div>
                ⇒ X = ${formatNumber(value * 100)} ÷ ${formatNumber(percent)}
            </div>

            <div>
                ⇒ X = ${formatNumber(result)}
            </div>
        `;

    }


    /* =====================================================
       DEFAULT VALUES
    ===================================================== */

    function setDefaultValues() {

        const percent1 = document.getElementById("percent1");
        const number1 = document.getElementById("number1");

        const number2 = document.getElementById("number2");
        const value2 = document.getElementById("value2");

        const value3 = document.getElementById("value3");
        const percent3 = document.getElementById("percent3");


        if (percent1) {
            percent1.value = "5";
        }

        if (number1) {
            number1.value = "200";
        }


        if (number2) {
            number2.value = "5";
        }

        if (value2) {
            value2.value = "200";
        }


        if (value3) {
            value3.value = "10";
        }

        if (percent3) {
            percent3.value = "5";
        }

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    function initPercentageCalculator() {

        setDefaultValues();


        const inputIds = [
            "percent1",
            "number1",
            "number2",
            "value2",
            "value3",
            "percent3"
        ];


        inputIds.forEach(function (id) {

            const input =
                document.getElementById(id);

            if (!input) {
                return;
            }

            input.addEventListener(
                "input",
                function () {

                    calculatePercentageAmount();
                    calculatePercentageRate();
                    calculatePrincipalAmount();

                }
            );

        });


        /* Initial calculation on page open/refresh */

        calculatePercentageAmount();
        calculatePercentageRate();
        calculatePrincipalAmount();

    }


    /* =====================================================
       START
    ===================================================== */

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initPercentageCalculator
        );

    } else {

        initPercentageCalculator();

    }

})();
