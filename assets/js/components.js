/* =========================================
   SUPABASE
========================================= */

const SUPABASE_URL =
    "https://gsacwyixmsvwbyngvuqn.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_IF1cpxuIbtc7BqxTtbXHjQ_1xMUsVO1";


const DTOOLS_GOOGLE_CLIENT_ID =
    "774957596163-ho4nk5j1lh841f9rjvirrqihb8jeho8q.apps.googleusercontent.com";

let dtoolsGoogleOneTapNonce = null;
let dtoolsRecoveryMode = false;


let dtoolsSupabase = null;


async function loadSupabase() {

    if (
        window.supabase &&
        window.supabase.createClient
    ) {
        return;
    }


    await new Promise(function(resolve, reject) {

        const script =
            document.createElement("script");

        script.src =
            "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

        script.onload =
            resolve;

        script.onerror =
            reject;

        document.head.appendChild(
            script
        );

    });

}


async function initSupabase() {

    await loadSupabase();

    dtoolsSupabase =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_PUBLISHABLE_KEY
        );

    /*
       AUTH STATE
    */

    dtoolsSupabase.auth.onAuthStateChange(
       function (event, session) {
   
           if (
               event === "PASSWORD_RECOVERY"
           ) {
   
               dtoolsRecoveryMode =
                   true;
   
           }
   
           if (
               event === "SIGNED_OUT"
           ) {
   
               dtoolsRecoveryMode =
                   false;
   
           }
   
           updateDToolsAuthUI(
               session
           );
   
       }
   );


   const sessionResult =
    await dtoolsSupabase.auth.getSession();

   updateDToolsAuthUI(
       sessionResult.data.session
   );

}




/* ========================================= 
   DOZNI COMPONENT LOADER
========================================= */

const SITE_BASE =
    window.location.hostname.includes("github.io")
        ? "/dtools/"
        : "/";



/* =========================================
   DTOOLS SVG ICONS
========================================= */

function getDToolsIconSvg(icon) {

    const icons = {

        search: `
            <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
            >
                <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="currentColor"
                    stroke-width="2"
                ></circle>

                <path
                    d="M16.5 16.5L21 21"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                ></path>
            </svg>
        `,

        close: `
            <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
            >
                <path
                    d="M6 6L18 18"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                ></path>

                <path
                    d="M18 6L6 18"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                ></path>
            </svg>
        `,

        build: `
            <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
            >
                <path
                    d="M14.7 6.1a4 4 0 0 0-5.2 5.2l-5.9 5.9a2 2 0 1 0 2.8 2.8l5.9-5.9a4 4 0 0 0 5.2-5.2l-2.2 2.2-2-2 2.2-2.2a4 4 0 0 0-.8-.8Z"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></path>

                <path
                    d="M15.3 4.7 19.3 8.7"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                ></path>
            </svg>
        `,

        web: `
            <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
            >
                <rect
                    x="3"
                    y="4"
                    width="18"
                    height="16"
                    rx="2"
                    stroke="currentColor"
                    stroke-width="2"
                ></rect>

                <path
                    d="M3 9H21"
                    stroke="currentColor"
                    stroke-width="2"
                ></path>

                <path
                    d="M7 7H7.01M10 7H10.01"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                ></path>
            </svg>
        `,

        aspect_ratio: `
            <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
            >
                <rect
                    x="4"
                    y="4"
                    width="16"
                    height="16"
                    rx="2"
                    stroke="currentColor"
                    stroke-width="2"
                ></rect>

                <path
                    d="M8 8H11M8 8V11M16 16H13M16 16V13"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                ></path>
            </svg>
        `,

        youtube_searched_for: `
            <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
            >
                <circle
                    cx="10.5"
                    cy="10.5"
                    r="5.5"
                    stroke="currentColor"
                    stroke-width="2"
                ></circle>

                <path
                    d="M15 15L20 20"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                ></path>

                <path
                    d="M8.2 8.5L13 10.5L8.2 12.5V8.5Z"
                    fill="currentColor"
                ></path>
            </svg>
        `,

        percent: `
            <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
            >
                <path
                    d="M7 7L17 17"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                ></path>

                <circle
                    cx="7"
                    cy="7"
                    r="2.2"
                    stroke="currentColor"
                    stroke-width="2"
                ></circle>

                <circle
                    cx="17"
                    cy="17"
                    r="2.2"
                    stroke="currentColor"
                    stroke-width="2"
                ></circle>
            </svg>
        `,

        account_tree: `
            <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
            >
                <rect
                    x="4"
                    y="4"
                    width="6"
                    height="4"
                    rx="1"
                    stroke="currentColor"
                    stroke-width="2"
                ></rect>

                <rect
                    x="14"
                    y="16"
                    width="6"
                    height="4"
                    rx="1"
                    stroke="currentColor"
                    stroke-width="2"
                ></rect>

                <rect
                    x="14"
                    y="4"
                    width="6"
                    height="4"
                    rx="1"
                    stroke="currentColor"
                    stroke-width="2"
                ></rect>

                <path
                    d="M10 6H14M7 8V16C7 17.1 7.9 18 9 18H14"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></path>
            </svg>
        `

    };

    return icons[icon] || icons.build;
}



