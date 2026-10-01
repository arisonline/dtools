/* =========================================
   DOZNI TOOLS
   SCREEN RESOLUTION TESTER
========================================= */

(function () {

    "use strict";


    function getElement(id) {
        return document.getElementById(id);
    }


    function formatNumber(value) {
        return Number(value).toLocaleString("en-IN");
    }


    function getOrientation(width, height) {

        if (width === height) {
            return "Square";
        }

        return width > height
            ? "Landscape"
            : "Portrait";
    }


    function updateScreenResolution() {

        if (!window.screen) {
            return;
        }


        const screenWidth =
            Number(window.screen.width) || 0;

        const screenHeight =
            Number(window.screen.height) || 0;


        const availableWidth =
            Number(window.screen.availWidth) || screenWidth;

        const availableHeight =
            Number(window.screen.availHeight) || screenHeight;


        const viewportWidth =
            Number(window.innerWidth) || 0;

        const viewportHeight =
            Number(window.innerHeight) || 0;


        const pixelRatio =
            Number(window.devicePixelRatio) || 1;


        const colorDepth =
            Number(window.screen.colorDepth) || 0;


        const totalPixels =
            screenWidth * screenHeight;


        const totalPixelsMillion =
            totalPixels / 1000000;


        const screenResolution =
            getElement("screenResolution");

        const widthValue =
            getElement("widthValue");

        const heightValue =
            getElement("heightValue");

        const totalPixelsValue =
            getElement("totalPixels");

        const availableResolution =
            getElement("availableResolution");

        const viewportResolution =
            getElement("viewportResolution");

        const pixelRatioElement =
            getElement("pixelRatio");

        const colorDepthElement =
            getElement("colorDepth");

        const orientationElement =
            getElement("screenOrientation");

        const screenPosition =
            getElement("screenPosition");


        if (screenResolution) {
            screenResolution.textContent =
                `${screenWidth} × ${screenHeight}`;
        }


        if (widthValue) {
            widthValue.textContent =
                `${formatNumber(screenWidth)}px`;
        }


        if (heightValue) {
            heightValue.textContent =
                `${formatNumber(screenHeight)}px`;
        }


        if (totalPixelsValue) {
            totalPixelsValue.textContent =
                `${totalPixelsMillion.toFixed(2)} MP`;
        }


        if (availableResolution) {
            availableResolution.textContent =
                `${availableWidth} × ${availableHeight}`;
        }


        if (viewportResolution) {
            viewportResolution.textContent =
                `${viewportWidth} × ${viewportHeight}`;
        }


        if (pixelRatioElement) {
            pixelRatioElement.textContent =
                pixelRatio.toFixed(2).replace(/\.00$/, "");
        }


        if (colorDepthElement) {
            colorDepthElement.textContent =
                `${colorDepth} bit`;
        }


        if (orientationElement) {

            let orientation =
                getOrientation(
                    screenWidth,
                    screenHeight
                );


            if (
                window.screen.orientation &&
                window.screen.orientation.type
            ) {

                const type =
                    window.screen.orientation.type;

                if (
                    type.includes("portrait")
                ) {
                    orientation = "Portrait";
                }

                if (
                    type.includes("landscape")
                ) {
                    orientation = "Landscape";
                }

            }


            if (orientationElement) {
                orientationElement.textContent =
                    orientation;
            }

        }


        if (screenPosition) {

            const left =
                Number(window.screenX);

            const top =
                Number(window.screenY);


            screenPosition.textContent =
                `${Number.isFinite(left) ? left : 0}, ${
                    Number.isFinite(top) ? top : 0
                }`;

        }

    }


    function initScreenResolution() {

        updateScreenResolution();


        window.addEventListener(
            "resize",
            updateScreenResolution,
            { passive: true }
        );


        window.addEventListener(
            "orientationchange",
            updateScreenResolution,
            { passive: true }
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
