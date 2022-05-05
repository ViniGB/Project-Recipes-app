export async function fetchFoodById(foodId) {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.meals;
}

export async function fetchDrinkById(drinkId) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data.drinks;
}
