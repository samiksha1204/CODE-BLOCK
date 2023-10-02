import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompress,
  faExpand,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";

export default function Editor(props) {
  const { language, displayName, value, onChange } = props;

  const [open, setOpen] = useState(true);

  function handleChange(editor, data, value) {
    onChange(value);
  }

  const handleSaveClick = () => {
    // Create a Blob with the content
    const blob = new Blob([value], { type: "text/plain" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a download link and trigger the click event
    const a = document.createElement("a");
    a.href = url;
    a.download = `${displayName.toLowerCase()}.${language}`;
    a.click();

    // Release the URL object
    URL.revokeObjectURL(url);
  };

  return (
    <div className={` editor-container${open ? "" : "collapsed"}`}>
      <div className="editor-title">
        {displayName}
        <div className="button-container">
          <button
            className="e-button"
            type="button"
            onClick={() => setOpen((prevOpen) => !prevOpen)}
          >
            <FontAwesomeIcon icon={open ? faCompress : faExpand} />
          </button>
          <button
            className="save-button"
            type="button"
            onClick={handleSaveClick}
          >
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
        </div>
      </div>

      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumber: true,
          setSpellCheck: true,
          theme: "material",
          autoClosingBrackets: true,
          formatOnType: true,
          enableLiveAutocompletion: true,
        }}
      />
    </div>
  );
}
