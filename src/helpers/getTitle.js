export function getTestTitle(pathname) {
  let myTitle;
  if (pathname === '/foods') myTitle = 'Foods';
  if (pathname === '/drinks') myTitle = 'Drinks';
  if (pathname === '/explore') myTitle = 'Explore';
  if (pathname === '/explore/foods') myTitle = 'Explore Foods';
  if (pathname === '/explore/drinks') myTitle = 'Explore Drinks';
  if (pathname === '/explore/foods/ingredients') myTitle = 'Explore Ingredients';
  if (pathname === '/explore/drinks/ingredients') myTitle = 'Explore Ingredients';
  if (pathname === '/explore/foods/nationalities') myTitle = 'Explore Nationalities';
  if (pathname === '/profile') myTitle = 'Profile';
  if (pathname === '/done-recipes') myTitle = 'Done Recipes';
  if (pathname === '/favorite-recipes') myTitle = 'Favorite Recipes';
  return myTitle;
}

export function getSearchButton(pathname) {
  let showSearchButton = true;
  if (pathname === '/explore') showSearchButton = false;
  if (pathname === '/explore/foods') showSearchButton = false;
  if (pathname === '/explore/drinks') showSearchButton = false;
  if (pathname === '/explore/foods/ingredients') showSearchButton = false;
  if (pathname === '/explore/drinks/ingredients') showSearchButton = false;
  if (pathname === '/profile') showSearchButton = false;
  if (pathname === '/done-recipes') showSearchButton = false;
  if (pathname === '/favorite-recipes') showSearchButton = false;
  return showSearchButton;
}
