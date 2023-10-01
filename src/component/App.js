 import Editor from "./Editor";
 import { useEffect,useState } from "react";
 import Storage from "../hooks/store";

function App() {
  const [html, setHtml] = Storage("html",'');
  const [css, setCss] = Storage("css",' ');
  const [js, setJs] = Storage("js","");
  const [srcDoc, setSrcDoc] = useState("");

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

  return (
    <>
      <div className="box top-box">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />

        <Editor language="css" displayName="CSS" value={css} onChange={setCss} />

        <Editor
          language="javascript"
          displayName="JAVASCRIPT"
          value={js}
          onChange={setJs}
        />
      </div>
      <div className="box">
        <iframe
          title="output"
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  );
}

export default App;
 