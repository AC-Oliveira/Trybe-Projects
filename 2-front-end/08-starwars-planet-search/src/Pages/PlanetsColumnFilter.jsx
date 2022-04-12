import React, { useContext } from 'react';
import PlanetsContext from '../Context/PlanetsContext';

export default function PlanetsColumnFilter() {
  const globalState = useContext(PlanetsContext);
  const { setGlobalState, filter } = useContext(PlanetsContext);
  const test = filter.filterByNumericValues;
  const newOrder = { column: 'name', sort: 'ASC' };

  const options = { population: 'population',
    orbital_period: 'orbital_period',
    diameter: 'diameter',
    rotation_period: 'rotation_period',
    surface_water: 'surface_water' };

  filter.filterByNumericValues.forEach((specs) => delete options[specs.column]);

  const optionsToMap = Object.keys(options);

  const columnsCompare = ['maior que', 'igual a', 'menor que'];
  const numericValues = {
    column: optionsToMap[0], comparison: 'maior que', value: null };

  const removeGlobalSpecs = (index) => {
    const temporaryGLobal = globalState.filter.filterByNumericValues;
    temporaryGLobal.splice(index, 1);
    setGlobalState(
      { filter: { filterByNumericValues: temporaryGLobal }, ...globalState },
    );
  };

  return (
    <>
      <select
        name="column-select"
        id="column-selector"
        data-testid="column-filter"
        onChange={ (ev) => { numericValues.column = ev.target.value; } }
      >
        {optionsToMap.map(
          (column, index) => <option key={ `Column${index}` }>{column}</option>,
        )}
      </select>
      <select
        name="comparison"
        id="comparison"
        data-testid="comparison-filter"
        onChange={ (ev) => { numericValues.comparison = ev.target.value; } }
      >
        {columnsCompare.map(
          (columnComparison, index) => (
            <option key={ `comparison${index}` }>{columnComparison}</option>),
        )}
      </select>
      <input
        type="number"
        name="valueFilter"
        id="valueFilter"
        data-testid="value-filter"
        onChange={ (ev) => { numericValues.value = ev.target.value; } }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          setGlobalState({ ...globalState,
            filter: { ...filter,
              filterByNumericValues:
            [...filter.filterByNumericValues, numericValues] } });
        } }
      >
        Filtrar
      </button>
      {test.map((specs, index) => (
        <>
          <p key={ `Specs${index}` }>{specs.column}</p>
          <p>{specs.comparison}</p>
          <p>{specs.value}</p>
          <div data-testid="filter">
            <button
              onClick={ () => removeGlobalSpecs(index) }
              type="button"
            >
              X
            </button>
          </div>
        </>))}
      <select
        name="columnSort"
        id="columnSort"
        data-testid="column-sort"
        onChange={ (ev) => {
          newOrder.column = ev.target.value;
        } }
      >
        {
          optionsToMap.splice(0, 0, 'name')
          && optionsToMap.map((specs, index) => <option key={ index }>{specs}</option>)
        }
      </select>
      <label htmlFor="asc">
        ASC
        <input
          type="radio"
          name="ac/dc"
          id="asc"
          data-testid="column-sort-input-asc"
          onClick={ () => {
            newOrder.sort = 'ASC';
          } }
        />
      </label>
      <label htmlFor="desc">
        DESC
        <input
          type="radio"
          name="ac/dc"
          id="desc"
          data-testid="column-sort-input-desc"
          onClick={ () => {
            newOrder.sort = 'DESC';
          } }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => setGlobalState(
          { ...globalState, order: { ...newOrder } },
        ) }
      >
        Ordenar
      </button>
    </>
  );
}
