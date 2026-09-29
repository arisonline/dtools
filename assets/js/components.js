async function loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) return;

    try {

        const response = await fetch(file);

        if (!response.ok) {
            throw new Error("Failed to load " + file);
        }

        element.innerHTML = await response.text();

    } catch (error) {

        console.error("Component loading error:", error);

    }
}


function initTheme() {

    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) {
        console.warn("Theme toggle button not found.");
        return;
    }

    themeToggle.onclick = () => {

        document.body.classList.toggle("dark");

    };

}


async function initComponents() {

    // Load header first
    await loadComponent(
        "site-header",
        "components/header.html"
    );

    // Header now exists, so initialize theme button
    initTheme();


    await loadComponent(
        "features",
        "components/features.html"
    );


    await loadComponent(
        "related-tools",
        "components/related-tools.html"
    );


    await loadComponent(
      "faq",
      "components/faq.html"
    );


    // Load footer
    await loadComponent(
        "site-footer",
        "components/footer.html"
    );

}


document.addEventListener(
    "DOMContentLoaded",
    initComponents
);
