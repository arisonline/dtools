/* =========================================================
   DOZNI TOOLS
   BROWSER RESOLUTION
========================================================= */

(function () {

    "use strict";


    function updateBrowserResolution() {

        const widthElement =
            document.getElementById("browserWidth");

        const heightElement =
            document.getElementById("browserHeight");

        const resolutionElement =
            document.getElementById("browserResolutionValue");

        const pixelsElement =
            document.getElementById("browserPixels");


        if (
            !widthElement ||
            !heightElement ||
            !resolutionElement ||
            !pixelsElement
        ) {
            return;
        }


        const width = window.innerWidth;

        const height = window.innerHeight;


        const totalPixels =
            width * height;


        const totalPixelsMillion =
            (totalPixels / 1000000).toFixed(4);


        widthElement.textContent =
            width;


        heightElement.textContent =
            height;


        resolutionElement.textContent =
            width + " x " + height;


        pixelsElement.textContent =
            totalPixelsMillion;

    }


    function initBrowserResolution() {

        updateBrowserResolution();


        window.addEventListener(
            "resize",
            updateBrowserResolution
        );


        window.addEventListener(
            "orientationchange",
            updateBrowserResolution
        );

    }


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initBrowserResolution
        );

    } else {

        initBrowserResolution();

    }

})();