/* =========================================
   FOOTER
========================================= */

function initFooter() {

    /* =====================================
       FOOTER LOGO
    ====================================== */

    const footerLogo =
        document.querySelector(
            "#site-footer .footer-logo"
        );

    const footerLogoImage =
        document.getElementById(
            "footerLogoImage"
        );


    if (footerLogo) {

        footerLogo.href =
            SITE_BASE;

    }


    if (footerLogoImage) {

        footerLogoImage.src =
            SITE_BASE +
            "assets/icons/favicons_favicon.svg";

        footerLogoImage.alt =
            "DTools";

    }


   /* =====================================
      HOMEPAGE FILTER LINKS
   ====================================== */
   
      const filterLinks =
          document.querySelectorAll(
              "#site-footer a[data-home-filter]"
          );
      
      
      filterLinks.forEach(function (link) {
      
          const filter =
              link.getAttribute(
                  "data-home-filter"
              );
      
      
          if (!filter) {
              return;
          }
      
      
          link.href =
             SITE_BASE +
             "#tools-section";
      
      
          link.addEventListener(
             "click",
             function (event) {
         
                 /* =====================================
                    ALREADY ON HOMEPAGE
                 ====================================== */
         
                 if (
                     typeof window.setHomeToolFilter ===
                     "function"
                 ) {
         
                     event.preventDefault();
         
                     window.setHomeToolFilter(
                         filter
                     );
         
                     history.replaceState(
                         null,
                         "",
                         SITE_BASE + "#tools-section"
                     );
         
                     return;
                 }
         
         
                 /* =====================================
                    FROM TOOL / OTHER PAGE
                 ====================================== */
         
                 try {
         
                     sessionStorage.setItem(
                         "dozni-home-filter",
                         filter
                     );
         
                 } catch (error) {}
         
             }
         );
      
      });


    /* =====================================
       FOOTER INTERNAL LINKS
    ====================================== */

    const footerLinks =
        document.querySelectorAll(
            "#site-footer a[data-path]"
        );


    footerLinks.forEach(function (link) {

        const path =
            link.getAttribute("data-path");


        if (!path) {
            return;
        }


        link.href =
            SITE_BASE +
            path.replace(/^\/+/, "");

    });

}





/* =========================================
   HOME TOOL EXPLORER
========================================= */

function initHomeToolExplorer() {

    if (
        typeof window.setupHomeToolExplorer ===
        "function"
    ) {

        window.setupHomeToolExplorer();

    }

}




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

                    ${getDToolsIconSvg("search")}

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

                                ${getDToolsIconSvg(
                                     tool.icon || "build"
                                 )}

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





async function loadGoogleIdentityServices() {

    if (
        window.google &&
        window.google.accounts &&
        window.google.accounts.id
    ) {
        return;
    }

    if (window.dtoolsGoogleScriptPromise) {
        return window.dtoolsGoogleScriptPromise;
    }

    window.dtoolsGoogleScriptPromise =
        new Promise(function(resolve, reject) {

            const script =
                document.createElement("script");

            script.src =
                "https://accounts.google.com/gsi/client";

            script.async = true;
            script.defer = true;

            script.onload = resolve;
            script.onerror = reject;

            document.head.appendChild(script);

        });

    return window.dtoolsGoogleScriptPromise;
}


function generateDToolsNonce() {

    const bytes =
        new Uint8Array(32);

    crypto.getRandomValues(bytes);

    return btoa(
        String.fromCharCode.apply(
            null,
            bytes
        )
    );
}


