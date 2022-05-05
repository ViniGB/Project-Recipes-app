import { CookingPot } from 'phosphor-react';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { setLocalStorage } from '../helpers/LocalStorage';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const SIX = 6;
    const regexTest = /\S+@\S+\.\S+/;
    if (regexTest.test(email) && password.length > SIX) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [email, password]);

  const handleClick = () => {
    setLocalStorage('mealsToken', 1);
    setLocalStorage('cocktailsToken', 1);
    setLocalStorage('doneRecipes', []);
    setLocalStorage('inProgressRecipes', { cocktails: {}, meals: {} });
    setLocalStorage('favoriteRecipes', []);

    const myEmail = {
      email,
    };
    setLocalStorage('user', myEmail);
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/foods" />;
  }

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex items-center justify-center">
          <CookingPot size={90} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-brand-buttonText">Sign in</h2>
        <form className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                id="email-address"
                data-testid="email-input"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-highlight focus:border-brand-highlight focus:z-10 sm:text-sm"
                onChange={({ target: { value } }) => setEmail(value)}
                placeholder="Email-address"
              />
            </div>
            <div>
              <label htmlFor="Password" className="sr-only">
                Password
              </label>
              <input
                type="password"
                id="Password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brand-highlight focus:border-brand-highlight focus:z-10 sm:text-sm"
                data-testid="password-input"
                placeholder="password"
                onChange={({ target: { value } }) => setPassword(value)}
              />
            </div>
            <div>
              <button
                type="button"
                data-testid="login-submit-btn"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-brand-buttonText bg-brand-secondary hover:bg-brand-highlight focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0f0e17] focus:ring-brand-highlight disabled:opacity-50 disabled:hover:bg-brand-button transition-colors"
                disabled={disabledButton}
                onClick={handleClick}
              >
                Enter
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
