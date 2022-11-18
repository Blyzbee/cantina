import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import style from "./RecipeList.module.scss";
import addIcon from "../../assets/icons/add-icon.svg";
import { useNavigate } from "react-router-dom";

const RecipeList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [recipesData, setRecipeData] = useState(null);

  useEffect(() => {
    fetchRecipeData();
  }, []);

  const fetchRecipeData = () => {
    setLoading(true);
    axios
      .get("http://localhost:9000/api/recipes")
      .then((res) => {
        if (res.data) setRecipeData(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="main-container">
      <Header />
      <h2>Découvrez toutes nos recettes !</h2>
      <div>
        <h3>Filtres</h3>
      </div>
      <div className={style.listContainer}>
        <div className="card" onClick={() => navigate("/ajouter-recette")}>
          <h3>Ajouter une recette</h3>
          <img src={addIcon} />
        </div>
        {recipesData?.map((recipe) => (
          <RecipeCard data={recipe} key={recipe.id} />
        ))}
        {!recipesData && !loading && (
          <div className="card">
            <h3>Aucune recettes trouvées</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
