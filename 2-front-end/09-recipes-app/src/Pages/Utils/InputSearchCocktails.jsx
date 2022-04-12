import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router';
import RecipesContext from '../../Context/RecipesContext';

export default function InputSearchCocktails() {
  const [search, setSearch] = useState('');
  const [cocktailInput, setCocktailInput] = useState('');
  const PRIMEIRA_LETRA = 'Primeira letra';
  const apiIngredienteUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?';
  const apiCocktails = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?';
  const { api, setApi } = useContext(RecipesContext);
  let drinksList = api.drinks;
  const TWELVE = 12;
  const NOTFOUND = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  const alert = (response) => {
    if (response.drinks) setApi(response);
    if (!response.drinks) global.alert(NOTFOUND);
  };

  const handleClick = () => {
    const apiIngredienteRequest = async () => {
      const response = await fetch(`${apiIngredienteUrl}i=${cocktailInput}`)
        .then((resp) => resp.json());
      alert(response);
    };

    const apiNomeRequest = async () => {
      const response = await fetch(`${apiCocktails}s=${cocktailInput}`)
        .then((resp) => resp.json());
      alert(response);
    };

    const apiLetraRequest = async () => {
      const response = await fetch(`${apiCocktails}f=${cocktailInput}`)
        .then((resp) => resp.json());
      alert(response);
    };

    if (search === PRIMEIRA_LETRA && cocktailInput.length !== 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }

    switch (search) {
    case 'Ingrediente':
      apiIngredienteRequest();
      break;
    case 'Nome':
      apiNomeRequest();
      break;
    case PRIMEIRA_LETRA:
      apiLetraRequest();
      break;
    default:
      break;
    }
  };

  if (drinksList.length === 1) {
    return <Redirect to={ `/bebidas/${drinksList[0].idDrink}` } />;
  }

  if (drinksList.length > TWELVE) drinksList = drinksList.slice(0, TWELVE);

  return (
    <div className="inputsSearch">
      <input
        type="text"
        name="search"
        id="search"
        data-testid="search-input"
        onChange={ (ev) => setCocktailInput(ev.target.value) }
      />
      <label htmlFor="Ingrediente">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="Ingrediente"
          name="search"
          onClick={ () => setSearch('Ingrediente') }
        />
        Ingrediente
      </label>
      <label htmlFor="Nome">
        <input
          type="radio"
          data-testid="name-search-radio"
          id="Nome"
          name="search"
          onClick={ () => setSearch('Nome') }
        />
        Nome
      </label>
      <label htmlFor="Primeira letra">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="Primeira letra"
          name="search"
          onClick={ () => setSearch(PRIMEIRA_LETRA) }
        />
        Primeira letra
      </label>
      <button
        onClick={ handleClick }
        type="button"
        data-testid="exec-search-btn"
      >
        Buscar
      </button>
      { drinksList.map((drink, index) => (
        <div className="card" data-testid={ `${index}-recipe-card` } key={ index }>
          <img
            data-testid={ `${index}-card-img` }
            src={ drink.strDrinkThumb }
            alt="Meal card"
          />
          <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
        </div>))}
    </div>
  );
}
