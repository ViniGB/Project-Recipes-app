import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchIngredientsDrinks } from '../services/httpsApiRecipes';
import Header from '../components/generics/header/Header';
import Footer from '../components/generics/Footer';
import RecipeAppContext from '../context/RecipeAppContext';

function ExploreIngredientDrinks() {
  const { setDataIngredients } = useContext(RecipeAppContext);
  const [drinks, setDrinks] = useState([]);
  const MAX = 12;

  function getImgIngredients(name) {
    const URL = `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`;
    return URL;
  }

  useEffect(() => {
    const then = async () => setDrinks(await fetchIngredientsDrinks());
    then();
  }, []);

  const genCard = (obj, index) => (
    <Link
      key={ obj.strIngredient1 }
      name={ obj.strIngredient1 }
      to="/drinks"
      onClick={ () => setDataIngredients(obj.strIngredient1) }
    >
      <div
        name={ obj.strIngredient1 }
        data-testid={ `${index}-ingredient-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ getImgIngredients(obj.strIngredient1) }
          alt={ `Essa imagem contem um ${obj.strIngredient1}` }
        />
        <p
          data-testid={ `${index}-card-name` }
        >
          { obj.strIngredient1 }
        </p>
      </div>
    </Link>

  );

  return (
    <div>
      <Header />
      { drinks.map((obj, index) => (index < MAX ? genCard(obj, index) : ''))}
      <Footer />
    </div>
  );
}

export default ExploreIngredientDrinks;
