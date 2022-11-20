import { useState } from "react";
import cross from "../../assets/icons/cross.svg";
import style from "./AddRecipeSteps.module.scss";

const AddRecipeSteps = ({ steps, setSteps, error }) => {
  const [step, setStep] = useState("");

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

  return (
    <div className={style.addRecipeSteps}>
      <label htmlFor="step">Liste des étapes</label>
      {steps.map((step, i) => (
        <div key={i} className={style.card}>
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
        placeholder="exemple: Commencez par préparer le concombre et la menthe. Épluchez le concombre et taillez-le en mirepoix (dés de 1 cm environ). Réservez."
        value={step}
        onChange={(e) => setStep(e.target.value)}
      />
      <button className="button" onClick={(e) => addStep(e)}>
        Ajouter l'étape
      </button>
    </div>
  );
};

export default AddRecipeSteps;
