import { RadioGroup } from '@headlessui/react';
import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import RecipeContext from '../../../context/RecipeAppContext';
import CheckIcon from '../../../helpers/checkIcon';
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

  const options = [
    {
      name: 'By ingredient',
      byValue: 'Ingredient'
    },
    {
      name: 'By name',
      byValue: 'Name'
    },
    {
      name: 'By first-letter',
      byValue: 'First-letter'
    },
  ]

  return (
    <>
      <div className="min-h-full flex items-center justify-center">
        <label htmlFor="price" className="block text-base font-semibold m-3 text-brand-buttonText">
          Search
        </label>
        <div className="relative rounded-md shadow-sm">
          <input
            type="text"
            data-testid="search-input"
            value={searchInput}
            onChange={({ target: { value } }) => setSearchInput(value)}
            className="appearance-none block w-full border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-brand-highlight focus:border-brand-highlight focus:z-10 sm:text-sm sm:w-auto"
          />
        </div>

        <div className="relative inset-y-0 right-0 flex items-center justify-center">
          <button
            type="button"
            data-testid="exec-search-btn"
            onClick={() => handleSearch(radioValue, searchInput)}
            className="py-2 px-4 border border-transparent text-sm m-2 font-medium rounded-md text-brand-buttonText bg-brand-highlight hover:bg-brand-tertiary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-black transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      <div className="min-h-full flex items-center justify-center">
        <RadioGroup value={radioValue} onChange={setRadioValue}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="min-h-full flex items-center justify-center">
            {options.map((option) => (
              <RadioGroup.Option
                key={option.name}
                value={option.byValue}
                className={({ active, checked }) =>
                  `${active
                    ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-black'
                    : ''
                  }
                  ${checked ? 'bg-brand-highlight bg-opacity-75 text-white' : 'bg-white'
                  }
                    relative flex cursor-pointer rounded-lg px-3 py-1 mx-1 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-black` //focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-black
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                              }`}
                          >
                            {option.name}
                          </RadioGroup.Label>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="ml-1 h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </>
  );
}

export default Search;
