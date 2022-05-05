import React, { useContext, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeAppContext';
import getDatabase from '../helpers/getDatabase';
import Cards from '../components/generics/Cards';
import Header from '../components/generics/header/Header';
import Footer from '../components/generics/Footer';
import { getAllFoods, getCategoryMeals } from '../services/httpsApiRecipes';
import ButtonCategorys from '../components/generics/ButtonCategorys';

function Foods() {
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

  const handleGetFetch = async () => {
    const TWELVE = 12;
    const response = await getAllFoods(TWELVE);
    setData(response);
  };

  const getListCategory = async () => {
    const resCategory = await getCategoryMeals();
    if (resCategory) {
      setCategoryData(resCategory);
    }
  };

  useEffect(() => {
    handleSearch(dataIngredients);
    handleGetFetch();
    getListCategory();
  }, []);

  return (
    <div>
      { location.pathname === '/foods' && <Header />}
      <ButtonCategorys />
      <Cards />
      { location.pathname === '/foods' && <Footer />}
    </div>
  );
}

export default Foods;
