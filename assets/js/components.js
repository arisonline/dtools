/* =========================================
   LOAD COMPONENT
========================================= */

async function loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) {
        console.warn("Component container not found:", id);
        return false;
    }

    try {

        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(
                `Failed to load ${file} (${response.status})`
            );
        }

        const html = await response.text();

        element.innerHTML = html;

        console.log("Loaded:", file);

        return true;

    } catch (error) {

        console.error(
            "Component loading error:",
            file,
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


    themeToggle.onclick = () => {

        document.body.classList.toggle("dark");

    };

}


/* =========================================
   LOAD ALL COMPONENTS
========================================= */

async function initComponents() {

    /* -------------------------------------
       HEADER
    ------------------------------------- */

    await loadComponent(
        "site-header",
        "components/header.html"
    );


    /* Header exists now */

    initTheme();


    /* -------------------------------------
       FEATURES
    ------------------------------------- */

    await loadComponent(
        "features",
        "components/features.html"
    );


    /* -------------------------------------
       RELATED TOOLS
    ------------------------------------- */

    await loadComponent(
        "related-tools",
        "components/related-tools.html"
    );


    /* -------------------------------------
       FAQ
    ------------------------------------- */

    await loadComponent(
        "faq",
        "components/faq.html"
    );


    /* -------------------------------------
       FOOTER
    ------------------------------------- */

    await loadComponent(
        "site-footer",
        "components/footer.html"
    );


    /* -------------------------------------
       IMPORTANT
       All components now exist.
    ------------------------------------- */

    if (typeof initTools === "function") {

        initTools();

    }

}


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    initComponents
);
