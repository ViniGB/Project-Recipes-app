import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeAppContext';

function RecipeAppProvider({ children }) {
  const [data, setData] = useState([]);
  const [dataById, setDataById] = useState([]);
  const [categorysData, setCategoryData] = useState([]);
  const [selectedCategoryPast, setCategory] = useState('default');
  const [storagedDoneRecipes, setDoneRecipes] = useState([]);
  const [storagedFavoriteRecipes, setFavoriteRecipes] = useState([]);
  const [dataIngredients, setDataIngredients] = useState();
  const [place, setPlace] = useState('All');

  const contextValue = {
    data,
    dataById,
    categorysData,
    selectedCategoryPast,
    storagedDoneRecipes,
    storagedFavoriteRecipes,
    setData,
    setDataById,
    setCategoryData,
    setCategory,
    setDoneRecipes,
    setFavoriteRecipes,
    dataIngredients,
    setDataIngredients,
    place,
    setPlace,
  };

  return (
    <RecipeContext.Provider value={ contextValue }>
      { children }
    </RecipeContext.Provider>
  );
}

RecipeAppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipeAppProvider;
