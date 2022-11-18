import axios from "axios";
import { useState } from "react";
import Header from "../../components/Header/Header";
import { durationParsing } from "../../utils/Parsing";
import style from "./AddNewRecipe.module.scss";

import cross from "../../assets/icons/cross.svg";

const AddNewRecipe = () => {
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState([]);
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [people, setPeople] = useState(0);
  const [photoURL, setPhotoURL] = useState("");
  const [cookingTime, setCookingTime] = useState(0);
  const [ingredients, setIngredients] = useState([]);

  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");
  const [step, setStep] = useState("");

  const [error, setError] = useState("");

  // ADDING AN INGREDIENT
  const addIngredient = (e) => {
    e.preventDefault();
    if (!ingredientName || !ingredientQuantity) {
      return;
    }

    let newIngredients = [...ingredients, [ingredientQuantity, ingredientName]];
    setIngredients(newIngredients);
    setIngredientName("");
    setIngredientQuantity("");
  };

  // REMOVE AN INGREDIENT
  const removeIngredient = (i) => {
    let newIngredients = [];
    ingredients.forEach((ingredient, index) => {
      if (i !== index) newIngredients.push(ingredient);
    });

    setIngredients(newIngredients);
  };

  // ADDING A STEP
  const addStep = (e) => {
    e.preventDefault();
    if (!step) {
      return;
    }

    let newSteps = [...steps, step];
    setSteps(newSteps);
    setStep("");
  };

  // REMOVE A STEP
  const removeStep = (i) => {
    let newSteps = [];
    steps.forEach((step, index) => {
      if (i !== index) newSteps.push(step);
    });

    setSteps(newSteps);
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
      !cookingTime ||
      cookingTime <= 0 ||
      !ingredients[0]
    ) {
      setError("Veuillez remplir tous les champs requis");
      return;
    }

    axios
      .post("http://localhost:9000/api/recipes", {
        titre: title,
        etapes: steps,
        description,
        niveau: level,
        personnes: Number(people),
        tempsPreparation: Number(cookingTime),
        ingredients,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

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
            <select
              name="level"
              className={error && !level && "error-border"}
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="" disabled>
                Sélectionnez un niveau de difficulté
              </option>
              <option value="padawan">Padawan</option>
              <option value="jedi">Jedi</option>
              <option value="maitre">Maitre</option>
            </select>
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
            <label htmlFor="cookingTime">Temps de préparation</label>
            <div>
              <input
                name="cookingTime"
                type="number"
                className={error && !cookingTime && "error-border"}
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
              />{" "}
              minutes
              {cookingTime >= 60 && <i>({durationParsing(cookingTime)})</i>}
            </div>
          </div>
          <div>
            <label htmlFor="ingredients">Liste des ingrédients</label>
            {ingredients.map((ingredient, i) => (
              <div key={i}>
                {ingredient[0]} {ingredient[1]}{" "}
                <img
                  src={cross}
                  alt="supprimer l'ingrédient"
                  onClick={() => removeIngredient(i)}
                />
              </div>
            ))}
            <div>
              <label htmlFor="ingredientQuantity">Quantité</label>
              <input
                name="ingredientQuantity"
                type="text"
                className={error && !ingredients[0] && "error-border"}
                placeholder="300ml"
                value={ingredientQuantity}
                onChange={(e) => setIngredientQuantity(e.target.value)}
              />
              <label htmlFor="ingredientName">Ingrédient</label>
              <input
                name="ingredientName"
                type="text"
                className={error && !ingredients[0] && "error-border"}
                placeholder="de lait"
                value={ingredientName}
                onChange={(e) => setIngredientName(e.target.value)}
              />
              <button className="button" onClick={(e) => addIngredient(e)}>
                Ajouter
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="step">Liste des étapes</label>
            {steps.map((step, i) => (
              <div key={i}>
                {step}{" "}
                <img
                  src={cross}
                  alt="supprimer l'étape"
                  onClick={() => removeStep(i)}
                />
              </div>
            ))}
            <textarea
              name="step"
              className={error && !steps[0] && "error-border"}
              placeholder="Commencez par préparer le concombre et la menthe. Épluchez le concombre et taillez-le en mirepoix (dés de 1 cm environ). Réservez."
              value={step}
              onChange={(e) => setStep(e.target.value)}
            />
            <button className="button" onClick={(e) => addStep(e)}>
              Ajouter
            </button>
          </div>
          {error && <span className="error">{error}</span>}
          <button className="button">Valider</button>
        </form>
      </div>
    </>
  );
};

export default AddNewRecipe;
