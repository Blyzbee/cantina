import React from "react";
import style from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={style.loading}>
      <h1>Chargement de la page</h1>
      <span>Veuillez patienter</span>
    </div>
  );
};

export default Loading;
