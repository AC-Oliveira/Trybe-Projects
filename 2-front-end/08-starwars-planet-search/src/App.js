import React from 'react';
import './App.css';
import PlanetsProvider from './Context/PlanetsProvider';
import PlanetsTable from './Pages/PlanetsTable';
import PlanetsNameFilter from './Pages/PlanetsNameFilter';
import PlanetsColumnFilter from './Pages/PlanetsColumnFilter';
// import PlanetsFilter from './Pages/PlanetsFilter';

function App() {
  return (
    <PlanetsProvider>
      <PlanetsNameFilter />
      <PlanetsColumnFilter />
      <PlanetsTable />
    </PlanetsProvider>
  );
}

export default App;
