function defineProgressRecipe(pathname, currId, setProgressRecipe) {
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (inProgressRecipes) {
    if (pathname.includes('foods')) {
      const inProgressRecipesId = inProgressRecipes.meals[Number(currId)];
      if (inProgressRecipesId) {
        setProgressRecipe(true);
      }
    }
    if (pathname.includes('drinks')) {
      const inProgressRecipesId = inProgressRecipes.cocktails[Number(currId)];
      if (inProgressRecipesId) {
        setProgressRecipe(true);
      }
    }
  }
}

export default defineProgressRecipe;
