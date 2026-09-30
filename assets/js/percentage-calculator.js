/* =========================================
   PERCENTAGE CALCULATOR
========================================= */

function initPercentageCalculator() {


    /* =====================================
       TABS
    ===================================== */

    const tabs =
        document.querySelectorAll(
            ".calculator-tab"
        );


    const panels =
        document.querySelectorAll(
            ".calculator-panel"
        );


    tabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                tabs.forEach(item => {

                    item.classList.remove(
                        "active"
                    );

                });


                panels.forEach(panel => {

                    panel.classList.remove(
                        "active"
                    );

                });


                tab.classList.add("active");


                const calculator =
                    tab.dataset.calculator;


                const panel =
                    document.getElementById(
                        calculator
                    );


                if (panel) {

                    panel.classList.add(
                        "active"
                    );

                }

            }
        );

    });



    /* =====================================
       X% OF Y
    ===================================== */

    const calculatePercent =
        document.getElementById(
            "calculatePercent"
        );


    if (calculatePercent) {

        calculatePercent.addEventListener(
            "click",
            () => {

                const percentage =
                    parseFloat(
                        document.getElementById(
                            "percentValue"
                        ).value
                    );


                const number =
                    parseFloat(
                        document.getElementById(
                            "numberValue"
                        ).value
                    );


                const result =
                    document.getElementById(
                        "percentResult"
                    );


                if (
                    isNaN(percentage) ||
                    isNaN(number)
                ) {

                    result.textContent =
                        "Please enter both values.";

                    return;

                }


                const answer =
                    (percentage / 100) *
                    number;


                result.textContent =
                    `${percentage}% of ${number} = ${answer}`;

            }
        );

    }



    /* =====================================
       X IS WHAT % OF Y
    ===================================== */

    const calculateWhatPercent =
        document.getElementById(
            "calculateWhatPercent"
        );


    if (calculateWhatPercent) {

        calculateWhatPercent.addEventListener(
            "click",
            () => {

                const part =
                    parseFloat(
                        document.getElementById(
                            "partValue"
                        ).value
                    );


                const whole =
                    parseFloat(
                        document.getElementById(
                            "wholeValue"
                        ).value
                    );


                const result =
                    document.getElementById(
                        "whatPercentResult"
                    );


                if (
                    isNaN(part) ||
                    isNaN(whole)
                ) {

                    result.textContent =
                        "Please enter both values.";

                    return;

                }


                if (whole === 0) {

                    result.textContent =
                        "The second value cannot be zero.";

                    return;

                }


                const answer =
                    (part / whole) * 100;


                result.textContent =
                    `${part} is ${answer.toFixed(2)}% of ${whole}`;

            }
        );

    }



    /* =====================================
       PERCENTAGE CHANGE
    ===================================== */

    const calculateChange =
        document.getElementById(
            "calculateChange"
        );


    if (calculateChange) {

        calculateChange.addEventListener(
            "click",
            () => {

                const oldValue =
                    parseFloat(
                        document.getElementById(
                            "oldValue"
                        ).value
                    );


                const newValue =
                    parseFloat(
                        document.getElementById(
                            "newValue"
                        ).value
                    );


                const result =
                    document.getElementById(
                        "changeResult"
                    );


                if (
                    isNaN(oldValue) ||
                    isNaN(newValue)
                ) {

                    result.textContent =
                        "Please enter both values.";

                    return;

                }


                if (oldValue === 0) {

                    result.textContent =
                        "Original value cannot be zero.";

                    return;

                }


                const change =
                    ((newValue - oldValue) /
                        Math.abs(oldValue)) *
                    100;


                if (change > 0) {

                    result.textContent =
                        `Percentage Increase: ${change.toFixed(2)}%`;

                } else if (change < 0) {

                    result.textContent =
                        `Percentage Decrease: ${Math.abs(change).toFixed(2)}%`;

                } else {

                    result.textContent =
                        "No percentage change.";

                }

            }
        );

    }

}


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    initPercentageCalculator
);
