import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCompress,
  faExpand,
  faDownload,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { Controlled as ControlledEditor } from "react-codemirror2";
import "codemirror/theme/material.css";
import "codemirror/theme/3024-day.css";
import "codemirror/theme/3024-night.css";
import "codemirror/theme/ambiance.css";
import "codemirror/theme/ayu-dark.css";
import "codemirror/theme/ayu-mirage.css";
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/base16-light.css";
import "codemirror/theme/bespin.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/cobalt.css";
import "codemirror/theme/colorforth.css";
// Add more theme imports here...

import ThemeSelector from "./ThemeSelector";

export default function Editor(props) {
  const { language, displayName, value, onChange, N } = props;
  const [selectedTheme, setSelectedTheme] = useState("material");
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  function handleChange(editor, data, value) {
    onChange(value);
  }

  const handleSaveClick = () => {
    const blob = new Blob([value], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${displayName.toUpperCase()}.${N}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleThemeChange = (newTheme) => {
    setSelectedTheme(newTheme);
    setThemeMenuOpen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen((prevFullscreen) => !prevFullscreen);
  };

  const toggleThemeMenu = () => {
    setThemeMenuOpen(!themeMenuOpen);
  };

  const availableThemes = [
    "material",
    "3024-day",
    "3024-night",
    "ambiance",
    "ayu-dark",
    "ayu-mirage",
    "base16-dark",
    "base16-light",
    "bespin",
    "blackboard",
    "cobalt",
    "colorforth",
    // Add more theme names here...
  ];

  const editorClassName = isFullscreen
    ? "code-mirror-fullscreen"
    : "code-mirror-wrapper";
  const buttonContainerClassName = isFullscreen
    ? "button-container-fullscreen"
    : "button-container";

  return (
    <div className={`editor-container ${isFullscreen ? "collapsed" : ""}`}>
      <div className="editor-title">
        {displayName}
        <div className={buttonContainerClassName}>
          <button
            className="save-button"
            type="button"
            onClick={toggleFullscreen}
          >
            <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
            <span className="pop">{isFullscreen ? "Compress" : "Expand"}</span>
          </button>
          <button
            className="save-button"
            type="button"
            onClick={handleSaveClick}
          >
            <FontAwesomeIcon icon={faDownload} />
            <span className="pop">Download</span>
          </button>
          <button
            className="save-button"
            type="button"
            onClick={toggleThemeMenu}
          >
            <FontAwesomeIcon icon={faGear} />
            <span className="pop">Setting</span>
          </button>
          {/* Conditional rendering of the theme menu (dropdown) */}
          {themeMenuOpen && (
            <ThemeSelector
              selectedTheme={selectedTheme}
              onChange={handleThemeChange}
              themes={availableThemes}
            />
          )}
        </div>
      </div>

      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className={editorClassName}
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          lineNumber: true,
          setSpellCheck: true,
          theme: selectedTheme,
          autoClosingBrackets: true,
          formatOnType: true,
          enableLiveAutocompletion: true,
        }}
      />
    </div>
  );
}
