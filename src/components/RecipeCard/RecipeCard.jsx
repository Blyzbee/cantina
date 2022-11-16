import style from "./RecipeCard.module.scss";
import { durationParsing } from "../../utils/Parsing";
import defaultRecipePicture from "../../assets/images/default-recipe-picture.jpg";
import { Link } from "react-router-dom";

const RecipeCard = ({ data }) => {
  return (
    <div
      className={`card ${style.recipeCard}`}
      style={{
        backgroundImage: data.photo
          ? `url(${data.photo})`
          : defaultRecipePicture,
      }}
    >
      <h3>{data.titre}</h3>
      <div>
        <div>
          <span>
            Recette pour {data.personnes} personne{data.personnes > 1 && "s"}
          </span>
        </div>
        <div>
          <strong>Niveau: </strong>
          <span>{data.niveau}</span>
        </div>
        <div>
          <strong>Temps de préparation: </strong>
          <span>{durationParsing(data.tempsPreparation)}</span>
        </div>
        <Link to={`recette/${data.id}`}>Détails</Link>
      </div>
    </div>
  );
};

export default RecipeCard;
