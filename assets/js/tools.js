/* =========================================
   DOZNI TOOLS DATA
========================================= */

const homeToolContent = {

    name: "Dozni Tools",

    description:
        "Free online tools for images, PDFs, colors, development, SEO, writing and everyday digital tasks.",

    category: "Online Tools",

    howToTitle:
        "How to Use Dozni Tools?",

    howTo: [

        "Choose the online tool you need from the available tools.",

        "Open the tool and follow the instructions shown on the page.",

        "Upload or enter your content when required.",

        "Adjust the available options according to your needs.",

        "Process your content and download or copy the result.",

        "Most tools are designed to work directly in your browser."
    ],

    credits: [

        {
            name: "Dozni Tools",
            description:
                "Online utilities designed for everyday digital workflows."
        }

    ]

};



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
     id: "image-cropper",
   
     name: "Image Cropper Online",
   
     url: "tools/image-cropper/",
   
     category: "Image",
   
     description:
       "Free Online Image Cropping Tool using HTML Canvas. Download cropped image in JPG or PNG format.",
   
     icon: "crop",
   
     popular: true,
   
     categories: [
       {
         name: "Design Tools",
         url: "#"
       },
       {
         name: "Image Tools",
         url: "#"
       }
     ],
   
     howToTitle:
       "How to Use Image Cropper Online?",
   
     howTo: [
   
       "Drag and drop image from your local system to the canvas above.",
   
       "Use the Aspect Ratio options to choose aspect ratio of Crop Tool.",
   
       "You can increase the Crop Tool size by dragging the corners and edges.",
   
       "Move the crop tool by holding the mouse button over it and dragging.",
   
       "Once you have selected the desired area, choose to export either JPG (optimized for small size) or PNG (high-quality).",
   
       "If the cropped image opens in a new tab, instead of downloading, right click and do \"Save As\" to save the cropped image.",
   
       "We do not store any of your images as everything is done client side."
   
     ],
   
     credits: [
   
       {
         name: "CropperJS",
         url: "#",
         description: "JavaScript image cropper"
       },
   
       {
         name: "download.js",
         url: "#",
         description: "Client-side file downloading using JS and HTML5 by dandavis"
       }
   
     ],
   
     faqs: [
   
       {
         question:
           "How do I crop an image online?",
   
         answer:
           "Drag and drop your image into the cropper, adjust the crop area and export the result in JPG or PNG format."
       },
   
       {
         question:
           "Which image formats can I download?",
   
         answer:
           "You can export the cropped image as JPG or PNG."
       },
   
       {
         question:
           "Are my images stored?",
   
         answer:
           "No. Images are processed client-side and are not permanently stored."
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
   GENERATE POPULAR TOOLS
========================================= */

function renderPopularTools() {

  const popularLinks =
    document.getElementById("popular-tools-links");


  if (!popularLinks) {

    console.warn(
      "Popular tools container not found."
    );

    return;

  }


  const popularTools =
    toolsData.filter(tool => tool.popular);


  popularLinks.innerHTML =
    popularTools.map(tool => {

      return `
        <a href="${tool.url}">
          ${tool.name}
        </a>
      `;

    }).join("");

}







/* =========================================
   GENERATE TOOL CONTENT
========================================= */

function renderToolContent(content) {

  const title =
    document.getElementById("tool-page-title");

  const description =
    document.getElementById("tool-page-description");

  const categories =
    document.getElementById("tool-page-categories");

  const howToTitle =
    document.getElementById("tool-howto-title");

  const howToList =
    document.getElementById("tool-guide-list");

  const credits =
    document.getElementById("tool-credits");


  if (!title) {

    console.warn(
      "Tool content component not found."
    );

    return;

  }


  /* =======================================
     TITLE
  ======================================= */

  title.textContent =
    content.name || "";


  /* =======================================
     DESCRIPTION
  ======================================= */

  if (description) {

    description.textContent =
      content.description || "";

  }


   /* =======================================
      CATEGORIES
   ======================================= */
   
   if (categories) {
   
     categories.innerHTML = `
       Categories →
   
       ${
         (content.categories || [])
           .map((category, index) => {
   
             return `
               <a href="${category.url}">
                 ${category.name}
               </a>
               ${index < content.categories.length - 1 ? ", " : ""}
             `;
   
           })
           .join("")
       }
     `;
   
   }


  /* =======================================
     HOW TO TITLE
  ======================================= */

  if (howToTitle) {

    howToTitle.textContent =
      content.howToTitle || "How to Use This Tool?";

  }


  /* =======================================
     HOW TO LIST
  ======================================= */

  if (howToList) {

    howToList.innerHTML =
      (content.howTo || []).map(item => {

        return `
          <li>
            ${item}
          </li>
        `;

      }).join("");

  }


  /* =======================================
     CREDITS
  ======================================= */

  if (credits) {

     credits.innerHTML =
       (content.credits || []).map(credit => {
   
         return `
           <div class="credit-item">
   
             <a href="${credit.url || "#"}">
               ${credit.name}
             </a>
   
             <span>
               ${credit.description}
             </span>
   
           </div>
         `;
   
       }).join("");
   
   }


  /* =======================================
     POPULAR TOOLS
  ======================================= */

  renderPopularTools();

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


    renderToolContent(
      currentTool
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
    "Loading homepage content."
  );


  renderToolContent(
    homeToolContent
  );


  console.log(
    "Loading homepage FAQs."
  );


  renderFaq(
    homeFaqs
  );

}
