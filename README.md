# WordHTML Clone
[Live Site](https://kembo001.github.io/word-to-html-2/)
This project is a React-based web application inspired by WordHTML. It provides users with a WYSIWYG (What You See Is What You Get) editor to create rich text and convert it into clean HTML.

## Features

- **Rich Text Editor**: Format text (bold, italic, underline, lists, etc.) easily.
- **Live HTML Preview**: View generated HTML in real-time.
- **HTML Export**: Copy or download the generated HTML.
- **Clean and Minimal Interface**: User-friendly design for a seamless experience.

## Tech Stack

- **Frontend**: React
- **Styling**: CSS (or your preferred CSS framework)
- **State Management**: React Hooks
- **Text Parsing**: DOM manipulation and sanitization libraries (e.g., DOMPurify if needed)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wordhtml-clone.git
   cd wordhtml-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Folder Structure

```
wordhtml/
├── public/          # Static assets
├── src/
│   ├── Accordions/  # Word to HTML for Accordion
│   ├── App.css      # CSS
│   ├── App.js       # Main application file
│   ├── EditorPreview.js       # Main application file
│   ├── Index.css    # CSS
│   ├── Index.js     # Entry point
└── ├── utils.js     # Function Code
```

## Usage

- Open the editor in your browser.
- Use the toolbar to format text.
- View the HTML output in the preview panel.


## Roadmap

- Add support for custom themes.
- Integrate file upload for importing/exporting content.
- Enhance text formatting options.
- Provide user authentication for saving editor settings.



