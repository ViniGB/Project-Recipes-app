import { fetchFood, fetchDrink } from '../services/httpsApiRecipes';

const TWELVE = 12;

async function getFood(history, radioValue, searchInput) {
  if (radioValue === 'First-letter' && searchInput.length !== 1) {
    global.alert('Your search must have only 1 (one) character');
  } else {
    const data = await fetchFood(radioValue, searchInput);
    if (data === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (data.length === 1) {
      const { idMeal } = data[0];
      history.push(`/foods/${idMeal}`);
    } else {
      const foods = data.slice(0, TWELVE);
      return foods;
    }
  }
}

async function getDrink(history, radioValue, searchInput) {
  if (radioValue === 'First-letter' && searchInput.length !== 1) {
    global.alert('Your search must have only 1 (one) character');
  } else {
    const data = await fetchDrink(radioValue, searchInput);
    if (data === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    } else if (data.length === 1) {
      const { idDrink } = data[0];
      history.push(`/drinks/${idDrink}`);
    } else {
      const drinks = data.slice(0, TWELVE);
      return drinks;
    }
  }
}

async function getDatabase(history, pathname, radioValue, searchInput) {
  if (pathname === '/foods') {
    const data = await getFood(history, radioValue, searchInput);
    return data;
  }
  if (pathname === '/drinks') {
    const data = await getDrink(history, radioValue, searchInput);
    return data;
  }
}

export default getDatabase;
