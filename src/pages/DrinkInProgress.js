import React, { useContext, useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import DetailsPagesHeader from '../components/DetailsPagesHeader';
import RecipeContext from '../context/RecipeAppContext';
import { setIngredientsArray, setMeasuresArray } from '../helpers/setIngredientsArray';
import { fetchDrinkById } from '../requisitions/detailsPagesAPIs';
import { handleCocktailStorage } from '../helpers/handleProgressStorage';
import { setDoneRecipe, addLocalStorageDoneRecipe } from '../helpers/setDoneRecipe';
import './DrinkInProgress.css';

function DrinkInProgress() {
  const [completedIngredients, setCompletedIngredients] = useState([]);
  const [disabledFinishButton, setDisabledFinishButton] = useState(true);
  const [detailsData, setDetailsData] = useState([]);
  const [ingredientNames, setIngredientNames] = useState([]);
  const [ingredientMeasures, setIngredientMeasures] = useState([]);

  const { dataById, setDataById } = useContext(RecipeContext);

  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const doneRecipe = setDoneRecipe(pathname, dataById);

  useEffect(() => {
    fetchDrinkById(id).then((recipe) => {
      setDetailsData(recipe);
      setDataById(recipe);
      setIngredientNames(setIngredientsArray(recipe));
      setIngredientMeasures(setMeasuresArray(recipe));
    });

    const localCocktails = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (localCocktails === null) {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify({ cocktails: {}, meals: {} }));
      setCompletedIngredients([]);
    } else {
      const storagedCocktails = Object.entries(localCocktails.cocktails);
      const checkLocal = storagedCocktails.some((stCocktail) => stCocktail[0] === id);

      if (checkLocal) {
        const cocktailById = storagedCocktails.filter((cocktail) => cocktail[0] === id);
        setCompletedIngredients(cocktailById[0][1]);
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
    handleCocktailStorage(currIngredients, id);
    if (currIngredients.length === ingredientNames.length) {
      setDisabledFinishButton(false);
    } else {
      setDisabledFinishButton(true);
    }
  };

  const handleFinish = () => {
    addLocalStorageDoneRecipe(doneRecipe);
    history.push('/done-recipes');
  };

  return (detailsData.length === 1
    && (
      <div>
        <DetailsPagesHeader />

        <div>
          <h3>Ingredients</h3>
          <div>
            {ingredientNames.map((ingredient, index) => (
              <div
                key={ index }
              >
                <label
                  data-testid={ `${index}-ingredient-step` }
                  htmlFor={ ingredient }
                >
                  <input
                    id={ ingredient }
                    type="checkbox"
                    value={ ingredient }
                    checked={ completedIngredients.includes(ingredient) }
                    onChange={ ({ target: { value } }) => handleCheckBox(value) }
                  />
                  <span>
                    { `${ingredient} - ${ingredientMeasures[index]}` }
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3>Instructions</h3>
          <span className="drink-instruction-text" data-testid="instructions">
            {detailsData[0].strInstructions}
          </span>
        </div>
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ disabledFinishButton }
          onClick={ handleFinish }
        >
          Finish Recipe
        </button>
      </div>
    )
  );
}

export default DrinkInProgress;
