import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import ProfileButton from './Utils/ProfileButton';
import Footer from '../Components/Footer';

const apiRandomDrinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

export default function ExploreMealsPage() {
  const history = useHistory();
  // const { idMeal } = randomMeal;
  const handleClick = async () => {
    const response = await fetch(`${apiRandomDrinkUrl}`)
      .then((resp) => resp.json());
    // setRandomMeal(response);
    const { idDrink } = response.drinks[0];
    history.push(`/bebidas/${idDrink}`);
  };
  return (
    <div>
      <header>
        <ProfileButton />
        <h3 data-testid="page-title" style={ { alignSelf: 'center' } }>
          Explorar Bebidas
        </h3>
        <div>
          {}
        </div>
      </header>
      <Link to="/explorar/bebidas/ingredientes">
        <button data-testid="explore-by-ingredient" type="button">
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/bebidas/area">
        <button disabled data-testid="" type="button">
          Por Area
        </button>
      </Link>
      {/* <Link to={ `/comidas/${idMeal}` }> */}
      <button onClick={ handleClick } data-testid="explore-surprise" type="button">
        Me Surpreenda!
      </button>
      {/* </Link> */}
      <Footer />
    </div>
  );
}
