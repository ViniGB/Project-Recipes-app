import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeAppContext';
import Header from '../components/generics/header/Header';
import Footer from '../components/generics/Footer';
import {
  fecthNacionality,
  fecthPlace,
  fecthRandomPlace } from '../services/httpsApiRecipes';

function ExploreNationality() {
  const MAX = 12;
  const [nacionality, setNacionality] = useState([]);
  const [foodPlace, setFoodPlace] = useState([]);
  const { place, setPlace } = useContext(RecipeContext);
  useEffect(() => {
    async function data() { setNacionality(await fecthNacionality()); }
    async function dataPlace() { setFoodPlace(await fecthPlace(place)); }
    async function dataRandom() { setFoodPlace(await fecthRandomPlace()); }
    if (place !== 'All') {
      dataPlace();
    } else {
      dataRandom();
    }

    data();
    console.log(place);
  }, [place]);

  const countryName = async ({ target }) => {
    setPlace(target.value);
  };

  const genDiv = (country, index) => (
    <option
      key={ index }
      data-testid={ `${country.strArea}-option` }
      value={ country.strArea }
    >
      {country.strArea}
    </option>
  );

  const genCard = (obj, index) => (
    <Link
      to={ `/foods/${obj.idMeal}` }
      key={ obj.idMeal }
    >
      <div
        key={ obj.idMeal }
        data-testid={ `${index}-recipe-card` }
      >
        <img
          data-testid={ `${index}-card-img` }
          src={ obj.strMealThumb }
          alt={ `Essa imagem contem um ${obj.strMeal}` }
        />
        <p
          data-testid={ `${index}-card-name` }
        >
          { obj.strMeal }
        </p>
      </div>

    </Link>

  );
  return (
    <div>
      <Header />
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ countryName }
      >
        <option
          data-testid="All-option"
          value="All"
        >
          All
        </option>
        { nacionality.map((country, index) => genDiv(country, index)) }
      </select>
      <div>
        { foodPlace.map((obj, index) => (index < MAX ? genCard(obj, index) : ''))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreNationality;
