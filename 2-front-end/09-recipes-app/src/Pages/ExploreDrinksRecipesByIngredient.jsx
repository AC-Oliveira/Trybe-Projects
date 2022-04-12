import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import RecipesContext from '../Context/RecipesContext';
import HeaderWithSearch from './HeaderWithSearch';

export default function ExploreDrinksRecipesByIngredient() {
  const { drinks } = useContext(RecipesContext);

  return (
    <>
      <HeaderWithSearch />
      {
        drinks.map((drink, index) => (
          <div key={ index } className="card" data-testid={ `${index}-recipe-card` }>
            <img
              src={ `${drink.strDrinkThumb}` }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <Link to={ `/bebidas/${drink.idDrink}` }>
              <h4 data-testid={ `${index}-card-name` }><b>{drink.strDrink}</b></h4>
            </Link>
          </div>
        ))
      }
      <Footer />
    </>
  );
}
