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


        const width =
            Number(window.screen.width) || 0;


        const height =
            Number(window.screen.height) || 0;


        const totalPixels =
            width * height;


        const screenResolution =
            getElement("screenResolution");


        const widthValue =
            getElement("widthValue");


        const heightValue =
            getElement("heightValue");


        const totalPixelsValue =
            getElement("totalPixels");


        /* SCREEN RESOLUTION */

        if (screenResolution) {

            screenResolution.textContent =
                `${width} X ${height}`;

        }


        /* WIDTH */

        if (widthValue) {

            widthValue.textContent =
                `${width}px`;

        }


        /* HEIGHT */

        if (heightValue) {

            heightValue.textContent =
                `${height}px`;

        }


        /* TOTAL PIXELS */

        if (totalPixelsValue) {

            totalPixelsValue.textContent =
                formatMillionPixels(totalPixels);

        }

    }


    function initScreenResolution() {

        updateScreenResolution();


        window.addEventListener(
            "resize",
            updateScreenResolution,
            {
                passive: true
            }
        );


        window.addEventListener(
            "orientationchange",
            updateScreenResolution,
            {
                passive: true
            }
        );


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
