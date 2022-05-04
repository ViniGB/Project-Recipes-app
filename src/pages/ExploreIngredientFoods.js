import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchIngredientsFoods } from '../requisitions/apiRecipes';
import RecipeAppContext from '../context/RecipeAppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreIngredientFoods() {
  const { setDataIngredients } = useContext(RecipeAppContext);
  const [meals, setMeals] = useState([]);
  const MAX = 12;

  function getImgIngredients(name) {
    const URL = `https://www.themealdb.com/images/ingredients/${name}-Small.png`;
    return URL;
  }

  useEffect(() => {
    const then = async () => setMeals(await fetchIngredientsFoods());
    then();
  }, []);

  const genCard = (obj, index) => (
    <Link
      key={ obj.idIngredient }
      to="/foods"
      onClick={ () => setDataIngredients(obj.strIngredient) }
    >
      <div
        key={ obj.idIngredient }
        data-testid={ `${index}-ingredient-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ getImgIngredients(obj.strIngredient) }
          alt={ `Essa imagem contem um ${obj.strIngredient}` }
        />
        <p
          data-testid={ `${index}-card-name` }
        >
          { obj.strIngredient }
        </p>
      </div>
    </Link>
  );

  return (
    <div>
      <Header />
      { meals.map((obj, index) => (index < MAX ? genCard(obj, index) : ''))}
      <Footer />
    </div>
  );
}

export default ExploreIngredientFoods;
