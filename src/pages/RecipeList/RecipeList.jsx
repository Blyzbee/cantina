import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import style from "./RecipeList.module.scss";
import addIcon from "../../assets/icons/add-icon.svg";
import { useNavigate } from "react-router-dom";
import LevelSelector from "../../components/LevelSelector/LevelSelector";
import { durationParsing } from "../../utils/Parsing";

const RecipeList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [recipesData, setRecipeData] = useState(null);

  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [preparationTime, setPreparationTime] = useState(180);
  const [minPeople, setMinPeople] = useState();
  const [maxPeople, setMaxPeople] = useState();

  useEffect(() => {
    fetchRecipeData();
  }, []);

  const fetchRecipeData = () => {
    setLoading(true);
    axios
      .get("http://localhost:9000/api/recipes")
      .then((res) => {
        if (res.data) setRecipeData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Header />
      <div className="main-container">
        <h2>Découvrez toutes nos recettes !</h2>
        <div className={style.filtres}>
          <h3>Filtrer ma recherche par</h3>
          <div>
            <div>
              <label htmlFor="title">Titre</label>
              <input
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="level">Niveau de difficulté</label>
              <LevelSelector level={level} setLevel={setLevel} />
            </div>
            <div>
              <label htmlFor="preparationTime">Temps de préparation</label>
              <input
                type="range"
                min={5}
                max={180}
                value={preparationTime}
                onChange={(e) => setPreparationTime(e.target.value)}
              />{" "}
              <span>{durationParsing(preparationTime)} maximum</span>
            </div>
            <div>
              <label htmlFor="people">Nombre de personnes</label>
              <div>
                Entre{" "}
                <input
                  type="number"
                  value={minPeople}
                  onChange={(e) => setMinPeople(e.target.value)}
                />{" "}
                et{" "}
                <input
                  type="number"
                  value={maxPeople}
                  onChange={(e) => setMaxPeople(e.target.value)}
                />{" "}
                personnes
              </div>
            </div>
          </div>
        </div>
        <div className={style.listContainer}>
          <div
            className={style.card}
            onClick={() => navigate("/ajouter-recette")}
          >
            <img src={addIcon} />
            <h3>Ajouter une recette</h3>
          </div>
          {recipesData
            ?.filter((recipe) => {
              if (
                title &&
                recipe.titre.toLowerCase().search(title.toLowerCase()) === -1
              )
                return;
              if (level && level !== recipe.niveau) return;
              if (preparationTime && recipe.tempsPreparation > preparationTime)
                return;
              if (minPeople && minPeople > recipe.personnes) return;
              if (maxPeople && maxPeople < recipe.personnes) return;
              return recipe;
            })
            .map((recipe) => (
              <RecipeCard data={recipe} key={recipe.id} />
            ))}
          {!recipesData && !loading && (
            <div className={style.card}>
              <h3>Aucune recettes trouvées</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecipeList;
