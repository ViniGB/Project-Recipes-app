import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeContext from '../context/RecipeAppContext';
import {
  getAllDrinks,
  getAllFoods,
  getDrinksByCategory,
  getMealsByCategory,
} from '../requisitions/apiRecipes';

const TWELVE = 12;

function ButtonCategorys() {
  const {
    setData,
    categorysData,
    selectedCategoryPast,
    setCategory,
  } = useContext(RecipeContext);

  const location = useLocation();
  const { pathname } = location;

  const setByCategoryData = async (value) => {
    if (pathname === '/drinks') {
      const byCategory = await getDrinksByCategory(value);
      setData(byCategory);
    }
    if (pathname === '/foods') {
      const byCategory = await getMealsByCategory(value);
      setData(byCategory);
    }
  };

  const setForData = async (quantity) => {
    if (pathname === '/drinks') {
      const response = await getAllDrinks(quantity);
      setData(response);
    }
    if (pathname === '/foods') {
      const response = await getAllFoods(quantity);
      setData(response);
    }
  };

  const handleClick = async (value) => {
    if (selectedCategoryPast === 'default') {
      setCategory(value);
      setByCategoryData(value);
    }
    if (selectedCategoryPast === value) {
      setCategory('default');
      setForData(TWELVE);
    }
    if (selectedCategoryPast !== value) {
      setCategory(value);
      setByCategoryData(value);
    }
  };

  return (
    <div>
      { categorysData
        && categorysData.map((category, index) => (
          <div key={ index }>
            <button
              type="button"
              id={ index }
              data-testid={ `${category.strCategory}-category-filter` }
              value={ category.strCategory }
              onClick={ ({ target: { value } }) => handleClick(value) }
            >
              {category.strCategory}
            </button>
          </div>))}
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setForData(TWELVE) }
        >
          All Recipes
        </button>
      </div>
    </div>
  );
}

export default ButtonCategorys;
