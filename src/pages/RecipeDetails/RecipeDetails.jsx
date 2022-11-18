import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { durationParsing } from "../../utils/Parsing";
import defaultPhoto from "../../assets/images/default-recipe-picture.jpg";

const RecipeDetails = () => {
  const [loading, setLoading] = useState(false);
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    fetchRecipeData();
  }, []);

  const fetchRecipeData = () => {
    setLoading(true);
    axios
      .get(
        `http://localhost:9000/api/recipe/${
          window.location.pathname.split("/")[2]
        }`
      )
      .then((res) => {
        setRecipeData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <Header goback />
      <div className="main-container">
        <h2>{recipeData?.titre}</h2>
        <p>{recipeData?.description}</p>
        <img
          src={recipeData?.photo ? recipeData.photo : defaultPhoto}
          alt={`Illustration du plat ${recipeData.titre}`}
        />
        <span>Niveau: {recipeData?.niveau}</span>
        <span>
          Pour: {recipeData?.personnes} personne
          {recipeData?.personnes > 1 && "s"}
        </span>
        <span>
          Temps de préparation: {durationParsing(recipeData?.tempsPreparation)}
        </span>
        <div>
          <span>Liste des ingrédients: </span>
          <ul>
            {recipeData?.ingredients.map((ingredient, i) => (
              <div key={i}>
                {ingredient[1]}, {ingredient[0]}
              </div>
            ))}
          </ul>
        </div>
        <div>
          <span>Etapes de préparation: </span>
          <ul>
            {recipeData?.etapes.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
