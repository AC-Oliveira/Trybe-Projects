import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderWithoutSearch from './HeaderWithoutSearch';
import Footer from '../Components/Footer';
import RecipesContext from '../Context/RecipesContext';

export default function ExploreMealsByIngredient() {
  const { mealsAndInputs, setMealsAndInputs } = useContext(RecipesContext);
  const [meals, setMeals] = useState([]);
  const TWELVE = 12;
  const apiIngredienteUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?';
  const imgURL = 'https://www.themealdb.com/images/ingredients/';
  useEffect(() => {
    async function fetchAPI() {
      const APIMeals = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
      const response = await fetch(APIMeals).then((resp) => resp.json());
      let mealsList = [...response.meals];
      if (mealsList.length > TWELVE) mealsList = mealsList.slice(0, TWELVE);
      setMeals(mealsList);
    }
    fetchAPI();
  }, []);

  const handleClick = (ingredient) => {
    const apiIngredienteRequest = async () => {
      const response = await fetch(`${apiIngredienteUrl}i=${ingredient}`)
        .then((resp) => resp.json());
      setMealsAndInputs({ ...mealsAndInputs, meals: response.meals });
    };
    apiIngredienteRequest();
  };

  return (
    <div>
      <HeaderWithoutSearch />
      <h3 data-testid="page-title">Explorar Ingredientes</h3>
      {meals.map((meal, index) => (
        <Link key={ index } to={ `/comidas/ingrediente/${meal.strIngredient}` }>
          <div
            onClick={ () => handleClick(meal.strIngredient) }
            aria-hidden="true"
            className="card"
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              src={ `${imgURL}${meal.strIngredient}-Small.png` }
              alt={ meal.strIngredient }
              data-testid={ `${index}-card-img` }
            />
            <h4
              data-testid={ `${index}-card-name` }
            >
              <b>{meal.strIngredient}</b>
            </h4>
          </div>
        </Link>
      ))}
      <Footer />
    </div>
  );
}
