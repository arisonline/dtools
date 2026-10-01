/* =========================================
   DOZNI TOOLS
   SCREEN RESOLUTION TESTER
========================================= */

(function () {

    "use strict";


    function getElement(id) {

        return document.getElementById(id);

    }


    function formatMillionPixels(totalPixels) {

        const million =
            totalPixels / 1000000;


        return million
            .toFixed(6)
            .replace(/0+$/, "")
            .replace(/\.$/, "");

    }


    function updateScreenResolution() {

        if (!window.screen) {

            return;

        }


        const screenWidth =
            Number(window.screen.width) || 0;


        const screenHeight =
            Number(window.screen.height) || 0;


        const totalPixels =
            screenWidth * screenHeight;


        const screenResolution =
            getElement("screenResolution");


        const widthValue =
            getElement("widthValue");


        const heightValue =
            getElement("heightValue");


        const totalPixelsValue =
            getElement("totalPixels");


        /* =====================================
           SCREEN RESOLUTION
        ====================================== */

        if (screenResolution) {

            screenResolution.textContent =
                `${screenWidth} X ${screenHeight}`;

        }


        /* =====================================
           WIDTH
        ====================================== */

        if (widthValue) {

            widthValue.textContent =
                `${screenWidth.toLocaleString("en-US")}px`;

        }


        /* =====================================
           HEIGHT
        ====================================== */

        if (heightValue) {

            heightValue.textContent =
                `${screenHeight.toLocaleString("en-US")}px`;

        }


        /* =====================================
           TOTAL PIXELS
        ====================================== */

        if (totalPixelsValue) {

            totalPixelsValue.textContent =
                formatMillionPixels(totalPixels);

        }

    }


    function initScreenResolution() {

        updateScreenResolution();


        /* Browser resize */

        window.addEventListener(
            "resize",
            updateScreenResolution,
            {
                passive: true
            }
        );


        /* Device orientation */

        window.addEventListener(
            "orientationchange",
            updateScreenResolution,
            {
                passive: true
            }
        );


        /* Screen orientation API */

        if (
            window.screen &&
            window.screen.orientation
        ) {

            window.screen.orientation.addEventListener(
                "change",
                updateScreenResolution
            );

        }

    }


    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initScreenResolution
        );

    } else {

        initScreenResolution();

    }

})();
