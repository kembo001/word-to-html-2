// AccordionPreview.js
import React, { useState, useRef, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import { cleanHTML } from "../utils";  // your cleaning function
import { parseAccordionsFromHtml } from "./accordionParser";
import "./AccordionPreview.css";
import { toast, ToastContainer } from "react-toastify";

const AccordionPreview = () => {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const previewRef = useRef(null);

  // When user types in the editor
  const handleInput = (e) => {
    const rawHtml = e.currentTarget.innerHTML;
    // 1) Clean the HTML
    const cleanedHtml = cleanHTML(rawHtml);
    // 2) Convert <h4> + <p> to accordions
    const accordionHtml = parseAccordionsFromHtml(cleanedHtml);
    // 3) Update state (final code)
    setContent(accordionHtml);
  };

  // Copy final HTML to clipboard
  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(content).then(() => {
        toast.success("HTML code copied to clipboard!");
      });
    } else {
      toast.error("Clipboard API not supported in your browser.");
    }
  };

  // Optional: Allow Ctrl+A to select all code in <pre>
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "a") {
        e.preventDefault();
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(previewRef.current);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Re-highlight syntax whenever `content` changes
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  return (
    <div className="editor-preview-container">
      <div className="word">
        <h2>Word → Accordion</h2>
        <div
          ref={editorRef}
          className="wysiwyg-editor"
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            height: "200px",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        />
      </div>

      <div className="html-preview">
        <h2>Accordion Code</h2>
        <pre
          className="language-html"
          ref={previewRef}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            height: "200px",
            maxHeight: "200px",
            backgroundColor: "#f9f9f9",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            overflowY: "auto",
          }}
        >
          <code className="language-html">{content}</code>
        </pre>
        <button onClick={handleCopy} style={{ marginBottom: "10px" }}>
          Copy HTML
        </button>
      </div>
    </div>
  );
};

export default AccordionPreview;
