import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderWithoutSearch from './HeaderWithoutSearch';
import Footer from '../Components/Footer';
import RecipesContext from '../Context/RecipesContext';

export default function ExploreMealsPage() {
  // const [drinks, setDrinks] = useState([]);
  const { drinks, setDrinks } = useContext(RecipesContext);
  const TWELVE = 12;
  const imgURL = 'https://www.thecocktaildb.com/images/ingredients/';
  const apiIngredienteUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?';

  useEffect(() => {
    async function fetchAPI() {
      const APIDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const response = await fetch(APIDrinks).then((resp) => resp.json());
      let drinksList = [...response.drinks];
      if (drinksList.length > TWELVE) drinksList = drinksList.slice(0, TWELVE);
      setDrinks(drinksList);
    }
    fetchAPI();
  }, []);

  const handleClick = (ingredient) => {
    const apiIngredienteRequest = async () => {
      const response = await fetch(`${apiIngredienteUrl}i=${ingredient}`)
        .then((resp) => resp.json());
      let drinksList = [...response.drinks];
      if (drinksList.length > TWELVE) drinksList = drinksList.slice(0, TWELVE);
      setDrinks(drinksList);
    };
    apiIngredienteRequest();
  };

  return (
    <div>
      <HeaderWithoutSearch />
      <h3 data-testid="page-title">Explorar Ingredientes</h3>
      {drinks.map((drink, index) => (
        <Link key={ index } to={ `/bebidas/ingrediente/${drink.strIngredient1}` }>
          <div
            onClick={ () => handleClick(drink.strIngredient1) }
            className="card"
            data-testid={ `${index}-ingredient-card` }
            aria-hidden="true"
          >
            <img
              src={ `${imgURL}${drink.strIngredient1}-Small.png` }
              alt={ drink.strIngredient1 }
              data-testid={ `${index}-card-img` }
            />
            <h4 data-testid={ `${index}-card-name` }><b>{drink.strIngredient1}</b></h4>
          </div>
        </Link>
      ))}
      <Footer />
    </div>
  );
}
