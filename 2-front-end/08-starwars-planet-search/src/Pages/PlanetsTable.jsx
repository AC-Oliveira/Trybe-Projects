import React, { useContext } from 'react';
import PlanetsContext from '../Context/PlanetsContext';
import { compareCases, sortPlanetsColumns } from './Utils/CompareCases';

export default function PlanetsTable() {
  let { planetsList } = useContext(PlanetsContext);

  const { filter: {
    filterByName, filterByNumericValues }, order } = useContext(PlanetsContext);

  if (filterByName !== '') {
    planetsList = planetsList.filter((planet) => planet.name.includes(filterByName));
  }
  if (filterByNumericValues.length > 0) {
    filterByNumericValues.forEach((specs) => {
      planetsList = planetsList.filter(
        (planet) => {
          const planetValue = Number(planet[specs.column]);
          const filterValue = Number(specs.value);
          return compareCases(specs.comparison, filterValue, planetValue);
        },
      );
    });
  }

  planetsList = sortPlanetsColumns(order, planetsList);

  return (
    <table>
      <tr>
        <th>Planets</th>
        <th>Rotation Period</th>
        <th>Orbital Period</th>
        <th>Diameter</th>
        <th>Climate</th>
        <th>Gravity</th>
        <th>Terrain</th>
        <th>Surface Water</th>
        <th>Population</th>
        <th>Films</th>
        <th>Created</th>
        <th>Edited</th>
        <th>URL</th>
      </tr>
      {planetsList.map((planet) => (
        <tr key={ planet.name }>
          <td data-testid="planet-name">{planet.name}</td>
          <td>{planet.rotation_period}</td>
          <td>{planet.orbital_period}</td>
          <td>{planet.diameter}</td>
          <td>{planet.climate}</td>
          <td>{planet.gravity}</td>
          <td>{planet.terrain}</td>
          <td>{planet.surface_water}</td>
          <td>{planet.population}</td>
          <td>
            {planet.films.map((film) => <p key={ planet.name }>{film}</p>)}
          </td>
          <td>{planet.created}</td>
          <td>{planet.edited}</td>
          <td>{planet.url}</td>
        </tr>
      ))}
    </table>
  );
}
