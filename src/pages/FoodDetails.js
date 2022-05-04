import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFoodById } from '../requisitions/detailsPagesAPIs';
import {
  getEmbedLink,
  setIngredientsArray,
  setMeasuresArray,
} from '../helpers/setIngredientsArray';
import './FoodDetails.css';
import StartRecipeButton from '../components/StartRecipeButton';
import RecommendedRecipes from '../components/RecommendedRecipes';
import DetailsPagesHeader from '../components/DetailsPagesHeader';
import RecipeContext from '../context/RecipeAppContext';

function FoodDetails() {
  const [detailsData, setDetailsData] = useState([]);
  const [ingredientNames, setIngredientNames] = useState([]);
  const [ingredientMeasures, setIngredientMeasures] = useState([]);
  const [embededLink, setEmbededLink] = useState([]);
  const { setDataById } = useContext(RecipeContext);
  const { id } = useParams();
  const currId = id;

  useEffect(() => {
    fetchFoodById(currId).then((dataById) => {
      setDetailsData(dataById);
      setDataById(dataById);
      setIngredientNames(setIngredientsArray(dataById));
      setIngredientMeasures(setMeasuresArray(dataById));
      setEmbededLink(getEmbedLink(dataById));
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
          <span className="food-instruction-text" data-testid="instructions">
            { detailsData[0].strInstructions }
          </span>
        </div>

        <div>
          <h3>Video</h3>
          <iframe
            width="360"
            height="200"
            data-testid="video"
            src={ `https://www.youtube.com/embed/${embededLink}` }
            title="YouTube video player"
            allowFullScreen
          />
        </div>

        <RecommendedRecipes />
        <StartRecipeButton />
      </div>
    )
    : null);
}

export default FoodDetails;
