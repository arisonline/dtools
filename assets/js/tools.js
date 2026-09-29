/* =========================================
   DOZNI TOOLS DATA
========================================= */


/* =========================================
   HOME PAGE FAQS
========================================= */

const homeFaqs = [

  {
    question: "Are Dozni Tools free to use?",

    answer:
      "Yes. Dozni Tools provides a collection of online utilities that can be used without a subscription."
  },

  {
    question: "Do I need to create an account?",

    answer:
      "No. Most Dozni Tools can be used directly without creating an account or signing up."
  },

  {
    question: "Are my uploaded files stored?",

    answer:
      "Tools are designed to process files securely and, where possible, directly in your browser without permanent storage."
  },

  {
    question: "Can I use Dozni Tools on mobile devices?",

    answer:
      "Yes. Dozni Tools is designed to work across desktop, tablet and mobile browsers."
  },

  {
    question: "What types of tools are available?",

    answer:
      "Dozni Tools provides online utilities for images, PDF files, colors, development, SEO, writing, finance, mathematics and other everyday tasks."
  }

];



/* =========================================
   DOZNI TOOLS DATA
========================================= */

const toolsData = [

  {
    id: "json-formatter",

    name: "JSON Formatter",

    url: "tools/json-formatter/",

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

  },


  {
    id: "image-resizer",

    name: "Image Resizer",

    url: "tools/image-resizer/",

    category: "Image",

    description:
      "Resize JPG, PNG and WEBP images quickly.",

    icon: "photo_size_select_large",

    popular: true,

    faqs: [

      {
        question: "How can I resize an image?",

        answer:
          "Upload your image, select the desired dimensions and download the resized image."
      },

      {
        question: "Which image formats are supported?",

        answer:
          "The Image Resizer supports common formats such as JPG, PNG and WEBP."
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

    /*
       Get the final folder name from the
       tool URL.

       Example:

       tools/json-formatter/

       becomes:

       json-formatter
    */

    const toolParts =
      tool.url
        .split("/")
        .filter(Boolean);


    const toolSlug =
      toolParts[toolParts.length - 1];


    /*
       Get all parts from current URL
    */

    const currentParts =
      currentPath
        .split("/")
        .filter(Boolean);


    /*
       Find the tool slug anywhere in
       the current path.

       Works with:

       /tools/json-formatter

       /dtools/tools/json-formatter

       /dtools/tools/json-formatter/
    */

    return currentParts.includes(toolSlug);

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

function renderFaq(faqs) {

  const faqWrapper =
    document.getElementById("faq-wrapper");


  if (!faqWrapper) {

    console.warn(
      "FAQ wrapper not found."
    );

    return;

  }


  /*
     No FAQ data
  */

  if (!faqs || !faqs.length) {

    faqWrapper.innerHTML = "";

    return;

  }


  /*
     Generate FAQ cards
  */

  faqWrapper.innerHTML =
    faqs.map((faq, index) => {

      return `

        <div class="faq-card ${index === 0 ? "active" : ""}">

          <button
            type="button"
            class="faq-question"
          >

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


  /*
     Start accordion
  */

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


        /*
           Close all FAQ cards
        */

        faqCards.forEach(item => {

          item.classList.remove("active");

        });


        /*
           Open clicked card
        */

        if (!isActive) {

          card.classList.add("active");

        }

      }
    );

  });

}



/* =========================================
   INITIALIZE TOOLS
========================================= */

function initTools() {

  console.log(
    "tools.js initialized"
  );


  const currentPath =
    window.location.pathname
      .replace(/\/+$/, "");


  console.log(
    "Current path:",
    currentPath
  );


  /* =======================================
     CHECK FOR INDIVIDUAL TOOL
  ======================================= */

  const currentTool =
    getCurrentTool();


  if (currentTool) {

    console.log(
      "Current tool:",
      currentTool.name
    );


    renderFaq(
      currentTool.faqs
    );


    return;

  }


  /* =======================================
     HOME PAGE
  ======================================= */

  console.log(
    "No specific tool detected."
  );


  console.log(
    "Loading homepage FAQs."
  );


  renderFaq(homeFaqs);

}
