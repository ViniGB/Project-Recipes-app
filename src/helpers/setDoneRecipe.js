import NowDate from './NowDate';

export function setDoneRecipe(pathname, dataById) {
  let doneRecipe = {};
  let tags = [];
  if (dataById[0].strTags !== null) {
    tags = dataById[0].strTags.split(',');
  } else {
    tags = [];
  }

  if (pathname.includes('foods')) {
    doneRecipe = {
      id: dataById[0].idMeal,
      type: 'food',
      nationality: dataById[0].strArea,
      category: dataById[0].strCategory,
      alcoholicOrNot: '',
      name: dataById[0].strMeal,
      image: dataById[0].strMealThumb,
      doneDate: NowDate(),
      tags,
    };
  }
  if (pathname.includes('drinks')) {
    doneRecipe = {
      id: dataById[0].idDrink,
      type: 'drink',
      nationality: '',
      category: dataById[0].strCategory,
      alcoholicOrNot: dataById[0].strAlcoholic,
      name: dataById[0].strDrink,
      image: dataById[0].strDrinkThumb,
      doneDate: NowDate(),
      tags,
    };
  }
  return doneRecipe;
}

export function addLocalStorageDoneRecipe(recipe, recipes, pathname, id) {
  if (recipes === []) {
    localStorage
      .setItem('doneRecipes', JSON.stringify(recipe));
  } else {
    localStorage
      .setItem('doneRecipes', JSON.stringify([...recipes, recipe]));
  }

  const local = JSON.parse(localStorage.getItem('inProgressRecipes'));
  let entries;
  if (pathname.includes('foods')) {
    entries = Object.entries(local.meals);
    const filteredMeals = entries.filter((entry) => entry[0] !== id);
    const newStoragedMeals = Object.fromEntries(filteredMeals);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...local,
      meals: newStoragedMeals,
    }));
  } else {
    entries = Object.entries(local.cocktails);
    const filteredCocktails = entries.filter((entry) => entry[0] !== id);
    const newStoragedCocktails = Object.fromEntries(filteredCocktails);
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...local,
      cocktails: newStoragedCocktails,
    }));
  }
}
