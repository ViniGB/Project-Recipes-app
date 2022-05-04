import NowDate from './NowDate';

export function setDoneRecipe(pathname, dataById) {
  let doneRecipe = {};

  if (pathname.includes('foods')) {
    let tags = [];
    if (dataById[0].strTags !== null) {
      tags = dataById[0].strTags.split(',');
    } else {
      tags = [];
    }

    doneRecipe = {
      id: dataById[0].id,
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
    let tags = [];
    if (dataById[0].strTags !== null) {
      tags = dataById[0].strTags.split(',');
    } else {
      tags = [];
    }

    doneRecipe = {
      id: dataById[0].id,
      type: 'drink',
      nationality: '',
      category: dataById[0].strCategory,
      alcoholicOrNot: dataById[0].strAlcoholic,
      name: dataById[0].strDrink,
      image: dataById[0].strDrinklThumb,
      doneDate: NowDate(),
      tags,
    };
  }
  return doneRecipe;
}

export function addLocalStorageDoneRecipe(recipe) {
  const storagedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (storagedDoneRecipes === []) {
    localStorage
      .setItem('doneRecipes', JSON.stringify(recipe));
  } else {
    localStorage
      .setItem('doneRecipes', JSON.stringify([...storagedDoneRecipes, recipe]));
  }
}
