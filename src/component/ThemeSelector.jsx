import React from "react";

export default function ThemeSelector(props) {
  const { selectedTheme, onChange, themes } = props;

  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    onChange(newTheme);
  };

  return (
    <div className="theme-selector">
      <select
        value={selectedTheme}
        onChange={handleThemeChange}
        style={{ color: "white", background: "black" }}
      >
        {themes.map((themeName) => (
          <option key={themeName} value={themeName}>
            {themeName}
          </option>
        ))}
      </select>
    </div>
  );
}
