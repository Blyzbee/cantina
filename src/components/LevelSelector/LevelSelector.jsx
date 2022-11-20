import React from "react";

const LevelSelector = ({ level, setLevel, error }) => {
  return (
    <select
      name="level"
      className={error && !level && "error-border"}
      value={level}
      onChange={(e) => setLevel(e.target.value)}
    >
      <option value="">Sélectionnez un niveau de difficulté</option>
      <option value="padawan">Padawan</option>
      <option value="jedi">Jedi</option>
      <option value="maitre">Maitre</option>
    </select>
  );
};

export default LevelSelector;
