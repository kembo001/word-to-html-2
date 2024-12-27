import React from "react";
import './App.css';
import EditorPreview from "./EditorPreview";
import AccordionPreview from "./AccordionPreview";

function App() {
  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>Triton Word to HTML Editor</h1>
      </header>

      {/* Editor and Preview */}
      <EditorPreview />
      
       {/* For Accrodion */}
       <div>
         <h3>For Accordions</h3>
       <AccordionPreview />
       </div>

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; 2024 Triton WordHTML</p>
      </footer>
    </div>
  );
}

export default App;
