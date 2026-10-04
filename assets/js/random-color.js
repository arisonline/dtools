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
       RANDOM COLOR
       ===================================================== */

    function getRandomColor() {

        const color = tinycolor({

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


        return color;
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
      
      
          /* Send the same HEX color to Color Shades */
      
          if (getShadesLink) {
      
              const shadesUrl =
                  new URL(
                      "../color-shades/",
                      window.location.href
                  );
      
              shadesUrl.searchParams.set(
                  "color",
                  colorCodes.hex
              );
      
              getShadesLink.href =
                  shadesUrl.href;
          }
      }


    /* =====================================================
       GENERATE
       ===================================================== */

    function generateRandomColor() {

        const randomColor =
            getRandomColor();

        updateColor(randomColor);
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
             * Fallback for browsers where Clipboard API
             * is unavailable.
             */

            if (input) {

                input.focus();

                input.select();

                document.execCommand(
                    "copy"
                );

                input.blur();
            }
        }


        showCopyMessage(value);
    }


    /* =====================================================
       SWEETALERT
       ===================================================== */

       function showCopyMessage(value) {
   
       if (typeof Swal === "undefined") {
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
       COPY EVENTS
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

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            generateRandomColor();

        }
    );


})();
