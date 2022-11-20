import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { durationParsing } from "../../utils/Parsing";
import defaultPhoto from "../../assets/images/default-recipe-picture.jpg";
import Loading from "../../components/Loading/Loading";
import style from "./RecipeDetails.module.scss";
import { useNavigate } from "react-router-dom";

const RecipeDetails = () => {
  const navigate = useNavigate();
  const recipeId = window.location.pathname.split("/")[2];
  const [loading, setLoading] = useState(false);
  const [recipeData, setRecipeData] = useState(null);

  useEffect(() => {
    fetchRecipeData();
  }, []);

  const fetchRecipeData = () => {
    setLoading(true);
    axios
      .get(`http://localhost:9000/api/recipe/${recipeId}`)
      .then((res) => {
        setRecipeData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const deleteRecipe = () => {
    let confirmation = confirm(
      "Voulez vous vraiment supprimer cette recette ?"
    );

    if (!confirmation) return;

    axios
      .delete(`http://localhost:9000/api/recipe/${recipeId}`)
      .then((res) => {
        navigate("/");
      })
      .catch((err) =>
        alert(
          "Une erreur s'est produite à la suppression de cette recette. Veuillez réessayer. code: " +
            err
        )
      );
  };

  if (loading) {
    return <Loading />;
  } else if (!recipeData) {
    return (
      <>
        <Header goback />
        <div className="main-container">
          <h2>Erreur 404</h2>
          <div>Cette recette n'existe pas.</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header goback />
      <div className={`main-container ${style.recipeDetails}`}>
        <h2>{recipeData?.titre}</h2>
        <p>{recipeData?.description}</p>
        <div className={style.photoContainer}>
          <img
            src={recipeData?.photo ? recipeData.photo : defaultPhoto}
            alt={`Illustration du plat ${recipeData.titre}`}
          />
        </div>
        <div>
          <div>Niveau: {recipeData?.niveau}</div>
          <div>
            Pour: {recipeData?.personnes} personne
            {recipeData?.personnes > 1 && "s"}
          </div>
          <div>
            Temps de préparation:{" "}
            {durationParsing(recipeData?.tempsPreparation)}
          </div>
          <div>
            <span>Liste des ingrédients: </span>
            <ul>
              {recipeData?.ingredients.map((ingredient, i) => (
                <li key={i}>
                  <span className="primary-color">{ingredient[0]}</span>{" "}
                  {ingredient[1]}
                </li>
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
        <div className={style.buttonsContainer}>
          <button
            className="button"
            onClick={() => navigate(`/modifier-recette/${recipeId}`)}
          >
            Modifier la recette
          </button>
          <button className="button warning" onClick={() => deleteRecipe()}>
            Supprimer la recette
          </button>
        </div>
      </div>
    </>
  );
};

export default RecipeDetails;
