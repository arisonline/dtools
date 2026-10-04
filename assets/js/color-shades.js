/* =========================================================
   COLOR SHADES GENERATOR
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const colorInput =
        document.getElementById("colorInput");

    const baseColor =
        document.getElementById("baseColor");

    const randomColorButton =
        document.getElementById("randomColorButton");

    const shadeRange =
        document.getElementById("shadeRange");

    const shadeRangeCounter =
        document.getElementById("shadeRangeCounter");

    const colorPalette =
        document.getElementById("colorPalette");

    const selectedColorBox =
        document.getElementById("selectedColorBox");

    const hexCode =
        document.getElementById("hexCode");

    const rgbCode =
        document.getElementById("rgbCode");

    const hslCode =
        document.getElementById("hslCode");

    const hsvCode =
        document.getElementById("hsvCode");

    const errorBox =
        document.getElementById("colorInputError");


    let selectedColor =
        "#fe34ee";


    /* =====================================================
       ERROR
       ===================================================== */

    function showError(message) {

        if (!errorBox) return;

        errorBox.textContent =
            message;

        errorBox.style.display =
            "block";
    }


    function clearError() {

        if (!errorBox) return;

        errorBox.textContent =
            "";

        errorBox.style.display =
            "none";
    }


    /* =====================================================
       VALIDATE COLOR
       ===================================================== */

    function parseColor(value) {

        if (!value) {
            return null;
        }


        const color =
            tinycolor(value.trim());


        if (!color.isValid()) {
            return null;
        }


        return color;
    }


    /* =====================================================
       URL COLOR
       ===================================================== */

    function getColorFromUrl() {

        const params =
            new URLSearchParams(
                window.location.search
            );


        const color =
            params.get("color");


        if (!color) {
            return null;
        }


        const parsed =
            parseColor(color);


        if (!parsed) {
            return null;
        }


        return parsed.toHexString();
    }


    /* =====================================================
       SYNC URL
       ===================================================== */

    function updateUrlColor(hex) {

        try {

            const url =
                new URL(
                    window.location.href
                );


            url.searchParams.set(
                "color",
                hex
            );


            window.history.replaceState(
                {},
                "",
                url
            );

        } catch (error) {

            /*
             * URL update is optional.
             */
        }
    }


    /* =====================================================
       SET BASE COLOR
       ===================================================== */

    function setBaseColor(value) {

        const parsed =
            parseColor(value);


        if (!parsed) {

            showError(
                "Please enter a valid color such as #808080, rgb(128, 128, 128), hsl(...), hsv(...) or a color name."
            );

            return false;
        }


        clearError();


        selectedColor =
            parsed.toHexString();


        colorInput.value =
            selectedColor;


        baseColor.value =
            selectedColor;


        updateUrlColor(
            selectedColor
        );


        return true;
    }


    /* =====================================================
       GENERATE SHADES
       ===================================================== */

    function generateShades(color, count) {

        const result = [];


        const tinyColor =
            tinycolor(color);


        const hsv =
            tinyColor.toHsv();


        /*
         * Preserve the source logic:
         * reduce HSV value progressively.
         */

        const step =
            hsv.v / count;


        for (
            let i = 0;
            i < count;
            i++
        ) {

            const newHsv = {
                h: hsv.h,
                s: hsv.s,
                v: Math.max(
                    0,
                    hsv.v - i * step
                ),
                a: 1
            };


            result.push(
                tinycolor(newHsv)
                    .toHexString()
            );
        }


        return result;
    }


    /* =====================================================
       GENERATE TINTS
       ===================================================== */

    function generateTints(color, count) {

        const result = [];


        /*
         * Source behavior:
         * move RGB progressively toward white.
         */

        const rgb =
            tinycolor(color).toRgb();


        const steps =
            Math.max(
                1,
                count - 1
            );


        for (
            let i = 0;
            i < count;
            i++
        ) {

            const percent =
                i / steps;


            const r =
                rgb.r +
                (255 - rgb.r)
                * percent;


            const g =
                rgb.g +
                (255 - rgb.g)
                * percent;


            const b =
                rgb.b +
                (255 - rgb.b)
                * percent;


            result.push(
                tinycolor({
                    r,
                    g,
                    b
                }).toHexString()
            );
        }


        return result;
    }


    /* =====================================================
       CREATE COLOR BOX
       ===================================================== */

    function createColorBox(
        color,
        type
    ) {

        const element =
            document.createElement(
                "button"
            );


        element.type =
            "button";


        element.className =
            "color-shade-box";


        element.style.backgroundColor =
            color;


        element.setAttribute(
            "aria-label",
            `${type} ${color}`
        );


        element.title =
            color;


        element.addEventListener(
            "click",
            function () {

                selectColor(
                    color,
                    element
                );

            }
        );


        return element;
    }


    /* =====================================================
       RENDER PALETTE
       ===================================================== */

    function renderPalette() {

        if (!colorPalette) {
            return;
        }


        colorPalette.innerHTML =
            "";


        const count =
            parseInt(
                shadeRange.value,
                10
            );


        const tints =
            generateTints(
                selectedColor,
                count
            );


        const shades =
            generateShades(
                selectedColor,
                count
            );


        /*
         * Display lighter colors first.
         */

        const colors = [];


        /*
         * Reverse tints so the
         * lightest appears first.
         */

        for (
            let i = tints.length - 1;
            i >= 0;
            i--
        ) {

            colors.push({
                color: tints[i],
                type: "Tint"
            });
        }


        /*
         * Avoid duplicating the
         * base color.
         */

        for (
            let i = 1;
            i < shades.length;
            i++
        ) {

            colors.push({
                color: shades[i],
                type: "Shade"
            });
        }


        /*
         * Render boxes.
         */

        colors.forEach(
            function (item) {

                const element =
                    createColorBox(
                        item.color,
                        item.type
                    );


                colorPalette.appendChild(
                    element
                );
            }
        );


        /*
         * Select base color by default.
         */

        const baseBox =
            Array.from(
                colorPalette.children
            ).find(
                function (element) {

                    return (
                        element.title ===
                        selectedColor
                    );

                }
            );


        selectColor(
            selectedColor,
            baseBox || null,
            false
        );
    }


    /* =====================================================
       SELECT COLOR
       ===================================================== */

    function selectColor(
        color,
        clickedElement,
        showToast = false
    ) {

        const parsed =
            parseColor(color);


        if (!parsed) {
            return;
        }


        selectedColor =
            parsed.toHexString();


        /*
         * Remove previous selection.
         */

        const activeBoxes =
            document.querySelectorAll(
                ".color-shade-box.active"
            );


        activeBoxes.forEach(
            function (box) {

                box.classList.remove(
                    "active"
                );
            }
        );


        if (clickedElement) {

            clickedElement.classList.add(
                "active"
            );
        }


        /*
         * Update preview.
         */

        if (selectedColorBox) {

            selectedColorBox.style.backgroundColor =
                selectedColor;
        }


        /*
         * Update codes.
         */

        const colorObject =
            tinycolor(selectedColor);


        if (hexCode) {

            hexCode.value =
                colorObject.toHexString();
        }


        if (rgbCode) {

            rgbCode.value =
                colorObject.toRgbString();
        }


        if (hslCode) {

            hslCode.value =
                colorObject.toHslString();
        }


        if (hsvCode) {

            hsvCode.value =
                colorObject.toHsvString();
        }


        /*
         * Only update URL when
         * a user selects another
         * palette color.
         */

        updateUrlColor(
            selectedColor
        );


        if (showToast) {

            showCopyToast(
                selectedColor
            );
        }
    }


    /* =====================================================
       UPDATE RANGE
       ===================================================== */

    function updateShadeRangeCounter() {

        if (!shadeRangeCounter) {
            return;
        }


        shadeRangeCounter.textContent =
            shadeRange.value;
    }


    /* =====================================================
       RANDOM COLOR
       ===================================================== */

    function generateRandomColor() {

        const randomColor =
            "#" +
            Math.floor(
                Math.random() *
                16777216
            )
            .toString(16)
            .padStart(6, "0");


        setBaseColor(
            randomColor
        );


        renderPalette();
    }


    /* =====================================================
       COLOR INPUT
       ===================================================== */

    if (colorInput) {

        colorInput.addEventListener(
            "input",
            function () {

                const value =
                    colorInput.value.trim();


                const parsed =
                    parseColor(value);


                if (!parsed) {
                    return;
                }


                selectedColor =
                    parsed.toHexString();


                baseColor.value =
                    selectedColor;


                clearError();


                updateUrlColor(
                    selectedColor
                );


                renderPalette();

            }
        );


        colorInput.addEventListener(
            "change",
            function () {

                if (
                    !setBaseColor(
                        colorInput.value
                    )
                ) {

                    return;
                }


                renderPalette();
            }
        );
    }


    /* =====================================================
       COLOR PICKER
       ===================================================== */

    if (baseColor) {

        baseColor.addEventListener(
            "input",
            function () {

                setBaseColor(
                    baseColor.value
                );


                renderPalette();
            }
        );
    }


    /* =====================================================
       RANDOM BUTTON
       ===================================================== */

    if (randomColorButton) {

        randomColorButton.addEventListener(
            "click",
            generateRandomColor
        );
    }


    /* =====================================================
       RANGE
       ===================================================== */

    if (shadeRange) {

        shadeRange.addEventListener(
            "input",
            function () {

                updateShadeRangeCounter();

                renderPalette();
            }
        );
    }


    /* =====================================================
       COPY
       ===================================================== */

    async function copyValue(value) {

        if (!value) {
            return;
        }


        try {

            await navigator.clipboard.writeText(
                value
            );

        } catch (error) {

            /*
             * Clipboard fallback.
             */

            const textarea =
                document.createElement(
                    "textarea"
                );


            textarea.value =
                value;


            textarea.style.position =
                "fixed";

            textarea.style.left =
                "-9999px";


            document.body.appendChild(
                textarea
            );


            textarea.select();


            try {
                document.execCommand(
                    "copy"
                );
            } catch (copyError) {
                // Ignore fallback error
            }


            document.body.removeChild(
                textarea
            );
        }


        showCopyToast(
            value
        );
    }


    /* =====================================================
       COPY TOAST
       ===================================================== */

    function showCopyToast(value) {

        if (
            typeof Swal ===
            "undefined"
        ) {
            return;
        }


        Swal.fire({

            toast: true,

            position: "top-end",

            showConfirmButton: false,

            timer: 1200,

            timerProgressBar: true,

            heightAuto: false,

            icon: "success",

            title: "Copied",

            text: value

        });
    }


    /* =====================================================
       CODE INPUT EVENTS
       ===================================================== */

    if (hexCode) {

        hexCode.addEventListener(
            "click",
            function () {

                copyValue(
                    hexCode.value
                );
            }
        );
    }


    if (rgbCode) {

        rgbCode.addEventListener(
            "click",
            function () {

                copyValue(
                    rgbCode.value
                );
            }
        );
    }


    if (hslCode) {

        hslCode.addEventListener(
            "click",
            function () {

                copyValue(
                    hslCode.value
                );
            }
        );
    }


    if (hsvCode) {

        hsvCode.addEventListener(
            "click",
            function () {

                copyValue(
                    hsvCode.value
                );
            }
        );
    }


    /* =====================================================
       SELECTED COLOR COPY
       ===================================================== */

    if (selectedColorBox) {

        selectedColorBox.addEventListener(
            "click",
            function () {

                copyValue(
                    hexCode.value
                );
            }
        );
    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

    function initialize() {

        updateShadeRangeCounter();


        /*
         * First priority:
         * color passed by Random Color Generator.
         */

        const urlColor =
            getColorFromUrl();


        if (urlColor) {

            selectedColor =
                urlColor;

            colorInput.value =
                urlColor;

            baseColor.value =
                urlColor;

        } else {

            /*
             * Normal direct visit.
             */

            const initial =
                parseColor(
                    colorInput.value
                );


            if (initial) {

                selectedColor =
                    initial.toHexString();

                colorInput.value =
                    selectedColor;

                baseColor.value =
                    selectedColor;
            }
        }


        renderPalette();
    }


    /*
     * Start.
     */

    initialize();

})();
