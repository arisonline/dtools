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
       id: "json-viewer",
   
       name: "JSON Viewer",
   
       url: "tools/json-viewer/",
   
       category: "Dev",
   
       description:
           "View, validate and explore JSON data in a formatted collapsible tree. Paste JSON or load JSON from a URL.",
   
       icon: "account_tree",
   
       popular: true,
   
   
       /* =====================================
          CATEGORIES
       ===================================== */
   
       categories: [
   
           {
               name: "Dev Tools",
   
               url:
                   "https://digital-tool.dozni.com/?category=Dev"
           }
   
       ],
   
   
       /* =====================================
          HOW TO USE
       ===================================== */
   
       howToTitle:
           "How to Use JSON Viewer?",
   
       howTo: [
   
           "Paste your JSON code into the input area.",
   
           "The JSON data will be displayed automatically in the tree viewer.",
   
           "You can also enter a JSON URL and load the data directly from that URL.",
   
           "Expand or collapse objects and arrays to explore the JSON structure.",
   
           "Use the available JSONEditor modes such as Tree, Code, Form, Text and View when needed."
   
       ],
   
   
       /* =====================================
          CREDITS
       ===================================== */
   
       credits: [
   
           {
               name: "JSONEditor",
   
               url:
                   "https://github.com/josdejong/jsoneditor",
   
               description:
                   "JSON editor and tree viewer library."
           }
   
       ],
   
   
       /* =====================================
          CONTENT
       ===================================== */
   
       content: `
   
           <h2>
               What is a JSON Viewer?
           </h2>
   
   
           <p>
               A JSON Viewer is a tool that displays JSON data in an
               easier-to-read structure. Instead of viewing a large block
               of plain JSON text, you can explore objects and arrays using
               a collapsible tree.
           </p>
   
   
           <p>
               This free online JSON Viewer lets you paste JSON data or
               load JSON from a URL and inspect its structure directly in
               your browser.
           </p>
   
   
           <h2>
               JSON Viewer and JSON Formatter
           </h2>
   
   
           <p>
               A JSON formatter mainly improves the indentation and
               readability of JSON text. A JSON viewer goes a step further
               by allowing you to explore nested objects and arrays
               interactively.
           </p>
   
   
           <p>
               This tool provides a tree-based view of JSON data and also
               provides additional editor modes for working with the data.
           </p>
   
   
           <h2>
               How to view JSON online
           </h2>
   
   
           <p>
               Paste valid JSON into the input panel. The viewer will
               automatically parse the JSON and display it as a structured
               tree.
           </p>
   
   
           <p>
               You can also enter a publicly accessible JSON URL. The tool
               fetches the JSON data and displays it in the same viewer.
           </p>
   
   
           <h2>
               Supported JSON structure
           </h2>
   
   
           <p>
               JSON can contain objects, arrays, strings, numbers,
               booleans and null values. Nested structures can contain
               multiple levels of objects and arrays.
           </p>
   
   
           <div class="tool-code">
   
               <code>{
       "name": "Cake",
       "price": 2.55,
       "available": {
           "store": 42,
           "warehouse": 600
       },
       "topping": [
           "None",
           "Glazed",
           "Chocolate"
       ]
   }</code>
   
           </div>
   
   
           <h2>
               Load JSON from a URL
           </h2>
   
   
           <p>
               Enter a JSON URL in the URL field and press Enter or move
               away from the field. The tool will request the JSON data and
               display the returned object in the viewer.
           </p>
   
   
           <p>
               The remote server must allow the request through the
               browser's cross-origin security rules. If the server blocks
               browser requests, the URL cannot be loaded directly.
           </p>
   
   
           <h2>
               Explore JSON in Tree view
           </h2>
   
   
           <p>
               Tree view makes it easier to inspect deeply nested JSON.
               Objects and arrays can be expanded or collapsed so you can
               focus on the parts of the data you need.
           </p>
   
   
           <h2>
               Is my JSON processed in the browser?
           </h2>
   
   
           <p>
               JSON that you paste into this tool is processed directly
               by the page in your browser. The tool does not need to send
               pasted JSON to a server for normal parsing and viewing.
           </p>
   
   
           <div class="tool-note">
   
               <strong>Note:</strong>
   
               When loading JSON from an external URL, your browser requests
               that URL directly. The availability of the request depends on
               the remote server and its CORS configuration.
   
           </div>
   
       `,
   
   
       /* =====================================
          FAQ
       ===================================== */
   
       faqs: [
   
           {
               question:
                   "What is a JSON Viewer?",
   
               answer:
                   "A JSON Viewer displays JSON data in a structured and readable format, commonly using a collapsible tree."
           },
   
           {
               question:
                   "Can I paste JSON directly into the viewer?",
   
               answer:
                   "Yes. Paste your JSON into the input panel and the viewer automatically parses and displays it."
           },
   
           {
               question:
                   "Can I load JSON from a URL?",
   
               answer:
                   "Yes. Enter a JSON URL and the tool will try to fetch and display the returned JSON."
           },
   
           {
               question:
                   "Why can't my JSON URL load?",
   
               answer:
                   "The remote server may block browser requests with its CORS policy, or the URL may not return valid JSON."
           },
   
           {
               question:
                   "What JSON editor modes are available?",
   
               answer:
                   "The viewer is configured with Tree, Code, Form, Text and View modes."
           }
   
       ]
   
   },


      {
       id: "screen-resolution",
   
       name: "Screen Resolution Tester",
   
       url: "tools/screen-resolution/",
   
       category: "Dev",
   
       description:
           "Check your screen resolution, available screen size, browser viewport and device pixel ratio instantly.",
   
       icon: "aspect_ratio",
   
       popular: true,
   
       categories: [
           {
               name: "Dev Tools",
               url: "https://digital-tool.dozni.com/?category=Dev"
           }
       ],
   
       howToTitle:
           "How to Use Screen Resolution Tester?",
   
       howTo: [
           "Open the Screen Resolution Tester in your browser.",
           "Your screen width and height will be detected automatically.",
           "Check the displayed screen resolution such as 1920 × 1080.",
           "Review the available screen size and browser viewport size.",
           "Check your device pixel ratio, color depth and screen orientation.",
           "Resize your browser or rotate your device to see the live values update."
       ],
   
       credits: [],
   
       content: `
           <h2>What is screen resolution?</h2>
   
           <p>
               Screen resolution describes the number of pixels displayed
               across the width and height of a screen. It is normally
               written as two numbers, such as 1920 × 1080. The first
               number represents the width in pixels and the second number
               represents the height in pixels.
           </p>
   
           <p>
               A higher resolution generally provides more pixels for
               displaying detailed content. The visible result also
               depends on screen size, operating-system scaling,
               display density and the content being viewed.
           </p>
   
           <img
               src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjXtX3X28I9IAqvkMJ7Pu2OnsbdP8yMWzdfhcyLZv_kMdw4GxNrXimqgAQ1bYgP4ErKhx7BF4J0VP4krhtg2V7EevTnhzNv0EGcHgu74J6dwg1mdo5q65GoLZnPj_6mtRjrU8Sloln7bFMwEfBxR8SqpDSfiLRuOLuvRj9IewGnhYLJ0C-9kFRCRTOoxKw/s800/Screen-Resolution.webp"
               alt="Screen resolution checker online"
               title="Screen Resolution Tester"
               loading="lazy"
               decoding="async"
           >
   
           <div class="tool-code">
               <code>Screen Resolution = Pixel Width × Pixel Height</code>
           </div>
   
   
           <h2>Why does screen resolution matter?</h2>
   
           <p>
               Screen resolution is useful when designing websites,
               applications, games, graphics and responsive layouts.
               Knowing the resolution of a display can help developers
               understand the space available on a user's device.
           </p>
   
           <p>
               Designers and developers often test multiple screen sizes
               to make sure interfaces remain readable and usable on
               desktops, laptops, tablets and mobile devices.
           </p>
   
   
           <h2>Common screen resolutions</h2>
   
           <p>
               Some commonly encountered display resolutions include:
           </p>
   
           <table>
               <thead>
                   <tr>
                       <th>Resolution</th>
                       <th>Common Name</th>
                       <th>Typical Use</th>
                   </tr>
               </thead>
   
               <tbody>
   
                   <tr>
                       <td>1280 × 720</td>
                       <td>HD / 720p</td>
                       <td>Older or smaller displays</td>
                   </tr>
   
                   <tr>
                       <td>1366 × 768</td>
                       <td>HD</td>
                       <td>Laptops and older desktop displays</td>
                   </tr>
   
                   <tr>
                       <td>1920 × 1080</td>
                       <td>Full HD / 1080p</td>
                       <td>Desktop, laptop and general-purpose displays</td>
                   </tr>
   
                   <tr>
                       <td>2560 × 1440</td>
                       <td>QHD / 1440p</td>
                       <td>Higher-resolution monitors</td>
                   </tr>
   
                   <tr>
                       <td>3840 × 2160</td>
                       <td>4K UHD</td>
                       <td>High-resolution monitors and TVs</td>
                   </tr>
   
               </tbody>
           </table>
   
   
           <h2>Screen resolution vs browser viewport</h2>
   
           <p>
               Screen resolution and browser viewport size are not the same
               thing. Screen resolution describes the display reported by
               the browser's Screen API, while the viewport describes the
               area currently available to the web page inside the browser
               window.
           </p>
   
           <p>
               For example, a display may report 1920 × 1080 while the
               browser viewport is smaller because of browser chrome,
               window size, zoom, operating-system scaling or other factors.
           </p>
   
   
           <h2>What is device pixel ratio?</h2>
   
           <p>
               Device Pixel Ratio, commonly called DPR, describes the
               relationship between CSS pixels and physical device pixels.
               A DPR greater than 1 is common on high-density displays.
           </p>
   
           <p>
               Web developers can use
               <code>window.devicePixelRatio</code>
               when building interfaces that need to account for display
               density.
           </p>
   
   
           <h2>How does this Screen Resolution Tester work?</h2>
   
           <p>
               The calculator reads screen information directly from the
               browser using JavaScript. The core screen measurements are
               obtained from the browser's Screen API.
           </p>
   
           <div class="tool-code">
               <code>const screenWidth = window.screen.width;
   const screenHeight = window.screen.height;
   
   console.log(
       "Screen Resolution: " +
       screenWidth +
       " × " +
       screenHeight
   );</code>
           </div>
   
           <p>
               The tool also reads the available screen size,
               browser viewport, device pixel ratio, color depth and
               orientation where those values are available.
           </p>
   
   
           <div class="tool-note">
               <strong>Note:</strong>
               Screen and viewport values can vary depending on browser
               behavior, operating-system display scaling, zoom settings
               and the device being used.
               See our
               <a
                   href="https://www.dozni.com/privacy-policy"
                   target="_blank"
                   rel="noopener"
               >
                   privacy policy
               </a>
               for more information.
           </div>
       `,
   
       faqs: [
           {
               question:
                   "What is screen resolution?",
   
               answer:
                   "Screen resolution is the number of pixels reported across the width and height of a display, such as 1920 × 1080."
           },
   
           {
               question:
                   "What is the difference between screen resolution and viewport size?",
   
               answer:
                   "Screen resolution describes the display size reported by the Screen API, while viewport size describes the area currently available to the web page."
           },
   
           {
               question:
                   "What is 1920 × 1080 resolution?",
   
               answer:
                   "1920 × 1080 is commonly known as Full HD or 1080p."
           },
   
           {
               question:
                   "What is 4K resolution?",
   
               answer:
                   "4K UHD commonly refers to 3840 × 2160 pixels."
           },
   
           {
               question:
                   "Does resizing the browser change my screen resolution?",
   
               answer:
                   "Normally no. Resizing the browser changes the viewport dimensions, while the screen dimensions reported by the browser usually remain the same."
           }
       ]
   },



      {
       id: "browser-resolution",
   
       name: "Browser Resolution Tester",
   
       url: "tools/browser-resolution/",
   
       category: "Dev",
   
       description:
           "Check your browser resolution, viewport width, viewport height and total browser pixels instantly.",
   
       icon: "web",
   
       popular: true,
   
   
       /* =====================================
          CATEGORIES
       ===================================== */
   
       categories: [
   
           {
               name: "Dev Tools",
               url: "https://digital-tool.dozni.com/?category=Dev"
           }
   
       ],
   
   
       /* =====================================
          HOW TO USE
       ===================================== */
   
       howToTitle:
           "How to Use Browser Resolution Tester?",
   
       howTo: [
   
           "Open the Browser Resolution Tester in your browser.",
   
           "Your current browser viewport width and height will be detected automatically.",
   
           "Check the displayed browser resolution in pixels.",
   
           "Review the total number of pixels available in your browser viewport.",
   
           "Resize your browser window to see the viewport dimensions update in real time.",
   
           "For testing different device sizes, use your browser's developer tools and device emulation."
   
       ],
   
   
       /* =====================================
          CREDITS
       ===================================== */
   
       credits: [],
   
   
       /* =====================================
          TOOL CONTENT
       ===================================== */
   
       content: `
   
           <h2>
               What is browser resolution?
           </h2>
   
   
           <p>
               The size of the viewable portion, also known as the viewport,
               of your web browser window is known as browser resolution.
               The width and height of the viewable portion of your web
               browser window are measured in CSS pixels.
           </p>
   
   
           <p>
               Web developers, designers, and anyone else testing how
               websites look on various devices must be aware of the
               browser viewport.
           </p>
   
   
           <p>
               When you resize your browser window, the viewport dimensions
               change accordingly. This has a direct effect on how content
               is rendered on websites.
           </p>
   
   
           <img
               src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhvoGox49PP7EOlv7FX2zWoH0aWwpaCq4XW0vfw2L188iWqIZQfG3On4SW809kD1TUkkmK-GkePUY6c5cTu7nzMsk6iHkX15sGdqK71XX5mRvz32KCDESL8SjuNiIiIH8rPi2_XEKkFSAnE_KksFmD4b0ltpNBmqkqzQr0YARNWc8b0qKH4_lpU9qzKtU0/s800/Browser-Resolution.webp"
               alt="Browser resolution checker online"
               title="Browser Resolution Checker Online"
               loading="lazy"
               decoding="async"
           >
   
   
           <h2>
               Browser resolution vs screen resolution
           </h2>
   
   
           <p>
               Many people confuse screen resolution with browser resolution.
               However, they have different functions in web development.
           </p>
   
   
           <p>
               The total number of physical pixels that your device can
               display is known as the screen resolution. For example,
               a Full HD monitor displays 1920 pixels horizontally and
               1080 pixels vertically, giving you 2,073,600 total pixels.
           </p>
   
   
           <p>
               The visible portion of your browser window where web pages
               are rendered is known as browser resolution or viewport size.
               Browser toolbars, bookmark bars, and other browser interface
               elements are outside the webpage viewport.
           </p>
   
   
           <p>
               Even on a 1920 × 1080 display, your browser viewport might
               be only 1920 × 950 pixels when the browser is maximised,
               depending on the browser interface and operating-system setup.
           </p>
   
   
           <h2>
               Why is browser resolution important?
           </h2>
   
   
           <p>
               This distinction is important because responsive websites
               choose which layout to display based on viewport dimensions.
               A developer building breakpoints at 768px, 1024px, and
               1440px needs to know the browser viewport size rather than
               relying only on screen resolution.
           </p>
   
   
           <p>
               Our browser resolution checker uses JavaScript to instantly
               determine your browser viewport dimensions. The tool measures
               the width and height of your browser viewport using the
               <code>window.innerWidth</code> and
               <code>window.innerHeight</code> properties.
           </p>
   
   
           <p>
               The browser resolution instantly changes when you resize
               the browser window. Our tool provides real-time information
               about the viewport size and calculates how many CSS pixels
               are available in the viewport overall.
           </p>
   
   
           <h2>
               Common viewport sizes to test
           </h2>
   
   
           <p>
               Prioritize testing these viewport widths based on the devices
               and screen sizes used by your audience:
           </p>
   
   
           <ul>
   
               <li>
                   <strong>Mobile Portrait:</strong>
                   320px, 360px, 375px, 390px, 414px, 428px
               </li>
   
               <li>
                   <strong>Mobile Landscape:</strong>
                   568px, 640px, 667px, 736px, 812px, 844px
               </li>
   
               <li>
                   <strong>Tablet Portrait:</strong>
                   768px, 800px, 820px, 834px
               </li>
   
               <li>
                   <strong>Tablet Landscape:</strong>
                   1024px, 1112px, 1180px, 1194px
               </li>
   
               <li>
                   <strong>Desktop Small:</strong>
                   1280px, 1366px, 1440px
               </li>
   
               <li>
                   <strong>Desktop Large:</strong>
                   1920px, 2560px, 3840px
               </li>
   
           </ul>
   
   
           <p>
               Testing at a range of common viewport sizes can help identify
               responsive layout problems across different devices and
               screen configurations.
           </p>
   
   
           <h2>
               How does JavaScript detect browser resolution?
           </h2>
   
   
           <p>
               JavaScript allows developers to programmatically detect the
               current browser viewport dimensions using
               <code>window.innerWidth</code> and
               <code>window.innerHeight</code>.
           </p>
   
   
           <div class="tool-code">
   
               <code>
   // Get current viewport dimensions
   const viewportWidth = window.innerWidth;
   const viewportHeight = window.innerHeight;
   const totalPixels = viewportWidth * viewportHeight;
   
   // Log the values
   console.log(
       \`Width: \${viewportWidth}px\`
   );
   
   console.log(
       \`Height: \${viewportHeight}px\`
   );
   
   console.log(
       \`Total Pixels: \${totalPixels.toLocaleString()}\`
   );
   
   // Detect viewport changes
   window.addEventListener('resize', () => {
   
       const newWidth = window.innerWidth;
       const newHeight = window.innerHeight;
   
       console.log(
           \`Resized to: \${newWidth}x\${newHeight}\`
       );
   
   });
               </code>
   
           </div>
   
   
           <p>
               This code allows developers to respond dynamically to changes
               in the available viewport space. It is useful for responsive
               layouts, debugging and browser-size testing.
           </p>
   
   
           <h2>
               Screen resolution, viewport size and DPR
           </h2>
   
   
           <p>
               <strong>Screen Resolution:</strong>
               The display dimensions reported by the device and browser.
               For example, a display may report 2560 × 1600 pixels.
           </p>
   
   
           <p>
               <strong>Viewport Size:</strong>
               The CSS pixel dimensions currently available to the webpage
               inside the browser window. For example, a viewport may be
               1440 × 900 CSS pixels.
           </p>
   
   
           <p>
               <strong>Device Pixel Ratio (DPR):</strong>
               The relationship between physical device pixels and CSS pixels.
               High-density displays commonly use a DPR greater than 1.
           </p>
   
   
           <div class="formula-box">
   
               <code>
                   Physical Pixels ≈ CSS Pixels × Device Pixel Ratio
               </code>
   
           </div>
   
   
           <p>
               For example, a device with a CSS viewport width of 1440px
               and a DPR of 2 may use approximately 2880 physical pixels
               across that dimension.
           </p>
   
   
           <h2>
               How to check your browser resolution
           </h2>
   
   
           <p>
               When you visit this page, our tool automatically shows the
               current viewport dimensions of your browser. To see your
               current browser width and height in pixels, simply look at
               the values displayed by the tool.
           </p>
   
   
           <p>
               Only the webpage viewport is measured by browser resolution.
               The browser interface, such as toolbars and other browser
               chrome, is outside the webpage viewport.
           </p>
   
   
           <p>
               Resize your browser window to see the real-time dimensions
               change automatically.
           </p>
   
   
           <h2>
               Can I test different browser resolutions?
           </h2>
   
   
           <p>
               Yes. You can use the browser's developer tools, usually
               opened with F12 or the browser's developer menu, to emulate
               different device sizes and viewport dimensions.
           </p>
   
   
           <p>
               This is particularly useful when developing responsive
               websites because you can test layouts at multiple viewport
               widths without physically changing devices.
           </p>
   
   
           <h2>
               Does browser resolution affect responsive websites?
           </h2>
   
   
           <p>
               Yes. Responsive websites commonly use viewport dimensions
               to determine which layout, navigation style, spacing,
               typography and other interface elements should be displayed.
           </p>
   
   
           <p>
               Responsive images and other resources may also be selected
               based on viewport size, device characteristics and browser
               behavior.
           </p>
   
   
           <h2>
               What viewport width should I use for mobile design?
           </h2>
   
   
           <p>
               A useful starting point for responsive testing is around
               320px wide. Developers can then add and test breakpoints
               around common widths such as 768px, 1024px and 1440px,
               while also checking the actual viewport sizes used by their
               audience.
           </p>
   
   
           <h2>
               Why does a phone with a high-resolution display report a smaller viewport?
           </h2>
   
   
           <p>
               Device pixel ratio and browser scaling allow mobile devices
               to use many physical pixels while reporting a smaller CSS
               viewport. For example, a phone with a high-resolution display
               may report a viewport around 360 × 640 CSS pixels.
           </p>
   
   
           <h2>
               Is browser resolution accurate?
           </h2>
   
   
           <p>
               Modern browsers provide reliable viewport measurements through
               standard JavaScript APIs such as
               <code>window.innerWidth</code> and
               <code>window.innerHeight</code>.
               The reported values can vary with browser zoom, window size,
               device configuration and other browser settings.
           </p>
   
   
           <h2>
               When should you test browser resolution?
           </h2>
   
   
           <p>
               Test viewport dimensions during initial development, after
               major layout changes, and periodically as new devices and
               screen configurations become common among your visitors.
           </p>
   
   
           <p>
               Regular browser resolution testing helps developers identify
               responsive layout issues before they affect real users.
               Understanding viewport dimensions makes it easier to build
               websites that adapt smoothly across desktops, tablets and
               mobile devices.
           </p>
   
   
           <h2>
               Free online browser resolution checker
           </h2>
   
   
           <p>
               Our free browser resolution tester gives you instant viewport
               measurements without installing software or browser extensions.
               Use it during development and responsive testing to verify
               that your layouts work correctly at different browser sizes.
           </p>
   
   
           <p>
               Remember that viewport dimensions are particularly important
               when building responsive websites. Focus on CSS pixel
               measurements, account for device pixel ratios on high-DPI
               displays, and verify that your layouts adapt smoothly across
               the range of viewport sizes used by your audience.
           </p>
   
   
           <p>
               Start testing your browser resolution now to ensure your
               website looks great on different devices and viewport sizes.
           </p>
   
   
           <p>
               We hope you liked the Browser Resolution Tester tool.
               To use other digital tools, visit Dozni Tools regularly.
           </p>
   
   
           <div class="tool-note">
   
               <strong>Privacy:</strong>
   
               This browser resolution detection tool operates entirely
               within your browser. We do not collect, store, or transmit
               any information about your browser, device, or usage patterns.
               All analysis happens locally on your device.
   
           </div>
   
       `,
   
   
       /* =====================================
          FAQ
       ===================================== */
   
       faqs: [
   
           {
               question:
                   "What is browser resolution?",
   
               answer:
                   "Browser resolution refers to the width and height of the visible webpage viewport, normally measured in CSS pixels."
           },
   
           {
               question:
                   "What is the difference between browser resolution and screen resolution?",
   
               answer:
                   "Screen resolution describes the display dimensions, while browser resolution describes the viewport available to the webpage inside the browser."
           },
   
           {
               question:
                   "Does resizing my browser change the browser resolution?",
   
               answer:
                   "Yes. Resizing the browser window changes the viewport width and height, and the tool updates the values in real time."
           },
   
           {
               question:
                   "What JavaScript properties are used to detect browser resolution?",
   
               answer:
                   "The tool uses window.innerWidth and window.innerHeight to measure the browser viewport."
           },
   
           {
               question:
                   "Does device pixel ratio affect browser resolution?",
   
               answer:
                   "Device pixel ratio affects the relationship between CSS pixels and physical device pixels, but the browser viewport is reported in CSS pixels."
           },
   
           {
               question:
                   "Can I test different viewport sizes?",
   
               answer:
                   "Yes. Browser developer tools provide device emulation that lets you test different viewport widths and heights."
           }
   
       ]
   
   },


      {
       id: "random-color",
   
       name: "Random Color Generator",
   
       url: "tools/random-color/",
   
       category: "Color",
   
       description:
           "Generate random colors instantly and get HEX, RGB, HSL and HSV color codes.",
   
       icon: "palette",
   
       popular: true,
   
       categories: [
           {
               name: "Color Tools",
               url: "https://digital-tool.dozni.com/?category=Color"
           }
       ],
   
       howToTitle:
           "How to Use Random Color Generator?",
   
       howTo: [
           "When you refresh or load this page, a new random color will be generated for you every time.",
           "Also, a new random color will be generated when you click the 'New Random Color' button.",
           "Click to copy the value of the selected color in HEX, RGB, HSL, or HSV.",
           "Lastly, you can use other tools to work with the current color such as getting shades, changing hues, etc. Or you can change color families such as pastel or material, by selecting the menu presented above.",
           "In case your browser does not support our webpage or the screen looks blank, please refresh the page."
       ],
   
       credits: [],
   
       content: `
           <div class="tool-description-header">
   
               <div class="tool-description-title">
   
                   <span class="material-icons">
                       youtube_searched_for
                   </span>
   
                   <span>
                       Any Random Color Generator
                   </span>
   
               </div>
   
               <div class="tool-description-categories">
                   Categories →
                   <a href="https://digital-tool.dozni.com/?category=Color">
                       Color Tools
                   </a>
               </div>
   
           </div>
   
   
           <hr class="tool-description-divider">
   
   
           <h3>
               Introduction to the Random Color Generator
           </h3>
   
           <p>
               Want a easy and quick of color tool? Our Random Color Generator
               is here to add a splash of creativity to your day. It's super easy
               to use and brings a random color straight to your fingertips.
               Just pick a color and go!
           </p>
   
   
           <img
               src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJ7QTqx0UsMeeelHXCooflXi3GjQs12c0uQFqu05XqJY2weRCy4I3ncCyLZ4kd1qm6JUzKIlQf2SvE-8QrEw4ZGJPxk6gnLiPnBuduvKlbZF0mQNHeHXfsUsgvY2BTGSsJ-Yfrb6GEwpVfG70JAnDACL2qkaeL4iVtke15dD4ZQqVd1DBnKPn9QAPMSJE/s800/random-colors.webp"
               alt="Random color generator online free"
               title="Random Color Generator Online"
               width="320"
               height="240"
               loading="lazy"
               decoding="async"
               class="tool-description-image"
           >
   
   
           <h3>
               How It Works
           </h3>
   
           <p>
               Our tool is like a magical color picker. When you click the
               "Random Color" button or load the page, a brand new color generated
               every time. You can copy the colors with more then three formats
               like hex, rgb, hsl, or hsv color codes.
           </p>
   
   
           <h3>
               Play with the Color tools
           </h3>
   
           <p>
               You can do cool things with your chosen color. Like make it Lighter,
               Darker, Saturated, Desaturated etc. Feeling a bit specific mood?
               Switch to different color families like Pastels, Material, or Bright
               colors. Change it whenever you want, without leaving your seat
               (webpage). It's like having your own little color playground.
           </p>
   
   
           <h3>
               How to Make the Random Color Tool
           </h3>
   
           <p>
               It is not a rocket science to create this tool. You can also make it,
               by using some lines of code. In order to get a random color, you can
               use a random function and then generate random numbers between 0-255
               for Red, Green and Blue (RGB).
           </p>
   
           <p>
               If you're an coder, check this below example code for details:
           </p>
   
   
           <pre><code>random_color = { r: Random(0, 255), g: Random(0, 255), b: Random(0, 255) }</code></pre>
   
   
           <div class="tool-description-note">
   
               <strong>Note:</strong>
   
               We do not store any of your data, as everything is done inside your
               browser. Every time the webpage refreshes or loads, it clears the
               previous input data.
   
           </div>
       `,
   
       faqs: [
           {
               question:
                   "What formats does the Random Color Generator provide?",
   
               answer:
                   "The tool provides HEX, RGB, HSL, and HSV color codes."
           },
   
           {
               question:
                   "How do I generate a new random color?",
   
               answer:
                   "A new color is generated when the page loads, and you can generate another one by clicking the 'New Random Color' button."
           },
   
           {
               question:
                   "How can I copy a color code?",
   
               answer:
                   "Click the HEX, RGB, HSL, or HSV color value to copy it."
           }
       ]
   },


   {
    id: "percentage-calculator",

    name: "Percentage Calculator",

    url: "tools/percentage-calculator/",

    category: "Math",

    description:
        "Free online percentage calculator to calculate percentage amounts, principal amounts and percentage rates instantly.",

    icon: "percent",

    popular: true,


    /* =====================================
       CATEGORIES
    ===================================== */

    categories: [

        {
            name: "Math Tools",

            url: "https://digital-tool.dozni.com/?category=Math"
        }

    ],


    /* =====================================
       HOW TO USE
    ===================================== */

    howToTitle:
        "How to Use Percentage Calculator?",

    howTo: [

        "Choose an option that relates to your query from the top.",

        "Provide values in the input box, and the answer will update in real time.",

        "You can enter any number of values. Negative values are also allowed.",

        "Also, check the formulas with real-time calculations online."

    ],


    /* =====================================
       CREDITS
    ===================================== */

    credits: [],


    /* =====================================
       TOOL CONTENT
    ===================================== */

    content: `

        <h2>
            Online percentage calculator
        </h2>


        <p>
            With this percentage calculator, you can find the
            value that makes up the percent portion of a percentage
            equation. You can also calculate percent when the amount
            and value are known, or find the original amount when
            the value and percent are known.
        </p>


        <p>
            Answer questions like % of X, what % is X in Y,
            or X is Y% of what? can be calculated using this tool.
        </p>


        <p>
            Here are the three components required for a
            percentage formula:
        </p>


        <ol>

            <li>
                Principal amount (original amount)
            </li>

            <li>
                Percentage Rate (as a % sign)
            </li>

            <li>
                Interest amount (earned from the percentage rate)
            </li>

        </ol>


        <img
            class="percentage-image"
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEguZwT-ScLQgBgdfQvYXrYMYwM9kc94swoBzXilkWXNeR1MHAmcUuGAAks2rlaVTCLYOO0JssTdvCgCFWD4zZW-Dpw7u0IcDB5XFMEb9FDCnz9CKtt_pMSRtaazhpiGwy_ec2KagmFfHRO2V9LZKzB8GHrS6D6Lj2z9Tm64PKXvsj9-vOLdneim9cEO4G8/s800/percentage-calculator.gif"
            alt="Percentage calculator online free"
            loading="lazy"
        >


        <h2>
            How to calculate the percentage amount when the principal amount and percent rate are known?
        </h2>


        <p>
            By knowing the principal amount (P) and the percentage
            rate (R), we can easily calculate the interest amount (I).
        </p>


        <div class="formula-box">

            <code>
                Percentage Amount = Principal Amount × Percentage Rate / 100
            </code>

        </div>


        <p>
            That means multiplying the original amount by the
            percentage and dividing by 100.
        </p>


        <h2>
            How to find principal amount while I have the percentage rate and its interest amount?
        </h2>


        <p>
            If the interest amount (Interest) and the percentage
            rate (Percentage) are known, we can easily find out
            the actual amount (Principal).
        </p>


        <div class="formula-box">

            <code>
                Principal Amount = Interest Amount × 100 / Percentage Rate
            </code>

        </div>


        <p>
            That is, the interest amount must be multiplied by
            100 and divided by the percentage rate.
        </p>


        <h2>
            How to calculate percentage rate (%) easily?
        </h2>


        <p>
            Similarly, if the principal (P) and interest amount (I)
            are known, the formula to find the percentage is (%).
        </p>


        <div class="formula-box">

            <code>
                Percentage Rate = Interest Amount × 100 / Principal Amount
            </code>

        </div>


        <p>
            That is, the interest amount multiplied by 100 is
            divided by the principal amount.
        </p>



        <div class="tool-note">

            <strong>Note:</strong>

            We do not store or share your personal data from
            this tool. Visit our

            <a
                href="https://www.dozni.com/privacy-policy"
                target="_blank"
                rel="noopener"
            >
                privacy policy
            </a>

            for more information.

        </div>
     
    `,


    /* =====================================
       FAQ
    ===================================== */

    faqs: [

        {
            question:
                "How do I calculate a percentage of a number?",

            answer:
                "Enter the principal amount and percentage rate. The calculator automatically calculates the percentage amount."
        },


        {
            question:
                "How can I find the original amount from a percentage?",

            answer:
                "Enter the interest amount and percentage rate. The calculator calculates the original principal amount."
        },


        {
            question:
                "How do I calculate the percentage rate?",

            answer:
                "Enter the interest amount and principal amount. The calculator calculates the percentage rate automatically."
        },


        {
            question:
                "Does the Percentage Calculator update results automatically?",

            answer:
                "Yes. Results are calculated in real time whenever you change an input value."
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


  /*
     GitHub Pages project site:

     https://arisonline.github.io/dtools/

     Custom domain:

     https://dtools.dozni.com/
  */

  const siteBase =
    window.location.hostname.includes("github.io")
      ? "/dtools/"
      : "/";


  const popularTools =
    toolsData.filter(tool => tool.popular);


  popularLinks.innerHTML =
    popularTools.map(tool => {

      const toolURL =
        siteBase +
        tool.url.replace(/^\/+/, "");


      return `
        <a href="${toolURL}">
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


  const toolContent =
    document.getElementById("tool-content");


  if (!content) {

    console.warn(
      "No tool content supplied."
    );

    return;

  }


  /* =======================================
     TITLE
  ======================================= */

  if (title) {

    title.textContent =
      content.name || "";

  }


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

    const categoryList =
      content.categories || [];


    if (!categoryList.length) {

      categories.innerHTML = "";

    } else {

      categories.innerHTML = `
        <span>Categories →</span>

        ${

          categoryList
            .map((category, index) => {

              return `
                <a
                  href="${category.url || "#"}"
                >
                  ${category.name}
                </a>

                ${
                  index <
                  categoryList.length - 1
                    ? ", "
                    : ""
                }
              `;

            })
            .join("")

        }
      `;

    }

  }


  /* =======================================
     HOW TO TITLE
  ======================================= */

  if (howToTitle) {

    howToTitle.textContent =
      content.howToTitle ||
      "How to Use This Tool?";

  }


  /* =======================================
     HOW TO LIST
  ======================================= */

  if (howToList) {

    const howTo =
      content.howTo || [];


    howToList.innerHTML =
      howTo.map(item => {

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

    const creditList =
      content.credits || [];


    credits.innerHTML =
      creditList.map(credit => {

        return `
          <div class="credit-item">

            <a
              href="${credit.url || "#"}"
            >
              ${credit.name}
            </a>

            <span>
              ${credit.description || ""}
            </span>

          </div>
        `;

      }).join("");

  }


  /* =======================================
     LONG TOOL CONTENT
  ======================================= */

  if (toolContent) {

    toolContent.innerHTML =
      content.content || "";

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
      currentTool.faqs || []
    );


    return;

  }


  console.log(
    "No specific tool detected."
  );


  renderToolContent(
    homeToolContent
  );


  renderFaq(
    homeFaqs
  );

}
