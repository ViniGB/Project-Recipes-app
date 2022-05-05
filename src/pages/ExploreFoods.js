import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/generics/header/Header';
import Footer from '../components/generics/Footer';
import { surpriseFood } from '../services/httpsApiRecipes';

function ExploreFoods() {
  const history = useHistory();
  const requisition = async () => {
    const data = await surpriseFood();
    const { idMeal } = data[0];
    history.push(`/foods/${idMeal}`);
  };
  return (
    <div>
      <Header />
      <Link to="/explore/foods/ingredients">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </button>
      </Link>
      <Link to="/explore/foods/nationalities">
        <button
          type="button"
          data-testid="explore-by-nationality"
        >
          By Nationality
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ requisition }
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
