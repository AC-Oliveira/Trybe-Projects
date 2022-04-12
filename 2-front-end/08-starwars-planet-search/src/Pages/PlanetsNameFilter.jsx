import React, { useContext } from 'react';
import PlanetsContext from '../Context/PlanetsContext';

function PlanetsNameFilter() {
  const { setGlobalState, filter } = useContext(PlanetsContext);
  const globalState = useContext(PlanetsContext);

  return (
    <input
      type="text"
      onChange={ (ev) => {
        setGlobalState({ ...globalState,
          filter: { ...filter, filterByName: ev.target.value } });
      } }
      data-testid="name-filter"
    />
  );
}

export default PlanetsNameFilter;
