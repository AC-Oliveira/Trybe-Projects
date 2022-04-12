import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../Context/RecipesContext';
import '../App.css';

export default function Login() {
  const { email, setEmail, password, setPassword } = useContext(RecipesContext);

  function validateButton() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    const SIX = 6;

    if (emailRegex.test(email) && password.length > SIX) {
      return false;
    }
    return true;
  }

  function setTokens() {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
  }

  return (
    <div className="loginBG">
      <div className="container">
        <div className="animate six">
          <span>R</span>
          <span>E</span>
          <span>C</span>
          <span>I</span>
          <span>P</span>
          <span>E</span>
          <span>S</span>
          {' '}
          <span>A</span>
          <span>P</span>
          <span>P</span>
        </div>
      </div>
      <input
        className="textInput"
        type="email"
        placeholder="Email"
        data-testid="email-input"
        onChange={ (ev) => setEmail(ev.target.value) }
      />
      <input
        className="textInput"
        type="password"
        placeholder="Password"
        data-testid="password-input"
        onChange={ (ev) => setPassword(ev.target.value) }
      />
      <Link to="/comidas">
        <button
          className="textInput"
          type="button"
          data-testid="login-submit-btn"
          disabled={ validateButton() }
          onClick={ () => setTokens() }
        >
          Login
        </button>
      </Link>
    </div>
  );
}
