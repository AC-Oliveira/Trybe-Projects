import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import RecipesContext from '../Context/RecipesContext';
import ProfileButton from './Utils/ProfileButton';
import SearchButton from './Utils/SearchButton';
import '../App.css';
import InputSearchMeals from './Utils/InputSearchMeals';
import InputSearchCocktails from './Utils/InputSearchCocktails';

export default function HeaderWithSearch() {
  const { searchBar } = useContext(RecipesContext);
  const location = useLocation().pathname;

  return (
    <>
      <header>
        <ProfileButton />
        <h3
          data-testid="page-title"
          style={ { alignSelf: 'center' } }
        >
          {location.includes('/comidas') ? 'Comidas' : 'Bebidas'}
        </h3>
        <SearchButton />
      </header>
      {searchBar && location === '/comidas' ? <InputSearchMeals /> : null}
      {searchBar && location === '/bebidas' ? <InputSearchCocktails /> : null}
    </>
  );
}
