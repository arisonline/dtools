/* =========================================
   DOZNI - SCREEN RESOLUTION CHECKER
========================================= */

(function () {

    function updateScreenResolution() {

        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;

        const totalPixels =
            (screenWidth * screenHeight) / 1000000;


        const screenResolution =
            document.getElementById("screenResolution");

        const widthValue =
            document.getElementById("widthValue");

        const heightValue =
            document.getElementById("heightValue");

        const totalPixelsElement =
            document.getElementById("totalPixels");


        if (screenResolution) {

            screenResolution.textContent =
                `${screenWidth} × ${screenHeight}`;

        }


        if (widthValue) {

            widthValue.textContent =
                `${screenWidth}px`;

        }


        if (heightValue) {

            heightValue.textContent =
                `${screenHeight}px`;

        }


        if (totalPixelsElement) {

            totalPixelsElement.textContent =
                totalPixels.toFixed(3);

        }

    }


    function initScreenResolution() {

        updateScreenResolution();

        window.addEventListener(
            "resize",
            updateScreenResolution
        );

    }


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initScreenResolution
        );

    } else {

        initScreenResolution();

    }

})();
