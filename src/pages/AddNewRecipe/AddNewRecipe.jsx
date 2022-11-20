import axios from "axios";
import { useState } from "react";
import Header from "../../components/Header/Header";
import { durationParsing } from "../../utils/Parsing";
import style from "./AddNewRecipe.module.scss";

import { useNavigate } from "react-router-dom";
import LevelSelector from "../../components/LevelSelector/LevelSelector";
import AddIngredients from "../../components/AddRecipeIngredients/AddRecipeIngredients";
import AddRecipeSteps from "../../components/AddRecipeStep/AddRecipeSteps";

const AddNewRecipe = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState([]);
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [people, setPeople] = useState();
  const [photoURL, setPhotoURL] = useState("");
  const [preparationTime, setPreparationTime] = useState();
  const [ingredients, setIngredients] = useState([]);

  const [error, setError] = useState("");

  // VALIDATE FORM
  const handleForm = (e) => {
    e.preventDefault();
    setError(false);
    if (
      !title ||
      !steps[0] ||
      !description ||
      !level ||
      !people ||
      people <= 0 ||
      !preparationTime ||
      preparationTime <= 0 ||
      !ingredients[0]
    ) {
      setError("Veuillez remplir tous les champs requis");
      return;
    }

    if (photoURL) {
      const regexUrl = "((http|https)://)(www.)?";

      if (!photoURL.match(regexUrl)) {
        setError("Le lien de l'image n'est pas valide");
        return;
      }
    }

    axios
      .post("http://localhost:9000/api/recipes", {
        titre: title,
        etapes: steps,
        description,
        photo: photoURL,
        niveau: level,
        personnes: Number(people),
        tempsPreparation: Number(preparationTime),
        ingredients,
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) =>
        alert(
          "erreur lors de l'ajout de la recette, veuillez réessayer. code: " +
            err
        )
      );

    setError("");
  };

  // JSX ------------------------------------------------------------
  return (
    <>
      <Header goback />
      <div className={`main-container ${style.addNewRecipe}`}>
        <h2>Ajouter une nouvelle recette</h2>

        {/* ADDING RECIPE FORM */}
        <form onSubmit={(e) => handleForm(e)} className={style.form}>
          <div>
            <label htmlFor="title">Nom de la recette</label>
            <input
              name="title"
              type="text"
              placeholder="exemple: Dustcrepe"
              className={error && !title && "error-border"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Description de votre plat</label>
            <textarea
              name="description"
              placeholder="exemple: Croustillant menthe, feta et concombre"
              className={error && !description && "error-border"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="photoURL">
              URL de la photo du plat (optionnel)
            </label>
            <input
              name="photoURL"
              type="text"
              placeholder="exemple: http://localhost:9000/images/dustcrepe.jpg"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="level">Niveau de difficulté</label>
            <LevelSelector level={level} setLevel={setLevel} error={error} />
          </div>
          <div>
            <label htmlFor="people">Nombre de personnes</label>
            <input
              name="people"
              type="number"
              className={error && !people && "error-border"}
              value={people}
              onChange={(e) => setPeople(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="preparationTime">Temps de préparation</label>
            <div>
              <input
                name="preparationTime"
                type="number"
                className={error && !preparationTime && "error-border"}
                value={preparationTime}
                onChange={(e) => setPreparationTime(e.target.value)}
              />{" "}
              minutes
              {preparationTime >= 60 && (
                <i>({durationParsing(preparationTime)})</i>
              )}
            </div>
          </div>
          <AddIngredients
            ingredients={ingredients}
            setIngredients={setIngredients}
            error={error}
          />
          <AddRecipeSteps steps={steps} setSteps={setSteps} error={error} />
          <div className={style.submit}>
            {error && <span className="error">{error}</span>}
            <button className="button">Ajouter la nouvelle recette</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddNewRecipe;
