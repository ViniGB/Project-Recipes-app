import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import RecipeContext from '../../../context/RecipeAppContext';
import getDatabase from '../../../helpers/getDatabase';

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
    <div>
      <label htmlFor="price" className="block text-base font-semibold text-brand-buttonText">
        Search
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          data-testid="search-input"
          value={searchInput}
          onChange={({ target: { value } }) => setSearchInput(value)}
          className="focus:ring-indigo-500 text-black focus:border-indigo-500 block sm:max-w-md w-full pl-7 pr-12 sm:text-sm border-transparent rounded-md"
        />

        <div className="absolute inset-y-0 right-0 flex items-center">
          {/* <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
          >
            <option>USD</option>
            <option>CAD</option>
            <option>EUR</option>
          </select> */}
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={() => handleSearch(radioValue, searchInput)}
            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-brand-button text-gray-500 sm:text-sm rounded-md"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;

{/* <>
  <input
    type="text"
    data-testid="search-input"
    value={searchInput}
    onChange={({ target: { value } }) => setSearchInput(value)}
    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
  />
  <div>
    <label htmlFor="Ingredient">
      <input
        id="Ingredient"
        type="radio"
        data-testid="ingredient-search-radio"
        name="search"
        value="Ingredient"
        onChange={({ target: { value } }) => setRadioValue(value)}
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
        onChange={({ target: { value } }) => setRadioValue(value)}
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
        onChange={({ target: { value } }) => setRadioValue(value)}
      />
      First Letter
    </label>
  </div>

  <button
    type="button"
    data-testid="exec-search-btn"
    onClick={() => handleSearch(radioValue, searchInput)}
  >
    Search
  </button>
</> */}