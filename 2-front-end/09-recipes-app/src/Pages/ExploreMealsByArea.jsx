import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import HeaderWithSearch from './HeaderWithSearch';

export default function ExploreMealsByArea() {
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState('All');
  const [meals, setMeals] = useState([]);
  const TWELVE = 12;
  useEffect(() => {
    async function fetchAreas() {
      const areasAPI = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const response = await fetch(areasAPI).then((resp) => resp.json());
      const areaList = response.meals;
      setAreas(areaList);
    }
    fetchAreas();
  }, []);
  useEffect(() => {
    async function fetchFilterByAreas() {
      const filterByAreasAPI = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
      const response = await fetch(filterByAreasAPI).then((resp) => resp.json());
      let mealList = response.meals ? [...response.meals] : [];
      mealList = mealList.slice(0, TWELVE);
      setMeals(mealList);
    }
    if (selectedArea === 'All') fetchFilterByAreas();
    if (selectedArea) fetchFilterByAreas();
  }, [selectedArea]);
  return (
    <>
      <HeaderWithSearch />
      <h3 data-testid="page-title" style={ { alignSelf: 'center' } }>Explorar Origem</h3>
      <select
        value={ selectedArea }
        onChange={ (event) => setSelectedArea(event.target.value) }
        data-testid="explore-by-area-dropdown"
        id="areas"
      >
        {areas.map((area) => (
          <option
            key={ area.strArea }
            value={ area.strArea }
            data-testid={ `${area.strArea}-option` }
          >
            {area.strArea}
          </option>
        ))}
        <option
          onChange={ (event) => setSelectedArea(event.target.value) }
          data-testid="All-option"
        >
          All
        </option>
      </select>
      {meals.map((meal, index) => (
        <Link key={ index } to={ `/comidas/${meal.idMeal}` }>
          <div className="card" data-testid={ `${index}-recipe-card` }>
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMealThumb }
              data-testid={ `${index}-card-img` }
            />
            <h4 data-testid={ `${index}-card-name` }>{meal.strMeal}</h4>
          </div>
        </Link>
      ))}
      <Footer />
    </>
  );
}
