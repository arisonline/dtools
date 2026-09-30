/* =========================================
   DOZNI COMPONENT LOADER
========================================= */

const SITE_BASE =
    window.location.hostname.includes("github.io")
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

        const url =
            SITE_BASE +
            "components/" +
            file;


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "HTTP " +
                response.status +
                " - " +
                url
            );

        }


        element.innerHTML =
            await response.text();


        console.log(
            "Component loaded:",
            url
        );


        return true;

    } catch (error) {

        console.error(
            "Component error:",
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
        document.getElementById(
            "themeToggle"
        );


    if (!themeToggle) {

        return;

    }


    themeToggle.onclick = () => {

        document.body.classList.toggle(
            "dark"
        );


        localStorage.setItem(
            "dozni-theme",
            document.body.classList.contains("dark")
                ? "dark"
                : "light"
        );

    };


    if (
        localStorage.getItem(
            "dozni-theme"
        ) === "dark"
    ) {

        document.body.classList.add(
            "dark"
        );

    }

}


/* =========================================
   INITIALIZE COMPONENTS
========================================= */

async function initComponents() {


    await loadComponent(
        "site-header",
        "header.html"
    );


    initTheme();


    /*
       THIS IS IMPORTANT
    */

    await loadComponent(
        "tool-content",
        "tool-content.html"
    );


    await loadComponent(
        "features",
        "features.html"
    );


    await loadComponent(
        "related-tools",
        "related-tools.html"
    );


    await loadComponent(
        "faq",
        "faq.html"
    );


    await loadComponent(
        "site-footer",
        "footer.html"
    );


    /*
       tools.js must already be loaded
    */

    if (
        typeof initTools ===
        "function"
    ) {

        initTools();

    } else {

        console.error(
            "initTools() was not found."
        );

    }

}


document.addEventListener(
    "DOMContentLoaded",
    initComponents
);
