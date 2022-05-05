export async function fetchFood(value, search) {
  let URL;
  switch (value) {
  case 'Ingredient':
    URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
    break;
  case 'Name':
    URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    break;
  case 'First-letter':
    URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
    break;

  default:
    break;
  }
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}

export async function fetchDrink(value, search) {
  let URL;
  switch (value) {
  case 'Ingredient':
    URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
    break;
  case 'Name':
    URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
    break;
  case 'First-letter':
    URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
    break;

  default:
    break;
  }
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks;
}

export async function surpriseFood() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}

export async function surpriseDrink() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks;
}

export async function fetchIngredientsFoods() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}

export async function fetchIngredientsDrinks() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks;
}

export async function fecthNacionality() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}

export async function fecthPlace(name) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}

export async function fecthRandomPlace() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}

export async function getAllFoods(quantity) {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL);
  const data = await response.json();
  const meals = data.meals.slice(0, quantity);
  return meals;
}

export async function getAllDrinks(quantity) {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL);
  const data = await response.json();
  const drinks = data.drinks.slice(0, quantity);
  return drinks;
}

export async function getCategoryMeals() {
  const FIVE = 5;
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URL);
  const data = await response.json();
  const meals = data.meals.slice(0, FIVE);
  return meals;
}

export async function getCategoryDrinks() {
  const FIVE = 5;
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URL);
  const data = await response.json();
  const drinks = data.drinks.slice(0, FIVE);
  return drinks;
}

export async function getMealsByCategory(value) {
  const TWELVE = 12;
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`;
  const response = await fetch(URL);
  const data = await response.json();
  const meals = data.meals.slice(0, TWELVE);
  return meals;
}

export async function getDrinksByCategory(value) {
  const TWELVE = 12;
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`;
  const response = await fetch(URL);
  const data = await response.json();
  const drinks = data.drinks.slice(0, TWELVE);
  return drinks;
}
