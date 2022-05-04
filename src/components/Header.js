import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Search from './HeaderSearch';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';
import { getTestTitle, getSearchButton } from '../helpers/getTitle';

function Header() {
  const [title, setTitle] = useState('');
  const [searchButton, setSearchButton] = useState(true);
  const [searchInput, setSearchInput] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const handleProfileClick = () => {
    history.push('/profile');
  };

  const handleSearchClick = () => (!searchInput
    ? setSearchInput(true) : setSearchInput(false));

  useEffect(() => {
    const foundTitle = getTestTitle(location.pathname);
    const showSearchButton = getSearchButton(location.pathname);
    setTitle(foundTitle);
    setSearchButton(showSearchButton);
  }, [location]);

  return (
    <div>
      <div className="header-section">
        <button
          className="profile-btn"
          type="button"
          onClick={ handleProfileClick }
        >
          <img
            className="profile-icon"
            src={ profileIcon }
            alt="profile-avatar"
            data-testid="profile-top-btn"
          />
        </button>

        <h2
          className="title"
          data-testid="page-title"
        >
          { title }
        </h2>

        { searchButton
        && (
          <button
            className="search-btn"
            type="button"
            onClick={ handleSearchClick }
          >
            <img
              className="search-icon"
              src={ searchIcon }
              alt="search-avatar"
              data-testid="search-top-btn"
            />
          </button>
        )}
      </div>
      <div>
        { searchInput
        && (
          <Search />
        )}
      </div>
    </div>
  );
}

export default Header;
