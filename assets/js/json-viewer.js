/* =========================================================
   JSON VIEWER
   JSONEditor based
   ========================================================= */

(function () {

    const SAMPLE_JSON = {
        id: 1001,
        type: "donut",
        name: "Cake",
        description: "http://en.wikipedia.org/wiki/Doughnut",
        price: 2.55,
        available: {
            store: 42,
            warehouse: 600
        },
        topping: [
            {
                id: 5001,
                type: "None"
            },
            {
                id: 5002,
                type: "Glazed"
            },
            {
                id: 5005,
                type: "Sugar"
            },
            {
                id: 5003,
                type: "Chocolate"
            },
            {
                id: 5004,
                type: "Maple"
            }
        ]
    };


    let editor = null;


    /* =====================================================
       ELEMENTS
       ===================================================== */

    const manualInput =
        document.getElementById("manualInput");

    const urlInput =
        document.getElementById("urlInput");

    const loadUrlButton =
        document.getElementById("loadUrlButton");

    const editorContainer =
        document.getElementById("jsoneditor");

    const errorBox =
        document.getElementById("jsonViewerError");


    /* =====================================================
       ERROR
       ===================================================== */

    function showError(message) {

        if (!errorBox) return;

        errorBox.textContent = message;
        errorBox.classList.add("show");
    }


    function clearError() {

        if (!errorBox) return;

        errorBox.textContent = "";
        errorBox.classList.remove("show");
    }


    /* =====================================================
       PREPROCESS JSON
       ===================================================== */

    function preprocessJSON(jsonString) {

        let text = String(jsonString || "").trim();

        if (!text) {
            throw new Error("JSON input is empty.");
        }


        /*
         * Replace single quoted strings
         */
        text = text.replace(
            /'([^'\\]*(?:\\.[^'\\]*)*)'/g,
            function (_, value) {
                return '"' +
                    value
                        .replace(/"/g, '\\"')
                        .replace(/\\"/g, '"')
                    +
                    '"';
            }
        );


        /*
         * Quote unquoted object keys
         */
        text = text.replace(
            /([{,]\s*)([A-Za-z_$][A-Za-z0-9_$]*)\s*:/g,
            '$1"$2":'
        );


        return text;
    }


    /* =====================================================
       PARSE JSON
       ===================================================== */

    function parseJSON(value) {

        const processed =
            preprocessJSON(value);

        return JSON.parse(processed);
    }


    /* =====================================================
       INITIALIZE EDITOR
       ===================================================== */

    function initializeEditor(data) {

        if (
            typeof window.JSONEditor === "undefined" ||
            !editorContainer
        ) {
            showError(
                "JSONEditor could not be loaded."
            );
            return;
        }


        clearError();


        if (editor) {

            try {
                editor.destroy();
            } catch (error) {
                console.warn(
                    "Could not destroy JSONEditor:",
                    error
                );
            }

            editor = null;
        }


        const options = {
             mode: "tree",
         
             modes: [
                 "code",
                 "form",
                 "text",
                 "tree",
                 "view"
             ],
         
             mainMenuBar: true,
         
             navigationBar: false,
         
             statusBar: false,
         
             search: true,
         
             indentation: 4,
         
             escapeUnicode: true,
         
             onError: function (err) {
                 showError(
                     err && err.message
                         ? err.message
                         : String(err)
                 );
             },
         
             onChange: function () {
                 console.log("JSON changed");
             }
         };


        try {

            editor =
                new window.JSONEditor(
                    editorContainer,
                    options,
                    data
                );

        } catch (error) {

            console.error(error);

            showError(
                "Unable to create JSON editor."
            );
        }
    }


    /* =====================================================
       MANUAL JSON
       ===================================================== */

    function handleManualInput() {

        if (!manualInput) return;

        const value =
            manualInput.value.trim();


        if (!value) {

            clearError();

            initializeEditor({});

            return;
        }


        try {

            const parsed =
                parseJSON(value);

            initializeEditor(parsed);

        } catch (error) {

            showError(
                "Invalid JSON: " +
                (error.message || error)
            );
        }
    }


    /* =====================================================
       LOAD URL
       ===================================================== */

    async function loadJSONFromURL() {

        if (!urlInput) return;

        const url =
            urlInput.value.trim();


        if (!url) {

            showError(
                "Please enter a JSON URL."
            );

            return;
        }


        clearError();


        if (loadUrlButton) {

            loadUrlButton.disabled = true;
            loadUrlButton.textContent =
                "Loading...";
        }


        try {

            const response =
                await fetch(url, {
                    method: "GET"
                });


            if (!response.ok) {

                throw new Error(
                    "HTTP " +
                    response.status +
                    " " +
                    response.statusText
                );
            }


            const text =
                await response.text();


            const data =
                parseJSON(text);


            /*
             * Disable manual input exactly like
             * the original tool behavior.
             */
            if (manualInput) {

                manualInput.disabled = true;

                manualInput.value =
                    JSON.stringify(
                        data,
                        null,
                        4
                    );
            }


            initializeEditor(data);


        } catch (error) {

            console.error(error);

            showError(
                "Unable to load JSON URL: " +
                (error.message || error)
            );

            if (manualInput) {
                manualInput.disabled = false;
            }

        } finally {

            if (loadUrlButton) {

                loadUrlButton.disabled = false;

                loadUrlButton.textContent =
                    "Load";
            }
        }
    }


    /* =====================================================
       EVENTS
       ===================================================== */

    if (manualInput) {

        manualInput.addEventListener(
            "input",
            function () {

                /*
                 * Do not recreate the editor for every
                 * tiny character when the JSON is invalid.
                 */
                try {

                    const parsed =
                        parseJSON(
                            manualInput.value
                        );

                    clearError();

                    initializeEditor(parsed);

                } catch (error) {

                    showError(
                        "Invalid JSON: " +
                        (error.message || error)
                    );
                }
            }
        );
    }


    if (loadUrlButton) {

        loadUrlButton.addEventListener(
            "click",
            loadJSONFromURL
        );
    }


    if (urlInput) {

        urlInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {
                    loadJSONFromURL();
                }
            }
        );
    }


    /* =====================================================
       START
       ===================================================== */

    function initJSONViewer() {

        if (!editorContainer) return;

        initializeEditor(SAMPLE_JSON);
    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initJSONViewer
        );

    } else {

        initJSONViewer();
    }

})();
