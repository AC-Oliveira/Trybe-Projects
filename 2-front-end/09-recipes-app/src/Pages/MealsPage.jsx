import React, { useState, useContext, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import Footer from '../Components/Footer';
import RecipesContext from '../Context/RecipesContext';
import HeaderWithSearch from './HeaderWithSearch';
import CategoriesButtons from './Utils/CategoriesButtons';

export default function MealsPage() {
  const [mealsCategories, setMealsCategories] = useState([]);
  const [categoryToogle, setCategoryToogle] = useState({ category: '', toogle: false });
  const { mealsAndInputs,
    mealsAndInputs: { meals },
    setMealsAndInputs, setMealDetails } = useContext(RecipesContext);
  const location = useLocation().pathname;
  const TWELVE = 12;
  const FIVE = 5;

  async function fetchMealAPI() {
    const APIMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(APIMeals).then((resp) => resp.json());
    let mealsList = [...response.meals];
    if (mealsList.length > TWELVE) mealsList = mealsList.slice(0, TWELVE);
    setMealsAndInputs({ ...mealsAndInputs, meals: mealsList });
  }
  async function fetchMealCatergoryAPI() {
    const APICategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(APICategory).then((resp) => resp.json());
    const categoriesMealsList = [...response.meals];
    const mealArrayCategories = categoriesMealsList.reduce((acc, current) => {
      const { strCategory } = current;
      return { ...acc, [strCategory]: strCategory };
    }, {});
    setMealsCategories(Object.keys(mealArrayCategories).slice(0, FIVE));
  }

  useEffect(() => {
    fetchMealAPI();
    fetchMealCatergoryAPI();
  }, []);

  const buttonsUtils = { mealsCategories,
    categoryToogle,
    fetchMealAPI,
    setCategoryToogle,
    setMealsAndInputs,
    mealsAndInputs };
  return (
    <>
      <HeaderWithSearch />
      {location.includes('/comidas') && <CategoriesButtons props={ buttonsUtils } />}
      {location.includes('/comidas') && meals.map((meal, index) => (
        <Link
          onClick={ () => setMealDetails(meal) }
          key={ index }
          to={ `/comidas/${meal.idMeal}` }
        >
          <div className="card" data-testid={ `${index}-recipe-card` }>
            <img
              src={ `${meal.strMealThumb}` }
              alt={ meal.strIngredient }
              data-testid={ `${index}-card-img` }
            />
            <h4 data-testid={ `${index}-card-name` }><b>{meal.strMeal}</b></h4>
          </div>
        </Link>
      ))}
      <Footer />
    </>
  );
}
