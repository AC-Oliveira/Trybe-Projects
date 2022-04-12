import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Footer from '../Components/Footer';

export default function MainFoodPage() {
  const [searchBar, setsearchBar] = useState(false);

  return (
    <>
      <header style={ { display: 'flex' } }>
        <Link to="/perfil">
          <button data-testid="profile-top-btn" type="button">
            <img src={ profileIcon } alt="Icone de usuario" />
          </button>
        </Link>
        <h3 data-testid="page-title">Comidas</h3>
        <button
          data-testid="search-top-btn"
          type="button"
          onClick={ () => setsearchBar(!searchBar) }
        >
          <img src={ searchIcon } alt="Icone de pesquisa" />
        </button>
      </header>
      {searchBar
      && <input type="text" name="search" id="search" data-testid="search-input" />}
      <Footer />
    </>
  );
}
