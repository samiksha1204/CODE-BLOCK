import Editor from "./Editor";
import { useEffect, useState } from "react";
import Storage from "../hooks/store";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

import "./App.css";

function App() {
  const [html, setHtml] = Storage("html", "");
  const [css, setCss] = Storage("css", " ");
  const [js, setJs] = Storage("js", "");
  const [srcDoc, setSrcDoc] = useState("");
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const handleRefreshClick = () => {
    setHtml("");
    setCss("");
    setJs("");
  };

  const handleSaveClick = () => {
    // Combine HTML, CSS, and JS into a single content string
    const content = `<html><head><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`;
    
    // Create a Blob with the content
    const blob = new Blob([content], { type: "text/html" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a download link and trigger the click event
    const a = document.createElement("a");
    a.href = url;
    a.download = "code.html";
    a.click();

    // Release the URL object
    URL.revokeObjectURL(url);
  };

  return (
    <div className="playground">
      <div className="left">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JAVASCRIPT"
          value={js}
          onChange={setJs}
        />
      </div>

      <div className="right">
        <h1 className="title">
          OUTPUT
          <div className="button-container">
            <button className="refresh-button" type='button' onClick={handleRefreshClick}>
              <FontAwesomeIcon icon={open ? faArrowsRotate : faArrowsRotate} />
            </button>
            <button className="save-button" type='button' onClick={handleSaveClick}>
              <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
          </div>
        </h1>

        <iframe
          title="output"
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}

export default App;
