import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeAppContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './FavoriteCards.css';

const copy = require('clipboard-copy');

function FavoriteCards() {
  const [linkCopied, setLinkCopied] = useState(false);
  const [currId, setCurrId] = useState('');
  const { storagedFavoriteRecipes, setFavoriteRecipes } = useContext(RecipeContext);

  const handleShareClick = (type, id) => {
    const URL = type.includes('food')
      ? `http://localhost:3000/foods/${id}`
      : `http://localhost:3000/drinks/${id}`;
    copy(URL);
    setLinkCopied(true);
    setCurrId(id);
  };

  const handleFavoriteClick = (id) => {
    const filteredStoragedFavRecipes = storagedFavoriteRecipes
      .filter((storagedRecipe) => storagedRecipe.id !== id);
    setFavoriteRecipes(filteredStoragedFavRecipes);
    const localStorageFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filteredFavRecipes = localStorageFavRecipes
      .filter((favRecipe) => favRecipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavRecipes));
  };

  return (
    <div>
      { storagedFavoriteRecipes
        .map((favoriteRecipes, index) => (
          <div key={ index }>
            <Link to={ `${favoriteRecipes.type}s/${favoriteRecipes.id}` }>
              <img
                className="favorite-card-img"
                data-testid={ `${index}-horizontal-image` }
                src={ favoriteRecipes.image }
                alt={ favoriteRecipes.name }
              />
            </Link>
            { favoriteRecipes.type === 'food'
              ? (
                <span data-testid={ `${index}-horizontal-top-text` }>
                  {`${favoriteRecipes.nationality} - ${favoriteRecipes.category}`}
                </span>)
              : (
                <span data-testid={ `${index}-horizontal-top-text` }>
                  { favoriteRecipes.alcoholicOrNot }
                </span>)}
            <Link to={ `${favoriteRecipes.type}s/${favoriteRecipes.id}` }>
              <h2 data-testid={ `${index}-horizontal-name` }>{ favoriteRecipes.name }</h2>
            </Link>
            <button
              type="button"
              className="share-btn"
              onClick={ () => handleShareClick(favoriteRecipes.type, favoriteRecipes.id) }
            >
              <img
                className="share-icon"
                src={ shareIcon }
                alt="share-icon"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
            { (linkCopied && currId === favoriteRecipes.id)
              ? <span>Link copied!</span> : null }
            <button
              type="button"
              className="favorite-btn"
              onClick={ () => handleFavoriteClick(favoriteRecipes.id) }
            >
              <img
                className="favorite-icon"
                src={ blackHeartIcon }
                alt="favorite-icon"
                data-testid={ `${index}-horizontal-favorite-btn` }
              />
            </button>
          </div>
        )) }
    </div>
  );
}

export default FavoriteCards;
