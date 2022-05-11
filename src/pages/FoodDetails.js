import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFoodById } from '../services/detailsPagesAPIs';
import {
  getEmbedLink,
  setIngredientsArray,
  setMeasuresArray,
} from '../helpers/setIngredientsArray';
import StartRecipeButton from '../components/generics/details/StartRecipeButton';
import RecommendedRecipes from '../components/generics/details/RecommendedRecipes';
import DetailsPagesHeader from '../components/generics/details/DetailsPagesHeader';
import RecipeContext from '../context/RecipeAppContext';
import { CarouselEx } from '../components/generics/header/Example';

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
      <div className="bg-brand-background">
        <div className="mx-auto pt-6">
          <DetailsPagesHeader />
          <div>
            <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
              {/* Ingredients and Instruction */}
              <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <div className="mt-10">
                  <h2 className="text-xl font-medium text-white">Ingredients</h2>
                  <div className="mt-4">
                    <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                      {ingredientNames.map((recipe, index) => (
                        <li
                          key={index}
                          className="text-white"
                          data-testid={`${index}-ingredient-name-and-measure`}
                        >
                          <span className="text-white">
                            {`${recipe} - ${ingredientMeasures[index]}`}
                          </span>
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

              <div className="mt-10">
                <h2 className="text-xl font-medium text-white">Video</h2>
                <div className="mt-4 space-y-6">
                  <iframe
                    width="360"
                    height="200"
                    data-testid="video"
                    src={`https://www.youtube.com/embed/${embededLink}`}
                    title="YouTube video player"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
            
            {/* <CarouselEx /> */}
            <RecommendedRecipes />
            <StartRecipeButton />
          </div>
        </div>
      </div>
    )
    : null);
}

export default FoodDetails;
