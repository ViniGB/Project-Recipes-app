import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../../context/RecipeAppContext';
import shareIcon from '../../images/shareIcon.svg';

const copy = require('clipboard-copy');

function DoneCards() {
  const [linkCopied, setLinkCopied] = useState(false);
  const [currId, setCurrId] = useState('');
  const { storagedDoneRecipes } = useContext(RecipeContext);

  const handleShareClick = (type, id) => {
    const URL = type.includes('food')
      ? `http://localhost:3000/foods/${id}`
      : `http://localhost:3000/drinks/${id}`;
    copy(URL);
    setLinkCopied(true);
    setCurrId(id);
  };

  return (
    <div>
      { storagedDoneRecipes.map((doneRecipes, index) => (
        <div key={ index }>
          <Link to={ `${doneRecipes.type}s/${doneRecipes.id}` }>
            <img
              className="done-card-img"
              data-testid={ `${index}-horizontal-image` }
              src={ doneRecipes.image }
              alt={ doneRecipes.name }
            />
          </Link>
          { doneRecipes.type === 'food'
            ? (
              <span data-testid={ `${index}-horizontal-top-text` }>
                {`${doneRecipes.nationality} - ${doneRecipes.category}`}
              </span>)
            : (
              <span data-testid={ `${index}-horizontal-top-text` }>
                { doneRecipes.alcoholicOrNot }
              </span>)}
          <button
            type="button"
            className="share-btn"
            onClick={ () => handleShareClick(doneRecipes.type, doneRecipes.id) }
          >
            <img
              className="share-icon"
              src={ shareIcon }
              alt="share-icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          { (linkCopied && currId === doneRecipes.id) ? <span>Link copied!</span> : null }
          <Link to={ `${doneRecipes.type}s/${doneRecipes.id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{ doneRecipes.name }</h2>
          </Link>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            {`Done in: ${doneRecipes.doneDate}`}
          </p>
          <div>
            { doneRecipes.tags.map((tag) => (
              <div key={ tag }>
                <p data-testid={ `${index}-${tag}-horizontal-tag` }>{ tag }</p>
              </div>
            )) }
          </div>
        </div>
      )) }
    </div>
  );
}

export default DoneCards;
