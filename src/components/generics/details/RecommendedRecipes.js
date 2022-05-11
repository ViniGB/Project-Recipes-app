import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { handlePreviousCards, handleNextCards } from '../../../helpers/handleCardsCarousel';
import { getAllDrinks, getAllFoods } from '../../../services/httpsApiRecipes';

const TWO = 2;
const FOUR = 4;
const SIX = 6;
const DOT_ACTIVE = 'dot active';

function RecommendedRecipes() {
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [cardIndex, setCardIndex] = useState('');
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (pathname.includes('foods')) {
      getAllDrinks(SIX).then((drinks) => setRecommendedRecipes(drinks));
    }
    if (pathname.includes('drinks')) {
      getAllFoods(SIX).then((foods) => setRecommendedRecipes(foods));
    }
    setCardIndex(0);
  }, [pathname]);

  return (
    <div className="carousel slide relative" data-bs-ride="carousel">
      <h3 className="text-2xl font-extrabold tracking-tight text-white">Recommended</h3>
      <div className="carousel-inner relative w-full overflow-hidden">
        {recommendedRecipes.map((recipe, index) => (
          <div
            className={
              (cardIndex === index || cardIndex + 1 === index)
                ? 'active-card-slides'
                : 'card-slides carousel-item relative float-left w-full'
            }
            data-testid={`${index}-recomendation-card`}
            key={index}
          >
            <div className="">
              <img
                className="w-full h-full object-center object-cover"
                data-testid={`${index}-card-img`}
                src={pathname.includes('foods')
                  ? recipe.strDrinkThumb
                  : recipe.strMealThumb}
                alt={`${index}-drink`}
              />
              <div className="carousel-caption hidden md:block absolute text-center">
                <span className="text-sm text-white">{recipe.strCategory}</span>
                <h2
                  data-testid={`${index}-recomendation-title`}
                  className="text-sm text-white"
                >
                  {pathname.includes('foods')
                    ? recipe.strDrink
                    : recipe.strMeal}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
        onClick={() => handlePreviousCards(cardIndex, setCardIndex)}
      >
        <span class="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        type="button"
        className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
        onClick={() => handleNextCards(cardIndex, setCardIndex)}
      >
        <span class="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>

      <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
        <button
          className=""
          type="button"
          onClick={() => setCardIndex(0)}
        >
          <span
            className={cardIndex === 0 ? DOT_ACTIVE : 'dot'}
          />
        </button>
        <button
          className=""
          type="button"
          onClick={() => setCardIndex(TWO)}
        >
          <span
            className={cardIndex === TWO ? DOT_ACTIVE : 'dot'}
          />
        </button>
        <button
          className=""
          type="button"
          onClick={() => setCardIndex(FOUR)}
        >
          <span
            className={cardIndex === FOUR ? DOT_ACTIVE : 'dot'}
          />
        </button>
      </div>
    </div>
  );
}

export default RecommendedRecipes;
