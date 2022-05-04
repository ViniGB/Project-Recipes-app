import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeAppContext';
import getDatabase from '../helpers/getDatabase';

function Search() {
  const [radioValue, setRadioValue] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const location = useLocation();
  const history = useHistory();

  const {
    setData,
  } = useContext(RecipeContext);

  const handleSearch = async (value, search) => {
    const { pathname } = location;
    const myData = await getDatabase(history, pathname, value, search);
    setData(myData);
  };

  return (
    <>
      <input
        type="text"
        data-testid="search-input"
        value={ searchInput }
        onChange={ ({ target: { value } }) => setSearchInput(value) }
      />
      <div>
        <label htmlFor="Ingredient">
          <input
            id="Ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
            name="search"
            value="Ingredient"
            onChange={ ({ target: { value } }) => setRadioValue(value) }
          />
          Ingredient
        </label>
        <label htmlFor="Name">
          <input
            id="Name"
            type="radio"
            data-testid="name-search-radio"
            name="search"
            value="Name"
            onChange={ ({ target: { value } }) => setRadioValue(value) }
          />
          Name
        </label>

        <label htmlFor="First-letter">
          <input
            id="First-letter"
            type="radio"
            data-testid="first-letter-search-radio"
            name="search"
            value="First-letter"
            onChange={ ({ target: { value } }) => setRadioValue(value) }
          />
          First Letter
        </label>
      </div>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => handleSearch(radioValue, searchInput) }
      >
        Search
      </button>
    </>
  );
}

export default Search;
