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

    const form =
        document.getElementById(
            "startFreeForm"
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
       SIGNED IN
    */

    if (session) {

        startButton.textContent =
            "Account";

        startButton.dataset.authenticated =
            "true";


        if (form) {

            form.style.display =
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
                    ?.full_name || "DTools User";

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


    if (form) {

        form.style.display =
            "block";

    }


    if (accountView) {

        accountView.style.display =
            "none";

    }

}




/* =========================================
   START FREE / SUPABASE AUTH
========================================= */

function initStartFree() {

    const openButton =
        document.getElementById("startFreeButton");

    const modal =
        document.getElementById("startFreeModal");

    const closeButton =
        document.getElementById("startFreeClose");

    const form =
        document.getElementById("startFreeForm");

    const status =
        document.getElementById("startFreeStatus");

    const submitButton =
        document.getElementById("startFreeSubmit");

    const logoutButton =
        document.getElementById("dtoolsLogoutButton");

    if (
        !openButton ||
        !modal ||
        !closeButton ||
        !form ||
        !status ||
        !submitButton
    ) {
        return;
    }

    const privacyLink =
        document.getElementById("startFreePrivacyLink");

    const termsLink =
        document.getElementById("startFreeTermsLink");

    if (privacyLink) {
        privacyLink.href =
            SITE_BASE + "privacy-policy/";
        privacyLink.target = "_blank";
        privacyLink.rel = "noopener";
    }

    if (termsLink) {
        termsLink.href =
            SITE_BASE + "terms-and-conditions/";
        termsLink.target = "_blank";
        termsLink.rel = "noopener";
    }

    function setStatus(message, type) {

        status.textContent =
            message || "";

        status.className =
            "dtools-auth-status" +
            (type ? " " + type : "");

    }

    function openModal() {

        modal.classList.add("active");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow =
            "hidden";

        setStatus("");

        setTimeout(function () {

            document
                .getElementById("startFreeName")
                ?.focus();

        }, 50);

    }

    function closeModal() {

        modal.classList.remove("active");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow =
            "";

    }



       if (logoutButton) {
   
       logoutButton.addEventListener(
           "click",
           async function () {
   
               logoutButton.disabled =
                   true;
   
               try {
   
                   const result =
                       await dtoolsSupabase.auth.signOut();
   
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

    openButton.addEventListener(
       "click",
       async function () {
   
           if (!dtoolsSupabase) {
               await initSupabase();
           }
   
   
           const result =
               await dtoolsSupabase.auth.getSession();
   
           const session =
               result.data.session;
   
   
           if (session) {
   
               const form =
                   document.getElementById(
                       "startFreeForm"
                   );
   
               const accountView =
                   document.getElementById(
                       "dtoolsAccountView"
                   );
   
               if (form) {
                   form.style.display = "none";
               }
   
               if (accountView) {
                   accountView.style.display = "block";
               }
   
           } else {
   
               const form =
                   document.getElementById(
                       "startFreeForm"
                   );
   
               const accountView =
                   document.getElementById(
                       "dtoolsAccountView"
                   );
   
               if (form) {
                   form.style.display = "block";
               }
   
               if (accountView) {
                   accountView.style.display = "none";
               }
   
           }
   
   
           openModal();
   
       }
   );

    closeButton.addEventListener(
        "click",
        closeModal
    );

    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modal
            ) {
                closeModal();
            }

        }
    );

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal.classList.contains("active")
            ) {
                closeModal();
            }

        }
    );

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            setStatus(
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
                    ).map(function (input) {
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

                if (password.length < 6) {
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
                    await dtoolsSupabase.auth.signUp({

                        email: email,

                        password: password,

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
                                    new Date().toISOString()

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
                        "Account created successfully. You are signed in.",
                        "success"
                    );

                } else {

                    setStatus(
                        "Account created. Please check your email to confirm your account.",
                        "success"
                    );

                }

            } catch (error) {

                setStatus(
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
