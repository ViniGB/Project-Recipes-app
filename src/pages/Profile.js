import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/generics/Footer';
import Header from '../components/generics/header/Header';

function Profile() {
  const [getEmail, setGetEmail] = useState('');
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user === null) {
      localStorage.setItem('user', JSON.stringify({}));
    } else {
      setGetEmail(JSON.parse(user));
    }
  }, []);

  const history = useHistory();

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header />
      <h1
        data-testid="profile-email"
      >
        { getEmail.email }
      </h1>
      <div>
        <Link
          to="/done-recipes"
        >
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
        </Link>
        <Link
          to="/favorite-recipes"
        >
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
        </Link>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
