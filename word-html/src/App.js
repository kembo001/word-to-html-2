import React from "react";
import './App.css';
import EditorPreview from "./EditorPreview";

function App() {
  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>Triton Word to HTML Editor</h1>
      </header>

      {/* Editor and Preview */}
      <EditorPreview />

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; 2024 Triton WordHTML</p>
      </footer>
    </div>
  );
}

export default App;
