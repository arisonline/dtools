/* =========================================================
   DOZNI TOOLS
   JSON VIEWER
========================================================= */

(function () {

    "use strict";


    let editor = null;


    const DEFAULT_OPTIONS = {

        mode: "tree",

        modes: [
            "code",
            "form",
            "text",
            "tree",
            "view"
        ],

        indentation: 4,

        escapeUnicode: true,

        onError: function (error) {

            showError(
                error && error.toString
                    ? error.toString()
                    : "Invalid JSON."
            );

        },

        onChange: function () {

            clearError();

        }

    };


    /* =====================================================
       ELEMENTS
    ===================================================== */

    function getElements() {

        return {

            urlInput:
                document.getElementById("jsonUrl"),

            manualInput:
                document.getElementById("jsonInput"),

            editor:
                document.getElementById("jsoneditor"),

            error:
                document.getElementById("jsonViewerError")

        };

    }


    /* =====================================================
       ERROR
    ===================================================== */

    function showError(message) {

        const elements =
            getElements();

        if (!elements.error) {
            return;
        }

        elements.error.textContent =
            message || "Invalid JSON.";

        elements.error.classList.add(
            "active"
        );

    }


    function clearError() {

        const elements =
            getElements();

        if (!elements.error) {
            return;
        }

        elements.error.textContent = "";

        elements.error.classList.remove(
            "active"
        );

    }


    /* =====================================================
       PREPROCESS JSON
       Preserves the behavior of the old tool
    ===================================================== */

    function preprocessJSON(jsonString) {

        let value =
            String(jsonString || "").trim();


        if (!value) {

            throw new Error(
                "JSON input is empty."
            );

        }


        /*
           Support the old tool's relaxed input:

           'name': 'value'
           name: "value"
        */

        value =
            value.replace(
                /'/g,
                '"'
            );


        value =
            value.replace(
                /([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)(\s*:)/g,
                '$1"$2"$3'
            );


        return JSON.parse(value);

    }


    /* =====================================================
       DESTROY EDITOR
    ===================================================== */

    function destroyEditor() {

        if (
            editor &&
            typeof editor.destroy === "function"
        ) {

            try {

                editor.destroy();

            } catch (error) {

                console.warn(
                    "JSONEditor destroy error:",
                    error
                );

            }

        }

        editor = null;

    }


    /* =====================================================
       INITIALIZE EDITOR
    ===================================================== */

    function initializeJsonEditor(data) {

        const elements =
            getElements();


        if (!elements.editor) {
            return;
        }


        if (
            typeof window.JSONEditor !==
            "function"
        ) {

            showError(
                "JSON Viewer library failed to load."
            );

            return;

        }


        clearError();


        destroyEditor();


        editor =
            new window.JSONEditor(
                elements.editor,
                DEFAULT_OPTIONS,
                data
            );


        /*
           Expand all nodes after creation
        */

        setTimeout(function () {

            const expandAllButton =
                elements.editor.querySelector(
                    ".jsoneditor-expand-all"
                );


            if (expandAllButton) {

                expandAllButton.click();

            }

        }, 50);

    }


    /* =====================================================
       MANUAL JSON
    ===================================================== */

    function handleManualInput() {

        const elements =
            getElements();


        if (!elements.manualInput) {
            return;
        }


        const value =
            elements.manualInput.value;


        /*
           If URL is currently being used,
           allow manual input to take over.
        */

        if (elements.urlInput) {

            elements.urlInput.value = "";

        }


        if (!value.trim()) {

            clearError();

            return;

        }


        try {

            const data =
                preprocessJSON(value);


            initializeJsonEditor(
                data
            );

        } catch (error) {

            showError(
                "Invalid JSON: " +
                error.message
            );

        }

    }


    /* =====================================================
       URL JSON
    ===================================================== */

    async function handleURLInput() {

        const elements =
            getElements();


        if (!elements.urlInput) {
            return;
        }


        const url =
            elements.urlInput.value.trim();


        if (!url) {
            return;
        }


        try {

            clearError();


            const response =
                await fetch(url);


            if (!response.ok) {

                throw new Error(
                    "Unable to load the JSON URL. HTTP " +
                    response.status
                );

            }


            const data =
                await response.json();


            if (elements.manualInput) {

                elements.manualInput.value =
                    JSON.stringify(
                        data,
                        null,
                        2
                    );

            }


            initializeJsonEditor(
                data
            );


        } catch (error) {

            showError(
                "Unable to load JSON: " +
                error.message
            );

        }

    }


    /* =====================================================
       INITIAL SAMPLE
    ===================================================== */

    function initializeFromTextarea() {

        const elements =
            getElements();


        if (!elements.manualInput) {
            return;
        }


        const initialValue =
            elements.manualInput.value.trim();


        if (!initialValue) {
            return;
        }


        try {

            const data =
                preprocessJSON(
                    initialValue
                );


            initializeJsonEditor(
                data
            );

        } catch (error) {

            showError(
                "Invalid JSON: " +
                error.message
            );

        }

    }


    /* =====================================================
       EVENTS
    ===================================================== */

    function initEvents() {

        const elements =
            getElements();


        if (elements.manualInput) {

            elements.manualInput.addEventListener(
                "input",
                handleManualInput
            );

        }


        if (elements.urlInput) {

            elements.urlInput.addEventListener(
                "change",
                handleURLInput
            );


            elements.urlInput.addEventListener(
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

    }


    /* =====================================================
       INIT
    ===================================================== */

    function initJsonViewer() {

        initEvents();

        initializeFromTextarea();

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initJsonViewer
        );

    } else {

        initJsonViewer();

    }


})();
