import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeContext from '../../context/RecipeAppContext';
import {
  getAllDrinks,
  getAllFoods,
  getDrinksByCategory,
  getMealsByCategory,
} from '../../services/httpsApiRecipes';

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
    <div className="max-w-7xl m-2">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-extrabold text-white">Categorys:</h2>
        <div className="mt-1 space-y-0 grid grid-cols-3 sm:grid sm:grid-flow-col sm:grid-rows-1 sm:gap-1">
          {categorysData
            && categorysData.map((category, index) => (
              <div key={index}>
                <button
                  type="button"
                  id={index}
                  data-testid={`${category.strCategory}-category-filter`}
                  value={category.strCategory}
                  onClick={({ target: { value } }) => handleClick(value)}
                  className="py-2 px-4 border border-transparent text-sm m-2 font-medium rounded-md text-brand-buttonText bg-brand-highlight hover:bg-brand-tertiary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-black transition-colors"
                >
                  {category.strCategory}
                </button>
              </div>))}

          <div>
            <button
              type="button"
              data-testid="All-category-filter"
              onClick={() => setForData(TWELVE)}
              className="py-2 px-4 border border-transparent text-sm m-2 font-medium rounded-md text-brand-buttonText bg-brand-highlight hover:bg-brand-tertiary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-black transition-colors"
            >
              All Recipes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ButtonCategorys;
