import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import ProfileButton from './Utils/ProfileButton';
import Footer from '../Components/Footer';

const apiRandomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php';

export default function ExploreMealsPage() {
  const history = useHistory();
  // const { idMeal } = randomMeal;
  const handleClick = async () => {
    const response = await fetch(`${apiRandomMealUrl}`)
      .then((resp) => resp.json());
    // setRandomMeal(response);
    const { idMeal } = response.meals[0];
    history.push(`/comidas/${idMeal}`);
  };

  return (
    <div>
      <header>
        <ProfileButton />
        <h3 data-testid="page-title" style={ { alignSelf: 'center' } }>
          Explorar Comidas
        </h3>
        <div>
          {}
        </div>
      </header>
      <Link to="/explorar/comidas/ingredientes">
        <button
          className="categoryButtons"
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button className="categoryButtons" data-testid="explore-by-area" type="button">
          Por Local de Origem
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
