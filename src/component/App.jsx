import Editor from "./Editor";
import { useEffect, useState } from "react";
import Storage from "../hooks/store";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faDownload } from '@fortawesome/free-solid-svg-icons';
import "./App.css";
import { Controlled as ControlledEditor } from "react-codemirror2";

function App(props) {
  const [html, setHtml] = Storage("html", "");
  const [css, setCss] = Storage("css", " ");
  const [js, setJs] = Storage("js", "");
  const [srcDoc, setSrcDoc] = useState("");
  const [open, setOpen] = useState(true);
  const { language, displayName, value, onChange, N } = props;



  function handleChange(editor, data, value) {
    onChange(value);
  }

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
    
    // Blob with the content
    const blob = new Blob([content], { type: "text/html" });

    // URL for the Blob
    const url = URL.createObjectURL(blob);

    // download link and trigger the click event
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
          N="html"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          N="css"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JAVASCRIPT"
          N="js"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="right">
      <div className="button-out-cont">
      <div className="out-text">

    <h1>OUTPUT</h1>
    <div className="buttons-and-output">
     
      <button className="save-button" type='button' onClick={handleSaveClick}>
        <FontAwesomeIcon icon={faDownload} />
        <span class="pop">Dowload</span>
      </button>
      <button className="save-button" type='button' onClick={handleRefreshClick}>
        <FontAwesomeIcon icon={open ? faArrowsRotate : faArrowsRotate} />
        <span class="pop">Refresh</span>
      </button>
    </div>
  </div>
</div>
</div>
<iframe
  title="output"
  srcDoc={srcDoc}
  sandbox="allow-scripts"
  width="100%"
  height="100%"
  style={{
    borderBottomRightRadius: '.5rem',
    borderBottomLeftRadius: '.5rem',
  }}
/>



      </div>
  
  );
}

export default App;
