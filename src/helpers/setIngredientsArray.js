export function setIngredientsArray(data) {
  const ingredientNames = Object.entries(data[0])
    .filter((key) => key[0].includes('strIngredient'))
    .map((currKey) => currKey[1])
    .filter((keyWithValue) => keyWithValue !== '' && keyWithValue !== null);
  return ingredientNames;
}

export function setMeasuresArray(data) {
  const ingredientMeasures = Object.entries(data[0])
    .filter((key) => key[0].includes('strMeasure'))
    .map((currKey) => currKey[1])
    .filter((keyWithValue) => keyWithValue !== '' && keyWithValue !== null);
  return ingredientMeasures;
}

export function getEmbedLink(data) {
  const toEmbedLink = data[0].strYoutube;
  const embededLink = toEmbedLink.split('=')[1];
  return embededLink;
}
