/* =========================================================
   DOZNI TOOLS
   JSON VIEWER
   PURE HTML / CSS / JS
========================================================= */

(function () {

    "use strict";


    let jsonData = null;

    let currentMode = "tree";

    let expandedNodes = new WeakSet();

    let searchTerm = "";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    function getElements() {

        return {

            urlInput:
                document.getElementById("jsonUrl"),

            loadButton:
                document.getElementById("loadJsonUrl"),

            input:
                document.getElementById("jsonInput"),

            display:
                document.getElementById("jsonViewerDisplay"),

            error:
                document.getElementById("jsonViewerError"),

            search:
                document.getElementById("jsonSearch"),

            expand:
                document.getElementById("jsonExpandAll"),

            collapse:
                document.getElementById("jsonCollapseAll"),

            format:
                document.getElementById("jsonFormat"),

            sort:
                document.getElementById("jsonSort")

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
       PARSE JSON
    ===================================================== */

    function parseJSON(value) {

        let text =
            String(value || "").trim();


        if (!text) {

            throw new Error(
                "JSON input is empty."
            );

        }


        /*
           First try strict JSON.
        */

        try {

            return JSON.parse(text);

        } catch (strictError) {

            /*
               Keep compatibility with your old tool.

               Supports:
               name: "value"
               'name': 'value'
            */

            text =
                text.replace(
                    /([{,]\s*)([a-zA-Z_$][\w$]*)(\s*:)/g,
                    '$1"$2"$3'
                );


            text =
                text.replace(
                    /'/g,
                    '"'
                );


            return JSON.parse(text);

        }

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       VALUE HTML
    ===================================================== */

    function getValueHTML(value) {

        if (typeof value === "string") {

            return `
                <span class="json-tree-value json-tree-string">
                    "${escapeHTML(value)}"
                </span>
            `;

        }


        if (typeof value === "number") {

            return `
                <span class="json-tree-value json-tree-number">
                    ${value}
                </span>
            `;

        }


        if (typeof value === "boolean") {

            return `
                <span class="json-tree-value json-tree-boolean">
                    ${value}
                </span>
            `;

        }


        if (value === null) {

            return `
                <span class="json-tree-value json-tree-null">
                    null
                </span>
            `;

        }


        return "";
    }


    /* =====================================================
       NODE TYPE
    ===================================================== */

    function getNodeType(value) {

        if (Array.isArray(value)) {
            return "array";
        }


        if (
            value !== null &&
            typeof value === "object"
        ) {
            return "object";
        }


        return "value";

    }


    /* =====================================================
       OBJECT SIZE
    ===================================================== */

    function getObjectSize(value) {

        if (Array.isArray(value)) {
            return value.length;
        }


        if (
            value !== null &&
            typeof value === "object"
        ) {
            return Object.keys(value).length;
        }


        return 0;

    }


    /* =====================================================
       TREE NODE
    ===================================================== */

    function createTreeNode(
        key,
        value,
        level,
        parent
    ) {

        const type =
            getNodeType(value);


        const node =
            document.createElement("li");


        node.className =
            "json-tree-node";


        if (
            value !== null &&
            typeof value === "object"
        ) {

            const isExpanded =
                expandedNodes.has(value);


            const line =
                document.createElement("div");


            line.className =
                "json-tree-line";


            const toggle =
                document.createElement("button");


            toggle.type =
                "button";


            toggle.className =
                "json-tree-toggle";


            toggle.innerHTML = `

                <span class="material-icons">
                    ${isExpanded
                        ? "expand_more"
                        : "chevron_right"}
                </span>

            `;


            toggle.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    if (
                        expandedNodes.has(value)
                    ) {

                        expandedNodes.delete(
                            value
                        );

                    } else {

                        expandedNodes.add(
                            value
                        );

                    }


                    renderTree();

                }
            );


            line.appendChild(
                toggle
            );


            const keyElement =
                document.createElement("span");


            keyElement.className =
                "json-tree-key";


            if (key !== null) {

                keyElement.textContent =
                    Array.isArray(parent)
                        ? `[${key}]`
                        : `"${key}"`;

            } else {

                keyElement.textContent =
                    type === "array"
                        ? "[root]"
                        : "{root}";

            }


            line.appendChild(
                keyElement
            );


            line.insertAdjacentHTML(
                "beforeend",
                `
                    <span class="json-tree-meta">
                        ${type === "array"
                            ? `[${getObjectSize(value)}]`
                            : `{${getObjectSize(value)}}`}
                    </span>
                `
            );


            node.appendChild(
                line
            );


            const children =
                document.createElement("ul");


            if (!isExpanded) {

                children.classList.add(
                    "json-tree-hidden"
                );

            }


            Object.entries(value).forEach(
                function ([childKey, childValue]) {

                    children.appendChild(
                        createTreeNode(
                            childKey,
                            childValue,
                            level + 1,
                            value
                        )
                    );

                }
            );


            node.appendChild(
                children
            );


            return node;

        }


        const line =
            document.createElement("div");


        line.className =
            "json-tree-line";


        const spacer =
            document.createElement("span");


        spacer.className =
            "json-tree-spacer";


        line.appendChild(
            spacer
        );


        if (key !== null) {

            const keyElement =
                document.createElement("span");


            keyElement.className =
                "json-tree-key";


            keyElement.textContent =
                Array.isArray(parent)
                    ? `[${key}]`
                    : `"${key}"`;


            line.appendChild(
                keyElement
            );


            line.insertAdjacentHTML(
                "beforeend",
                `
                    <span class="json-tree-colon">
                        :
                    </span>
                `
            );

        }


        line.insertAdjacentHTML(
            "beforeend",
            getValueHTML(value)
        );


        node.appendChild(
            line
        );


        return node;

    }


    /* =====================================================
       TREE
    ===================================================== */

    function renderTree() {

        const elements =
            getElements();


        if (!elements.display) {
            return;
        }


        elements.display.innerHTML =
            "";


        if (jsonData === null) {

            elements.display.innerHTML = `

                <div class="json-viewer-empty">

                    <span class="material-icons">
                        account_tree
                    </span>

                    <div>
                        Enter JSON data to begin.
                    </div>

                </div>

            `;

            return;

        }


        /*
           Root starts expanded.
        */

        if (
            jsonData !== null &&
            typeof jsonData === "object"
        ) {

            if (
                !expandedNodes.has(jsonData)
            ) {

                expandedNodes.add(
                    jsonData
                );

            }

        }


        const tree =
            document.createElement("ul");


        tree.className =
            "json-tree";


        if (
            jsonData !== null &&
            typeof jsonData === "object"
        ) {

            Object.entries(jsonData).forEach(
                function ([key, value]) {

                    tree.appendChild(
                        createTreeNode(
                            key,
                            value,
                            0,
                            jsonData
                        )
                    );

                }
            );

        } else {

            tree.appendChild(
                createTreeNode(
                    null,
                    jsonData,
                    0,
                    null
                )
            );

        }


        elements.display.appendChild(
            tree
        );


        applySearch();

    }


    /* =====================================================
       FORMAT JSON
    ===================================================== */

    function renderCode() {

        const elements =
            getElements();


        if (!elements.display) {
            return;
        }


        if (jsonData === null) {

            elements.display.innerHTML = `

                <div class="json-viewer-empty">

                    <span class="material-icons">
                        code
                    </span>

                    Enter JSON data to begin.

                </div>

            `;

            return;

        }


        const pre =
            document.createElement("pre");


        pre.className =
            "json-viewer-code";


        pre.textContent =
            JSON.stringify(
                jsonData,
                null,
                4
            );


        elements.display.appendChild(
            pre
        );

    }


    /* =====================================================
       TEXT MODE
    ===================================================== */

    function renderText() {

        const elements =
            getElements();


        if (!elements.display) {
            return;
        }


        const textarea =
            document.createElement("textarea");


        textarea.className =
            "json-viewer-text";


        textarea.value =
            JSON.stringify(
                jsonData,
                null,
                4
            );


        textarea.addEventListener(
            "input",
            function () {

                try {

                    jsonData =
                        parseJSON(
                            textarea.value
                        );

                    clearError();

                } catch (error) {

                    showError(
                        error.message
                    );

                }

            }
        );


        elements.display.appendChild(
            textarea
        );

    }


    /* =====================================================
       FORM MODE
    ===================================================== */

    function renderForm() {

        const elements =
            getElements();


        if (!elements.display) {
            return;
        }


        const pre =
            document.createElement("pre");


        pre.className =
            "json-viewer-code";


        pre.textContent =
            JSON.stringify(
                jsonData,
                null,
                2
            );


        elements.display.innerHTML = "";


        elements.display.appendChild(
            pre
        );

    }


    /* =====================================================
       VIEW MODE
    ===================================================== */

    function renderView() {

        renderTree();

    }


    /* =====================================================
       RENDER CURRENT MODE
    ===================================================== */

    function renderCurrentMode() {

        if (!jsonData) {

            renderTree();

            return;

        }


        switch (currentMode) {

            case "code":
                renderCode();
                break;

            case "text":
                renderText();
                break;

            case "form":
                renderForm();
                break;

            case "view":
                renderView();
                break;

            case "tree":
            default:
                renderTree();
                break;

        }

    }


    /* =====================================================
       SET MODE
    ===================================================== */

    function setMode(mode) {

        currentMode =
            mode;


        document
            .querySelectorAll(
                ".json-viewer-mode"
            )
            .forEach(
                function (button) {

                    button.classList.toggle(
                        "active",
                        button.dataset.mode === mode
                    );

                }
            );


        renderCurrentMode();

    }


    /* =====================================================
       READ INPUT
    ===================================================== */

    function updateFromInput() {

        const elements =
            getElements();


        if (!elements.input) {
            return;
        }


        try {

            jsonData =
                parseJSON(
                    elements.input.value
                );


            clearError();


            expandedNodes =
                new WeakSet();


            searchTerm = "";


            if (elements.search) {

                elements.search.value = "";

            }


            renderCurrentMode();

        } catch (error) {

            jsonData = null;


            showError(
                "Invalid JSON: " +
                error.message
            );

        }

    }


    /* =====================================================
       LOAD URL
    ===================================================== */

    async function loadFromURL() {

        const elements =
            getElements();


        if (!elements.urlInput) {
            return;
        }


        const url =
            elements.urlInput.value.trim();


        if (!url) {

            showError(
                "Enter a JSON URL first."
            );

            return;

        }


        try {

            clearError();


            const response =
                await fetch(url);


            if (!response.ok) {

                throw new Error(
                    "HTTP " +
                    response.status
                );

            }


            const data =
                await response.json();


            jsonData =
                data;


            if (elements.input) {

                elements.input.value =
                    JSON.stringify(
                        data,
                        null,
                        2
                    );

            }


            expandedNodes =
                new WeakSet();


            searchTerm = "";


            if (elements.search) {

                elements.search.value = "";

            }


            renderCurrentMode();

        } catch (error) {

            showError(
                "Unable to load JSON: " +
                error.message
            );

        }

    }


    /* =====================================================
       EXPAND ALL
    ===================================================== */

    function expandAll() {

        if (
            jsonData === null ||
            typeof jsonData !== "object"
        ) {
            return;
        }


        expandedNodes =
            new WeakSet();


        function walk(value) {

            if (
                value !== null &&
                typeof value === "object"
            ) {

                expandedNodes.add(
                    value
                );


                Object.values(value).forEach(
                    walk
                );

            }

        }


        walk(jsonData);


        renderTree();

    }


    /* =====================================================
       COLLAPSE ALL
    ===================================================== */

    function collapseAll() {

        expandedNodes =
            new WeakSet();


        renderTree();

    }


    /* =====================================================
       SORT OBJECT
    ===================================================== */

    function sortObject(value) {

        if (
            value === null ||
            typeof value !== "object"
        ) {

            return value;

        }


        if (Array.isArray(value)) {

            return value.map(
                sortObject
            );

        }


        const result = {};


        Object.keys(value)
            .sort(function (a, b) {

                return a.localeCompare(
                    b
                );

            })
            .forEach(function (key) {

                result[key] =
                    sortObject(
                        value[key]
                    );

            });


        return result;

    }


    function sortJSON() {

        if (jsonData === null) {
            return;
        }


        jsonData =
            sortObject(
                jsonData
            );


        const elements =
            getElements();


        if (elements.input) {

            elements.input.value =
                JSON.stringify(
                    jsonData,
                    null,
                    2
                );

        }


        renderCurrentMode();

    }


    /* =====================================================
       FORMAT INPUT
    ===================================================== */

    function formatJSON() {

        const elements =
            getElements();


        if (!elements.input) {
            return;
        }


        try {

            const data =
                parseJSON(
                    elements.input.value
                );


            jsonData =
                data;


            elements.input.value =
                JSON.stringify(
                    data,
                    null,
                    2
                );


            clearError();


            renderCurrentMode();

        } catch (error) {

            showError(
                "Invalid JSON: " +
                error.message
            );

        }

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    function applySearch() {

        const term =
            searchTerm.trim().toLowerCase();


        if (!term) {
            return;
        }


        const lines =
            document.querySelectorAll(
                ".json-tree-line"
            );


        lines.forEach(
            function (line) {

                const text =
                    line.textContent
                        .toLowerCase();


                if (
                    text.includes(term)
                ) {

                    line.classList.add(
                        "json-tree-search-match"
                    );

                }

            }
        );

    }


    function handleSearch(value) {

        searchTerm =
            String(value || "");


        if (
            currentMode === "tree" ||
            currentMode === "view"
        ) {

            renderCurrentMode();

        }

    }


    /* =====================================================
       EVENTS
    ===================================================== */

    function initEvents() {

        const elements =
            getElements();


        if (elements.input) {

            elements.input.addEventListener(
                "input",
                updateFromInput
            );

        }


        if (elements.loadButton) {

            elements.loadButton.addEventListener(
                "click",
                loadFromURL
            );

        }


        if (elements.urlInput) {

            elements.urlInput.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter"
                    ) {

                        event.preventDefault();

                        loadFromURL();

                    }

                }
            );

        }


        document
            .querySelectorAll(
                ".json-viewer-mode"
            )
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            setMode(
                                button.dataset.mode
                            );

                        }
                    );

                }
            );


        if (elements.expand) {

            elements.expand.addEventListener(
                "click",
                expandAll
            );

        }


        if (elements.collapse) {

            elements.collapse.addEventListener(
                "click",
                collapseAll
            );

        }


        if (elements.format) {

            elements.format.addEventListener(
                "click",
                formatJSON
            );

        }


        if (elements.sort) {

            elements.sort.addEventListener(
                "click",
                sortJSON
            );

        }


        if (elements.search) {

            elements.search.addEventListener(
                "input",
                function () {

                    handleSearch(
                        elements.search.value
                    );

                }
            );

        }

    }


    /* =====================================================
       INIT
    ===================================================== */

    function init() {

        initEvents();

        updateFromInput();

    }


    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }

})();
