import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import RecipesContext from '../../Context/RecipesContext';

export default function InputSearchMeals() {
  const { mealsAndInputs:
    { meals, search, mealInput }, setMealsAndInputs,
  mealsAndInputs } = useContext(RecipesContext);
  const PRIMEIRA_LETRA = 'Primeira letra';
  const apiIngredienteUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?';
  const apiMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?';

  const NOTFOUND = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
  const alert = (response) => {
    if (response.meals) {
      setMealsAndInputs(
        { search: '', mealInput: '', meals: response.meals },
      );
    }
    if (!response.meals) {
      global.alert(NOTFOUND);
    }
  };

  if (Array.isArray(meals) && meals.length === 1) {
    return (<Redirect
      to={
        `/comidas/${meals[0].idMeal}`
      }
    />);
  }

  const handleClick = () => {
    const apiIngredienteRequest = async () => {
      const response = await fetch(`${apiIngredienteUrl}i=${mealInput}`)
        .then((resp) => resp.json());
      alert(response);
    };

    const apiNomeRequest = async () => {
      const response = await fetch(`${apiMealsUrl}s=${mealInput}`)
        .then((resp) => resp.json());
      alert(response);
    };

    const apiLetraRequest = async () => {
      const response = await fetch(`${apiMealsUrl}f=${mealInput}`)
        .then((resp) => resp.json());
      alert(response);
    };

    if (search === PRIMEIRA_LETRA && mealInput.length !== 1) {
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

  return (
    <div className="inputsSearch">
      <input
        type="text"
        name="search"
        id="search"
        data-testid="search-input"
        onChange={ (ev) => setMealsAndInputs(
          { ...mealsAndInputs, mealInput: ev.target.value },
        ) }
      />
      <label htmlFor="Ingrediente">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="Ingrediente"
          name="search"
          onClick={ () => setMealsAndInputs(
            { ...mealsAndInputs, search: 'Ingrediente' },
          ) }
        />
        Ingrediente
      </label>
      <label htmlFor="Nome">
        <input
          type="radio"
          data-testid="name-search-radio"
          id="Nome"
          name="search"
          onClick={ () => setMealsAndInputs({ ...mealsAndInputs, search: 'Nome' }) }
        />
        Nome
      </label>
      <label htmlFor="Primeira letra">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="Primeira letra"
          name="search"
          onClick={ () => setMealsAndInputs(
            { ...mealsAndInputs, search: PRIMEIRA_LETRA },
          ) }
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
    </div>
  );
}
