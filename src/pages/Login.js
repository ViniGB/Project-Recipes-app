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
    <>
      <input
        type="email"
        data-testid="email-input"
        onChange={ ({ target: { value } }) => setEmail(value) }
      />
      <input
        type="password"
        data-testid="password-input"
        onChange={ ({ target: { value } }) => setPassword(value) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ disabledButton }
        onClick={ handleClick }
      >
        Enter
      </button>
    </>
  );
}

export default Login;
