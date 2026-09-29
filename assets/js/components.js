/* =========================================
   DTools - UNIVERSAL COMPONENT LOADER
========================================= */


/* =========================================
   SITE BASE PATH
========================================= */

/*
   GitHub Pages:
   https://arisonline.github.io/dtools/
   
   Custom domain:
   https://dtools.dozni.com/
*/

const SITE_BASE =
    location.hostname.includes("github.io")
        ? "/dtools/"
        : "/";


/* =========================================
   LOAD COMPONENT
========================================= */

async function loadComponent(id, file) {

    const element =
        document.getElementById(id);

    if (!element) {

        console.warn(
            "Missing component:",
            id
        );

        return false;
    }


    try {

        /*
           Always load components from the
           correct DTools root directory.
        */

        const componentURL =
            SITE_BASE + "components/" + file;


        console.log(
            "Loading component:",
            componentURL
        );


        const response =
            await fetch(componentURL);


        if (!response.ok) {

            throw new Error(
                "Failed to load " +
                componentURL +
                " - HTTP " +
                response.status
            );

        }


        element.innerHTML =
            await response.text();


        console.log(
            "Component loaded:",
            componentURL
        );


        return true;


    } catch (error) {

        console.error(
            "Component error:",
            componentURL,
            error
        );


        return false;

    }

}


/* =========================================
   THEME
========================================= */

function initTheme() {

    const themeToggle =
        document.getElementById("themeToggle");


    if (!themeToggle) {

        console.warn(
            "Theme toggle button not found."
        );

        return;

    }


    /*
       Remove previous click handler
       before adding a new one.
    */

    themeToggle.onclick = null;


    themeToggle.onclick = () => {

        document.body.classList.toggle("dark");


        /*
           Save user's theme preference.
        */

        const isDark =
            document.body.classList.contains("dark");


        localStorage.setItem(
            "dtools-theme",
            isDark ? "dark" : "light"
        );

    };


    /*
       Restore saved theme.
    */

    const savedTheme =
        localStorage.getItem("dtools-theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

    } else {

        document.body.classList.remove("dark");

    }

}


/* =========================================
   INITIALIZE COMPONENTS
========================================= */

async function initComponents() {


    console.log(
        "DTools components initializing..."
    );


    /* =====================================
       HEADER
    ===================================== */

    await loadComponent(
        "site-header",
        "header.html"
    );


    /*
       Header is now loaded,
       so initialize theme button.
    */

    initTheme();


    /* =====================================
       TOOL CONTENT
    ===================================== */

    await loadComponent(
        "tool-content",
        "tool-content.html"
    );


    /* =====================================
       FEATURES
    ===================================== */

    await loadComponent(
        "features",
        "features.html"
    );


    /* =====================================
       RELATED TOOLS
    ===================================== */

    await loadComponent(
        "related-tools",
        "related-tools.html"
    );


    /* =====================================
       FAQ
    ===================================== */

    await loadComponent(
        "faq",
        "faq.html"
    );


    /* =====================================
       FOOTER
    ===================================== */

    await loadComponent(
        "site-footer",
        "footer.html"
    );


    /* =====================================
       START TOOLS AFTER COMPONENTS LOAD
    ===================================== */

    if (
        typeof initTools === "function"
    ) {

        console.log(
            "Starting tools.js..."
        );


        initTools();


    } else {

        console.warn(
            "initTools() was not found. " +
            "This is okay if this page does not use tools.js."
        );

    }


    /* =====================================
       COMPONENTS READY
    ===================================== */

    console.log(
        "DTools components initialized successfully."
    );

}


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    initComponents
);
