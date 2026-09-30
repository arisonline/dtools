/* =========================================
   DOZNI TOOLS
   PERCENTAGE CALCULATOR
   REAL-TIME CALCULATIONS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       INPUTS
    ========================================= */

    const percent1 = document.getElementById("percent1");
    const number1 = document.getElementById("number1");

    const number2 = document.getElementById("number2");
    const value2 = document.getElementById("value2");

    const value3 = document.getElementById("value3");
    const percent3 = document.getElementById("percent3");


    /* =========================================
       OUTPUTS
    ========================================= */

    const valueOut = document.getElementById("valueOut");
    const percentOut = document.getElementById("percentOut");
    const numberOut = document.getElementById("numberOut");

    const resultText1 = document.getElementById("resultText1");
    const resultText2 = document.getElementById("resultText2");
    const resultText3 = document.getElementById("resultText3");

    const calculation1 = document.getElementById("calculation1");
    const calculation2 = document.getElementById("calculation2");
    const calculation3 = document.getElementById("calculation3");


    /* =========================================
       NUMBER FORMATTER
    ========================================== */

    function formatNumber(value) {

        if (!Number.isFinite(value)) {
            return "0";
        }

        if (Number.isInteger(value)) {
            return value.toLocaleString("en-US");
        }

        return value.toLocaleString("en-US", {
            maximumFractionDigits: 10
        });
    }


    /* =========================================
       RAW NUMBER
    ========================================== */

    function rawNumber(value) {

        if (!Number.isFinite(value)) {
            return "0";
        }

        if (Number.isInteger(value)) {
            return String(value);
        }

        return String(
            Number(value.toFixed(10))
        );
    }


    /* =========================================
       CLEAR CALCULATION
    ========================================== */

    function clearCalculation(element) {

        if (element) {
            element.innerHTML = "";
        }

    }


    /* =========================================
       1. X% OF Y
    ========================================== */

    function calculatePercentOf() {

        const percent = parseFloat(percent1.value);
        const number = parseFloat(number1.value);

        if (
            Number.isNaN(percent) ||
            Number.isNaN(number)
        ) {

            valueOut.textContent = "0";

            resultText1.textContent =
                "Enter values above";

            clearCalculation(calculation1);

            return;
        }


        const result =
            (percent / 100) * number;


        valueOut.textContent =
            formatNumber(result);


        resultText1.textContent =
            `${formatNumber(percent)}% of ${formatNumber(number)} is ${formatNumber(result)}`;


        calculation1.innerHTML = `
            <strong>Calculation:</strong><br><br>

            X = ${rawNumber(percent)}% of ${rawNumber(number)}<br><br>

            ⇒ X = ${rawNumber(percent)}⁄100 × ${rawNumber(number)}<br><br>

            ⇒ X = ${formatNumber(result)}
        `;

    }


    /* =========================================
       2. WHAT % IS X OF Y
    ========================================== */

    function calculateWhatPercent() {

        const number = parseFloat(number2.value);
        const value = parseFloat(value2.value);


        if (
            Number.isNaN(number) ||
            Number.isNaN(value)
        ) {

            percentOut.textContent = "0%";

            resultText2.textContent =
                "Enter values above";

            clearCalculation(calculation2);

            return;
        }


        if (number === 0) {

            percentOut.textContent = "0%";

            resultText2.textContent =
                "Cannot calculate percentage from zero";

            clearCalculation(calculation2);

            return;
        }


        const percent =
            (value / number) * 100;


        percentOut.textContent =
            `${formatNumber(percent)}%`;


        resultText2.textContent =
            `${formatNumber(percent)}% of ${formatNumber(number)} is ${formatNumber(value)}`;


        calculation2.innerHTML = `
            <strong>Calculation:</strong><br><br>

            X% of ${rawNumber(number)} = ${rawNumber(value)}<br><br>

            ⇒ X⁄100 × ${rawNumber(number)} = ${rawNumber(value)}<br><br>

            ⇒ X = (${rawNumber(value)} × 100)⁄${rawNumber(number)}<br><br>

            ⇒ X = ${formatNumber(percent)}
        `;

    }


    /* =========================================
       3. X IS Y% OF WHAT?
    ========================================== */

    function calculateOriginalNumber() {

        const value = parseFloat(value3.value);
        const percent = parseFloat(percent3.value);


        if (
            Number.isNaN(value) ||
            Number.isNaN(percent)
        ) {

            numberOut.textContent = "0";

            resultText3.textContent =
                "Enter values above";

            clearCalculation(calculation3);

            return;
        }


        if (percent === 0) {

            numberOut.textContent = "0";

            resultText3.textContent =
                "Cannot calculate when percentage is zero";

            clearCalculation(calculation3);

            return;
        }


        const number =
            (value * 100) / percent;


        numberOut.textContent =
            formatNumber(number);


        resultText3.textContent =
            `${formatNumber(percent)}% of ${formatNumber(number)} is ${formatNumber(value)}`;


        calculation3.innerHTML = `
            <strong>Calculation:</strong><br><br>

            ${rawNumber(percent)}% of X = ${rawNumber(value)}<br><br>

            ⇒ ${rawNumber(percent)}⁄100 × X = ${rawNumber(value)}<br><br>

            ⇒ X = (${rawNumber(value)} × 100)⁄${rawNumber(percent)}<br><br>

            ⇒ X = ${formatNumber(number)}
        `;

    }


    /* =========================================
       REAL-TIME EVENTS
    ========================================== */

    [
        percent1,
        number1
    ].forEach(input => {

        if (input) {
            input.addEventListener(
                "input",
                calculatePercentOf
            );
        }

    });


    [
        number2,
        value2
    ].forEach(input => {

        if (input) {
            input.addEventListener(
                "input",
                calculateWhatPercent
            );
        }

    });


    [
        value3,
        percent3
    ].forEach(input => {

        if (input) {
            input.addEventListener(
                "input",
                calculateOriginalNumber
            );
        }

    });


    /* =========================================
       INITIAL STATE
    ========================================== */

    calculatePercentOf();
    calculateWhatPercent();
    calculateOriginalNumber();

});