async function sha256Base64Url(value) {

    const encoded =
        new TextEncoder().encode(value);

    const hash =
        await crypto.subtle.digest(
            "SHA-256",
            encoded
        );

    const bytes =
        new Uint8Array(hash);

    let binary = "";

    bytes.forEach(function(byte) {

        binary +=
            String.fromCharCode(byte);

    });

    return btoa(binary)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");

}


async function initGoogleOneTap() {

    if (!DTOOLS_GOOGLE_CLIENT_ID) {
        return;
    }

    if (!dtoolsSupabase) {
        return;
    }

    const sessionResult =
        await dtoolsSupabase.auth.getSession();

    if (sessionResult.data.session) {
        return;
    }

    try {

        await loadGoogleIdentityServices();

        const rawNonce =
            generateDToolsNonce();

        const hashedNonce =
            await sha256Base64Url(
                rawNonce
            );

        dtoolsGoogleOneTapNonce =
            rawNonce;

        window.google.accounts.id.initialize({

            client_id:
                DTOOLS_GOOGLE_CLIENT_ID,

            context:
                "signin",

            auto_select:
                false,

            nonce:
                hashedNonce,

            use_fedcm_for_prompt:
                true,

            itp_support:
                true,

            callback:
                async function(response) {

                    try {

                        if (
                            !response ||
                            !response.credential
                        ) {
                            return;
                        }

                        const result =
                            await dtoolsSupabase
                                .auth
                                .signInWithIdToken({
                                    provider:
                                        "google",

                                    token:
                                        response.credential,

                                    nonce:
                                        dtoolsGoogleOneTapNonce
                                });

                        if (result.error) {
                            throw result.error;
                        }

                    } catch (error) {

                        console.error(
                            "Google One Tap error:",
                            error
                        );

                    } finally {

                        dtoolsGoogleOneTapNonce =
                            null;

                    }

                }

        });

        window.google.accounts.id.prompt();

    } catch (error) {

        console.error(
            "Google One Tap initialization error:",
            error
        );

    }

}




/* =========================================
   DTOOLS AUTH UI
========================================= */

async function updateDToolsAuthUI(session) {

    const startButton =
        document.getElementById(
            "startFreeButton"
        );

    const signupView =
        document.getElementById(
            "dtoolsSignupView"
        );

    const loginView =
        document.getElementById(
            "dtoolsLoginView"
        );

    const forgotView =
        document.getElementById(
            "dtoolsForgotView"
        );

    const resetView =
        document.getElementById(
            "dtoolsResetView"
        );

    const accountView =
        document.getElementById(
            "dtoolsAccountView"
        );

    const accountEmail =
        document.getElementById(
            "dtoolsAccountEmail"
        );

    const accountName =
        document.getElementById(
            "dtoolsAccountName"
        );


    if (!startButton) {
        return;
    }


    /*
       PASSWORD RECOVERY
    */

    if (
        dtoolsRecoveryMode
    ) {

        startButton.textContent =
            "Start Free";

        startButton.dataset.authenticated =
            "false";


        if (signupView) {
            signupView.style.display =
                "none";
        }

        if (loginView) {
            loginView.style.display =
                "none";
        }

        if (forgotView) {
            forgotView.style.display =
                "none";
        }

        if (resetView) {
            resetView.style.display =
                "block";
        }

        if (accountView) {
            accountView.style.display =
                "none";
        }

        return;
    }


    /*
       SIGNED IN
    */

    if (session) {

        startButton.textContent =
            "Account";

        startButton.dataset.authenticated =
            "true";


        if (signupView) {
            signupView.style.display =
                "none";
        }

        if (loginView) {
            loginView.style.display =
                "none";
        }

        if (forgotView) {
            forgotView.style.display =
                "none";
        }

        if (resetView) {
            resetView.style.display =
                "none";
        }

        if (accountView) {
            accountView.style.display =
                "block";
        }


        if (accountEmail) {

            accountEmail.textContent =
                session.user.email || "";

        }


        if (accountName) {

            const name =
                session.user.user_metadata
                    ?.full_name ||
                session.user.user_metadata
                    ?.name ||
                "DTools User";

            accountName.textContent =
                name;

        }

        return;
    }


    /*
       SIGNED OUT
    */

    startButton.textContent =
        "Start Free";

    startButton.dataset.authenticated =
        "false";


    if (signupView) {
        signupView.style.display =
            "block";
    }

    if (loginView) {
        loginView.style.display =
            "none";
    }

    if (forgotView) {
        forgotView.style.display =
            "none";
    }

    if (resetView) {
        resetView.style.display =
            "none";
    }

    if (accountView) {
        accountView.style.display =
            "none";
    }

}



