import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import RecipeContext from '../../context/RecipeAppContext';

function Cards() {
  const {
    data,
  } = useContext(RecipeContext);

  const location = useLocation();
  const { pathname } = location;

  return (
    <div>
      {data
        && data.map((recipe, index) => {
          let myRecipe = {};
          if (pathname === '/drinks') {
            myRecipe = {
              id: recipe.idDrink,
              thumb: recipe.strDrinkThumb,
              recipeName: recipe.strDrink,
            };
          }
          if (pathname === '/foods') {
            myRecipe = {
              id: recipe.idMeal,
              thumb: recipe.strMealThumb,
              recipeName: recipe.strMeal,
            };
          }

          return (
            <Link
              to={ `${pathname}/${myRecipe.id}` }
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
              <div>
                <h2
                  data-testid={ `${index}-card-name` }
                >
                  {myRecipe.recipeName}
                </h2>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ myRecipe.thumb }
                  alt=""
                />
              </div>
            </Link>);
        })}
    </div>
  );
}

export default Cards;
