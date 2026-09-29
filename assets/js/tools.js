/* =========================================
   DOZNI TOOLS DATA
========================================= */

const toolsData = [

  {
    id: "json-formatter",

    name: "JSON Formatter",

    url: "/tools/json-formatter/",

    category: "Dev",

    description:
      "Beautify and validate JSON instantly.",

    icon: "code",

    popular: true,

    faqs: [

      {
        question: "What does the JSON Formatter do?",

        answer:
          "It formats and beautifies JSON data into an easy-to-read structure."
      },

      {
        question: "Can I validate JSON?",

        answer:
          "Yes. Invalid JSON is detected and the formatting process will identify the problem."
      }

    ]
  }

];


/* =========================================
   FIND CURRENT TOOL
========================================= */

function getCurrentTool() {

  const currentPath =
    window.location.pathname
      .replace(/\/+$/, "");

  return toolsData.find(tool => {

    const toolPath =
      new URL(
        tool.url,
        window.location.origin
      ).pathname
        .replace(/\/+$/, "");

    return toolPath === currentPath;

  });

}


/* =========================================
   FAQ SVG
========================================= */

function getFaqIcon() {

  return `
    <svg viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2.2"
    stroke-linecap="round"
    stroke-linejoin="round">

      <circle cx="12"
      cy="12"
      r="10"></circle>

      <path d="M9.09 9
      a3 3 0 0 1
      5.82 1
      c0 2-3 3-3 3"></path>

      <circle cx="12"
      cy="17"
      r=".6"
      fill="currentColor"
      stroke="none"></circle>

    </svg>
  `;

}


/* =========================================
   FAQ ARROW SVG
========================================= */

function getFaqArrow() {

  return `
    <svg viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2">

      <path d="M6 9l6 6 6-6"/>

    </svg>
  `;

}


/* =========================================
   GENERATE FAQ
========================================= */

function renderFaq(tool) {

  const faqWrapper =
    document.getElementById("faq-wrapper");

  if (!faqWrapper) return;

  if (!tool || !tool.faqs || !tool.faqs.length) {

    faqWrapper.innerHTML = "";

    return;

  }


  faqWrapper.innerHTML =
    tool.faqs.map((faq, index) => {

      return `

        <div class="faq-card ${index === 0 ? "active" : ""}">

          <button class="faq-question">

            <div class="faq-icon">

              ${getFaqIcon()}

            </div>

            <span>
              ${faq.question}
            </span>

            <div class="faq-arrow">

              ${getFaqArrow()}

            </div>

          </button>

          <div class="faq-answer">

            <p>
              ${faq.answer}
            </p>

          </div>

        </div>

      `;

    }).join("");


  initFaq();

}


/* =========================================
   FAQ ACCORDION
========================================= */

function initFaq() {

  const faqCards =
    document.querySelectorAll(".faq-card");

  faqCards.forEach(card => {

    const question =
      card.querySelector(".faq-question");

    if (!question) return;


    question.addEventListener(
      "click",
      () => {

        const isActive =
          card.classList.contains("active");


        faqCards.forEach(item => {

          item.classList.remove("active");

        });


        if (!isActive) {

          card.classList.add("active");

        }

      }
    );

  });

}


/* =========================================
   INITIALIZE
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const currentTool =
      getCurrentTool();

    renderFaq(currentTool);

  }
);
