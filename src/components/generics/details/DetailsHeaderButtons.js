import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import handleUrlCopy from '../../../helpers/detailsHeaderHelpers';
import shareIcon from '../../../images/shareIcon.svg';
import whiteHeartIcon from '../../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../../images/blackHeartIcon.svg';
import RecipeContext from '../../../context/RecipeAppContext';
import {
  setFavoriteRecipe,
  addOrRemoveLocalStorageRecipe,
  setFavoriteIconColor,
} from '../../../helpers/setFavoriteRecipe';

function DetailsHeaderButtons() {
  const [isLinkCopied, setLinkCopied] = useState(false);
  const [favIcon, setFavIcon] = useState(whiteHeartIcon);
  const { dataById } = useContext(RecipeContext);
  const location = useLocation();
  const { pathname } = location;
  const { id } = useParams();
  const currId = id;
  const favoriteRecipe = setFavoriteRecipe(pathname, currId, dataById);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      const checkIfIdIsFavorited = favoriteRecipes
        .some((recipe) => Number(recipe.id) === Number(currId));
      if (checkIfIdIsFavorited) {
        setFavIcon(blackHeartIcon);
      }
    }
  }, [currId, favIcon, favoriteRecipe]);

  const handleFavoriteClick = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteIconColor(favIcon, setFavIcon);
    addOrRemoveLocalStorageRecipe(favoriteRecipes, favoriteRecipe, favIcon, currId);
  };

  return (
    <div>
      <div>
        <button
          type="button"
          className="share-btn"
          onClick={ () => handleUrlCopy(pathname, currId, setLinkCopied) }
        >
          <img
            className="share-icon"
            src={ shareIcon }
            alt="share-icon"
            data-testid="share-btn"
          />
        </button>
        <button
          type="button"
          className="favorite-btn"
          onClick={ handleFavoriteClick }
        >
          <img
            className="favorite-icon"
            data-testid="favorite-btn"
            src={ favIcon }
            alt="favorite-icon"
          />
        </button>
      </div>

      { isLinkCopied ? <span>Link copied!</span> : null }
    </div>
  );
}

export default DetailsHeaderButtons;
