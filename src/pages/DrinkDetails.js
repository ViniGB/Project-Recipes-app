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
      <div className="bg-brand-background">
        <div className="mx-auto pt-6">
          <DetailsPagesHeader />
          <div>

            <div className="max-w-2xl mx-auto px-4">
              {/* Ingredients and Instruction */}
              <div className="py-10 lg:pt-6 lg:pb-16">
                <div className="sm:mt-10">
                  <h2 className="text-xl font-medium text-white">Ingredients</h2>
                  <div className="mt-4">
                    <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                      {ingredientNames.map((recipe, index) => (
                        <li
                          key={index}
                          className="text-white"
                          data-testid={`${index}-ingredient-name-and-measure`}
                        >
                          <span
                            className="text-white"
                          >
                            {`- ${recipe} - ${ingredientMeasures[index]}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-xl font-medium text-white">Instructions</h2>
                  <div className="mt-4 space-y-6">
                    <span className="drink-instruction-text" data-testid="instructions">
                      {detailsData[0].strInstructions}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <RecommendedRecipes />
            <div className="mb-3 flex flex-1 justify-center items-center">
              <StartRecipeButton />
            </div>
          </div>
        </div>
      </div>

    )
    : null);
}

export default DrinkDetails;
