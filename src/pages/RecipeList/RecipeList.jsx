import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import axios from "axios";
import RecipeCard from "../../components/RecipeCard/RecipeCard";
import style from "./RecipeList.module.scss";

const RecipeList = () => {
  const [recipesData, setRecipeData] = useState(null);

  useEffect(() => {
    fetchRecipeData();
  }, []);

  const fetchRecipeData = () => {
    axios
      .get("http://localhost:9000/api/recipes")
      .then((res) => {
        if (res.data) setRecipeData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="main-container">
      <Header />
      <h2>recipe list</h2>
      <div>
        <h3>Filtres</h3>
      </div>
      <div className={style.listContainer}>
        {recipesData?.map((recipe) => (
          <RecipeCard data={recipe} key={recipe.id} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
