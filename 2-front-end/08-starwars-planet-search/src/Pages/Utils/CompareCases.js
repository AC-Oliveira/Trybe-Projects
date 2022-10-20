export function compareCases(str, filterValue, planetValue) {
  switch (str) {
  case 'menor que':
    return filterValue > planetValue;

  case 'igual a':
    return filterValue === planetValue;

  default:
    return filterValue < planetValue;
  }
}

function sortNamesASC(order, planetsList) {
  const MENUSUM = -1;
  if (order.column === 'name' && order.sort === 'ASC') {
    planetsList.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return MENUSUM;
      return 0;
    });
  }
  return planetsList;
}
function sortNamesDESC(order, planetsList) {
  const MENUSUM = -1;
  if (order.column === 'name' && order.sort === 'DESC') {
    planetsList.sort(
      (a, b) => {
        if (a.name > b.name) return MENUSUM;
        if (a.name < b.name) return 1;
        return 0;
      },
    );
  }
  return planetsList;
}

export function sortPlanetsColumns(order, planetsList) {
  if (!planetsList.length) return [];
  if (order
    .column === 'name' && order.sort === 'ASC') return sortNamesASC(order, planetsList);
  if (order
    .column === 'name' && order.sort === 'DESC') return sortNamesDESC(order, planetsList);
  if (order.sort === 'ASC') {
    return planetsList
      .sort((a, b) => a[order.column] - b[order.column]);
  }
  if (order.sort === 'DESC') {
    return planetsList
      .sort((a, b) => b[order.column] - a[order.column]);
  }
}
