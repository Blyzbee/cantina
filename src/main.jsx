import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import AddNewRecipe from "./pages/AddNewRecipe/AddNewRecipe";
import EditRecipe from "./pages/EditRecipe/EditRecipe";
import RecipeDetails from "./pages/RecipeDetails/RecipeDetails";
import RecipeList from "./pages/RecipeList/RecipeList";
import NotFound from "./pages/NotFound/NotFound";
import "./index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RecipeList />,
    errorElement: <NotFound />,
  },
  {
    path: "/recette/:id",
    element: <RecipeDetails />,
  },
  {
    path: "/modifier-recette/:id",
    element: <EditRecipe />,
  },
  {
    path: "/ajouter-recette",
    element: <AddNewRecipe />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
