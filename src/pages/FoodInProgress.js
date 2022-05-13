import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { fetchFoodById } from '../services/detailsPagesAPIs';
import DetailsPagesHeader from '../components/generics/details/DetailsPagesHeader';
import RecipeContext from '../context/RecipeAppContext';
import { setIngredientsArray, setMeasuresArray } from '../helpers/setIngredientsArray';
import { handleMealStorage } from '../helpers/handleProgressStorage';
import { addLocalStorageDoneRecipe, setDoneRecipe } from '../helpers/setDoneRecipe';
import Header from '../components/generics/header/Header';
import Footer from '../components/generics/Footer';

function FoodInProgress() {
  const [completedIngredients, setCompletedIngredients] = useState([]);
  const [disabledFinishButton, setDisabledFinishButton] = useState(true);
  const [detailsData, setDetailsData] = useState([]);
  const [ingredientNames, setIngredientNames] = useState([]);
  const [ingredientMeasures, setIngredientMeasures] = useState([]);

  const { setDataById } = useContext(RecipeContext);
  const location = useLocation();
  const { pathname } = location;

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchFoodById(id).then((recipe) => {
      setDetailsData(recipe);
      setDataById(recipe);
      setIngredientNames(setIngredientsArray(recipe));
      setIngredientMeasures(setMeasuresArray(recipe));
    });
    const localMeals = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const localMealsDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (localMealsDone === null) {
      localStorage
        .setItem('doneRecipes', JSON.stringify([]));
      setCompletedIngredients([]);
    }
    if (localMeals === null) {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({ cocktails: {}, meals: {} }));
      setCompletedIngredients([]);
    } else {
      const storagedMeals = Object.entries(localMeals.meals);
      const checkLocal = storagedMeals.some((stCocktail) => stCocktail[0] === id);
      if (checkLocal) {
        const mealById = storagedMeals.filter((cocktail) => cocktail[0] === id);
        setCompletedIngredients(mealById[0][1]);
      } else {
        setCompletedIngredients([]);
      }
    }
  }, [id, setDataById]);

  const handleCheckBox = (value) => {
    let currIngredients;
    if (completedIngredients.length === 0) {
      currIngredients = [value];
    } else if (completedIngredients.includes(value)) {
      const newIngredients = completedIngredients
        .filter((ingredient) => ingredient !== value);
      currIngredients = newIngredients;
    } else {
      currIngredients = [...completedIngredients, value];
    }
    setCompletedIngredients(currIngredients);
    handleMealStorage(currIngredients, id);
    if (currIngredients.length === ingredientNames.length) {
      setDisabledFinishButton(false);
    } else {
      setDisabledFinishButton(true);
    }
  };

  const handleFinish = () => {
    const storagedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneRecipe = setDoneRecipe(pathname, detailsData);
    addLocalStorageDoneRecipe(doneRecipe, storagedDoneRecipes, pathname, id);
    history.push('/done-recipes');
  };

  return (detailsData.length === 1
    && (
      <div>
        <Header />
        <div className="bg-brand-background">
          <div className="mx-auto pt-6">
            <DetailsPagesHeader />
            <div>
              <div className="max-w-2xl mx-auto sm:pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                {/* Ingredients and Instruction */}
                <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                  <div className="sm:mt-10">
                    <h2 className="text-xl font-medium text-white">Ingredients</h2>
                    <div className="mt-4">
                      <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                        {ingredientNames.map((ingredient, index) => (
                          <li
                            key={index}
                            data-testid={`${index}-ingredient-name-and-measure`}
                          >
                            <label
                              data-testid={`${index}-ingredient-step`}
                              htmlFor={ingredient}
                            >
                              <input
                                id={ingredient}
                                type="checkbox"
                                value={ingredient}
                                checked={completedIngredients.includes(ingredient)}
                                onChange={({ target: { value } }) => handleCheckBox(value)}
                              />
                              <span>
                                {`${ingredient} - ${ingredientMeasures[index]}`}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-10">
                    <h2 className="text-xl font-medium text-white">Instructions</h2>
                    <div className="mt-4 space-y-6">
                      <p className="text-sm text-white">{detailsData[0].strInstructions}</p>
                    </div>
                  </div>
                </div>
                <div className="mb-3 flex flex-1 justify-center items-center">
                  <button
                    type="button"
                    data-testid="finish-recipe-btn"
                    disabled={disabledFinishButton}
                    onClick={handleFinish}
                    className="py-2 px-4 border border-transparent text-sm m-2 font-medium rounded-md text-brand-buttonText bg-brand-highlight hover:bg-brand-tertiary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-black disabled:opacity-50 disabled:hover:bg-brand-button transition-colors"
                  >
                    Finish Recipe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  );
}
export default FoodInProgress;

