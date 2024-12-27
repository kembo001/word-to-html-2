
 export function parseAccordionsFromHtml(html) {
    // 1) Insert the HTML into a DOM
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
  
    // 2) Get all <h4> elements (our "accordion headings")
    const h4Elements = Array.from(tempDiv.querySelectorAll("h4"));
    // If no <h4> headings, just return original HTML (nothing to do)
    if (!h4Elements.length) {
      return html;
    }
  
    // 3) Create the accordion-group container
    //    (We'll put all accordion items in here)
    const accordionGroup = document.createElement("div");
    accordionGroup.setAttribute("data-accordion-group", "");
  
    // Helper: build one accordion item
    function createAccordionItem(headingEl, contentEls) {
      const accordionItem = document.createElement("div");
      accordionItem.setAttribute("data-accordion", "");
  
      const controlDiv = document.createElement("div");
      controlDiv.setAttribute("data-control", "");
      controlDiv.innerHTML = `<i class="fas fa-triangle"></i>${headingEl.innerHTML}`;
  
      const contentDiv = document.createElement("div");
      contentDiv.setAttribute("data-content", "");
  
      // Move each content element (<p>) into contentDiv
      contentEls.forEach((el) => contentDiv.appendChild(el));
  
      // Combine them
      accordionItem.appendChild(controlDiv);
      accordionItem.appendChild(contentDiv);
  
      return accordionItem;
    }
  
    // 4) Loop through each <h4> to build an accordion item
    for (let i = 0; i < h4Elements.length; i++) {
      const currentH4 = h4Elements[i];
      const nextH4 = h4Elements[i + 1]; // might be undefined if this is the last heading
  
      // Gather all <p> between currentH4 and nextH4
      let contentEls = [];
      let sibling = currentH4.nextElementSibling;
      while (sibling && sibling !== nextH4) {
        // If you specifically only want <p> tags, check:
        if (sibling.tagName === "P") {
          contentEls.push(sibling);
        }
        sibling = sibling.nextElementSibling;
      }
  
      // Build a <div data-accordion=""> item
      const accordionItem = createAccordionItem(currentH4, contentEls);
      accordionGroup.appendChild(accordionItem);
    }
  
    // 5) Return the new accordion HTML
    return accordionGroup.outerHTML;
  }
  