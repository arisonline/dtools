/* =========================================
   DOZNI COMPONENT LOADER
========================================= */

const SITE_BASE =
    window.location.hostname.includes("github.io")
        ? "/dtools/"
        : "/";




function initSiteLogo() {

    const logo = document.getElementById("siteLogo");
    const logoImage = document.getElementById("siteLogoImage");

    if (!logo) {
        return;
    }

    const siteBase =
        window.location.hostname.includes("github.io")
            ? "/dtools/"
            : "/";

    /* Logo → Homepage */

    logo.href = siteBase;


    /* Logo Image */

    if (logoImage) {
        logoImage.src =
            siteBase +
            "assets/icons/favicons_favicon.svg";

        logoImage.alt = "ToolFlow";
    }

}

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
   TOOL SEARCH
========================================= */

function initToolSearch() {

    const searchButton =
        document.getElementById(
            "toolSearchButton"
        );


    const searchOverlay =
        document.getElementById(
            "toolSearchOverlay"
        );


    const searchInput =
        document.getElementById(
            "toolSearchInput"
        );


    const searchResults =
        document.getElementById(
            "toolSearchResults"
        );


    const searchClose =
        document.getElementById(
            "toolSearchClose"
        );


    if (
        !searchButton ||
        !searchOverlay ||
        !searchInput ||
        !searchResults ||
        !searchClose
    ) {

        return;

    }


    /* =====================================
       SITE BASE
    ====================================== */

    const siteBase =
        window.location.hostname.includes("github.io")
            ? "/dtools/"
            : "/";


    /* =====================================
       OPEN
    ====================================== */

    function openSearch() {

        searchOverlay.classList.add(
            "active"
        );

        searchOverlay.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";


        setTimeout(() => {

            searchInput.focus();

        }, 50);

    }


    /* =====================================
       CLOSE
    ====================================== */

    function closeSearch() {

        searchOverlay.classList.remove(
            "active"
        );

        searchOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";


        searchInput.value = "";


        renderSearchResults(
            ""
        );

    }


    /* =====================================
       SEARCH
    ====================================== */

    function renderSearchResults(query) {

        const cleanQuery =
            query
                .trim()
                .toLowerCase();


        /* INITIAL STATE */

        if (!cleanQuery) {

            searchResults.innerHTML = `
                <div class="tool-search-empty">

                    <span class="material-icons">
                        search
                    </span>

                    <p>
                        Search for a tool by name,
                        category or description.
                    </p>

                </div>
            `;

            return;

        }


        /* TOOLS DATA */

        const source =
            Array.isArray(window.toolsData)
                ? window.toolsData
                : (
                    typeof toolsData !== "undefined"
                        ? toolsData
                        : []
                );


        /* FILTER */

        const results =
            source
                .filter(tool => {

                    const name =
                        String(
                            tool.name || ""
                        ).toLowerCase();


                    const description =
                        String(
                            tool.description || ""
                        ).toLowerCase();


                    const category =
                        String(
                            tool.category || ""
                        ).toLowerCase();


                    const id =
                        String(
                            tool.id || ""
                        ).toLowerCase();


                    return (
                        name.includes(cleanQuery) ||
                        description.includes(cleanQuery) ||
                        category.includes(cleanQuery) ||
                        id.includes(cleanQuery)
                    );

                })
                .slice(0, 12);


        /* NO RESULTS */

        if (!results.length) {

            searchResults.innerHTML = `
                <div class="tool-search-no-results">

                    No tools found for
                    "<strong>${escapeSearchText(query)}</strong>"

                </div>
            `;

            return;

        }


        /* RESULTS */

        searchResults.innerHTML =
            results
                .map(tool => {

                    const relativeUrl =
                        String(
                            tool.url || ""
                        )
                        .replace(
                            /^\/+/,
                            ""
                        );


                    const url =
                        siteBase +
                        relativeUrl;


                    return `

                        <a
                            href="${url}"
                            class="tool-search-result"
                        >

                            <div
                                class="tool-search-result-icon"
                            >

                                <span
                                    class="material-icons"
                                >
                                    ${escapeSearchText(
                                        tool.icon || "build"
                                    )}
                                </span>

                            </div>


                            <div
                                class="tool-search-result-content"
                            >

                                <div
                                    class="tool-search-result-name"
                                >
                                    ${escapeSearchText(
                                        tool.name || "Tool"
                                    )}
                                </div>


                                <div
                                    class="tool-search-result-description"
                                >
                                    ${escapeSearchText(
                                        tool.description || ""
                                    )}
                                </div>


                                <div
                                    class="tool-search-result-category"
                                >
                                    ${escapeSearchText(
                                        tool.category || ""
                                    )}
                                </div>

                            </div>

                        </a>

                    `;

                })
                .join("");

    }


    /* =====================================
       ESCAPE
    ====================================== */

    function escapeSearchText(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    /* =====================================
       EVENTS
    ====================================== */

    searchButton.addEventListener(
        "click",
        openSearch
    );


    searchClose.addEventListener(
        "click",
        closeSearch
    );


    searchInput.addEventListener(
        "input",
        event => {

            renderSearchResults(
                event.target.value
            );

        }
    );


    /* Click outside modal */

    searchOverlay.addEventListener(
        "click",
        event => {

            if (
                event.target === searchOverlay
            ) {

                closeSearch();

            }

        }
    );


    /* ESC */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                searchOverlay.classList.contains("active")
            ) {

                closeSearch();

                return;

            }


            /* Ctrl + K / Cmd + K */

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                openSearch();

            }

        }
    );


    /* Initial state */

    renderSearchResults("");

}




/* =========================================
   INITIALIZE COMPONENTS
========================================= */

async function initComponents() {


       const headerLoaded =
          await loadComponent(
              "site-header",
              "header.html"
          );
      
      if (headerLoaded) {

          initSiteLogo();
      
          initTheme();
      
          initToolSearch();
      
      }


    /*
       THIS IS IMPORTANT
    */

    await loadComponent(
        "tool-content-component",
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
