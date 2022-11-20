import axios from "axios";
import { useState } from "react";
import Header from "../../components/Header/Header";
import { durationParsing } from "../../utils/Parsing";
import style from "./EditRecipe.module.scss";

import { useNavigate } from "react-router-dom";
import LevelSelector from "../../components/LevelSelector/LevelSelector";
import AddIngredients from "../../components/AddRecipeIngredients/AddRecipeIngredients";
import AddRecipeSteps from "../../components/AddRecipeStep/AddRecipeSteps";
import { useEffect } from "react";

const EditRecipe = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const recipeId = window.location.pathname.split("/")[2];
  const [recipeData, setRecipeData] = useState(null);

  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState([]);
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [people, setPeople] = useState(0);
  const [photoURL, setPhotoURL] = useState("");
  const [preparationTime, setPreparationTime] = useState(0);
  const [ingredients, setIngredients] = useState([]);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecipeData();
  }, []);

  const fetchRecipeData = () => {
    setLoading(true);
    axios
      .get(`http://localhost:9000/api/recipe/${recipeId}`)
      .then((res) => {
        setRecipeData(res.data);
        setTitle(res.data.titre);
        setDescription(res.data.description);
        setLevel(res.data.niveau);
        setPeople(res.data.personnes);
        setPhotoURL(res.data.photo);
        setPreparationTime(res.data.tempsPreparation);
        setIngredients(res.data.ingredients);
        setSteps(res.data.etapes);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

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
      .put(`http://localhost:9000/api/recipe/${recipeId}`, {
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
        navigate(`/recette/${recipeId}`);
      })
      .catch((err) =>
        alert(
          "erreur lors de la modification de la recette, veuillez réessayer. code: " +
            err
        )
      );

    setError("");
  };

  return (
    <>
      <Header goback />
      <div className={`main-container ${style.editRecipe}`}>
        <h2>Modifier la recette {recipeData?.titre}</h2>

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
            <button className="button">Modifier la recette</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditRecipe;
