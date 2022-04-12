import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import RecipesContext from '../Context/RecipesContext';
import HeaderWithSearch from './HeaderWithSearch';

export default function ExploreRecipesByIngredient() {
  const { mealsAndInputs: { meals } } = useContext(RecipesContext);
  return (
    <>
      <HeaderWithSearch />
      { meals.map((meal, index) => (
        <div key={ index } className="card" data-testid={ `${index}-recipe-card` }>
          <img
            src={ `${meal.strMealThumb}` }
            alt={ meal.strIngredient }
            data-testid={ `${index}-card-img` }
          />
          <Link to={ `/comidas/${meal.idMeal}` }>
            <h4 data-testid={ `${index}-card-name` }><b>{meal.strMeal}</b></h4>
          </Link>
        </div>
      ))}
      <Footer />
    </>
  );
}
