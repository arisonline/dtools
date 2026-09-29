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


async function initComponents() {

    await loadComponent(
        "site-header",
        "/components/header.html"
    );

    await loadComponent(
        "site-footer",
        "/components/footer.html"
    );

}


document.addEventListener(
    "DOMContentLoaded",
    initComponents
);
