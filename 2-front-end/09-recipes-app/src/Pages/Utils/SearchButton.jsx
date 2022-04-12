import React, { useContext } from 'react';
import RecipesContext from '../../Context/RecipesContext';
import searchIcon from '../../images/searchIcon.svg';
import '../../App.css';

export default function SearchButton() {
  const { searchBar, setsearchBar } = useContext(RecipesContext);

  return (
    <button id="search-button" type="button" onClick={ () => setsearchBar(!searchBar) }>
      <img data-testid="search-top-btn" src={ searchIcon } alt="Icone de pesquisa" />
    </button>
  );
}
