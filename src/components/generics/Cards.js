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
    <div className="bg-brand-background">
      <div className="max-w-2xl mx-auto pt-4 pb-16 px-4 sm:py-9 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-white">Recipes</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
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
                  to={`${pathname}/${myRecipe.id}`}
                  key={index}
                  data-testid={`${index}-recipe-card`}
                  className="group relative mb-5"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                >
                  <div className="w-full min-h-80 bg-brand-background aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      data-testid={`${index}-card-img`}
                      src={myRecipe.thumb}
                      alt={myRecipe.recipeName}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h2
                          data-testid={`${index}-card-name`}
                          aria-hidden="true"
                          className="text-sm text-white"
                        >
                          {myRecipe.recipeName}
                        </h2>
                      </div>
                    </div>
                  </div>
                </Link>);
            })}
        </div>
      </div>
    </div>
  );
}

export default Cards;
