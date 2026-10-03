/* =========================================================
   JSON VIEWER
   ========================================================= */

(function () {

    "use strict";


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


    let editor = null;
    let historyObserver = null;


    /* =====================================================
       ERROR
       ===================================================== */

    function showError(message) {

        if (!errorBox) return;

        errorBox.textContent = message;

        errorBox.style.display = "block";
    }


    function clearError() {

        if (!errorBox) return;

        errorBox.textContent = "";

        errorBox.style.display = "none";
    }


    /* =====================================================
       PREPROCESS JSON
       ===================================================== */

    function preprocessJSON(jsonString) {

        if (!jsonString) {
            return null;
        }

        let cleaned = jsonString.trim();

        if (!cleaned) {
            return null;
        }


        /*
         * Preserve the behavior of the original tool:
         * allow single quotes and simple unquoted keys.
         */

        cleaned = cleaned.replace(
            /'/g,
            '"'
        );


        cleaned = cleaned.replace(
            /([{,]\s*)([A-Za-z_$][\w$-]*)(\s*:)/g,
            '$1"$2"$3'
        );


        return JSON.parse(cleaned);
    }


    /* =====================================================
       HISTORY BUTTON STATE
       ===================================================== */

    function isHistoryButtonAvailable(button) {

        if (!button) {
            return false;
        }


        if (button.disabled) {
            return false;
        }


        if (
            button.getAttribute("aria-disabled") === "true"
        ) {
            return false;
        }


        if (
            button.classList.contains(
                "jsoneditor-disabled"
            )
        ) {
            return false;
        }


        return true;
    }


    function updateHistoryButtons() {

        const undoButton =
            document.querySelector(
                "#jsoneditor .jsoneditor-undo"
            );

        const redoButton =
            document.querySelector(
                "#jsoneditor .jsoneditor-redo"
            );


        if (undoButton) {

            undoButton.classList.toggle(
                "json-history-available",
                isHistoryButtonAvailable(
                    undoButton
                )
            );
        }


        if (redoButton) {

            redoButton.classList.toggle(
                "json-history-available",
                isHistoryButtonAvailable(
                    redoButton
                )
            );
        }
    }


    /* =====================================================
       WATCH HISTORY
       ===================================================== */

    function watchHistoryButtons() {

        if (historyObserver) {

            historyObserver.disconnect();

            historyObserver = null;
        }


        const menu =
            document.querySelector(
                "#jsoneditor .jsoneditor-menu"
            );


        if (!menu) {
            return;
        }


        historyObserver =
            new MutationObserver(function () {

                updateHistoryButtons();

            });


        historyObserver.observe(
            menu,
            {
                subtree: true,

                attributes: true,

                attributeFilter: [
                    "disabled",
                    "class",
                    "aria-disabled"
                ]
            }
        );


        updateHistoryButtons();
    }


    /* =====================================================
       EDITOR OPTIONS
       ===================================================== */

    const options = {

        mode: "tree",

        modes: [
            "code",
            "form",
            "text",
            "tree",
            "view"
        ],

        history: true,

        mainMenuBar: true,

        navigationBar: false,

        statusBar: true,

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

            clearError();

            setTimeout(
                updateHistoryButtons,
                0
            );
        }
    };


    /* =====================================================
       INITIALIZE EDITOR
       ===================================================== */

    function initializeJsonEditor(data) {

        clearError();


        if (!editorContainer) {
            return;
        }


        /*
         * Destroy previous editor
         */

        if (editor) {

            try {
                editor.destroy();
            } catch (error) {
                // Ignore destroy error
            }

            editor = null;
        }


        /*
         * Create new editor
         */

        editor =
            new window.JSONEditor(
                editorContainer,
                options,
                data
            );


        /*
         * Wait until JSONEditor builds toolbar
         */

        setTimeout(function () {

            if (!editor) {
                return;
            }


            /*
             * Expand everything initially
             */

            if (
                typeof editor.expandAll ===
                "function"
            ) {

                editor.expandAll();

            } else {

                const expandButton =
                    document.querySelector(
                        "#jsoneditor .jsoneditor-expand-all"
                    );


                if (expandButton) {

                    expandButton.click();
                }
            }


            /*
             * Start watching Undo / Redo
             */

            watchHistoryButtons();

            updateHistoryButtons();

        }, 100);
    }


    /* =====================================================
       MANUAL JSON
       ===================================================== */

    function handleManualInput() {

        if (!manualInput) {
            return;
        }


        const value =
            manualInput.value.trim();


        if (!value) {

            initializeJsonEditor({});

            return;
        }


        try {

            const jsonData =
                preprocessJSON(value);


            initializeJsonEditor(jsonData);

        } catch (error) {

            showError(
                "Invalid JSON: " +
                error.message
            );

            /*
             * Keep the editor visible with empty object
             */

            initializeJsonEditor({});
        }
    }


    /* =====================================================
       FETCH JSON FROM URL
       ===================================================== */

    async function fetchDataFromURL(url) {

        clearError();


        if (!url) {
            return;
        }


        try {

            const response =
                await fetch(url);


            if (!response.ok) {

                throw new Error(
                    "HTTP " +
                    response.status +
                    " - " +
                    response.statusText
                );
            }


            const text =
                await response.text();


            const data =
                preprocessJSON(text);


            initializeJsonEditor(data);


            /*
             * Put fetched JSON into input area too
             */

            if (manualInput) {

                manualInput.value =
                    JSON.stringify(
                        data,
                        null,
                        4
                    );
            }


        } catch (error) {

            showError(
                "Unable to load JSON: " +
                error.message
            );


            /*
             * Keep current editor instead
             * of destroying it
             */
        }
    }


    /* =====================================================
       LOAD URL BUTTON
       ===================================================== */

    function handleURLInput() {

        if (!urlInput) {
            return;
        }


        const url =
            urlInput.value.trim();


        if (!url) {

            showError(
                "Please enter a JSON URL."
            );

            return;
        }


        fetchDataFromURL(url);
    }


    /* =====================================================
       EVENTS
       ===================================================== */

    if (manualInput) {

        manualInput.addEventListener(
            "input",
            function () {

                handleManualInput();

            }
        );
    }


    if (loadUrlButton) {

        loadUrlButton.addEventListener(
            "click",
            handleURLInput
        );
    }


    if (urlInput) {

        urlInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    handleURLInput();
                }
            }
        );
    }


    /* =====================================================
       INITIAL LOAD
       ===================================================== */

    window.addEventListener(
        "load",
        function () {

            let initialData = {};

            try {

                initialData =
                    preprocessJSON(
                        manualInput
                            ? manualInput.value
                            : "{}"
                    ) || {};

            } catch (error) {

                initialData = {};
            }


            initializeJsonEditor(
                initialData
            );
        }
    );


})();
