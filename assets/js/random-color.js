/* =========================================================
   RANDOM COLOR GENERATOR
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const generateBtn =
        document.getElementById("generateBtn");

    const colorBox =
        document.getElementById("colorBox");

    const hexOutput =
        document.getElementById("hexOutput");

    const rgbOutput =
        document.getElementById("rgbOutput");

    const hslOutput =
        document.getElementById("hslOutput");

    const hsvOutput =
        document.getElementById("hsvOutput");

    const getShadesLink =
        document.getElementById("getShadesLink");


    /* =====================================================
       STORAGE KEY
       ===================================================== */

    const SHADES_STORAGE_KEY =
        "dozni-color-shades";


    /* =====================================================
       RANDOM COLOR
       ===================================================== */

    function getRandomColor() {

        return tinycolor({

            h: Math.floor(
                Math.random() * 360
            ),

            s: Math.floor(
                Math.random() * 100
            ) + 1,

            l: Math.floor(
                Math.random() * 100
            ) + 1

        });
    }


    /* =====================================================
       GET COLOR CODES
       ===================================================== */

    function getColorCodes(color) {

        const tinyColor =
            tinycolor(color);


        return {

            hex:
                "#" +
                tinyColor.toHex(),

            rgb:
                tinyColor.toRgbString(),

            hsl:
                tinyColor.toHslString(),

            hsv:
                tinyColor.toHsvString()

        };
    }


    /* =====================================================
       STORE COLOR FOR COLOR SHADES
       ===================================================== */

    function storeColorForShades(hex) {

        if (!hex) {
            return;
        }


        /*
         * Store for same-origin DTools pages.
         */

        try {

            sessionStorage.setItem(
                SHADES_STORAGE_KEY,
                hex
            );

        } catch (error) {

            console.warn(
                "sessionStorage unavailable.",
                error
            );
        }


        /*
         * Also store in a short-lived cookie
         * when running on a Dozni domain.
         *
         * This allows:
         *
         * random-color.dozni.com
         *          ↓
         * color-shades.dozni.com
         */

        try {

            if (
                location.hostname === "dozni.com" ||
                location.hostname.endsWith(".dozni.com")
            ) {

                document.cookie =
                    SHADES_STORAGE_KEY +
                    "=" +
                    encodeURIComponent(hex) +
                    "; path=/; domain=.dozni.com; max-age=120; SameSite=Lax";
            }

        } catch (error) {

            console.warn(
                "Cookie storage unavailable.",
                error
            );
        }
    }


    /* =====================================================
       UPDATE UI
       ===================================================== */

    function updateColor(color) {

        const colorCodes =
            getColorCodes(color);


        if (colorBox) {

            colorBox.style.backgroundColor =
                colorCodes.hex;
        }


        if (hexOutput) {

            hexOutput.value =
                colorCodes.hex;
        }


        if (rgbOutput) {

            rgbOutput.value =
                colorCodes.rgb;
        }


        if (hslOutput) {

            hslOutput.value =
                colorCodes.hsl;
        }


        if (hsvOutput) {

            hsvOutput.value =
                colorCodes.hsv;
        }
    }


    /* =====================================================
       GENERATE
       ===================================================== */

    function generateRandomColor() {

        const randomColor =
            getRandomColor();


        updateColor(
            randomColor
        );
    }


    /* =====================================================
       GET SHADES LINK
       ===================================================== */

    if (getShadesLink) {

        /*
         * Keep the URL completely clean.
         */

        getShadesLink.href =
            "../color-shades/";


        /*
         * Store the exact current color
         * immediately before navigation.
         */

        getShadesLink.addEventListener(
            "click",
            function () {

                const currentColor =
                    hexOutput
                        ? hexOutput.value.trim()
                        : "";


                if (currentColor) {

                    storeColorForShades(
                        currentColor
                    );
                }

            }
        );
    }


    /* =====================================================
       COPY
       ===================================================== */

    async function copyColorValue(
        input,
        value
    ) {

        if (!value) {
            return;
        }


        try {

            await navigator.clipboard.writeText(
                value
            );

        } catch (error) {

            /*
             * Fallback.
             */

            if (input) {

                input.focus();

                input.select();


                try {

                    document.execCommand(
                        "copy"
                    );

                } catch (copyError) {

                    // Ignore fallback error
                }


                input.blur();
            }
        }


        showCopyMessage(
            value
        );
    }


    /* =====================================================
       SWEETALERT TOAST
       ===================================================== */

    function showCopyMessage(value) {

        if (
            typeof Swal ===
            "undefined"
        ) {
            return;
        }


        Swal.fire({

            toast: true,

            position: "top-end",

            icon: "success",

            title: "Copied",

            text: value,

            showConfirmButton: false,

            timer: 1200,

            timerProgressBar: true,

            heightAuto: false

        });
    }


    /* =====================================================
       COPY COLOR PREVIEW
       ===================================================== */

    if (colorBox) {

        colorBox.addEventListener(
            "click",
            function () {

                copyColorValue(

                    hexOutput,

                    hexOutput
                        ? hexOutput.value
                        : ""

                );
            }
        );
    }


    /* =====================================================
       COPY HEX
       ===================================================== */

    if (hexOutput) {

        hexOutput.addEventListener(
            "click",
            function () {

                copyColorValue(
                    hexOutput,
                    hexOutput.value
                );

            }
        );
    }


    /* =====================================================
       COPY RGB
       ===================================================== */

    if (rgbOutput) {

        rgbOutput.addEventListener(
            "click",
            function () {

                copyColorValue(
                    rgbOutput,
                    rgbOutput.value
                );

            }
        );
    }


    /* =====================================================
       COPY HSL
       ===================================================== */

    if (hslOutput) {

        hslOutput.addEventListener(
            "click",
            function () {

                copyColorValue(
                    hslOutput,
                    hslOutput.value
                );

            }
        );
    }


    /* =====================================================
       COPY HSV
       ===================================================== */

    if (hsvOutput) {

        hsvOutput.addEventListener(
            "click",
            function () {

                copyColorValue(
                    hsvOutput,
                    hsvOutput.value
                );

            }
        );
    }


    /* =====================================================
       GENERATE BUTTON
       ===================================================== */

    if (generateBtn) {

        generateBtn.addEventListener(
            "click",
            generateRandomColor
        );
    }


    /* =====================================================
       INITIAL COLOR
       ===================================================== */

    function initialize() {

        generateRandomColor();

    }


    /* =====================================================
       START
       ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initialize
        );

    } else {

        initialize();
    }


})();
