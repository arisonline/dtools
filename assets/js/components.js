/* =========================================
   LOAD COMPONENT
========================================= */

async function loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) {
        console.warn("Missing component:", id);
        return false;
    }

    try {

        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(
                "Failed to load " + file +
                " - HTTP " + response.status
            );
        }

        element.innerHTML = await response.text();

        console.log("Component loaded:", file);

        return true;

    } catch (error) {

        console.error(
            "Component error:",
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
        console.warn("Theme toggle button not found.");
        return;
    }

    themeToggle.onclick = () => {

        document.body.classList.toggle("dark");

    };

}


/* =========================================
   INITIALIZE COMPONENTS
========================================= */

async function initComponents() {

    /* HEADER */

    await loadComponent(
        "site-header",
        "components/header.html"
    );

    initTheme();


    /* FEATURES */

    await loadComponent(
        "features",
        "components/features.html"
    );


    /* RELATED TOOLS */

    await loadComponent(
        "related-tools",
        "components/related-tools.html"
    );


    /* FAQ */

    const faqLoaded = await loadComponent(
        "faq",
        "components/faq.html"
    );


    /* FOOTER */

    await loadComponent(
        "site-footer",
        "components/footer.html"
    );


    /* =====================================
       START TOOLS AFTER FAQ IS LOADED
    ===================================== */

    if (faqLoaded) {

        if (typeof initTools === "function") {

            console.log("Starting tools.js...");

            initTools();

        } else {

            console.error(
                "initTools() was not found. Check tools.js."
            );

        }

    }

}


/* =========================================
   START
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    initComponents
);
