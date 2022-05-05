import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDrinkById } from '../services/detailsPagesAPIs';
import { setIngredientsArray, setMeasuresArray } from '../helpers/setIngredientsArray';
import StartRecipeButton from '../components/generics/details/StartRecipeButton';
import RecommendedRecipes from '../components/generics/details/RecommendedRecipes';
import DetailsPagesHeader from '../components/generics/details/DetailsPagesHeader';
import RecipeContext from '../context/RecipeAppContext';

function DrinkDetails() {
  const [detailsData, setDetailsData] = useState([]);
  const [ingredientNames, setIngredientNames] = useState([]);
  const [ingredientMeasures, setIngredientMeasures] = useState([]);
  const { setDataById } = useContext(RecipeContext);
  const { id } = useParams();
  const currId = id;

  useEffect(() => {
    fetchDrinkById(currId).then((dataById) => {
      setDetailsData(dataById);
      setDataById(dataById);
      setIngredientNames(setIngredientsArray(dataById));
      setIngredientMeasures(setMeasuresArray(dataById));
    });
  }, [currId, setDataById]);

  return (detailsData.length === 1
    ? (
      <div>
        <DetailsPagesHeader />

        <div>
          <h3>Ingredients</h3>
          <div>
            { ingredientNames.map((recipe, index) => (
              <div
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                <span>
                  { `- ${recipe} - ${ingredientMeasures[index]}` }
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3>Instructions</h3>
          <span className="drink-instruction-text" data-testid="instructions">
            { detailsData[0].strInstructions }
          </span>
        </div>

        <RecommendedRecipes />
        <StartRecipeButton />
      </div>
    )
    : null);
}

export default DrinkDetails;
