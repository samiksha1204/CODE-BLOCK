import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./component/App";

ReactDOM.render(
  <React.StrictMode>
    <div>
      <h1 className="tit">CODEBLOCK</h1>
    </div>

    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
