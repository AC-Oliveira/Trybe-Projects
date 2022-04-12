import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PlanetsContext from './PlanetsContext';

const apiURL = 'https://swapi-trybe.herokuapp.com/api/planets/';

const defaultState = {
  filter: { filterByName: '', filterByNumericValues: [] },
  planetsList: [],
  order: {
    column: 'name',
    sort: 'ASC',
  } };

function PlanetsProvider({ children }) {
  const [globalState, setGlobalState] = useState(defaultState);

  useEffect(() => {
    async function fetchData() {
      const apiRequest = await fetch(apiURL).then((res) => res.json());
      const data = apiRequest.results;
      setGlobalState(() => ({ ...globalState,
        planetsList: data,
        setGlobalState,
      }));
    }
    fetchData();
  }, []);

  return (
    <PlanetsContext.Provider value={ globalState }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.func.isRequired,
};

export default PlanetsProvider;
