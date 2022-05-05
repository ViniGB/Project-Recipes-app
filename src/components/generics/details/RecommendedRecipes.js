import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
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
    <div className="carousel-container">
      <h3>Recommended</h3>
      <div className="recommended-cards">
        { recommendedRecipes.map((recipe, index) => (
          <div
            className={
              (cardIndex === index || cardIndex + 1 === index)
                ? 'active-card-slides'
                : 'card-slides'
            }
            data-testid={ `${index}-recomendation-card` }
            key={ index }
          >
            <Link to={ `${pathname}/${recipe.idMeal}` }>
              <div className="recommended-card">
                <img
                  className="recommended-images"
                  data-testid={ `${index}-card-img` }
                  src={ pathname.includes('foods')
                    ? recipe.strDrinkThumb
                    : recipe.strMealThumb }
                  alt={ `${index}-drink` }
                />
                <span>{ recipe.strCategory }</span>
                <h2
                  data-testid={ `${index}-recomendation-title` }
                >
                  { pathname.includes('foods')
                    ? recipe.strDrink
                    : recipe.strMeal }
                </h2>
              </div>
            </Link>
          </div>
        )) }

        <button
          type="button"
          className="previous"
          onClick={ () => handlePreviousCards(cardIndex, setCardIndex) }
        >
          &#10094;
        </button>
        <button
          type="button"
          className="next"
          onClick={ () => handleNextCards(cardIndex, setCardIndex) }
        >
          &#10095;
        </button>

      </div>
      <div className="dot-section">
        <button
          className="dot-buttons"
          type="button"
          onClick={ () => setCardIndex(0) }
        >
          <span
            className={ cardIndex === 0 ? DOT_ACTIVE : 'dot' }
          />
        </button>
        <button
          className="dot-buttons"
          type="button"
          onClick={ () => setCardIndex(TWO) }
        >
          <span
            className={ cardIndex === TWO ? DOT_ACTIVE : 'dot' }
          />
        </button>
        <button
          className="dot-buttons"
          type="button"
          onClick={ () => setCardIndex(FOUR) }
        >
          <span
            className={ cardIndex === FOUR ? DOT_ACTIVE : 'dot' }
          />
        </button>
      </div>
    </div>
  );
}

export default RecommendedRecipes;
