import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export function setFavoriteRecipe(pathname, currId, dataById) {
  let favoriteRecipe = {};
  if (pathname.includes('foods')) {
    favoriteRecipe = {
      id: currId,
      type: 'food',
      nationality: dataById[0].strArea,
      category: dataById[0].strCategory,
      alcoholicOrNot: '',
      name: dataById[0].strMeal,
      image: dataById[0].strMealThumb,
    };
  }
  if (pathname.includes('drinks')) {
    favoriteRecipe = {
      id: currId,
      type: 'drink',
      nationality: '',
      category: dataById[0].strCategory,
      alcoholicOrNot: dataById[0].strAlcoholic,
      name: dataById[0].strDrink,
      image: dataById[0].strDrinkThumb,
    };
  }
  return favoriteRecipe;
}

export function setFavoriteIconColor(favoriteIcon, setfavoriteIcon) {
  if (favoriteIcon.includes('whiteHeartIcon')) setfavoriteIcon(blackHeartIcon);
  if (favoriteIcon.includes('blackHeartIcon')) setfavoriteIcon(whiteHeartIcon);
}

export function addOrRemoveLocalStorageRecipe(recipes, recipe, favoriteIcon, id) {
  if (recipes === []) {
    localStorage
      .setItem('favoriteRecipes', JSON.stringify([recipe]));
  } else {
    if (favoriteIcon.includes('whiteHeartIcon')) {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...recipes, recipe]));
    }
    if (favoriteIcon.includes('blackHeartIcon')) {
      const filteredFavoriteRecipes = recipes
        .filter((favoriteRecipes) => Number(favoriteRecipes.id) !== Number(id));
      localStorage
        .setItem('favoriteRecipes', JSON.stringify(filteredFavoriteRecipes));
    }
  }
}
