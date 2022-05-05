import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/generics/header/Header';
import Footer from '../components/generics/Footer';
import { surpriseDrink } from '../services/httpsApiRecipes';

function ExploreDrinks() {
  const history = useHistory();
  const requisition = async () => {
    const data = await surpriseDrink();
    console.log(data);
    const { idDrink } = data[0];
    history.push(`/drinks/${idDrink}`);
  };
  return (
    <div>
      <Header />
      <Link to="/explore/drinks/ingredients">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          By Ingredient
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

export default ExploreDrinks;
