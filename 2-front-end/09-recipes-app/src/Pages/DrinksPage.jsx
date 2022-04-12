import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import RecipesContext from '../Context/RecipesContext';
import MainFoodPage from './HeaderWithSearch';

export default function DrinksPage() {
  const { drinks, setDrinks } = useContext(RecipesContext);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [categoryToogle, setCategoryToogle] = useState({ category: '', toogle: false });
  const TWELVE = 12;
  const FIVE = 5;

  async function fetchDrinkAPI() {
    const APIDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(APIDrinks).then((resp) => resp.json());
    let drinksList = response.drinks;
    if (drinksList.length > TWELVE) drinksList = drinksList.slice(0, TWELVE);
    setDrinks(drinksList);
  }

  async function fetchDrinkCatergoryAPI() {
    const APICategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(APICategory).then((resp) => resp.json());
    const categoriesDrinksList = [...response.drinks];
    const drinkArrayCategories = categoriesDrinksList.reduce((acc, current) => {
      const { strCategory } = current;
      return { ...acc, [strCategory]: strCategory };
    }, {});
    setDrinkCategories(Object.keys(drinkArrayCategories).slice(0, FIVE));
  }

  useEffect(() => {
    fetchDrinkAPI();
    fetchDrinkCatergoryAPI();
  }, []);

  const handleDrinkCatecory = async (category) => {
    const buttonCategory = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    const response = await fetch(buttonCategory).then((resp) => resp.json());
    const categoryDrinks = [...response.drinks.slice(0, TWELVE)];
    setDrinks(categoryDrinks);
  };

  return (
    <>
      <MainFoodPage />
      {
        drinkCategories
          .map((category) => (
            <button
              className="categoryButtons"
              type="button"
              key={ category }
              data-testid={ `${category}-category-filter` }
              onClick={ () => {
                if (categoryToogle.toogle) {
                  if (category === categoryToogle.category) {
                    fetchDrinkAPI();
                    setCategoryToogle({ category, toogle: !categoryToogle.toogle });
                  }
                  if (category !== categoryToogle.category) {
                    handleDrinkCatecory(category);
                    setCategoryToogle({ category, toogle: !categoryToogle.toogle });
                  }
                }
                if (!categoryToogle.toogle) {
                  handleDrinkCatecory(category);
                  setCategoryToogle({ category, toogle: !categoryToogle.toogle });
                }
              } }
            >
              {category}
            </button>))
      }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ fetchDrinkAPI }
      >
        All
      </button>
      {
        drinks.map((drink, index) => (
          <Link key={ index } to={ `/bebidas/${drink.idDrink}` }>
            <div className="card" data-testid={ `${index}-recipe-card` }>
              <img
                src={ `${drink.strDrinkThumb}` }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <h4 data-testid={ `${index}-card-name` }><b>{drink.strDrink}</b></h4>
            </div>
          </Link>
        ))
      }
      <Footer />
    </>
  );
}
