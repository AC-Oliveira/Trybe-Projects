import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchBar, setsearchBar] = useState(false);
  const [api, setApi] = useState({ meals: [], drinks: [] });
  const [mealDetails, setMealDetails] = useState({});
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [mealsAndInputs, setMealsAndInputs] = useState(
    { meals: [], search: '', mealInput: '' },
  );

  const contextValue = { email,
    setEmail,
    password,
    setPassword,
    searchBar,
    setsearchBar,
    api,
    setApi,
    mealDetails,
    setMealDetails,
    meals,
    setMeals,
    mealsAndInputs,
    setMealsAndInputs,
    drinks,
    setDrinks,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
