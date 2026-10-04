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


    /*
     * Default fallback color.
     * This is only used if the color input
     * itself is invalid. Direct page refreshes
     * without a stored color generate a new
     * random color instead.
     */

    let selectedColor =
        "#fe34ee";


    /* =====================================================
       ERROR
       ===================================================== */

    function showError(message) {

        if (!errorBox) {
            return;
        }


        errorBox.textContent =
            message;


        errorBox.style.display =
            "block";
    }


    function clearError() {

        if (!errorBox) {
            return;
        }


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


        try {

            const color =
                tinycolor(
                    String(value).trim()
                );


            if (!color.isValid()) {
                return null;
            }


            return color;

        } catch (error) {

            return null;
        }
    }


    /* =====================================================
       SESSION STORAGE
       ===================================================== */

    function getStoredColor() {

        try {

            const storedColor =
                sessionStorage.getItem(
                    "dozni-color-shades"
                );


            if (!storedColor) {
                return null;
            }


            const parsedColor =
                parseColor(storedColor);


            if (!parsedColor) {

                sessionStorage.removeItem(
                    "dozni-color-shades"
                );

                return null;
            }


            /*
             * Normalize to HEX.
             */

            const normalizedColor =
                parsedColor.toHexString();


            /*
             * Consume the stored color
             * only once.
             */

            sessionStorage.removeItem(
                "dozni-color-shades"
            );


            return normalizedColor;

        } catch (error) {

            return null;
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


        if (colorInput) {

            colorInput.value =
                selectedColor;
        }


        if (baseColor) {

            baseColor.value =
                selectedColor;
        }


        return true;
    }


    /* =====================================================
       GENERATE A RANDOM COLOR
       ===================================================== */

    function createRandomColor() {

        return (
            "#" +
            Math.floor(
                Math.random() * 16777216
            )
                .toString(16)
                .padStart(6, "0")
        );
    }


    /* =====================================================
       GENERATE SHADES
       ===================================================== */

    function generateShades(
        color,
        count
    ) {

        const result = [];


        const tinyColor =
            tinycolor(color);


        const hsv =
            tinyColor.toHsv();


        /*
         * Reduce HSV value progressively.
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

    function generateTints(
        color,
        count
    ) {

        const result = [];


        /*
         * Move RGB progressively toward white.
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
                (255 - rgb.r) *
                percent;


            const g =
                rgb.g +
                (255 - rgb.g) *
                percent;


            const b =
                rgb.b +
                (255 - rgb.b) *
                percent;


            result.push(

                tinycolor({
                    r: r,
                    g: g,
                    b: b
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


        let count =
            10;


        if (shadeRange) {

            count =
                parseInt(
                    shadeRange.value,
                    10
                );
        }


        if (
            !Number.isFinite(count) ||
            count < 1
        ) {

            count = 10;
        }


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


        const colors = [];


        /*
         * Lightest tint first.
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
         * Then darker shades.
         * Skip the first shade because
         * it is the original base color.
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
         * Render the palette.
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
         * Select the base color if it
         * exists in the palette.
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
         * Remove old active state.
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


        /*
         * Add active state to
         * selected palette box.
         */

        if (clickedElement) {

            clickedElement.classList.add(
                "active"
            );
        }


        /*
         * Update color preview.
         */

        if (selectedColorBox) {

            selectedColorBox.style.backgroundColor =
                selectedColor;
        }


        /*
         * Update all color codes.
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
         * Optional toast.
         */

        if (showToast) {

            showCopyToast(
                selectedColor
            );
        }
    }


    /* =====================================================
       UPDATE RANGE COUNTER
       ===================================================== */

    function updateShadeRangeCounter() {

        if (
            !shadeRangeCounter ||
            !shadeRange
        ) {
            return;
        }


        shadeRangeCounter.textContent =
            shadeRange.value;
    }


    /* =====================================================
       GENERATE NEW RANDOM COLOR
       ===================================================== */

    function generateRandomColor() {

        const randomColor =
            createRandomColor();


        if (
            !setBaseColor(
                randomColor
            )
        ) {
            return;
        }


        renderPalette();
    }


    /* =====================================================
       MANUAL COLOR INPUT
       ===================================================== */

    if (colorInput) {

        /*
         * Update live when the user
         * types a valid color.
         */

        colorInput.addEventListener(
            "input",
            function () {

                const value =
                    colorInput.value.trim();


                const parsed =
                    parseColor(value);


                /*
                 * Don't destroy the
                 * current palette while
                 * the user is typing an
                 * incomplete value.
                 */

                if (!parsed) {
                    return;
                }


                selectedColor =
                    parsed.toHexString();


                if (baseColor) {

                    baseColor.value =
                        selectedColor;
                }


                clearError();


                renderPalette();

            }
        );


        /*
         * Validate when the user
         * finishes editing.
         */

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


        /*
         * Enter key support.
         */

        colorInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    event.preventDefault();


                    if (
                        setBaseColor(
                            colorInput.value
                        )
                    ) {

                        renderPalette();
                    }
                }
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

                if (
                    !setBaseColor(
                        baseColor.value
                    )
                ) {

                    return;
                }


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
            function () {

                generateRandomColor();

            }
        );
    }


    /* =====================================================
       SHADE RANGE
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
       COPY VALUE
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


            textarea.style.top =
                "0";


            document.body.appendChild(
                textarea
            );


            textarea.focus();
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
       HEX COPY
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


    /* =====================================================
       RGB COPY
       ===================================================== */

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


    /* =====================================================
       HSL COPY
       ===================================================== */

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


    /* =====================================================
       HSV COPY
       ===================================================== */

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

                if (hexCode) {

                    copyValue(
                        hexCode.value
                    );

                }

            }
        );
    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

    function initialize() {

        updateShadeRangeCounter();


        /*
         * IMPORTANT:
         *
         * 1. First check whether Random Color
         *    Generator passed a color through
         *    sessionStorage.
         *
         * 2. If yes, use that exact color.
         *
         * 3. Remove the stored value immediately
         *    so a normal refresh does NOT keep using
         *    that same color.
         *
         * 4. If no stored color exists, create a
         *    completely NEW random color.
         */

        const storedColor =
            getStoredColor();


        if (storedColor) {

            /*
             * Color came from Random Color Generator.
             */

            selectedColor =
                storedColor;


            if (colorInput) {

                colorInput.value =
                    storedColor;
            }


            if (baseColor) {

                baseColor.value =
                    storedColor;
            }


            clearError();


            renderPalette();


            return;
        }


        /*
         * No color was passed from another tool.
         *
         * Generate a NEW random color on
         * every direct page load / refresh.
         */

        const freshRandomColor =
            createRandomColor();


        selectedColor =
            freshRandomColor;


        if (colorInput) {

            colorInput.value =
                freshRandomColor;
        }


        if (baseColor) {

            baseColor.value =
                freshRandomColor;
        }


        clearError();


        renderPalette();
    }


    /* =====================================================
       START
       ===================================================== */

    initialize();


})();
