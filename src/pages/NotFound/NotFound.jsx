import React from "react";
import Header from "../../components/Header/Header";

const NotFound = () => {
  return (
    <>
      <Header goback />
      <div className="main-container">
        <h2>Erreur 404</h2>
        <span>La page que vous recherchez n'existe pas.</span>
      </div>
    </>
  );
};

export default NotFound;