/* =========================================
   GOOGLE OAUTH
========================================= */

async function signInWithGoogleOAuth() {

    if (!dtoolsSupabase) {
        await initSupabase();
    }

    const result =
        await dtoolsSupabase.auth.signInWithOAuth({

            provider:
                "google",

            options: {

                redirectTo:
                    window.location.origin +
                    SITE_BASE

            }

        });

    if (result.error) {
        throw result.error;
    }

}



/* =========================================
   START FREE / SUPABASE AUTH
========================================= */

function initStartFree() {

    const openButton =
        document.getElementById(
            "startFreeButton"
        );

    const modal =
        document.getElementById(
            "startFreeModal"
        );

    const closeButton =
        document.getElementById(
            "startFreeClose"
        );

    const form =
        document.getElementById(
            "startFreeForm"
        );

    const status =
        document.getElementById(
            "startFreeStatus"
        );

    const submitButton =
        document.getElementById(
            "startFreeSubmit"
        );

    const logoutButton =
        document.getElementById(
            "dtoolsLogoutButton"
        );


    if (
        !openButton ||
        !modal ||
        !closeButton ||
        !form ||
        !status ||
        !submitButton
    ) {

        console.error(
            "DTools auth elements are missing."
        );

        return;

    }


    /*
       PRIVACY / TERMS
    */

    const privacyLink =
        document.getElementById(
            "startFreePrivacyLink"
        );

    const termsLink =
        document.getElementById(
            "startFreeTermsLink"
        );


    if (privacyLink) {

        privacyLink.href =
            SITE_BASE +
            "privacy-policy/";

        privacyLink.target =
            "_blank";

        privacyLink.rel =
            "noopener";

    }


    if (termsLink) {

        termsLink.href =
            SITE_BASE +
            "terms-and-conditions/";

        termsLink.target =
            "_blank";

        termsLink.rel =
            "noopener";

    }


    /*
       VIEW ELEMENTS
    */

    const signupView =
        document.getElementById(
            "dtoolsSignupView"
        );

    const loginView =
        document.getElementById(
            "dtoolsLoginView"
        );

    const forgotView =
        document.getElementById(
            "dtoolsForgotView"
        );

    const resetView =
        document.getElementById(
            "dtoolsResetView"
        );

    const accountView =
        document.getElementById(
            "dtoolsAccountView"
        );


    /*
       LOGIN ELEMENTS
    */

    const loginForm =
        document.getElementById(
            "dtoolsLoginForm"
        );

    const loginEmail =
        document.getElementById(
            "dtoolsLoginEmail"
        );

    const loginPassword =
        document.getElementById(
            "dtoolsLoginPassword"
        );

    const loginStatus =
        document.getElementById(
            "dtoolsLoginStatus"
        );

    const loginSubmit =
        document.getElementById(
            "dtoolsLoginSubmit"
        );


    /*
       FORGOT PASSWORD
    */

    const forgotForm =
        document.getElementById(
            "dtoolsForgotForm"
        );

    const forgotEmail =
        document.getElementById(
            "dtoolsForgotEmail"
        );

    const forgotStatus =
        document.getElementById(
            "dtoolsForgotStatus"
        );

    const forgotSubmit =
        document.getElementById(
            "dtoolsForgotSubmit"
        );


    /*
       RESET PASSWORD
    */

    const resetForm =
        document.getElementById(
            "dtoolsResetForm"
        );

    const resetPassword =
        document.getElementById(
            "dtoolsResetPassword"
        );

    const resetPasswordConfirm =
        document.getElementById(
            "dtoolsResetPasswordConfirm"
        );

    const resetStatus =
        document.getElementById(
            "dtoolsResetStatus"
        );

    const resetSubmit =
        document.getElementById(
            "dtoolsResetSubmit"
        );


    /*
       GOOGLE BUTTONS
    */

    const googleSignupButton =
        document.getElementById(
            "dtoolsGoogleSignupButton"
        );

    const googleLoginButton =
        document.getElementById(
            "dtoolsGoogleLoginButton"
        );


    /*
       VIEW SWITCH BUTTONS
    */

    const showLoginButton =
        document.getElementById(
            "dtoolsShowLogin"
        );

    const showSignupButton =
        document.getElementById(
            "dtoolsShowSignup"
        );

    const forgotPasswordLink =
        document.getElementById(
            "dtoolsForgotPasswordLink"
        );

    const backToLoginButton =
        document.getElementById(
            "dtoolsBackToLogin"
        );


    /*
       STATUS HELPER
    */

    function setStatus(
        element,
        message,
        type
    ) {

        if (!element) {
            return;
        }

        element.textContent =
            message || "";

        element.className =
            "dtools-auth-status" +
            (
                type
                    ? " " + type
                    : ""
            );

    }


    /*
       VIEW SWITCHING
    */

    function showView(
        viewName
    ) {

        if (signupView) {

            signupView.style.display =
                viewName === "signup"
                    ? "block"
                    : "none";

        }

        if (loginView) {

            loginView.style.display =
                viewName === "login"
                    ? "block"
                    : "none";

        }

        if (forgotView) {

            forgotView.style.display =
                viewName === "forgot"
                    ? "block"
                    : "none";

        }

        if (resetView) {

            resetView.style.display =
                viewName === "reset"
                    ? "block"
                    : "none";

        }

        if (accountView) {

            accountView.style.display =
                viewName === "account"
                    ? "block"
                    : "none";

        }


        const title =
            document.getElementById(
                "startFreeTitle"
            );


        if (title) {

            if (viewName === "signup") {

                title.textContent =
                    "Create your free DTools account";

            }

            if (viewName === "login") {

                title.textContent =
                    "Welcome back to DTools";

            }

            if (viewName === "forgot") {

                title.textContent =
                    "Reset your DTools password";

            }

            if (viewName === "reset") {

                title.textContent =
                    "Choose a new password";

            }

            if (viewName === "account") {

                title.textContent =
                    "Your DTools account";

            }

        }

    }


    /*
       CLEAR STATUS
    */

    function clearStatus() {

        setStatus(
            status,
            "",
            ""
        );

        setStatus(
            loginStatus,
            "",
            ""
        );

        setStatus(
            forgotStatus,
            "",
            ""
        );

        setStatus(
            resetStatus,
            "",
            ""
        );

    }


    /*
       OPEN MODAL
    */

    function openModal() {

        modal.classList.add(
            "active"
        );

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";


        clearStatus();


        if (dtoolsRecoveryMode) {

            showView(
                "reset"
            );

            return;

        }


        if (
            openButton.dataset.authenticated ===
            "true"
        ) {

            showView(
                "account"
            );

            return;

        }


        showView(
            "signup"
        );

    }


    /*
       CLOSE MODAL
    */

    function closeModal() {

        modal.classList.remove(
            "active"
        );

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

    }


    /*
       SIGN UP → LOGIN
    */

    if (showLoginButton) {

        showLoginButton.addEventListener(
            "click",
            function() {

                clearStatus();

                showView(
                    "login"
                );

            }
        );

    }


    /*
       LOGIN → SIGN UP
    */

    if (showSignupButton) {

        showSignupButton.addEventListener(
            "click",
            function() {

                clearStatus();

                showView(
                    "signup"
                );

            }
        );

    }


    /*
       LOGIN → FORGOT PASSWORD
    */

    if (forgotPasswordLink) {

        forgotPasswordLink.addEventListener(
            "click",
            function() {

                clearStatus();


                if (
                    loginEmail &&
                    forgotEmail &&
                    loginEmail.value.trim()
                ) {

                    forgotEmail.value =
                        loginEmail.value.trim();

                }


                showView(
                    "forgot"
                );

            }
        );

    }


    /*
       FORGOT → LOGIN
    */

    if (backToLoginButton) {

        backToLoginButton.addEventListener(
            "click",
            function() {

                clearStatus();

                showView(
                    "login"
                );

            }
        );

    }


    /*
       GOOGLE LOGIN
    */

    async function handleGoogleLogin(
        button,
        errorElement
    ) {

        if (!button) {
            return;
        }

        button.disabled =
            true;


        try {

            await signInWithGoogleOAuth();

        } catch (error) {

            setStatus(
                errorElement,
                error.message ||
                    "Unable to continue with Google.",
                "error"
            );

            button.disabled =
                false;

        }

    }


    if (googleSignupButton) {

        googleSignupButton.addEventListener(
            "click",
            function() {

                handleGoogleLogin(
                    googleSignupButton,
                    status
                );

            }
        );

    }


    if (googleLoginButton) {

        googleLoginButton.addEventListener(
            "click",
            function() {

                handleGoogleLogin(
                    googleLoginButton,
                    loginStatus
                );

            }
        );

    }


    /*
       OPEN BUTTON
    */

    openButton.addEventListener(
        "click",
        async function() {

            if (!dtoolsSupabase) {
                await initSupabase();
            }


            const result =
                await dtoolsSupabase.auth
                    .getSession();


            updateDToolsAuthUI(
                result.data.session
            );


            openModal();

        }
    );


    /*
       CLOSE BUTTON
    */

    closeButton.addEventListener(
        "click",
        closeModal
    );


    /*
       CLICK OUTSIDE
    */

    modal.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                modal
            ) {

                closeModal();

            }

        }
    );


    /*
       ESC
    */

    document.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "active"
                )
            ) {

                closeModal();

            }

        }
    );


    /*
       SIGN UP
    */

    form.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            setStatus(
                status,
                "Creating your account...",
                "loading"
            );


            submitButton.disabled =
                true;


            try {

                if (!dtoolsSupabase) {
                    await initSupabase();
                }


                const fullName =
                    document
                        .getElementById(
                            "startFreeName"
                        )
                        .value
                        .trim();


                const email =
                    document
                        .getElementById(
                            "startFreeEmail"
                        )
                        .value
                        .trim()
                        .toLowerCase();


                const password =
                    document
                        .getElementById(
                            "startFreePassword"
                        )
                        .value;


                const termsAccepted =
                    document
                        .getElementById(
                            "startFreeTerms"
                        )
                        .checked;


                const marketingConsent =
                    document
                        .getElementById(
                            "startFreeMarketing"
                        )
                        .checked;


                const partnerConsent =
                    document
                        .getElementById(
                            "startFreePartner"
                        )
                        .checked;


                const interests =
                    Array.from(
                        form.querySelectorAll(
                            'input[name="interest"]:checked'
                        )
                    )
                    .map(function(input) {

                        return input.value;

                    });


                if (!fullName) {

                    throw new Error(
                        "Please enter your name."
                    );

                }


                if (!email) {

                    throw new Error(
                        "Please enter your email."
                    );

                }


                if (
                    password.length < 6
                ) {

                    throw new Error(
                        "Password must be at least 6 characters."
                    );

                }


                if (!termsAccepted) {

                    throw new Error(
                        "Please accept the Privacy Policy and Terms & Conditions."
                    );

                }


                const result =
                    await dtoolsSupabase.auth
                        .signUp({

                            email:
                                email,

                            password:
                                password,

                            options: {

                                emailRedirectTo:
                                    window.location.origin +
                                    SITE_BASE,

                                data: {

                                    full_name:
                                        fullName,

                                    interests:
                                        interests,

                                    marketing_consent:
                                        marketingConsent,

                                    partner_consent:
                                        partnerConsent,

                                    consent_version:
                                        "2026-10-06",

                                    consent_at:
                                        new Date()
                                            .toISOString()

                                }

                            }

                        });


                if (result.error) {
                    throw result.error;
                }


                form.reset();


                if (
                    result.data.user &&
                    result.data.session
                ) {

                    setStatus(
                        status,
                        "Account created successfully. You are signed in.",
                        "success"
                    );


                    updateDToolsAuthUI(
                        result.data.session
                    );


                } else {

                    setStatus(
                        status,
                        "Account created. Please check your email to confirm your account.",
                        "success"
                    );

                }


            } catch (error) {

                setStatus(
                    status,
                    error.message ||
                        "Unable to create your account.",
                    "error"
                );

            } finally {

                submitButton.disabled =
                    false;

            }

        }
    );


    /*
       LOGIN
    */

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            async function(event) {

                event.preventDefault();


                setStatus(
                    loginStatus,
                    "Signing you in...",
                    "loading"
                );


                loginSubmit.disabled =
                    true;


                try {

                    if (!dtoolsSupabase) {
                        await initSupabase();
                    }


                    const email =
                        loginEmail.value
                            .trim()
                            .toLowerCase();


                    const password =
                        loginPassword.value;


                    if (!email) {

                        throw new Error(
                            "Please enter your email."
                        );

                    }


                    if (!password) {

                        throw new Error(
                            "Please enter your password."
                        );

                    }


                    const result =
                        await dtoolsSupabase.auth
                            .signInWithPassword({

                                email:
                                    email,

                                password:
                                    password

                            });


                    if (result.error) {

                        throw result.error;

                    }


                    loginForm.reset();


                    updateDToolsAuthUI(
                        result.data.session
                    );


                    showView(
                        "account"
                    );


                } catch (error) {

                    let message =
                        error.message ||
                        "Unable to sign in.";


                    if (
                        message
                            .toLowerCase()
                            .includes(
                                "email not confirmed"
                            )
                    ) {

                        message =
                            "Please confirm your email before signing in.";

                    }


                    setStatus(
                        loginStatus,
                        message,
                        "error"
                    );

                } finally {

                    loginSubmit.disabled =
                        false;

                }

            }
        );

    }


    /*
       FORGOT PASSWORD
    */

    if (forgotForm) {

        forgotForm.addEventListener(
            "submit",
            async function(event) {

                event.preventDefault();


                setStatus(
                    forgotStatus,
                    "Sending reset link...",
                    "loading"
                );


                forgotSubmit.disabled =
                    true;


                try {

                    if (!dtoolsSupabase) {
                        await initSupabase();
                    }


                    const email =
                        forgotEmail.value
                            .trim()
                            .toLowerCase();


                    if (!email) {

                        throw new Error(
                            "Please enter your email."
                        );

                    }


                    const result =
                        await dtoolsSupabase.auth
                            .resetPasswordForEmail(
                                email,
                                {

                                    redirectTo:
                                        window.location.origin +
                                        SITE_BASE

                                }
                            );


                    if (result.error) {
                        throw result.error;
                    }


                    setStatus(
                        forgotStatus,
                        "Reset link sent. Please check your email.",
                        "success"
                    );


                } catch (error) {

                    setStatus(
                        forgotStatus,
                        error.message ||
                            "Unable to send the reset email.",
                        "error"
                    );

                } finally {

                    forgotSubmit.disabled =
                        false;

                }

            }
        );

    }


    /*
       RESET PASSWORD
    */

    if (resetForm) {

        resetForm.addEventListener(
            "submit",
            async function(event) {

                event.preventDefault();


                setStatus(
                    resetStatus,
                    "Updating your password...",
                    "loading"
                );


                resetSubmit.disabled =
                    true;


                try {

                    if (!dtoolsSupabase) {
                        await initSupabase();
                    }


                    const newPassword =
                        resetPassword.value;


                    const confirmPassword =
                        resetPasswordConfirm.value;


                    if (
                        newPassword.length < 6
                    ) {

                        throw new Error(
                            "Password must be at least 6 characters."
                        );

                    }


                    if (
                        newPassword !==
                        confirmPassword
                    ) {

                        throw new Error(
                            "Passwords do not match."
                        );

                    }


                    const result =
                        await dtoolsSupabase.auth
                            .updateUser({

                                password:
                                    newPassword

                            });


                    if (result.error) {
                        throw result.error;
                    }


                    resetForm.reset();


                    dtoolsRecoveryMode =
                        false;


                    setStatus(
                        resetStatus,
                        "Password updated successfully.",
                        "success"
                    );


                    setTimeout(
                        async function() {

                            const sessionResult =
                                await dtoolsSupabase
                                    .auth
                                    .getSession();


                            updateDToolsAuthUI(
                                sessionResult
                                    .data
                                    .session
                            );


                            showView(
                                "account"
                            );

                        },
                        700
                    );


                } catch (error) {

                    setStatus(
                        resetStatus,
                        error.message ||
                            "Unable to update your password.",
                        "error"
                    );

                } finally {

                    resetSubmit.disabled =
                        false;

                }

            }
        );

    }


    /*
       SIGN OUT
    */

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            async function() {

                logoutButton.disabled =
                    true;


                try {

                    const result =
                        await dtoolsSupabase.auth
                            .signOut();


                    if (result.error) {
                        throw result.error;
                    }


                    closeModal();


                } catch (error) {

                    console.error(
                        "Logout error:",
                        error
                    );

                } finally {

                    logoutButton.disabled =
                        false;

                }

            }
        );

    }


    /*
       PASSWORD RECOVERY PAGE
    */

    if (dtoolsRecoveryMode) {

        openModal();

    }

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
      
          await initSupabase();
      
          initStartFree();

          setTimeout(
             initGoogleOneTap,
             800
          );
      
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

   initFooter();


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

   initHomeToolExplorer();

}


document.addEventListener(
    "DOMContentLoaded",
    initComponents
);
