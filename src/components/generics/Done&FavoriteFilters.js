import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeContext from '../../context/RecipeAppContext';

const DONE_RECIPES = '/done-recipes';
const FAVORITE_RECIPES = '/favorite-recipes';

function DoneAndFavoriteFilters() {
  const location = useLocation();
  const { pathname } = location;
  const { setDoneRecipes, setFavoriteRecipes } = useContext(RecipeContext);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (doneRecipes === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    } else {
      setDoneRecipes(doneRecipes);
    }
    if (favoriteRecipes === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      setFavoriteRecipes(favoriteRecipes);
    }
  }, [setDoneRecipes, setFavoriteRecipes]);

  const handleAllClick = () => {
    if (pathname === DONE_RECIPES) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      setDoneRecipes(doneRecipes);
    }
    if (pathname === FAVORITE_RECIPES) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoriteRecipes(favoriteRecipes);
    }
  };

  const handleFoodClick = () => {
    if (pathname === DONE_RECIPES) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      const doneRecipesFoods = doneRecipes.filter((recipe) => recipe.type === 'food');
      setDoneRecipes(doneRecipesFoods);
    }
    if (pathname === FAVORITE_RECIPES) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const favoriteRecipesFoods = favoriteRecipes
        .filter((recipe) => recipe.type === 'food');
      setFavoriteRecipes(favoriteRecipesFoods);
    }
  };

  const handleDrinksClick = () => {
    if (pathname === DONE_RECIPES) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      const doneRecipesDrinks = doneRecipes.filter((recipe) => recipe.type === 'drink');
      setDoneRecipes(doneRecipesDrinks);
    }
    if (pathname === FAVORITE_RECIPES) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const favoriteRecipesDrinks = favoriteRecipes
        .filter((recipe) => recipe.type === 'drink');
      setFavoriteRecipes(favoriteRecipesDrinks);
    }
  };

  return (
    <div className="max-w-7xl mx-auto m-2">
      <div className="max-w-2xl mx-auto">
        <div className="mt-1 grid grid-cols-none grid-flow-col grid-rows-1 gap-1">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={handleAllClick}
            className="py-2 px-4 border border-transparent text-sm m-2 font-medium rounded-md text-brand-buttonText bg-brand-highlight hover:bg-brand-tertiary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-black transition-colors"
          >
            All
          </button>

          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={handleFoodClick}
            className="py-2 px-4 border border-transparent text-sm m-2 font-medium rounded-md text-brand-buttonText bg-brand-highlight hover:bg-brand-tertiary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-black transition-colors"
          >
            Food
          </button>

          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={handleDrinksClick}
            className="py-2 px-4 border border-transparent text-sm m-2 font-medium rounded-md text-brand-buttonText bg-brand-highlight hover:bg-brand-tertiary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-black transition-colors"
          >
            Drinks
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoneAndFavoriteFilters;
