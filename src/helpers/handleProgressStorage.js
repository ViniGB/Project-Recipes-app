export function handleCocktailStorage(completedIngredients, id) {
  const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const entries = Object.entries(local.cocktails);
  const checkEntries = entries.some((entry) => entry[0] === id);
  if (local.cocktails === {}) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...local,
      cocktails: { [id]: completedIngredients },
    }));
  }
  if (completedIngredients.length === 0 && checkEntries) {
    const filteredCocktails = entries.filter((entry) => entry[0] !== id);
    const newStoragedCocktails = Object.fromEntries(filteredCocktails);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...local,
      cocktails: newStoragedCocktails,
    }));
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...local,
      cocktails: { ...local.cocktails, [id]: completedIngredients },
    }));
  }
}

export function handleMealStorage(completedIngredients, id) {
  const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const entries = Object.entries(local.meals);
  const checkEntries = entries.some((entry) => entry[0] === id);
  if (local.meals === {}) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...local,
      meals: { [id]: completedIngredients },
    }));
  }
  if (completedIngredients.length === 0 && checkEntries) {
    const filteredMeals = entries.filter((entry) => entry[0] !== id);
    const newStoragedMeals = Object.fromEntries(filteredMeals);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...local,
      meals: newStoragedMeals,
    }));
  } else {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...local,
      meals: { ...local.meals, [id]: completedIngredients },
    }));
  }
}
