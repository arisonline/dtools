(function () {

    "use strict";


    function formatNumber(value) {

        if (!Number.isFinite(value)) {
            return "0";
        }

        return Number(value)
            .toFixed(2)
            .replace(/\.00$/, "")
            .replace(/(\.\d)0$/, "$1");

    }


    function getNumber(id) {

        const element = document.getElementById(id);

        if (!element) {
            return NaN;
        }

        return parseFloat(element.value);

    }


    /* =========================================
       1. PERCENTAGE AMOUNT
    ========================================= */

    function calculatePercentageAmount() {

        const percent = getNumber("percent1");
        const number = getNumber("number1");

        const output = document.getElementById("valueOut");
        const resultText = document.getElementById("resultText1");
        const calculation = document.getElementById("calculation1");

        if (!output || !resultText || !calculation) {
            return;
        }


        if (!Number.isFinite(percent) || !Number.isFinite(number)) {

            output.textContent = "0";

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
            <div>X = ${formatNumber(percent)}% of ${formatNumber(number)}</div>
            <div>⇒ X = ${formatNumber(percent)}⁄100 × ${formatNumber(number)}</div>
            <div>⇒ X = ${formatNumber(result)}</div>
        `;

    }


    /* =========================================
       2. PERCENTAGE RATE
    ========================================= */

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
            formatNumber(result) + "%";


        resultText.textContent =
            `➟ ${formatNumber(number)} is ${formatNumber(result)}% of ${formatNumber(value)}`;


        calculation.innerHTML = `
            <div>X = ${formatNumber(number)} ÷ ${formatNumber(value)} × 100</div>
            <div>⇒ X = ${formatNumber(number / value)} × 100</div>
            <div>⇒ X = ${formatNumber(result)}%</div>
        `;

    }


    /* =========================================
       3. PRINCIPAL AMOUNT
    ========================================= */

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
            <div>X = ${formatNumber(value)} × 100 ÷ ${formatNumber(percent)}</div>
            <div>⇒ X = ${formatNumber(value * 100)} ÷ ${formatNumber(percent)}</div>
            <div>⇒ X = ${formatNumber(result)}</div>
        `;

    }


    /* =========================================
       INPUT EVENTS
    ========================================= */

    function initPercentageCalculator() {

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


        /* =====================================
           CALCULATE IMMEDIATELY ON PAGE LOAD
        ===================================== */

        calculatePercentageAmount();
        calculatePercentageRate();
        calculatePrincipalAmount();

    }


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initPercentageCalculator
        );

    } else {

        initPercentageCalculator();

    }


})();
