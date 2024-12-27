import DOMPurify from "dompurify";

// Normalize and clean HTML content
export const cleanHTML = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // 1) If there's no block-level element in tempDiv,
  //    wrap the entire content in a single <p> to start.
  const hasBlockElement = tempDiv.querySelector(
    "p, h1, h2, h3, h4, h5, h6, ul, ol, li, blockquote, div, table"
  );
  if (!hasBlockElement) {
    tempDiv.innerHTML = `<p>${tempDiv.innerHTML}</p>`;
  }

  // 2) Convert one or more <br> tags into a paragraph break.
  tempDiv.innerHTML = tempDiv.innerHTML.replace(/(<br\s*\/?>\s*)+/gi, "</p><p>");

  // 3) Remove empty <p> tags (including whitespace and &nbsp;)
  tempDiv.innerHTML = tempDiv.innerHTML.replace(/<p>(?:&nbsp;|\s)*<\/p>/gi, "");

  // Remove unnecessary span tags
  Array.from(tempDiv.querySelectorAll("span")).forEach((span) => {
    if (!span.attributes.length) {
      span.replaceWith(span.innerHTML);
    }
  });

  // Remove aria-level attributes
  Array.from(tempDiv.querySelectorAll("[aria-level]")).forEach((node) => {
    node.removeAttribute("aria-level");
  });

  // Helper function to capitalize each word
  const capitalizeWords = (str) => {
    return str
      .split("-") // Split words by hyphen
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Simplify links and add titles
  Array.from(tempDiv.querySelectorAll("a")).forEach((link) => {
    const href = link.getAttribute("href");

    if (href && href.includes("tritonsetup")) {
      // Simplify URL by converting to relative path
      const relativePath = href.replace(/^https?:\/\/[^/]+/, "");
      link.setAttribute("href", relativePath);
    }

    // Add or update title attribute based on relative path
    const relativePath = link.getAttribute("href");
    if (relativePath) {
      const pathSegments = relativePath.split("/").filter(Boolean);
      const lastSegment = pathSegments.pop();
      if (lastSegment) {
        const formattedTitle = capitalizeWords(lastSegment);
        link.setAttribute("title", formattedTitle);
      }
    }
  });

  // Remove <p> tags inside <li> elements
  Array.from(tempDiv.querySelectorAll("li")).forEach((li) => {
    Array.from(li.querySelectorAll("p")).forEach((p) => {
      p.replaceWith(...p.childNodes); // Replace <p> with its content
    });
  });

  // ------------------------------------------------------------------------- NICHE CODE THAT COULD POSSIBLY CHANGE ANYTIME ---------------------------------------

  // Convert <p> tags with square brackets to <a> tags
  Array.from(tempDiv.querySelectorAll("p")).forEach((p) => {
    const match = p.textContent.trim().match(/^\[(.+?)\]$/);
    if (match) {
      const text = match[1];
      const link = document.createElement("a");
      link.textContent = text;
      link.setAttribute("href", "/free-estimate");
      link.setAttribute("class", "button button--primary");
      link.setAttribute("title", capitalizeWords(text));
      p.replaceWith(link);
    }
  });

  // Add "uvp" class to <ul> tags following an <h1>
  Array.from(tempDiv.querySelectorAll("ul")).forEach((ul) => {
    const previousElement = ul.previousElementSibling;
    if (previousElement && previousElement.tagName === "H1") {
      ul.classList.add("uvp");
    }
  });

  // ------------------------------------------------------------------------- NICHE CODE THAT COULD POSSIBLY CHANGE ANYTIME ---------------------------------------

  // Use DOMPurify to sanitize the cleaned HTML
  return DOMPurify.sanitize(tempDiv.innerHTML, {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "ul",
      "ol",
      "li",
      "a",
      "b",
      "i",
      "u",
      "strong",
      "em",
    ],
    ALLOWED_ATTR: ["href", "title", "class"],
  });
};
