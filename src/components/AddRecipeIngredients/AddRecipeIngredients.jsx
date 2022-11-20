import { useState } from "react";
import cross from "../../assets/icons/cross.svg";
import style from "./AddRecipeIngredients.module.scss";

const AddRecipeIngredients = ({ ingredients, setIngredients, error }) => {
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientQuantity, setIngredientQuantity] = useState("");

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

  return (
    <div className={style.addRecipeIngredients}>
      <label htmlFor="ingredients">Liste des ingrédients</label>
      {ingredients.map((ingredient, i) => (
        <div key={i} className={style.card}>
          {ingredient[0]} {ingredient[1]}{" "}
          <img
            src={cross}
            alt="supprimer l'ingrédient"
            onClick={() => removeIngredient(i)}
          />
        </div>
      ))}
      <div>
        <div>
          Quantité
          <input
            name="ingredientQuantity"
            type="text"
            className={error && !ingredients[0] && "error-border"}
            placeholder="300ml"
            value={ingredientQuantity}
            onChange={(e) => setIngredientQuantity(e.target.value)}
          />
        </div>
        <div>
          Ingrédient
          <input
            name="ingredientName"
            type="text"
            className={error && !ingredients[0] && "error-border"}
            placeholder="de lait"
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
          />
        </div>
      </div>
      <button className="button" onClick={(e) => addIngredient(e)}>
        Ajouter l'ingrédient
      </button>
    </div>
  );
};

export default AddRecipeIngredients;
