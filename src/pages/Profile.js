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
    <>
      <Header />
      <div className="flex flex-1 items-center justify-center max-w-7xl mx-auto m-2">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center items-center">
            <h1
              data-testid="profile-email"
              className="pt-16 text-xl font-medium text-white"
            >
              {getEmail.email}
            </h1>
          </div>
          <div className="m-7 pt-16 flex flex-1 justify-center items-center flex-col gap-7">
            <Link
              to="/done-recipes"
            >
              <button
                type="button"
                data-testid="profile-done-btn"
                className="py-10 px-[6.25rem] border border-transparent text-xl m-2 font-medium rounded-md text-brand-buttonText bg-brand-highlight hover:bg-brand-tertiary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-black transition-colors"
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
                className="py-10 px-[5.75rem] border border-transparent text-xl m-2 font-medium rounded-md text-brand-buttonText bg-brand-highlight hover:bg-brand-tertiary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-black transition-colors"
              >
                Favorite Recipes
              </button>
            </Link>
            <button
              type="button"
              data-testid="profile-logout-btn"
              onClick={handleClick}
              className="py-10 px-[8.75rem] border border-transparent text-xl m-2 font-medium rounded-md text-brand-buttonText bg-brand-highlight hover:bg-brand-tertiary focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-transparent focus:ring-black transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
