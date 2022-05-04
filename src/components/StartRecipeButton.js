import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import defineProgressRecipe from '../helpers/setStartRecipeButton';
import './StartRecipeButton.css';

function StartRecipeButton() {
  const [recipeDone, setRecipeDone] = useState(false);
  const [progressRecipe, setProgressRecipe] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const { id } = useParams();
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const currId = id;

  useEffect(() => {
    if (doneRecipes) {
      const checkRecipeById = doneRecipes
        .some((recipe) => Number(recipe.id) === Number(currId));
      setRecipeDone(checkRecipeById);
    }
    defineProgressRecipe(pathname, currId, setProgressRecipe);
  }, [doneRecipes, currId, pathname]);

  if (!recipeDone && !progressRecipe) {
    return (
      <button
        className="recipe-button"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ pathname.includes('foods')
          ? () => history.push(`/foods/${currId}/in-progress`)
          : () => history.push(`/drinks/${currId}/in-progress`) }
      >
        Start Recipe
      </button>
    );
  }

  if (!recipeDone && progressRecipe) {
    return (
      <button
        className="recipe-button"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ pathname.includes('foods')
          ? () => history.push(`/foods/${currId}/in-progress`)
          : () => history.push(`/drinks/${currId}/in-progress`) }
      >
        Continue Recipe
      </button>
    );
  }
  return (
    ''
  );
}

export default StartRecipeButton;
