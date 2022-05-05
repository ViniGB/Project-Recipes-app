import React, { useContext, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeAppContext';
import getDatabase from '../helpers/getDatabase';
import Cards from '../components/generics/Cards';
import Header from '../components/generics/header/Header';
import Footer from '../components/generics/Footer';
import { getAllDrinks, getCategoryDrinks } from '../services/httpsApiRecipes';
import ButtonCategorys from '../components/generics/ButtonCategorys';

function Drinks() {
  const location = useLocation();
  const history = useHistory();
  const {
    setData,
    dataIngredients,
    setCategoryData,
  } = useContext(RecipeContext);

  const handleSearch = async (search) => {
    const { pathname } = location;
    if (dataIngredients) {
      const myData = await getDatabase(history, pathname, 'Ingredient', search);
      setData(myData);
    }
  };

  useEffect(() => {
    handleSearch(dataIngredients);
  }, []);

  const handleGetFetch = async () => {
    const TWELVE = 12;
    const response = await getAllDrinks(TWELVE);
    setData(response);
  };

  const getListCategory = async () => {
    const resCategory = await getCategoryDrinks();
    if (resCategory) {
      setCategoryData(resCategory);
    }
  };

  useEffect(() => {
    handleGetFetch();
    getListCategory();
  }, []);

  return (
    <div>
      { location.pathname === '/drinks' ? <Header /> : null }
      <ButtonCategorys />
      <Cards />
      { location.pathname === '/drinks' ? <Footer /> : null }
    </div>
  );
}

export default Drinks;
