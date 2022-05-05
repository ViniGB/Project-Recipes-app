import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  return (
    <footer
      className="footer"
      data-testid="footer"
    >
      <button
        className="drink-btn"
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img
          className="drink-icon"
          src={ drinkIcon }
          alt="drinks-icon"
          data-testid="drinks-bottom-btn"
        />
      </button>

      <button
        className="explore-btn"
        type="button"
        onClick={ () => history.push('/explore') }
      >
        <img
          className="explore-icon"
          src={ exploreIcon }
          alt="explore-icon"
          data-testid="explore-bottom-btn"
        />
      </button>

      <button
        className="meal-btn"
        type="button"
        onClick={ () => history.push('/foods') }
      >
        <img
          className="meal-icon"
          src={ mealIcon }
          alt="food-icon"
          data-testid="food-bottom-btn"
        />
      </button>
    </footer>
  );
}

export default Footer;
